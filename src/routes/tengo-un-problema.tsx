import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tengo-un-problema")({
  head: () => ({
    meta: [
      { title: "¿Crees tener un problema con el alcohol? — AA Área 2" },
      {
        name: "description",
        content:
          "Preguntas frecuentes que pueden ayudarte a reflexionar sobre tu relación con el alcohol.",
      },
      { property: "og:title", content: "¿Crees tener un problema con el alcohol?" },
      {
        property: "og:description",
        content: "Doce preguntas para ayudarte a reflexionar. Solo tú puedes responderlas.",
      },
      { property: "og:url", content: "/tengo-un-problema" },
    ],
    links: [{ rel: "canonical", href: "/tengo-un-problema" }],
  }),
  component: TengoProblema,
});

function TengoProblema() {
  return (
    <PageShell
      eyebrow="Reflexión personal"
      title="¿Crees tener un problema con el alcohol?"
      intro="Solo tú puedes responder. Estas doce preguntas son las que muchos miembros de AA se hicieron antes de dar el primer paso."
    >
      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-6 rounded-2xl bg-paper p-6 ring-1 ring-black/5">
            <span className="font-serif text-2xl italic text-brand/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-1 text-pretty text-ink/80">{q}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl bg-soft/60 p-8 text-center">
        <p className="mb-6 max-w-2xl text-pretty text-ink/85">
          Si respondiste "sí" a cuatro o más preguntas, es posible que tengas un problema con el
          alcohol. Nosotros lo tuvimos también, y encontramos una salida.
        </p>
        <Link
          to="/grupos"
          className="inline-flex items-center gap-2 rounded-sm bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-brand/90"
        >
          Encuentra un grupo <ArrowRight className="size-4" />
        </Link>
      </div>
    </PageShell>
  );
}

const questions = [
  "¿Has tratado alguna vez de dejar de beber por una semana o más y no lo has logrado?",
  "¿Te molestan los consejos de otras personas que quieren que dejes de beber?",
  "¿Has intentado controlar tu forma de beber cambiando de un tipo de bebida a otro?",
  "¿Has tenido que tomar un trago al despertar durante el último año?",
  "¿Envidias a las personas que pueden beber sin meterse en problemas?",
  "¿Han empeorado tus problemas con el alcohol en el último año?",
  "¿Te ha causado problemas la bebida en el hogar?",
  "¿Buscas beber más en reuniones sociales donde no se sirve suficiente alcohol?",
  "¿Sigues afirmando que puedes dejar de beber cuando quieras, aunque sigas emborrachándote sin querer?",
  "¿Has faltado al trabajo o a clases por causa de la bebida en el último año?",
  "¿Sufres de \"lagunas mentales\" cuando bebes?",
  "¿Has sentido alguna vez que tu vida sería mejor si no bebieras?",
];
