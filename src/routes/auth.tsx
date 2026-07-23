import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Lock, KeyRound, LogIn, Info } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { unlockMembers, checkMembersUnlocked } from "@/lib/members-gate.functions";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ya soy miembro — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Acceso al Portal para Miembros del Área 2 Metropolitana de Barranquilla.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MembersAccessPage,
});

function MembersAccessPage() {
  const navigate = useNavigate();
  const unlock = useServerFn(unlockMembers);
  const check = useServerFn(checkMembersUnlocked);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    check({})
      .then((r) => {
        if (r.unlocked) navigate({ to: "/miembros", replace: true });
      })
      .catch(() => {});
  }, [check, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await unlock({ data: { password } });
      if (!res.ok) {
        setBusy(false);
        setError(
          "La contraseña ingresada no es correcta. Inténtalo nuevamente o consulta con un servidor del Área 2 Metropolitana de Barranquilla.",
        );
        return;
      }
      navigate({ to: "/miembros", replace: true });
    } catch {
      setBusy(false);
      setError(
        "La contraseña ingresada no es correcta. Inténtalo nuevamente o consulta con un servidor del Área 2 Metropolitana de Barranquilla.",
      );
    }
  }

  return (
    <PageShell
      eyebrow="Portal para Miembros"
      title="Ya soy miembro"
      intro="Este espacio está destinado a los miembros de Alcohólicos Anónimos que participan en las actividades y servicios del Área 2 Metropolitana de Barranquilla."
    >
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-brand/10 bg-paper p-8 shadow-lift">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
              <Lock className="size-5" />
            </span>
            <h2 className="font-serif text-xl text-brand">Ingresa al portal</h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink/80">
                Contraseña
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand/60">
                  <KeyRound className="size-4" />
                </span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Ingresa la contraseña de acceso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-brand/15 bg-paper px-4 py-3 pl-10 text-sm text-ink outline-none transition-colors focus:border-brand"
                />
              </div>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 disabled:opacity-60"
            >
              <LogIn className="size-4" />
              {busy ? "Procesando…" : "Ingresar"}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-2xl border border-brand/10 bg-brand-soft/40 p-5 text-sm text-ink/85">
          <div className="mb-2 flex items-center gap-2 font-semibold text-brand">
            <Info className="size-4" /> ¿No conoces la contraseña?
          </div>
          <p>
            Si no conoces la contraseña, consulta con un servidor del Área 2
            Metropolitana de Barranquilla.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-ink/60">
          ¿Llegaste aquí por error? Vuelve al{" "}
          <Link to="/" className="text-brand underline-offset-4 hover:underline">
            portal público
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
