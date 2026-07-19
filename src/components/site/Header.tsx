import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  HelpCircle,
  Home,
  Info,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Clock,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import logoAsset from "@/assets/logo-aa.png.asset.json";
import { useAuth } from "@/hooks/use-auth";

type NavLink = { to: string; label: string; icon: LucideIcon };

const navLinks: readonly NavLink[] = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/que-es-aa", label: "¿Qué es Alcohólicos Anónimos?", icon: Info },
  { to: "/grupos", label: "Encuentra un grupo", icon: MapPin },
  { to: "/horarios", label: "Horarios de reuniones", icon: Clock },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes", icon: HelpCircle },
  { to: "/eventos", label: "Noticias y eventos", icon: CalendarDays },
  { to: "/contacto", label: "Contacto", icon: Mail },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const memberHref = user ? "/perfil" : "/auth";
  const memberLabel = user ? "Mi cuenta" : "Acceso para miembros";
  const MemberIcon = user ? UserRound : LogIn;

  return (
    <header className="sticky top-0 z-40 border-b border-brand/5 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-24 sm:px-6 sm:gap-4 xl:h-28">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 sm:gap-4 xl:gap-5"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoAsset.url}
            alt="Alcohólicos Anónimos — Área 2 Metropolitana, Barranquilla"
            width={72}
            height={72}
            className="h-12 w-auto shrink-0 sm:h-16 xl:h-[4.5rem]"
          />
          <div className="min-w-0 leading-tight">
            <span className="block truncate font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand sm:text-sm sm:tracking-[0.18em] xl:text-base">
              Alcohólicos Anónimos
            </span>
            <span className="block truncate text-[0.68rem] font-medium tracking-wide text-ink/80 sm:text-xs xl:text-sm">
              Área 2 Metropolitana – Barranquilla
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-brand" }}
              activeOptions={{ exact: l.to === "/" }}
              className="transition-colors hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
          >
            <LogIn className="size-3.5" /> Acceso para miembros
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center rounded-full text-ink/70 transition-colors hover:bg-soft hover:text-brand xl:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand/10 bg-paper shadow-lift xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-4 text-base sm:px-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-soft text-brand font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
                className="flex items-center gap-4 rounded-2xl px-4 py-3.5 text-ink/80 transition-colors hover:bg-soft hover:text-brand"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <l.icon className="size-4" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 truncate">{l.label}</span>
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-brand-soft"
            >
              <LogIn className="size-4" /> Acceso para miembros
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

