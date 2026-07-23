import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, HelpCircle, DoorOpen, PlayCircle, MessageCircleQuestion } from "lucide-react";

export const Route = createFileRoute("/necesito-ayuda")({
  head: () => ({
    meta: [
      { title: "Busco ayuda — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Información para quienes creen tener un problema con el alcohol. Cómo puede ayudarte A.A., cómo saber si tienes un problema y qué esperar de tu primera reunión.",
      },
      { property: "og:title", content: "Busco ayuda — Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Respuestas sencillas a las preguntas que se hace quien llega por primera vez a Alcohólicos Anónimos.",
      },
      { property: "og:url", content: "/necesito-ayuda" },
    ],
    links: [{ rel: "canonical", href: "/necesito-ayuda" }],
  }),
  component: BuscoAyuda,
});

function BuscoAyuda() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
            Busco ayuda
          </span>
          <h1 className="text-balance font-serif text-4xl leading-tight text-brand md:text-6xl">
            Bienvenido. Nos alegra que estés aquí.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/85">
            En esta página encontrarás respuestas sencillas a las preguntas más comunes de
            quienes se acercan por primera vez a Alcohólicos Anónimos.
          </p>

          <div className="mt-10">
            <Link
              to="/ayuda-familiar"
              className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-paper px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-soft/60"
            >
              Busco ayuda para un familiar o un amigo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. ¿Cómo puede ayudarte AA? */}
      <Block
        eyebrow="01"
        icon={Users}
        title="¿Cómo puede ayudarte Alcohólicos Anónimos?"
      >
        <p>
          En Alcohólicos Anónimos encontrarás a personas que han vivido el mismo problema con
          el alcohol y que hoy comparten libremente su experiencia, fortaleza y esperanza.
        </p>
        <p>
          No somos profesionales ni ofrecemos tratamientos. Somos hombres y mujeres que nos
          reunimos para ayudarnos unos a otros a mantenernos sobrios, un día a la vez.
        </p>
        <CTA to="/que-es-aa">Conoce más sobre A.A.</CTA>
      </Block>

      {/* 2. ¿Cómo saber si tengo un problema? */}
      <Block
        eyebrow="02"
        icon={HelpCircle}
        title="¿Cómo saber si tengo un problema con el alcohol?"
        tone="soft"
      >
        <p>
          Solo tú puedes responder esa pregunta. Para ayudarte a reflexionar, A.A. ofrece un
          breve cuestionario de doce preguntas que muchos miembros se hicieron antes de dar
          el primer paso.
        </p>
        <CTA to="/tengo-un-problema">Responder el cuestionario</CTA>
      </Block>

      {/* 3. ¿Será mi primera reunión? */}
      <Block
        eyebrow="03"
        icon={DoorOpen}
        title="¿Será mi primera reunión?"
      >
        <p>Queremos que llegues con tranquilidad. Esto es lo que puedes esperar:</p>
        <ul className="mt-6 space-y-3 text-ink/85">
          {[
            "No necesitas inscribirte.",
            "No tienes que hablar si no lo deseas.",
            "Puedes simplemente escuchar.",
            "La asistencia es confidencial.",
            "No hay ningún costo.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <CTA to="/grupos">Encuentra un grupo cercano</CTA>
      </Block>

      {/* 4. Escucha experiencias */}
      <Block
        eyebrow="04"
        icon={PlayCircle}
        title="Escucha experiencias"
        tone="soft"
      >
        <p>
          Escuchar a otros miembros compartir su experiencia suele ser el primer paso para
          muchas personas. Aquí encontrarás testimonios breves y anónimos.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-brand/10 bg-brand/10 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex aspect-video items-center justify-center bg-paper">
              <div className="flex flex-col items-center gap-3 text-ink/50">
                <PlayCircle className="size-10" strokeWidth={1.25} />
                <span className="text-xs uppercase tracking-[0.2em]">Testimonio {n}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink/60">
          Contenido en preparación. Próximamente compartiremos material aprobado por el Área.
        </p>
        <CTA to="/testimonios">Leer más testimonios</CTA>
      </Block>

      {/* 5. Preguntas frecuentes */}
      <Block
        eyebrow="05"
        icon={MessageCircleQuestion}
        title="Preguntas frecuentes"
      >
        <dl className="divide-y divide-brand/10 border-y border-brand/10">
          {faqs.map((f) => (
            <div key={f.q} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr] md:gap-8">
              <dt className="font-serif text-lg text-brand">{f.q}</dt>
              <dd className="text-ink/85">{f.a}</dd>
            </div>
          ))}
        </dl>
        <CTA to="/preguntas-frecuentes">Ver todas las preguntas</CTA>
      </Block>
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

function CTA({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <Link
        to={to}
        className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
      >
        {children} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

const faqs = [
  {
    q: "¿Tengo que dejar de beber antes de asistir?",
    a: "No. El único requisito para ser miembro es el deseo de dejar de beber. Puedes llegar tal como estás.",
  },
  {
    q: "¿Cuánto cuesta asistir?",
    a: "No hay ningún costo. A.A. se sostiene con las contribuciones voluntarias de sus propios miembros.",
  },
  {
    q: "¿Qué pasa si no estoy seguro de ser alcohólico?",
    a: "Puedes asistir igualmente. Solo tú puedes decidirlo. Escuchar a otros suele ayudar a aclarar esa pregunta.",
  },
  {
    q: "¿Las reuniones son confidenciales?",
    a: "Sí. El anonimato es una de nuestras tradiciones fundamentales. Lo que se comparte en la reunión queda en la reunión.",
  },
  {
    q: "¿Puedo ir acompañado?",
    a: "Sí. Puedes asistir con un familiar o amigo. Existen reuniones abiertas a las que puede acudir cualquier persona interesada.",
  },
];
