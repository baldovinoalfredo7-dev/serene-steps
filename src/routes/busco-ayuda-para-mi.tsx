import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Stethoscope, HelpCircle, HandHeart } from "lucide-react";
import { BackLink } from "@/components/site/BackLink";

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
      { property: "og:url", content: "/busco-ayuda-para-mi" },
    ],
    links: [{ rel: "canonical", href: "/busco-ayuda-para-mi" }],
  }),
  component: BuscoAyudaParaMi,
});

function BuscoAyudaParaMi() {
  return (
    <>
      <BackLink to="/necesito-ayuda" />

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
        title="Solo tú puedes responder esta pregunta"
      >
        <p>
          Tómate un momento para reflexionar con calma. No hay respuestas
          correctas ni equivocadas. Solo tú sabes lo que ocurre dentro de ti.
        </p>
        <ul className="mt-8 space-y-5">
          {[
            "¿El alcohol ha causado dificultades en tu vida?",
            "¿Has intentado controlar tu manera de beber sin conseguirlo?",
            "¿Te preocupa la forma en que bebes?",
          ].map((q) => (
            <li
              key={q}
              className="rounded-2xl border border-brand/10 bg-paper p-6 font-serif text-xl leading-relaxed text-brand/90"
            >
              {q}
            </li>
          ))}
        </ul>
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand/90"
            >
              Encuentra un grupo <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-brand/30 bg-paper px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand/60"
              title="Disponible próximamente"
            >
              <HandHeart className="size-4" />
              Hablar con un miembro de A.A.
            </button>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            El servicio de acompañamiento telefónico estará disponible próximamente.
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
