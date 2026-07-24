import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Fallback password used ONLY when SITE_PASSWORD is not set in the environment.
const FALLBACK_SITE_PASSWORD = "area22026";
// Fallback session secret (>= 32 chars). Overridden by MEMBERS_SESSION_SECRET.
const FALLBACK_SESSION_SECRET =
  "aa-area2-members-gate-fallback-secret-please-rotate";

const COOKIE_NAME = "aa-members-gate";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSessionSecret(): string {
  const s = process.env.MEMBERS_SESSION_SECRET;
  return s && s.length >= 32 ? s : FALLBACK_SESSION_SECRET;
}

function getExpectedPassword(): string {
  return process.env.SITE_PASSWORD || FALLBACK_SITE_PASSWORD;
}

function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signToken(payload: { exp: number }): string {
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

function verifyToken(token: string): { exp: number } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = b64url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"),
    ) as { exp: number };
    if (!payload || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const unlockMembers = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const expected = getExpectedPassword();
      if (!data?.password || !passwordMatches(data.password, expected)) {
        return { ok: false as const };
      }
      const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
      const token = signToken({ exp });
      setCookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE_SECONDS,
      });
      return { ok: true as const };
    } catch (error) {
      console.error("unlockMembers failed", error);
      return { ok: false as const, error: "server_error" as const };
    }
  });

export const lockMembers = createServerFn({ method: "POST" }).handler(async () => {
  try {
    deleteCookie(COOKIE_NAME, { path: "/" });
  } catch (error) {
    console.error("lockMembers failed", error);
  }
  return { ok: true as const };
});

export const checkMembersUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return { unlocked: false };
    const payload = verifyToken(raw);
    return { unlocked: Boolean(payload) };
  } catch (error) {
    console.error("checkMembersUnlocked failed", error);
    return { unlocked: false };
  }
});
