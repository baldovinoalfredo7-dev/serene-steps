import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <>
      <section className="border-b border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {eyebrow && (
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/60">
              {eyebrow}
            </span>
          )}
          <h1 className="text-balance font-serif text-4xl italic leading-tight text-brand md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/70">{intro}</p>
          )}
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">{children}</div>
      </section>
    </>
  );
}
