import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Fallback password used ONLY when SITE_PASSWORD is not set in the environment.
const FALLBACK_SITE_PASSWORD = "area22026";
// Fallback session secret (>= 32 chars). Overridden by MEMBERS_SESSION_SECRET.
const FALLBACK_SESSION_SECRET =
  "aa-area2-members-gate-fallback-secret-please-rotate";

export const GATE_COOKIE_NAME = "aa-members-gate";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSessionSecret(): string {
  const s = process.env.MEMBERS_SESSION_SECRET;
  return s && s.length >= 32 ? s : FALLBACK_SESSION_SECRET;
}

function getExpectedPassword(): string {
  return process.env.SITE_PASSWORD || FALLBACK_SITE_PASSWORD;
}

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signToken(payload: { exp: number }): string {
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

function verifyToken(token: string): boolean {
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = b64url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(
      Buffer.from(
        body.replace(/-/g, "+").replace(/_/g, "/"),
        "base64",
      ).toString("utf8"),
    ) as { exp: number };
    if (!payload || typeof payload.exp !== "number") return false;
    if (payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const expected = getExpectedPassword();
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeGateCookie(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const token = signToken({ exp });
  return `${GATE_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}`;
}

export function clearGateCookie(): string {
  return `${GATE_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function checkUnlocked(request: Request): boolean {
  const raw = readCookie(request, GATE_COOKIE_NAME);
  if (!raw) return false;
  return verifyToken(raw);
}
