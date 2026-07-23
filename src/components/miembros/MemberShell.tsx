import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Users,
  FileDown,
  ScrollText,
  HandHeart,
  BookOpenText,
  Building2,
  CalendarDays,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import logoAsset from "@/assets/logo-aa.png.asset.json";
import { lockMembers } from "@/lib/members-gate.functions";

type Item = { to: string; label: string; icon: LucideIcon };

const items: Item[] = [
  { to: "/miembros", label: "Inicio del portal", icon: Home },
  { to: "/miembros/grupos", label: "Nuestros grupos", icon: Users },
  { to: "/miembros/eventos", label: "Calendario de eventos", icon: CalendarDays },
  { to: "/miembros/documentos", label: "Documentos para descargar", icon: FileDown },
  { to: "/miembros/area", label: "El Área y sus servidores", icon: Building2 },
  { to: "/miembros/principios", label: "Los 36 Principios", icon: ScrollText },
  { to: "/miembros/responsabilidad", label: "Declaración de Responsabilidad", icon: HandHeart },
  { to: "/miembros/oraciones", label: "Nuestras oraciones", icon: BookOpenText },
  { to: "/miembros/aprendizaje", label: "Centro de aprendizaje", icon: GraduationCap },
];

function isActive(pathname: string, to: string): boolean {
  if (to === "/miembros") return pathname === "/miembros" || pathname === "/miembros/";
  return pathname === to || pathname.startsWith(to + "/");
}

export function MemberShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const lock = useServerFn(lockMembers);

  async function handleSignOut() {
    try {
      await lock({});
    } catch {
      // non-fatal
    }
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-dvh bg-soft/40">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-brand/10 bg-paper lg:flex">
        <SidebarInner pathname={pathname} onSignOut={handleSignOut} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-brand/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-paper shadow-xl">
            <div className="flex items-center justify-between border-b border-brand/10 px-4 py-3">
              <span className="font-serif text-lg italic text-brand">Área de miembros</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-ink/70 hover:bg-soft"
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>
            <div onClick={() => setMobileOpen(false)} className="flex flex-1 flex-col">
              <SidebarInner pathname={pathname} onSignOut={handleSignOut} />
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-brand/10 bg-paper/90 px-4 backdrop-blur-md lg:h-16 lg:px-8">
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-soft lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <span className="font-serif text-base italic text-brand lg:hidden">
            Área de miembros
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-medium text-brand hover:bg-soft sm:inline-flex"
            >
              <ExternalLink className="size-3.5" /> Ver portal público
            </Link>
          </div>
        </header>
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

function SidebarInner({
  pathname,
  onSignOut,
}: {
  pathname: string;
  onSignOut: () => void;
}) {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-brand/10 px-5 py-5">
        <img src={logoAsset.url} alt="AA" className="h-11 w-auto" />
        <div className="min-w-0 leading-tight">
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand">
            Área de miembros
          </span>
          <span className="block truncate text-[0.7rem] text-ink/70">
            Área 2 Metropolitana
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = isActive(pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
                (active
                  ? "bg-brand text-paper shadow-sm"
                  : "text-ink/80 hover:bg-soft hover:text-brand")
              }
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-brand/10 p-3">
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-soft hover:text-brand"
        >
          <LogOut className="size-4" /> Cerrar sesión
        </button>
      </div>
    </>
  );
}
