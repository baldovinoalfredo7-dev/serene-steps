import { createServerFn } from "@tanstack/react-start";
import {
  getCookie,
  setCookie,
  deleteCookie,
  sealSession,
  unsealSession,
} from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

// Fallback password used ONLY when SITE_PASSWORD is not set in the environment.
const FALLBACK_SITE_PASSWORD = "area22026";
// Fallback session secret (>= 32 chars). Overridden by MEMBERS_SESSION_SECRET.
const FALLBACK_SESSION_SECRET =
  "aa-area2-members-gate-fallback-secret-please-rotate";

const COOKIE_NAME = "aa-members-gate";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

type GateSession = { unlocked?: boolean };

function getSessionConfig() {
  const password =
    process.env.MEMBERS_SESSION_SECRET &&
    process.env.MEMBERS_SESSION_SECRET.length >= 32
      ? process.env.MEMBERS_SESSION_SECRET
      : FALLBACK_SESSION_SECRET;
  return {
    password,
    name: COOKIE_NAME,
    maxAge: MAX_AGE_SECONDS,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function getExpectedPassword(): string {
  return process.env.SITE_PASSWORD || FALLBACK_SITE_PASSWORD;
}

function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function readGateSession(): Promise<GateSession> {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return {};
  try {
    const data = (await unsealSession(raw, getSessionConfig())) as
      | { data?: GateSession }
      | GateSession
      | undefined;
    if (!data) return {};
    // unsealSession returns { data, ... } shape
    if (typeof data === "object" && "data" in data && data.data)
      return data.data as GateSession;
    return data as GateSession;
  } catch {
    return {};
  }
}

async function writeGateSession(next: GateSession): Promise<void> {
  const sealed = await sealSession({ data: next } as never, getSessionConfig());
  setCookie(COOKIE_NAME, sealed, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export const unlockMembers = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const expected = getExpectedPassword();
      if (!data?.password || !passwordMatches(data.password, expected)) {
        return { ok: false as const };
      }
      await writeGateSession({ unlocked: true });
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
    const session = await readGateSession();
    return { unlocked: Boolean(session.unlocked) };
  } catch (error) {
    console.error("checkMembersUnlocked failed", error);
    return { unlocked: false };
  }
});
