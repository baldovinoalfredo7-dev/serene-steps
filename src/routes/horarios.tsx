import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { groupsQueryOptions } from "@/lib/groups-queries";

export const Route = createFileRoute("/horarios")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
  head: () => ({
    meta: [
      { title: "Horarios de reuniones — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Consulta los horarios semanales de las reuniones de Alcohólicos Anónimos del Área 2 Metropolitana de Barranquilla.",
      },
      { property: "og:title", content: "Horarios de reuniones — AA Área 2 Metropolitana" },
      {
        property: "og:description",
        content: "Días y horas de reunión de los grupos del Área 2 Metropolitana.",
      },
      { property: "og:url", content: "/horarios" },
    ],
    links: [{ rel: "canonical", href: "/horarios" }],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar los horarios: {error.message}
    </div>
  ),
  component: HorariosPage,
});

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function HorariosPage() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return (
    <PageShell
      eyebrow="Área 2 Metropolitana"
      title="Horarios de reuniones"
      intro="Encuentra el día y la hora que mejor se ajusten a ti. Todas las reuniones son abiertas al público que busca ayuda."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <article
            key={g.slug}
            className="flex flex-col rounded-3xl bg-paper p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
              {g.municipality}
            </span>
            <h2 className="mb-4 font-serif text-2xl italic text-brand">{g.name}</h2>
            <ul className="mb-6 space-y-2 text-sm text-ink/75">
              {g.meetings.map((m, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Clock className="size-4 text-brand/80" strokeWidth={1.8} />
                  <span>
                    {dayNames[m.weekday]} · {m.start}–{m.end} h
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/grupos/$slug"
              params={{ slug: g.slug }}
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand"
            >
              Ver grupo <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
