import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  BookOpen,
  FileText,
  UserRound,
  UsersRound,
  LogOut,
  Menu,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import logoAsset from "@/assets/logo-aa.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type Item = {
  to: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  exact?: boolean;
};

const items: Item[] = [
  { to: "/servicio", label: "Inicio", icon: LayoutDashboard, exact: true },
  { to: "/servicio/grupos", label: "Grupos", icon: Users },
  { to: "/servicio/reuniones", label: "Reuniones", icon: Clock },
  { to: "/servicio/eventos", label: "Eventos", icon: CalendarDays },
  { to: "/servicio/usuarios", label: "Usuarios", icon: UsersRound },
  { to: "/servicio/literatura", label: "Literatura", icon: BookOpen, disabled: true },
  { to: "/servicio/documentos", label: "Documentos", icon: FileText, disabled: true },
];

function isActive(pathname: string, item: Item): boolean {
  if (item.exact) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(item.to + "/");
}

export function ServiceShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-dvh bg-soft/40">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-brand/10 bg-paper lg:flex">
        <SidebarInner pathname={pathname} onSignOut={handleSignOut} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-brand/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-paper shadow-xl">
            <div className="flex items-center justify-between border-b border-brand/10 px-4 py-3">
              <span className="font-serif text-lg italic text-brand">Centro de servicio</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-ink/70 hover:bg-soft"
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>
            <div onClick={() => setMobileOpen(false)}>
              <SidebarInner pathname={pathname} onSignOut={handleSignOut} />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
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
            Centro de servicio
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-medium text-brand hover:bg-soft sm:inline-flex"
            >
              <ExternalLink className="size-3.5" /> Ver portal público
            </Link>
            <Link
              to="/servicio/perfil"
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-medium text-brand hover:bg-soft"
            >
              <UserRound className="size-3.5" /> Mi perfil
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
            Centro de servicio
          </span>
          <span className="block truncate text-[0.7rem] text-ink/70">
            Área 2 Metropolitana
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = isActive(pathname, item);
          if (item.disabled) {
            return (
              <div
                key={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink/40"
                title="Próximamente"
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
                <span className="ml-auto rounded-full bg-soft px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-ink/50">
                  Pronto
                </span>
              </div>
            );
          }
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
