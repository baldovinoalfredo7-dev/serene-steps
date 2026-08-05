import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/site/BackLink";
import { getPublication, visiblePublications } from "@/lib/literatura-data";
import { ArrowRight, BookOpen, Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/literatura/$slug")({
  loader: ({ params }) => {
    const publication = getPublication(params.slug);
    if (!publication) throw notFound();
    return { publication };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Publicación no disponible — AA Área 2 Metropolitana" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { publication } = loaderData;
    return {
      meta: [
        { title: `${publication.title} — Literatura de A.A.` },
        { name: "description", content: publication.summary },
        { property: "og:title", content: `${publication.title} — Literatura de A.A.` },
        { property: "og:description", content: publication.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PublicationNotFound,
  component: PublicationDetail,
});

function PublicationNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-brand">Publicación no disponible</h1>
      <p className="mt-4 text-ink/80">
        Esta publicación aún no está disponible en nuestra biblioteca.
      </p>
      <Link to="/literatura" className="btn-aa mt-8">
        Volver a la literatura <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function PublicationDetail() {
  const { publication } = Route.useLoaderData();
  const others = visiblePublications.filter((p) => p.slug !== publication.slug);

  return (
    <>
      <BackLink to="/literatura" label="Volver a la literatura" />

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-brand/10 bg-soft shadow-soft md:mx-0 md:max-w-none">
            {publication.cover ? (
              <img
                src={publication.cover}
                alt={`Portada de ${publication.title}`}
                width={800}
                height={1200}
                className="aspect-[2/3] h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-3 text-brand/60">
                <BookOpen className="size-10" strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-[0.2em]">Portada próximamente</span>
              </div>
            )}
          </div>

          <div>
            <span className="mb-4 block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brand">
              {publication.category}
            </span>
            <h1 className="font-serif text-3xl leading-[1.15] text-brand sm:text-4xl">
              {publication.title}
            </h1>
            <p className="mt-5 text-lg leading-[1.7] text-ink/85">{publication.summary}</p>

            <div className="mt-8 space-y-4">
              {publication.description.map((p) => (
                <p key={p} className="text-base leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 sm:grid-cols-2">
              <Detail label="Tipo de publicación" value={publication.category} />
              <Detail label="Propósito" value={publication.purpose} />
              {publication.pages ? (
                <Detail label="Número de páginas" value={`${publication.pages} páginas`} />
              ) : null}
              {publication.edition ? (
                <Detail label="Edición" value={publication.edition} />
              ) : null}
            </dl>

            {(publication.readUrl || publication.downloadUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {publication.readUrl && (
                  <a
                    href={publication.readUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-aa uppercase tracking-[0.1em]"
                  >
                    Leer la publicación <ExternalLink className="size-4" />
                  </a>
                )}
                {publication.downloadUrl && (
                  <a
                    href={publication.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-aa-outline uppercase tracking-[0.1em]"
                  >
                    Descargar <Download className="size-4" />
                  </a>
                )}
              </div>
            )}

            <p className="mt-8 text-sm leading-relaxed text-ink/60">
              La literatura de Alcohólicos Anónimos puede consultarse en los grupos del Área 2 o
              solicitarse a través del comité de literatura. Esta biblioteca es informativa: no se
              realizan ventas ni envíos.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-brand/5 bg-soft/40 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 font-serif text-2xl text-brand">Otras publicaciones</h2>
          <ul role="list" className="grid gap-4 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/literatura/$slug"
                  params={{ slug: p.slug }}
                  className="flex h-full items-center gap-4 rounded-2xl border border-brand/10 bg-paper p-4 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
                >
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={`Portada de ${p.title}`}
                      width={800}
                      height={1200}
                      loading="lazy"
                      className="h-20 w-14 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <span className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-soft text-brand/60">
                      <BookOpen className="size-5" strokeWidth={1.5} />
                    </span>
                  )}
                  <span className="font-serif text-base leading-snug text-brand">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-5">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink/80">{value}</dd>
    </div>
  );
}
