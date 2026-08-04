import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface SectionCardProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
}

/**
 * Tarjeta reutilizable para las subsecciones del Portal para Miembros.
 * Mantiene la misma identidad visual que las tarjetas del dashboard
 * (`/miembros`) y sirve para preparar contenido futuro sin cambiar la
 * estructura de las páginas.
 */
export function SectionCard({
  icon: Icon,
  emoji,
  title,
  description,
  action,
  children,
}: SectionCardProps) {
  return (
    <article className="card-aa flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        {(Icon || emoji) && (
          <span
            aria-hidden
            className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"
          >
            {Icon ? <Icon className="size-5" /> : <span className="text-lg">{emoji}</span>}
          </span>
        )}
        <h2 className="font-serif text-lg text-brand">
          {emoji && Icon && (
            <span aria-hidden className="mr-1">
              {emoji}
            </span>
          )}
          {title}
        </h2>
      </div>
      {description && (
        <p className="flex-1 text-sm leading-relaxed text-ink/75">{description}</p>
      )}
      {children}
      {action && <div className="mt-6 self-start">{action}</div>}
    </article>
  );
}

export function SectionGrid({ children }: { children: ReactNode }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</section>
  );
}

export function MemberPageHeader({
  eyebrow = "Portal para Miembros",
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-3xl">
      <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
        {eyebrow}
      </span>
      <h1 className="font-serif text-3xl italic text-brand sm:text-4xl">{title}</h1>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-ink/80">{intro}</p>
      )}
    </header>
  );
}

export function ComingSoonNote({
  children = "Contenido en preparación. Muy pronto encontrarás aquí la información completa.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-brand/60">
      {children}
    </p>
  );
}
