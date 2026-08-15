import { createFileRoute } from "@tanstack/react-router";
import { MemberPageHeader } from "@/components/miembros/SectionCard";

export const Route = createFileRoute("/miembros/lemas")({
  head: () => ({
    meta: [
      { title: "Nuestros lemas · Portal para Miembros" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LemasPage,
});

const lemas: { lema: string; sentido: string }[] = [
  {
    lema: "Solo por hoy",
    sentido:
      "Nos recuerda que la sobriedad se vive en el día presente, sin cargar con el pasado ni anticipar el futuro.",
  },
  {
    lema: "Lo primero es lo primero",
    sentido:
      "Nos invita a ordenar nuestras prioridades: sin sobriedad, lo demás no puede sostenerse.",
  },
  {
    lema: "Vive y deja vivir",
    sentido:
      "Nos ayuda a practicar la tolerancia y a respetar las diferencias dentro y fuera de la Comunidad.",
  },
  {
    lema: "Poco a poco se va lejos",
    sentido:
      "La recuperación es un proceso gradual; la constancia vale más que la prisa.",
  },
  {
    lema: "Deja que las cosas sucedan",
    sentido:
      "Practicamos la aceptación y soltamos el control de aquello que no depende de nosotros.",
  },
  {
    lema: "Piensa, piensa, piensa",
    sentido:
      "Antes de actuar impulsivamente, nos detenemos y reflexionamos.",
  },
];

function LemasPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <MemberPageHeader
        title="Nuestros lemas"
        intro="Los lemas de Alcohólicos Anónimos son frases sencillas que resumen actitudes útiles para la vida diaria. Muchos miembros los utilizan como recordatorios prácticos del programa."
      />
      <section className="grid gap-4 sm:grid-cols-2">
        {lemas.map((l) => (
          <article key={l.lema} className="card-aa">
            <h2 className="font-serif text-lg italic text-brand">“{l.lema}”</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{l.sentido}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
