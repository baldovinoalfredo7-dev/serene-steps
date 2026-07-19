import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/que-es-aa")({
  head: () => ({
    meta: [
      { title: "¿Qué es Alcohólicos Anónimos? — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Alcohólicos Anónimos es una comunidad de hombres y mujeres que comparten su experiencia, fortaleza y esperanza para resolver su problema común.",
      },
      { property: "og:title", content: "¿Qué es Alcohólicos Anónimos?" },
      {
        property: "og:description",
        content: "Conoce qué es AA, cómo funciona y por qué el anonimato es fundamental.",
      },
      { property: "og:url", content: "/que-es-aa" },
    ],
    links: [{ rel: "canonical", href: "/que-es-aa" }],
  }),
  component: QueEsAA,
});

function QueEsAA() {
  return (
    <PageShell
      eyebrow="Sobre AA"
      title="¿Qué es Alcohólicos Anónimos?"
      intro="Una comunidad de hombres y mujeres que comparten su mutua experiencia, fortaleza y esperanza para resolver su problema común y ayudar a otros a recuperarse del alcoholismo."
    >
      <div className="prose-lg mx-auto max-w-none space-y-8 text-ink/75">
        <p className="text-lg leading-relaxed">
          Alcohólicos Anónimos no es una organización religiosa ni política. No está afiliada con
          ninguna secta, denominación o institución. No hay cuotas de ingreso. El único requisito
          para ser miembro es el deseo de dejar de beber.
        </p>

        <div className="my-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl bg-soft/60 p-6">
              <span className="mb-3 block font-serif text-3xl italic text-brand/40">
                {p.number}
              </span>
              <h3 className="mb-2 font-serif text-xl text-brand">{p.title}</h3>
              <p className="text-sm text-ink/65">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="!mt-14 font-serif text-2xl italic text-brand">Nuestra experiencia</h2>
        <p>
          Cada miembro de AA ha vivido en carne propia lo que significa perder el control frente al
          alcohol. Compartir esa experiencia — sin juicios, sin diagnóstico y sin consejos no
          solicitados — es lo que constituye el corazón de una reunión.
        </p>

        <h2 className="!mt-14 font-serif text-2xl italic text-brand">Anonimato</h2>
        <p>
          El anonimato es la base espiritual de todas nuestras tradiciones. Nadie usará tu nombre
          fuera del grupo, nadie tomará fotografías, y lo que se comparte dentro de una reunión se
          queda ahí. Puedes venir tantas veces como quieras sin dar tu apellido.
        </p>

        <div className="!mt-16 rounded-2xl border border-brand/10 bg-paper p-8 text-center">
          <h3 className="mb-4 font-serif text-2xl italic text-brand">
            ¿Listo para dar el primer paso?
          </h3>
          <Link
            to="/grupos"
            className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-brand/90"
          >
            Encuentra un grupo <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

const pillars = [
  {
    number: "01",
    title: "Experiencia compartida",
    body: "Nos apoyamos escuchando y contando lo que vivimos, sin dar consejos ni juzgar.",
  },
  {
    number: "02",
    title: "Sin cuotas",
    body: "AA se sostiene con las contribuciones voluntarias de sus propios miembros.",
  },
  {
    number: "03",
    title: "Anonimato",
    body: "El anonimato es el fundamento espiritual que garantiza tu privacidad.",
  },
];
