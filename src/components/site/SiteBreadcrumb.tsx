import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Rutas que no muestran miga de pan (inicio, auth, portales con navegación propia). */
const EXCLUDED = ["/", "/auth", "/reset-password"];

/** Padre explícito para páginas de segundo nivel. */
const PARENTS: Record<string, { to: string; label: string }> = {
  "/busco-ayuda-para-mi": { to: "/necesito-ayuda", label: "Volver a Busco ayuda" },
  "/ayuda-familiar": { to: "/necesito-ayuda", label: "Volver a Busco ayuda" },
};

function resolveParent(pathname: string): { to: string; label: string } | null {
  if (EXCLUDED.includes(pathname)) return null;
  if (pathname.startsWith("/servicio") || pathname.startsWith("/miembros")) return null;

  const explicit = PARENTS[pathname];
  if (explicit) return explicit;

  // Rutas anidadas genéricas: /grupos/algo -> /grupos
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1) {
    const parent = `/${segments.slice(0, -1).join("/")}`;
    const label = segments[segments.length - 2]
      .replace(/-/g, " ")
      .replace(/^./, (c) => c.toUpperCase());
    return { to: parent, label: `Volver a ${label}` };
  }

  return { to: "/", label: "Volver al inicio" };
}

export function SiteBreadcrumb() {
  const router = useRouter();
  const parent = resolveParent(router.state.location.pathname);
  if (!parent) return null;

  return (
    <nav aria-label="Ruta de navegación" className="border-b border-brand/10 bg-soft/60">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <Link
          to={parent.to}
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-paper px-4 py-2 text-sm font-semibold text-brand shadow-sm transition-colors hover:bg-brand hover:text-paper"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {parent.label}
        </Link>
      </div>
    </nav>
  );
}
