import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo-aa.png.asset.json";


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
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:h-28">
        <Link to="/" className="flex items-center gap-4 sm:gap-5" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Alcohólicos Anónimos — Área 2 Metropolitana, Barranquilla"
            width={72}
            height={72}
            className="h-16 w-auto sm:h-[4.5rem]"
          />
          <div className="leading-tight">
            <span className="block font-sans text-sm font-bold uppercase tracking-[0.18em] text-brand sm:text-base">
              Alcohólicos Anónimos
            </span>
            <span className="block text-xs font-medium tracking-wide text-ink/60 sm:text-sm">
              Área 2 Metropolitana – Barranquilla
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
