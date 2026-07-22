import type { ReactNode } from "react";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      {eyebrow && (
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 font-serif text-3xl leading-tight text-brand sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-ink/85">
          {description}
        </p>
      )}
      <div className="rounded-2xl border border-dashed border-brand/20 bg-paper p-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand/70">
          Sección en preparación
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
          El contenido de este módulo se irá publicando próximamente.
        </p>
      </div>
      {children}
    </div>
  );
}
