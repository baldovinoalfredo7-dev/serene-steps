import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";
import caribeMap from "@/assets/caribe-map.jpg";

export const Route = createFileRoute("/caribe")({
  head: () => ({
    meta: [
      { title: "Presencia en el Caribe colombiano — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Alcohólicos Anónimos en la Región A – Territorio Norte: áreas que conforman la comunidad de AA en la costa Caribe de Colombia.",
      },
      { property: "og:title", content: "Presencia en el Caribe colombiano" },
      {
        property: "og:description",
        content:
          "Áreas que conforman la Región A – Territorio Norte de Alcohólicos Anónimos en Colombia.",
      },
      { property: "og:url", content: "/caribe" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/caribe" }],
  }),
  component: CaribePage,
});

const areas = [
  "A.1 Maicao",
  "A.2 Barranquilla Área Metropolitana",
  "A.3 Barranquilla",
  "A.4 Cartagena",
  "A.5 Magangué",
  "A.6 Montería",
  "A.7 Aguachica",
  "A.8 Santa Marta",
  "A.9 Sincelejo",
  "A.10 Valledupar",
];

function CaribePage() {
  return (
    <PageShell
      eyebrow="Presencia en el Caribe"
      title="Alcohólicos Anónimos en la Región A – Territorio Norte"
      intro="El Área 2 Metropolitana de Barranquilla hace parte de la Región A – Territorio Norte de Alcohólicos Anónimos en Colombia. Si buscas información sobre otras áreas de esta región, aquí encontrarás una orientación general."
    >
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <div className="overflow-hidden rounded-2xl bg-soft/60 ring-1 ring-brand/10">
          <img
            src={caribeMap}
            alt="Mapa ilustrado del Caribe colombiano"
            width={1600}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="rounded-2xl bg-paper p-8 ring-1 ring-black/5 sm:p-10">
          <h2 className="font-serif text-xl leading-tight text-brand sm:text-2xl">
            Áreas de la Región A – Territorio Norte
          </h2>
          <ul role="list" className="mt-6 divide-y divide-brand/10">
            {areas.map((item) => (
              <li key={item} className="py-3 text-base text-ink/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="mx-auto mt-16 max-w-3xl rounded-3xl bg-soft/60 p-8 text-center ring-1 ring-brand/10 sm:p-10">
        <h2 className="font-serif text-2xl italic leading-tight text-brand sm:text-3xl">
          ¿No encuentras la información que buscas?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink/80">
          Si necesitas orientación para localizar un grupo de Alcohólicos Anónimos dentro
          de la Región A – Territorio Norte, estaremos disponibles para ayudarte.
        </p>
        <div className="mt-6">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
          >
            Solicitar información <ArrowRight className="size-4" />
          </Link>
        </div>
      </aside>

      <p className="mx-auto mt-12 max-w-2xl text-pretty text-center text-base leading-relaxed text-ink/80">
        Dondequiera que estés, puede haber un grupo de Alcohólicos Anónimos cerca de ti.
        Si necesitas ayuda para encontrarlo, con gusto te orientaremos.
      </p>
    </PageShell>
  );
}
