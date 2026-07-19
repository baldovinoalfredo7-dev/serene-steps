import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type MyProfile = {
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: Array<"admin" | "editor" | "member">;
};

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyProfile> => {
    const { supabase, userId, claims } = context;

    const [profileRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    return {
      userId,
      email: (claims.email as string | undefined) ?? null,
      fullName: profileRes.data?.full_name ?? null,
      roles: (rolesRes.data ?? []).map((r) => r.role as MyProfile["roles"][number]),
    };
  });

export const checkAdminExists = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ exists: boolean }> => {
    const { data, error } = await context.supabase.rpc("admin_exists");
    if (error) throw new Error(error.message);
    return { exists: Boolean(data) };
  });

export const bootstrapFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ promoted: boolean }> => {
    const { data, error } = await context.supabase.rpc("bootstrap_first_admin");
    if (error) throw new Error(error.message);
    return { promoted: Boolean(data) };
  });
