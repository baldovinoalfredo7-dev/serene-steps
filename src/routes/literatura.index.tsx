import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PublicationCard } from "@/components/site/PublicationCard";
import { visiblePublications } from "@/lib/literatura-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/literatura/")({
  head: () => ({
    meta: [
      { title: "Conoce nuestra literatura — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "La literatura de Alcohólicos Anónimos reúne la experiencia, fortaleza y esperanza de quienes encontraron una nueva manera de vivir sin alcohol.",
      },
      { property: "og:title", content: "Conoce nuestra literatura de A.A." },
      {
        property: "og:description",
        content:
          "Libros y folletos aprobados por Alcohólicos Anónimos: el Libro Grande, Doce Pasos y Doce Tradiciones, Viviendo Sobrio y folletos gratuitos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://hope-finds-you-here.lovable.app/literatura" },
    ],
    links: [{ rel: "canonical", href: "https://hope-finds-you-here.lovable.app/literatura" }],
  }),
  component: Literatura,
});

function Literatura() {
  return (
    <PageShell
      eyebrow="Nuestra literatura"
      title="Conoce nuestra literatura"
      intro="La literatura de Alcohólicos Anónimos reúne la experiencia, fortaleza y esperanza de miles de personas que encontraron una nueva manera de vivir sin alcohol."
    >
      <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePublications.map((item) => (
          <li key={item.slug} className="h-full">
            <PublicationCard item={item} />
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl border border-brand/10 bg-soft/60 p-7 md:p-8">
        <h2 className="font-serif text-xl text-brand">
          ¿Es tu primer acercamiento a Alcohólicos Anónimos?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/80">
          Si deseas conocer cómo funciona nuestro programa de recuperación, te recomendamos comenzar
          por el Libro Grande, la obra donde nació Alcohólicos Anónimos. También encontrarás
          folletos gratuitos con respuestas a las preguntas más frecuentes.
        </p>
        <Link
          to="/literatura/$slug"
          params={{ slug: "libro-grande" }}
          className="btn-aa mt-6 w-fit uppercase tracking-[0.1em]"
        >
          Conocer el Libro Grande <ArrowRight className="size-4" />
        </Link>
      </div>

      <figure className="mx-auto mt-16 max-w-2xl border-t border-brand/10 pt-8 text-center">
        <blockquote className="font-serif text-lg italic leading-relaxed text-brand/90 sm:text-xl">
          Cada libro, folleto y publicación nace de la experiencia compartida de quienes
          encontraron una nueva manera de vivir. Quizá en sus páginas encuentres una historia que
          también hable de ti.
        </blockquote>
      </figure>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink/55">
        Para solicitar o consultar publicaciones oficiales, comunícate con la Oficina de Servicios
        Generales o con el comité de literatura del Área 2.
      </p>
    </PageShell>
  );
}
