import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Landmark,
  Users,
  CalendarDays,
  ClipboardList,
  BookOpenText,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/miembros/conferencia")({
  head: () => ({
    meta: [
      { title: "Conferencia de Servicios Generales · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ConferenciaPage,
});

const secciones: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "que-es", label: "¿Qué es la Conferencia de Servicios Generales?", icon: Landmark },
  { id: "quienes", label: "¿Quiénes la conforman?", icon: Users },
  { id: "reunion-anual", label: "La Reunión Anual de la Conferencia", icon: CalendarDays },
  { id: "comites", label: "Los comités", icon: ClipboardList },
  { id: "lenguaje", label: "El lenguaje de la Conferencia", icon: BookOpenText },
];

const terminos = [
  "Conferencia",
  "Delegado",
  "Custodio",
  "RSG",
  "Comité",
  "Agenda",
  "Recomendación",
  "Acción recomendable",
  "Conciencia de grupo",
  "Minoría",
  "Consenso",
  "Región",
  "Área",
  "Junta de Servicios Generales",
];

function ConferenciaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header className="max-w-3xl">
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          Conferencia de Servicios Generales
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink/85">
          La Conferencia de Servicios Generales constituye el principal órgano de servicio de
          Alcohólicos Anónimos en Colombia. A través de ella, la experiencia y la conciencia
          colectiva de la Comunidad orientan el desarrollo de los Servicios Generales,
          fortaleciendo la unidad y asegurando la continuidad del mensaje de recuperación.
        </p>
      </header>

      <nav aria-label="Secciones de la página" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {secciones.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-paper p-5 shadow-sm transition-shadow hover:shadow-lift"
          >
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand"
            >
              <s.icon className="size-5" />
            </span>
            <span className="font-serif text-base leading-snug text-brand">{s.label}</span>
          </a>
        ))}
      </nav>

      <Section id="que-es" title="¿Qué es la Conferencia de Servicios Generales?">
        <p>
          La Conferencia de Servicios Generales es el principal órgano de servicio de Alcohólicos
          Anónimos en Colombia. Su finalidad es permitir que la conciencia colectiva de la
          Comunidad oriente los Servicios Generales, fortaleciendo la unidad y garantizando la
          continuidad del mensaje de recuperación.
        </p>
        <p>
          La Conferencia no se limita a una reunión: desarrolla su labor durante todo el año
          mediante el trabajo de los delegados, los custodios, los comités y los demás servidores
          de confianza, quienes mantienen viva la comunicación entre los grupos y la estructura de
          servicio.
        </p>
      </Section>

      <Section id="quienes" title="¿Quiénes la conforman?">
        <p>
          La Conferencia está integrada por servidores de confianza provenientes de toda la
          estructura de servicio de Alcohólicos Anónimos en Colombia, entre ellos:
        </p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <Card titulo="Delegados de Área" texto="Llevan a la Conferencia la experiencia y la conciencia de los grupos de su Área, y comparten después las decisiones adoptadas." />
          <Card titulo="Custodios" texto="Integran la Junta de Servicios Generales y aportan la visión de sus territorios y de la Comunidad en su conjunto." />
          <Card titulo="Directores de la Junta de Servicios Generales" texto="Apoyan el funcionamiento de los servicios nacionales y presentan a la Conferencia la información de su gestión." />
          <Card titulo="Otros servidores nacionales" texto="Participan conforme a la estructura de servicio, aportando su experiencia en las distintas áreas de trabajo." />
        </div>
        <p>
          Cada uno aporta su experiencia para fortalecer los Servicios Generales y favorecer el
          bienestar de toda la Comunidad.
        </p>
      </Section>

      <Section id="reunion-anual" title="La Reunión Anual de la Conferencia">
        <p>
          Aunque la Conferencia trabaja durante todo el año, la Reunión Anual de la Conferencia,
          que normalmente se celebra en el mes de abril, constituye el momento culminante de ese
          trabajo.
        </p>
        <p>
          En ella se expresa la conciencia colectiva de la Comunidad, se estudian los asuntos de
          interés general y se adoptan recomendaciones y acciones que orientan el funcionamiento de
          los Servicios Generales de Alcohólicos Anónimos en Colombia.
        </p>
        <div className="rounded-2xl border border-brand/10 bg-soft/60 p-6">
          <p className="text-base leading-relaxed text-ink/85">
            La Conferencia no es un evento anual: es un organismo de servicio permanente cuya
            expresión principal es la Reunión Anual.
          </p>
        </div>
      </Section>

      <Section id="comites" title="Los comités">
        <p>
          Gran parte del trabajo de la Conferencia se desarrolla mediante comités especializados,
          encargados de estudiar los distintos asuntos relacionados con los Servicios Generales.
          Cada comité analiza los temas de su competencia, recoge la experiencia de los grupos y
          las áreas, y prepara las propuestas que serán consideradas por la Conferencia.
        </p>
        <div className="rounded-2xl border border-dashed border-brand/20 bg-paper p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand/60">
            Contenido en preparación
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Próximamente se incorporará aquí la descripción de cada comité de la Conferencia.
          </p>
        </div>
      </Section>

      <Section id="lenguaje" title="El lenguaje de la Conferencia">
        <p>
          La estructura de servicio utiliza términos propios que conviene conocer para participar
          con claridad en las asambleas y en la vida de servicio. Esta sección reunirá un glosario
          con los conceptos más empleados.
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {terminos.map((t) => (
            <li
              key={t}
              className="rounded-full border border-brand/15 bg-paper px-4 py-1.5 text-sm text-ink/80"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-dashed border-brand/20 bg-paper p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand/60">
            Contenido en preparación
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Muy pronto cada término contará con su definición, de acuerdo con el Manual de Servicio
            de Alcohólicos Anónimos de Colombia.
          </p>
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}

function Card({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <article className="rounded-2xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift">
      <p className="font-serif text-lg text-brand">{titulo}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/85">{texto}</p>
    </article>
  );
}
