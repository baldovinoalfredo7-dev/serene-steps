import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/grupos", label: "Encuentra un Grupo" },
  { to: "/que-es-aa", label: "¿Qué es AA?" },
  { to: "/tengo-un-problema", label: "¿Tienes un problema?" },
  { to: "/literatura", label: "Literatura" },
  { to: "/testimonios", label: "Testimonios" },
  { to: "/eventos", label: "Eventos" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand/5 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="grid size-10 place-items-center rounded-full bg-brand">
            <div className="size-4 rotate-45 border-2 border-paper" aria-hidden />
          </div>
          <div className="leading-tight">
            <span className="block font-serif text-lg text-brand">Área 2 Metropolitana</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/50">
              Alcohólicos Anónimos
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 xl:flex">
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
            className="rounded-sm border border-brand/20 px-3 py-1.5 text-xs uppercase tracking-widest text-brand transition-colors hover:bg-brand hover:text-paper"
          >
            Área de servicio
          </Link>
        </nav>

        <button
          type="button"
          className="text-ink/60 xl:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand/5 bg-paper xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-base">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-brand font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-2 py-2 text-ink/80 transition-colors hover:bg-soft hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm border border-brand/20 px-3 py-2 text-center text-sm uppercase tracking-widest text-brand"
            >
              Área de servicio
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
