import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, Mail, LogIn, KeyRound, Info, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { getMustChangePassword } from "@/lib/members.functions";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acceso para miembros — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Espacio privado para los miembros de Alcohólicos Anónimos con credenciales de acceso.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Tab = "login" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/servicio", replace: true });
    });
  }, [navigate]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }
    // Check if user must change temporary password before entering the service center
    try {
      const { must } = await getMustChangePassword();
      setBusy(false);
      if (must) {
        toast.info("Debes cambiar tu contraseña temporal antes de continuar.");
        navigate({ to: "/reset-password", search: { force: 1 }, replace: true });
        return;
      }
    } catch {
      setBusy(false);
    }
    toast.success("Sesión iniciada.");
    navigate({ to: "/servicio", replace: true });
  }

  async function onForgot(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Si el correo existe, te enviamos instrucciones.");
    setTab("login");
  }

  return (
    <PageShell
      eyebrow="Área de miembros"
      title="Acceso para miembros"
      intro="Espacio privado para los miembros de Alcohólicos Anónimos. Si ya haces parte de nuestra comunidad y recibiste tus credenciales de acceso, ingresa para acceder a los servicios disponibles para los miembros."
    >
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-brand/10 bg-paper p-8 shadow-lift">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
              <Lock className="size-5" />
            </span>
            <h2 className="font-serif text-xl text-brand">
              {tab === "login" ? "Iniciar sesión" : "Recuperar contraseña"}
            </h2>
          </div>

          {tab === "login" && (
            <form onSubmit={onLogin} className="space-y-4">
              <Field
                label="Correo electrónico"
                type="email"
                icon={<Mail className="size-4" />}
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              <Field
                label="Contraseña"
                type="password"
                icon={<KeyRound className="size-4" />}
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
              />
              <Submit busy={busy} icon={<LogIn className="size-4" />}>
                Entrar
              </Submit>
            </form>
          )}

          {tab === "forgot" && (
            <form onSubmit={onForgot} className="space-y-4">
              <Field
                label="Correo electrónico"
                type="email"
                icon={<Mail className="size-4" />}
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              <Submit busy={busy} icon={<KeyRound className="size-4" />}>
                Enviar instrucciones
              </Submit>
              <button
                type="button"
                onClick={() => setTab("login")}
                className="mt-1 inline-flex items-center gap-1 text-xs text-ink/70 hover:text-brand"
              >
                <ArrowLeft className="size-3.5" /> Volver a iniciar sesión
              </button>
            </form>
          )}

          {tab === "login" && (
            <button
              type="button"
              className="mt-6 block w-full border-t border-brand/10 pt-6 text-center text-sm text-ink/70 hover:text-brand"
              onClick={() => setTab("forgot")}
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-brand/10 bg-brand-soft/40 p-5 text-sm text-ink/85">
          <div className="mb-2 flex items-center gap-2 font-semibold text-brand">
            <Info className="size-4" /> ¿Cómo obtengo una cuenta?
          </div>
          <p>
            Las credenciales son entregadas por el <strong>Área 2 Metropolitana</strong> o por el
            servidor responsable de tu grupo. No existe registro público. Si necesitas acceso,
            comunícate con el Comité de Información Pública o con tu representante de grupo.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-ink/60">
          ¿No eres servidor? Vuelve al{" "}
          <Link to="/" className="text-brand underline-offset-4 hover:underline">
            portal público
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  icon,
  autoComplete,
  minLength,
  hint,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  autoComplete?: string;
  minLength?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand/60">
            {icon}
          </span>
        )}
        <input
          type={type}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand ${icon ? "pl-10" : ""}`}
        />
      </div>
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  );
}

function Submit({
  busy,
  icon,
  children,
}: {
  busy: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 disabled:opacity-60"
    >
      {icon}
      {busy ? "Procesando…" : children}
    </button>
  );
}
