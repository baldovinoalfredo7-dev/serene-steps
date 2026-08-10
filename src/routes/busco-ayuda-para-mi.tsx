import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Stethoscope, HelpCircle, HandHeart, Phone } from "lucide-react";
import { telLink, contactConfig } from "@/lib/contact-config";

export const Route = createFileRoute("/busco-ayuda-para-mi")({
  head: () => ({
    meta: [
      { title: "Busco ayuda para mí — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Un recorrido breve y acogedor para quien se pregunta si el alcohol se ha convertido en un problema. No estás solo.",
      },
      { property: "og:title", content: "Busco ayuda para mí — Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Reconocer, reflexionar y encontrar acompañamiento. Podemos ayudarte.",
      },
      { property: "og:url", content: "https://hope-finds-you-here.lovable.app/busco-ayuda-para-mi" },
    ],
    links: [{ rel: "canonical", href: "https://hope-finds-you-here.lovable.app/busco-ayuda-para-mi" }],
  }),
  component: BuscoAyudaParaMi,
});

function BuscoAyudaParaMi() {
  return (
    <>

      {/* HERO */}
      <section className="bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
            Para ti
          </span>
          <h1 className="text-balance font-serif text-4xl leading-tight text-brand md:text-6xl">
            ¿Y si el alcohol se ha convertido en un problema?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/85">
            Muchas personas llegan a Alcohólicos Anónimos después de intentar
            controlar su manera de beber sin conseguirlo.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic text-brand">
            No estás solo.
          </p>
        </div>
      </section>

      {/* 1. Reconocerlo */}
      <Block eyebrow="01" icon={Heart} title="El primer paso es reconocerlo">
        <p>
          Aceptar que el alcohol está causando dificultades no es una derrota.
        </p>
        <p className="font-serif text-xl italic text-brand">
          Puede ser el comienzo de una nueva manera de vivir.
        </p>
      </Block>

      {/* 2. Enfermedad */}
      <Block
        eyebrow="02"
        icon={Stethoscope}
        title="El alcoholismo es una enfermedad"
        tone="soft"
      >
        <p>
          La Organización Mundial de la Salud reconoce el alcoholismo como una
          enfermedad. No es una falta de voluntad ni un defecto de carácter.
        </p>
        <p>
          Pedir ayuda es un acto de responsabilidad y de esperanza. Miles de
          personas lo han hecho antes, y han encontrado una forma serena de
          vivir sin beber.
        </p>
      </Block>

      {/* 3. Solo tú puedes responder */}
      <Block
        eyebrow="03"
        icon={HelpCircle}
        title="Solo tú puedes responder estas preguntas"
      >
        <p>
          Tómate un momento para reflexionar con calma. No hay respuestas
          correctas ni equivocadas, y estas preguntas no sirven para
          diagnosticar ni etiquetar a nadie. Son las mismas que muchos miembros
          de Alcohólicos Anónimos se hicieron antes de dar el primer paso.
        </p>
        <ol className="mt-8 space-y-4">
          {twelveQuestions.map((q, i) => (
            <li
              key={q}
              className="flex gap-5 rounded-2xl border border-brand/10 bg-paper p-5 md:p-6"
            >
              <span className="font-serif text-2xl italic text-brand/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-pretty text-base leading-relaxed text-ink/85 md:text-lg">
                {q}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-base text-ink/70">
          No importa cuántas respondiste con un sí. Lo importante es lo que
          sientes al leerlas. Si algo dentro de ti te dice que quieres hablar
          con alguien, siempre habrá un grupo de Alcohólicos Anónimos dispuesto
          a recibirte.
        </p>
      </Block>


      {/* 4. Podemos ayudarte */}
      <section className="border-t border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-8 flex items-center gap-4">
            <Sparkles className="size-6 text-brand/80" strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
              04
            </span>
          </div>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-brand md:text-4xl">
            Podemos ayudarte
          </h2>
          <p className="text-lg leading-relaxed text-ink/85">
            En Alcohólicos Anónimos encontrarás a personas que vivieron lo
            mismo y hoy comparten su experiencia con respeto y en
            confidencialidad. No estás solo, y siempre habrá un grupo dispuesto
            a recibirte.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/grupos"
              className="btn-aa uppercase tracking-[0.18em]"
            >
              Encuentra un grupo <ArrowRight className="size-4" />
            </Link>
            <a
              href={telLink()}
              className="btn-aa-outline inline-flex items-center justify-center gap-2 uppercase tracking-[0.18em]"
            >
              <Phone className="size-4" />
              Llamar a la oficina
            </a>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Puedes llamar directamente a la oficina del Área 2 Metropolitana al{" "}
            <span className="font-semibold text-ink">{contactConfig.phoneDisplay}</span>.
            Se respeta el anonimato de quien busca ayuda.
          </p>
        </div>
      </section>
    </>
  );
}

function Block({
  eyebrow,
  icon: Icon,
  title,
  tone = "paper",
  children,
}: {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  tone?: "paper" | "soft";
  children: React.ReactNode;
}) {
  return (
    <section
      className={`border-t border-brand/5 py-16 md:py-20 ${
        tone === "soft" ? "bg-soft/40" : "bg-paper"
      }`}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 flex items-center gap-4">
          <Icon className="size-6 text-brand/80" strokeWidth={1.5} />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
            {eyebrow}
          </span>
        </div>
        <h2 className="mb-8 font-serif text-3xl leading-tight text-brand md:text-4xl">
          {title}
        </h2>
        <div className="space-y-4 text-lg leading-relaxed text-ink/85">{children}</div>
      </div>
    </section>
  );
}

const twelveQuestions: string[] = [
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
