import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type MemberRow = {
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: Array<"admin" | "editor" | "member">;
  mustChangePassword: boolean;
  createdAt: string | null;
};

const CreateSchema = z.object({
  email: z.string().email("Correo inválido").transform((s) => s.trim().toLowerCase()),
  fullName: z.string().trim().min(2, "Nombre requerido").max(120),
  role: z.enum(["admin", "editor", "member"]).default("member"),
});

const UserIdSchema = z.object({ userId: z.string().uuid() });

function tempPassword(): string {
  // 12 chars, base36 + uppercase + digit, safe to communicate verbally
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `AA-${rand}${digits}`;
}

async function assertAdmin(context: {
  supabase: import("@supabase/supabase-js").SupabaseClient;
  userId: string;
}) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Solo un administrador puede realizar esta acción.");
}

export const listMembers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MemberRow[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: usersData, error: usersErr }, profilesRes, rolesRes] = await Promise.all([
      supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 }),
      supabaseAdmin.from("profiles").select("id, full_name, must_change_password"),
      supabaseAdmin.from("user_roles").select("user_id, role"),
    ]);
    if (usersErr) throw new Error(usersErr.message);
    if (profilesRes.error) throw new Error(profilesRes.error.message);
    if (rolesRes.error) throw new Error(rolesRes.error.message);

    const profilesById = new Map(profilesRes.data.map((p) => [p.id, p]));
    const rolesById = new Map<string, MemberRow["roles"]>();
    for (const r of rolesRes.data) {
      const arr = rolesById.get(r.user_id) ?? [];
      arr.push(r.role as MemberRow["roles"][number]);
      rolesById.set(r.user_id, arr);
    }

    return usersData.users
      .map<MemberRow>((u) => {
        const p = profilesById.get(u.id);
        return {
          userId: u.id,
          email: u.email ?? null,
          fullName: p?.full_name ?? null,
          roles: rolesById.get(u.id) ?? [],
          mustChangePassword: p?.must_change_password ?? false,
          createdAt: u.created_at ?? null,
        };
      })
      .sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
  });

export const createMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CreateSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ email: string; tempPassword: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const password = tempPassword();
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName },
    });
    if (error || !created.user) throw new Error(error?.message ?? "No se pudo crear el usuario.");

    const uid = created.user.id;

    // Ensure profile exists with full_name + must_change_password
    const { error: profErr } = await supabaseAdmin
      .from("profiles")
      .upsert({ id: uid, full_name: data.fullName, must_change_password: true });
    if (profErr) throw new Error(profErr.message);

    // Assign role (default 'member')
    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: uid, role: data.role }, { onConflict: "user_id,role" });
    if (roleErr) throw new Error(roleErr.message);

    return { email: data.email, tempPassword: password };
  });

export const resetMemberPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UserIdSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ tempPassword: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const password = tempPassword();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.userId, { password });
    if (error) throw new Error(error.message);

    const { error: pErr } = await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", data.userId);
    if (pErr) throw new Error(pErr.message);

    return { tempPassword: password };
  });

export const deactivateMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UserIdSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    if (data.userId === context.userId) throw new Error("No puedes desactivar tu propia cuenta.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getMustChangePassword = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ must: boolean }> => {
    const { data, error } = await context.supabase.rpc("my_must_change_password");
    if (error) throw new Error(error.message);
    return { must: Boolean(data) };
  });

export const clearPasswordChangeFlag = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: true }> => {
    const { error } = await context.supabase.rpc("clear_password_change_flag");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
