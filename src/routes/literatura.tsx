import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/literatura")({
  head: () => ({
    meta: [
      { title: "Literatura — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Literatura autorizada por la estructura de servicio de Alcohólicos Anónimos.",
      },
      { property: "og:title", content: "Literatura de AA" },
      {
        property: "og:description",
        content: "Materiales autorizados por la estructura de servicio de AA.",
      },
      { property: "og:url", content: "/literatura" },
    ],
    links: [{ rel: "canonical", href: "/literatura" }],
  }),
  component: Literatura,
});

function Literatura() {
  return (
    <PageShell
      eyebrow="Publicaciones"
      title="Literatura"
      intro="Publicamos aquí únicamente los materiales cuya difusión ha sido autorizada por la estructura de servicio correspondiente."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <article
            key={it.title}
            className="flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5"
          >
            <BookOpen className="mb-4 size-6 text-brand/80" />
            <h3 className="mb-2 font-serif text-xl text-brand">{it.title}</h3>
            <p className="text-sm text-ink/80">{it.desc}</p>
            <span className="mt-6 inline-flex w-fit rounded-full bg-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand/80">
              Próximamente
            </span>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-ink/55">
        Para solicitar o consultar publicaciones oficiales, comunícate con la Oficina de Servicios
        Generales o con el comité de literatura del Área 2.
      </p>
    </PageShell>
  );
}

const items = [
  {
    title: "Libro Alcohólicos Anónimos (Libro Azul)",
    desc: "El texto básico de la comunidad, donde se describe el programa de recuperación.",
  },
  {
    title: "Doce Pasos y Doce Tradiciones",
    desc: "Análisis de los pasos personales y las tradiciones que rigen a los grupos.",
  },
  {
    title: "Vivir Sobrio",
    desc: "Sugerencias prácticas para mantenerse sobrio en el día a día.",
  },
  {
    title: "Reflexiones Diarias",
    desc: "Una meditación breve para cada día del año.",
  },
];
