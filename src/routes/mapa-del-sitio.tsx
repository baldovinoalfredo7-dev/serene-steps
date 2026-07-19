import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/site/PageShell";
import { groupsQueryOptions } from "@/lib/groups-queries";

export const Route = createFileRoute("/mapa-del-sitio")({
  loader: ({ context }) => context.queryClient.ensureQueryData(groupsQueryOptions()),
  head: () => ({
    meta: [
      { title: "Mapa del sitio — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Índice completo de secciones y grupos del portal de AA Área 2 Metropolitana.",
      },
      { property: "og:title", content: "Mapa del sitio — AA Área 2" },
      {
        property: "og:description",
        content: "Encuentra rápidamente cualquier sección del portal.",
      },
      { property: "og:url", content: "/mapa-del-sitio" },
    ],
    links: [{ rel: "canonical", href: "/mapa-del-sitio" }],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-10 text-center text-ink/80">
      No pudimos cargar el mapa del sitio: {error.message}
    </div>
  ),
  component: Mapa,
});

function Mapa() {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions());
  return (
    <PageShell
      eyebrow="Índice"
      title="Mapa del sitio"
      intro="Todas las secciones del portal, en un solo lugar."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <Column title="Información">
          <Item to="/">Inicio</Item>
          <Item to="/que-es-aa">¿Qué es AA?</Item>
          <Item to="/tengo-un-problema">¿Crees tener un problema?</Item>
          <Item to="/primera-reunion">Tu primera reunión</Item>
          <Item to="/testimonios">Testimonios</Item>
          <Item to="/literatura">Literatura</Item>
          <Item to="/eventos">Eventos</Item>
        </Column>
        <Column title="Ayuda y contacto">
          <Item to="/grupos">Encuentra un grupo</Item>
          <Item to="/necesito-ayuda">Necesito ayuda ahora</Item>
          <Item to="/contacto">Contacto</Item>
          <Item to="/auth">Área de servicio</Item>
          <Item to="/privacidad">Política de privacidad</Item>
        </Column>
        <Column title="Grupos del Área 2">
          {groups.map((g) => (
            <li key={g.slug}>
              <Link
                to="/grupos/$slug"
                params={{ slug: g.slug }}
                className="text-ink/85 hover:text-brand"
              >
                {g.name} — {g.municipality}
              </Link>
            </li>
          ))}
        </Column>
      </div>
    </PageShell>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand">{title}</h2>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function Item({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-ink/85 hover:text-brand">
        {children}
      </Link>
    </li>
  );
}
