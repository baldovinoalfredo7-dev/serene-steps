// Thin client wrappers around the /api/public/members-gate/* server routes.
// Server routes bypass the createServerFn Response wrapper that drops
// Set-Cookie headers on 2xx responses, so cookies actually persist.

export async function unlockMembersClient(password: string): Promise<{ ok: boolean }> {
  try {
    const r = await fetch("/api/public/members-gate/unlock", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    if (!r.ok) return { ok: false };
    const data = (await r.json()) as { ok?: boolean };
    return { ok: Boolean(data?.ok) };
  } catch {
    return { ok: false };
  }
}

export async function lockMembersClient(): Promise<{ ok: boolean }> {
  try {
    await fetch("/api/public/members-gate/lock", {
      method: "POST",
      credentials: "include",
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function checkMembersUnlockedClient(): Promise<{ unlocked: boolean }> {
  try {
    const r = await fetch("/api/public/members-gate/check", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    if (!r.ok) return { unlocked: false };
    const data = (await r.json()) as { unlocked?: boolean };
    return { unlocked: Boolean(data?.unlocked) };
  } catch {
    return { unlocked: false };
  }
}
