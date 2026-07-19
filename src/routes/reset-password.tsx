import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Cambiar contraseña — AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase handles the recovery link automatically and fires a
    // PASSWORD_RECOVERY event; a session is established for the update call.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Contraseña actualizada.");
    navigate({ to: "/perfil", replace: true });
  }

  return (
    <PageShell
      eyebrow="Recuperación"
      title="Establece una nueva contraseña"
      intro="Elige una contraseña segura. Mínimo 8 caracteres."
    >
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-brand/10 bg-paper p-8 shadow-lift">
          {!ready ? (
            <p className="text-sm text-ink/70">
              Verificando enlace de recuperación… Si llegaste aquí por error, vuelve al{" "}
              <a href="/auth" className="text-brand underline-offset-4 hover:underline">
                acceso
              </a>
              .
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink/80">
                  Nueva contraseña
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 disabled:opacity-60"
              >
                <KeyRound className="size-4" />
                {busy ? "Guardando…" : "Actualizar contraseña"}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
