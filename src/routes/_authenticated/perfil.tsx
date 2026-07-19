import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, ShieldCheck, UserRound, Mail, KeyRound } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import {
  getMyProfile,
  checkAdminExists,
  bootstrapFirstAdmin,
} from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Mi cuenta — AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["auth", "me"],
      queryFn: () => getMyProfile(),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["auth", "admin-exists"],
      queryFn: () => checkAdminExists(),
    });
  },
  errorComponent: ({ error }) => (
    <PageShell title="No pudimos cargar tu cuenta" intro={error.message} />
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const router = useRouter();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const callProfile = useServerFn(getMyProfile);
  const callAdminExists = useServerFn(checkAdminExists);
  const callBootstrap = useServerFn(bootstrapFirstAdmin);

  const { data: me } = useSuspenseQuery({
    queryKey: ["auth", "me"],
    queryFn: () => callProfile(),
  });
  const { data: adminState } = useQuery({
    queryKey: ["auth", "admin-exists"],
    queryFn: () => callAdminExists(),
  });

  const isAdmin = me.roles.includes("admin");
  const canBootstrap = !isAdmin && adminState?.exists === false;

  const bootstrap = useMutation({
    mutationFn: () => callBootstrap(),
    onSuccess: async (res) => {
      if (res.promoted) {
        toast.success("Has sido promovido a administrador.");
        await queryClient.invalidateQueries({ queryKey: ["auth"] });
        router.invalidate();
      } else {
        toast.error("Ya existe un administrador. No puedes usar el bootstrap.");
        await queryClient.invalidateQueries({ queryKey: ["auth", "admin-exists"] });
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <PageShell
      eyebrow="Área de servicio"
      title="Mi cuenta"
      intro="Panel privado para servidores y miembros autorizados del Área 2 Metropolitana."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <section className="rounded-3xl border border-brand/10 bg-paper p-8 shadow-lift">
          <div className="flex items-start gap-4">
            <span className="grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
              <UserRound className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-2xl text-brand">
                {me.fullName ?? "Servidor autenticado"}
              </h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-ink/70">
                <Mail className="size-4" /> {me.email ?? "—"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {me.roles.length === 0 ? (
                  <span className="rounded-full bg-soft px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink/60">
                    Sin rol asignado
                  </span>
                ) : (
                  me.roles.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand"
                    >
                      <ShieldCheck className="size-3.5" /> {r}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {canBootstrap && (
          <section className="rounded-3xl border-2 border-brand/30 bg-brand/5 p-8">
            <h3 className="font-serif text-xl text-brand">Bootstrap del primer administrador</h3>
            <p className="mt-2 text-sm text-ink/80">
              Aún no existe ningún administrador en el sistema. Como primer usuario autenticado,
              puedes asignarte el rol de <strong>admin</strong>. Esta acción solo puede realizarse
              una vez.
            </p>
            <button
              type="button"
              onClick={() => bootstrap.mutate()}
              disabled={bootstrap.isPending}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 disabled:opacity-60"
            >
              <ShieldCheck className="size-4" />
              {bootstrap.isPending ? "Promoviendo…" : "Promoverme a administrador"}
            </button>
          </section>
        )}

        {isAdmin && (
          <section className="rounded-3xl border border-brand/10 bg-paper p-8">
            <h3 className="font-serif text-xl text-brand">Panel administrativo</h3>
            <p className="mt-2 text-sm text-ink/70">
              El panel administrativo (CRUD de grupos, reuniones, eventos y documentos) se
              habilitará en la <strong>Fase 3</strong> del proyecto.
            </p>
          </section>
        )}

        <section className="rounded-3xl border border-brand/10 bg-paper p-8">
          <h3 className="font-serif text-xl text-brand">Sesión</h3>
          <p className="mt-2 text-sm text-ink/70">
            Puedes cambiar tu contraseña desde el flujo de recuperación en la pantalla de acceso, o
            cerrar sesión aquí.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-brand/25 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-soft"
            >
              <LogOut className="size-4" /> Cerrar sesión
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!me.email) return;
                const { error } = await supabase.auth.resetPasswordForEmail(me.email, {
                  redirectTo: `${window.location.origin}/reset-password`,
                });
                if (error) toast.error(error.message);
                else toast.success("Te enviamos un correo para cambiar tu contraseña.");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/25 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-soft"
            >
              <KeyRound className="size-4" /> Cambiar contraseña
            </button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
