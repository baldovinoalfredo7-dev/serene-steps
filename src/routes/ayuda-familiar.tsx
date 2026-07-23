import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Users,
  HandHeart,
  DoorOpen,
  LifeBuoy,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/ayuda-familiar")({
  head: () => ({
    meta: [
      { title: "Ayuda para un familiar o amigo — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Información para familiares y amigos de una persona con problemas de alcohol: cómo comprender la situación, cómo puede ayudar Alcohólicos Anónimos y dónde encontrar apoyo.",
      },
      {
        property: "og:title",
        content: "Ayuda para un familiar o amigo — Alcohólicos Anónimos",
      },
      {
        property: "og:description",
        content:
          "Acompañamiento e información para quienes se preocupan por la forma de beber de un ser querido.",
      },
      { property: "og:url", content: "/ayuda-familiar" },
    ],
    links: [{ rel: "canonical", href: "/ayuda-familiar" }],
  }),
  component: AyudaFamiliar,
});

function AyudaFamiliar() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-brand/5 bg-soft/40 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-brand/80">
            Para familiares y amigos
          </span>
          <h1 className="text-balance font-serif text-4xl leading-tight text-brand md:text-6xl">
            ¿Te preocupa la forma de beber de un familiar o un amigo?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/85">
            Ver sufrir a alguien por el alcohol puede generar preocupación, tristeza,
            impotencia y muchas preguntas. En esta página encontrarás información que
            puede ayudarte a comprender cómo Alcohólicos Anónimos puede ser un recurso
            cuando esa persona decida buscar ayuda.
          </p>
        </div>
      </section>

      {/* 1. Comprendemos tu preocupación */}
      <Block eyebrow="01" icon={Heart} title="Comprendemos tu preocupación">
        <p>
          Muchas personas llegan aquí con el deseo sincero de ayudar a alguien que
          aman. Esa preocupación es completamente comprensible.
        </p>
        <p>
          Antes de compartir información, queremos que sepas algo sencillo: no estás
          solo o sola. Muchas familias han caminado antes por el lugar donde te
          encuentras hoy, y han encontrado comprensión, calma y esperanza.
        </p>
      </Block>

      {/* 2. Qué puede hacer AA */}
      <Block
        eyebrow="02"
        icon={Users}
        title="¿Qué puede hacer Alcohólicos Anónimos?"
        tone="soft"
      >
        <p>
          Alcohólicos Anónimos está formado por hombres y mujeres que han encontrado
          una manera de vivir sin beber. Comparten gratuitamente su experiencia con
          otros alcohólicos que buscan la misma ayuda.
        </p>
        <p>
          Con mucho respeto queremos compartir un principio fundamental de nuestra
          experiencia:
        </p>
        <blockquote className="border-l-2 border-brand/40 pl-6 font-serif text-xl italic leading-relaxed text-brand">
          La recuperación comienza cuando la propia persona reconoce que tiene un
          problema y desea buscar ayuda. Nadie puede tomar esa decisión por ella.
        </blockquote>
        <p>
          Ese momento puede llegar. Mientras tanto, la información y la calma con la
          que te acerques pueden marcar una diferencia.
        </p>
      </Block>

      {/* 3. Cómo puedes ayudar */}
      <Block eyebrow="03" icon={HandHeart} title="¿Cómo puedes ayudar?">
        <p>
          Estas son algunas recomendaciones sencillas que han compartido familias que
          vivieron una situación parecida:
        </p>
        <ul className="mt-6 space-y-3 text-ink/85">
          {[
            "Escuchar sin juzgar.",
            "Hablar cuando la persona esté sobria.",
            "Evitar discusiones cuando esté bajo los efectos del alcohol.",
            "Compartir información sobre Alcohólicos Anónimos cuando exista disposición para escuchar.",
            "Comprender que nadie puede obligar a otra persona a recuperarse.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Block>

      {/* 4. Cuando esa persona decida buscar ayuda */}
      <Block
        eyebrow="04"
        icon={DoorOpen}
        title="Cuando esa persona decida buscar ayuda"
        tone="soft"
      >
        <p>
          Cuando llegue ese momento, encontrará en Alcohólicos Anónimos hombres y
          mujeres dispuestos a compartir su experiencia con respeto, confidencialidad
          y comprensión.
        </p>
        <p>
          Aquí puedes conocer los grupos del Área 2 Metropolitana y sus horarios de
          reunión.
        </p>
        <div className="mt-10">
          <Link
            to="/grupos"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-brand/90"
          >
            Encontrar un grupo <ArrowRight className="size-4" />
          </Link>
        </div>
      </Block>

      {/* 5. Tú también mereces apoyo */}
      <section className="border-t border-brand/5 bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-brand/10 bg-soft/50 p-8 md:p-12">
            <div className="mb-6 flex items-center gap-4">
              <LifeBuoy className="size-6 text-brand/80" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
                También para ti
              </span>
            </div>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-brand md:text-4xl">
              Tú también mereces apoyo
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-ink/85">
              <p>
                Convivir con una persona que tiene problemas con el alcohol también
                puede afectar profundamente a familiares y amigos.
              </p>
              <p>
                Existe <strong className="font-semibold text-brand">Al-Anon</strong>,
                una comunidad independiente formada por familiares y amigos de
                personas con problemas de alcohol. Su propósito es brindar apoyo,
                comprensión y esperanza a quienes viven esa situación.
              </p>
              <p className="text-base text-ink/70">
                Alcohólicos Anónimos y Al-Anon son comunidades independientes, pero
                muchas familias encuentran en Al-Anon un espacio de acompañamiento.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="https://al-anon.org/al-anon-meetings/international-directory/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-paper px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:bg-soft/60"
              >
                Conocer Al-Anon <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/necesito-ayuda"
              className="inline-flex items-center gap-2 border-b border-brand/30 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-brand transition-colors hover:border-brand"
            >
              Volver a Busco ayuda <ArrowRight className="size-4" />
            </Link>
          </div>
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
