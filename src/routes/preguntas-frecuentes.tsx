import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Respuestas a las preguntas más comunes sobre Alcohólicos Anónimos: reuniones, anonimato, costos y primeros pasos.",
      },
      { property: "og:title", content: "Preguntas frecuentes — AA Área 2 Metropolitana" },
      {
        property: "og:description",
        content: "Aclaramos las dudas más frecuentes sobre AA.",
      },
      { property: "og:url", content: "/preguntas-frecuentes" },
    ],
    links: [{ rel: "canonical", href: "/preguntas-frecuentes" }],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "¿Necesito inscribirme para asistir a una reunión?",
    a: "No. Puedes llegar directamente a la dirección del grupo en el horario indicado. No hay papeleo ni requisitos previos.",
  },
  {
    q: "¿Tengo que hablar en la reunión?",
    a: "No. Puedes asistir únicamente a escuchar. Compartir es siempre voluntario.",
  },
  {
    q: "¿Cuánto cuesta asistir?",
    a: "Nada. AA se sostiene con contribuciones voluntarias de sus miembros. Asistir es gratuito.",
  },
  {
    q: "¿Se respeta mi anonimato?",
    a: "Sí. El anonimato es la base espiritual de AA. Lo que se comparte en la reunión permanece en la reunión.",
  },
  {
    q: "¿Alcohólicos Anónimos está afiliado a alguna religión?",
    a: "No. AA no está afiliada a ninguna secta, religión, partido político, organización o institución.",
  },
  {
    q: "¿Cómo puedo ayudar a un familiar o amigo con problemas con el alcohol?",
    a: "Puedes acercarte a cualquier grupo del Área 2 y hablar con un servidor de Información Pública, o escribirnos a través de la sección de Contacto.",
  },
  {
    q: "¿Cuánto dura una reunión?",
    a: "La mayoría de las reuniones duran entre una hora y hora y media.",
  },
  {
    q: "¿Puedo asistir aunque no esté seguro de tener un problema con el alcohol?",
    a: "Sí. El único requisito para ser miembro es el deseo de dejar de beber. Muchas personas asisten inicialmente para conocer y decidir.",
  },
];

function FaqPage() {
  return (
    <PageShell
      eyebrow="Resolvemos tus dudas"
      title="Preguntas frecuentes"
      intro="Reunimos las preguntas que más nos hacen quienes se acercan por primera vez a Alcohólicos Anónimos."
    >
      <div className="space-y-4">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-3xl bg-paper p-6 shadow-soft transition-shadow hover:shadow-lift md:p-8"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg italic text-brand md:text-xl">
              {f.q}
              <span className="mt-1 shrink-0 text-brand/80 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-pretty leading-relaxed text-ink/75">{f.a}</p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
