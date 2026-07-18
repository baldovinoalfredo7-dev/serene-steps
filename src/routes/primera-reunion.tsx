import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/primera-reunion")({
  head: () => ({
    meta: [
      { title: "Tu primera reunión — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Qué puedes esperar de tu primera reunión de Alcohólicos Anónimos: sin inscripción, sin cuotas, con anonimato garantizado.",
      },
      { property: "og:title", content: "Tu primera reunión de AA" },
      {
        property: "og:description",
        content: "Guía sencilla para asistir por primera vez a una reunión de AA.",
      },
    ],
  }),
  component: PrimeraReunion,
});

function PrimeraReunion() {
  return (
    <PageShell
      eyebrow="Para tu primera vez"
      title="¿Qué puedes esperar de tu primera reunión?"
      intro="Es normal sentir nervios. Queremos que sepas exactamente qué encontrarás al cruzar la puerta."
    >
      <div className="space-y-10">
        {items.map((item, i) => (
          <div key={item.title} className="flex gap-6">
            <span className="font-serif text-4xl text-brand/25">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="mb-2 font-serif text-xl text-brand">{item.title}</h4>
              <p className="max-w-[60ch] text-pretty text-ink/70">{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-brand p-8 text-paper md:p-10">
        <h3 className="mb-3 font-serif text-2xl italic">Recuerda</h3>
        <p className="mb-6 text-paper/85">
          No estás solo. Todo el que hoy está sobrio en AA cruzó esa misma puerta por primera vez
          con las mismas dudas que tú tienes ahora.
        </p>
        <Link
          to="/grupos"
          className="inline-flex items-center gap-2 rounded-sm bg-paper px-5 py-3 text-sm font-semibold uppercase tracking-wider text-brand transition-colors hover:bg-paper/90"
        >
          Encuentra un grupo <ArrowRight className="size-4" />
        </Link>
      </div>
    </PageShell>
  );
}

const items = [
  {
    title: "No necesitas inscribirte",
    body: "Simplemente llega a la dirección indicada. No hay papeleo, ni requisitos previos, ni cuotas de admisión.",
  },
  {
    title: "No hay cuotas para asistir",
    body: "AA se autosostiene con las contribuciones voluntarias de sus propios miembros. Nadie te pedirá dinero.",
  },
  {
    title: "Puedes solo escuchar",
    body: "No estás obligado a hablar ni a presentarte. Muchos miembros asisten su primera reunión únicamente para escuchar.",
  },
  {
    title: "El anonimato es fundamental",
    body: "Nadie tomará fotos, nadie usará tu nombre completo. Lo que se comparte en la reunión, se queda en la reunión.",
  },
  {
    title: "Encontrarás personas como tú",
    body: "Hombres y mujeres que han vivido experiencias similares y que hoy comparten con serenidad su camino.",
  },
  {
    title: "No es un tratamiento médico ni religioso",
    body: "AA no está afiliada con ninguna institución, iglesia ni corriente política. Es una comunidad libre y voluntaria.",
  },
];
