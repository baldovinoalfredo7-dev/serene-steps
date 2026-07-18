import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/testimonios")({
  head: () => ({
    meta: [
      { title: "Testimonios — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Historias breves y anónimas de esperanza compartidas por miembros de AA.",
      },
      { property: "og:title", content: "Testimonios de esperanza" },
      { property: "og:description", content: "Historias anónimas de recuperación en AA." },
    ],
  }),
  component: Testimonios,
});

function Testimonios() {
  return (
    <PageShell
      eyebrow="Voces anónimas"
      title="Testimonios de esperanza"
      intro="Historias breves compartidas por miembros de AA respetando siempre el anonimato."
    >
      <div className="space-y-14">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className="border-l-2 border-brand/20 pl-6 md:pl-10"
          >
            <p className="mb-4 text-pretty font-serif text-2xl italic leading-tight text-brand md:text-3xl">
              "{t.body}"
            </p>
            <cite className="text-sm font-medium not-italic text-ink/60">— {t.author}</cite>
          </blockquote>
        ))}
      </div>
    </PageShell>
  );
}

const testimonials = [
  {
    body: "Llegué con miedo y mucha vergüenza, pensando que sería juzgado. Encontré un lugar donde por primera vez en años me sentí comprendido sin mediar palabras.",
    author: "Miembro de AA, 4 años de sobriedad",
  },
  {
    body: "No sabía que existía una solución tan sencilla. No se trata de religión, se trata de comunidad y de entender que solo por hoy podemos estar bien.",
    author: "Miembro de AA, Grupo San Ángel",
  },
  {
    body: "Pensaba que era el único al que le pasaba esto. La primera vez que escuché a otra persona contar mi propia historia, supe que había llegado a casa.",
    author: "Miembro de AA, 2 años de sobriedad",
  },
  {
    body: "Mi familia recuperó a la persona que un día conocieron. Yo recuperé algo más importante: recuperé la posibilidad de mirarme al espejo.",
    author: "Miembro de AA, 7 años de sobriedad",
  },
  {
    body: "Aquí no me diagnosticaron ni me dieron consejos. Simplemente me escucharon. Y me acompañaron. Eso fue suficiente para empezar.",
    author: "Miembro de AA, Grupo Amanecer",
  },
];
