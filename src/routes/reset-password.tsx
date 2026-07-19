import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { KeyRound, ShieldAlert } from "lucide-react";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { clearPasswordChangeFlag } from "@/lib/members.functions";

const searchSchema = z.object({ force: z.coerce.number().optional() });

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  validateSearch: (s) => searchSchema.parse(s),
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
  const { force } = Route.useSearch();
  const isForced = force === 1;
  const [ready, setReady] = useState(isForced); // if forced, session already exists
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isForced) {
      // Ensure a session exists; otherwise send back to /auth
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) navigate({ to: "/auth", replace: true });
      });
      return;
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [isForced, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return toast.error("Las contraseñas no coinciden.");
    if (password.length < 8) return toast.error("Mínimo 8 caracteres.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }
    try {
      await clearPasswordChangeFlag();
    } catch {
      // non-fatal
    }
    setBusy(false);
    toast.success("Contraseña actualizada.");
    navigate({ to: "/servicio", replace: true });
  }

  return (
    <PageShell
      eyebrow={isForced ? "Primer inicio de sesión" : "Recuperación"}
      title={isForced ? "Cambia tu contraseña temporal" : "Establece una nueva contraseña"}
      intro={
        isForced
          ? "Por seguridad debes reemplazar la contraseña temporal antes de continuar al Centro de Servicio."
          : "Elige una contraseña segura. Mínimo 8 caracteres."
      }
    >
      <div className="mx-auto max-w-md">
        {isForced && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900">
            <ShieldAlert className="mt-0.5 size-5 shrink-0" />
            <p>
              Esta es una contraseña temporal emitida por el Área. Debes cambiarla ahora para
              activar tu cuenta.
            </p>
          </div>
        )}
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
              <PasswordField
                label="Nueva contraseña"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <PasswordField
                label="Confirmar contraseña"
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
              />
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

function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      <input
        type="password"
        required
        minLength={8}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
      />
    </label>
  );
}
