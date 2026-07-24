import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

// Fallback password used ONLY when SITE_PASSWORD is not set in the environment.
// Remove once the environment secret is configured.
const FALLBACK_SITE_PASSWORD = "area22026";
// Fallback session secret (must be >= 32 chars). Overridden by MEMBERS_SESSION_SECRET.
const FALLBACK_SESSION_SECRET =
  "aa-area2-members-gate-fallback-secret-please-rotate";

type GateSession = { unlocked?: boolean };

function getSessionConfig() {
  const password =
    process.env.MEMBERS_SESSION_SECRET && process.env.MEMBERS_SESSION_SECRET.length >= 32
      ? process.env.MEMBERS_SESSION_SECRET
      : FALLBACK_SESSION_SECRET;
  return {
    password,
    name: "aa-members-gate",
    maxAge: 60 * 60 * 8, // 8 hours
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

export const unlockMembers = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    try {
      const expected = getExpectedPassword();
      if (!data?.password || !passwordMatches(data.password, expected)) {
        return { ok: false as const };
      }
      const session = await useSession<GateSession>(getSessionConfig());
      await session.update({ unlocked: true });
      return { ok: true as const };
    } catch (error) {
      console.error("unlockMembers failed", error);
      return { ok: false as const, error: "server_error" as const };
    }
  });

export const lockMembers = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const session = await useSession<GateSession>(getSessionConfig());
    await session.clear();
  } catch (error) {
    console.error("lockMembers failed", error);
  }
  return { ok: true as const };
});

export const checkMembersUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const session = await useSession<GateSession>(getSessionConfig());
    return { unlocked: Boolean(session.data.unlocked) };
  } catch (error) {
    console.error("checkMembersUnlocked failed", error);
    return { unlocked: false };
  }
});
