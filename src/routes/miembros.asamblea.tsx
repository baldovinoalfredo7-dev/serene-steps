import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/miembros/asamblea")({
  head: () => ({
    meta: [
      { title: "La Asamblea de Área · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AsambleaPage,
});

const participantes = [
  {
    titulo: "Representantes de Servicios Generales (RSG)",
    texto:
      "Asisten con voz y voto llevando la conciencia de su grupo. Son el vínculo directo entre los grupos y la estructura de servicio.",
  },
  {
    titulo: "Servidores del Comité de Área",
    texto:
      "Coordinador, Secretario, Tesorero y Delegado presentan sus informes y orientan el desarrollo de la Asamblea.",
  },
  {
    titulo: "Representantes de los comités especiales",
    texto:
      "Informan sobre el trabajo de literatura, eventos, finanzas, instituciones carcelarias y cooperación con la comunidad profesional.",
  },
  {
    titulo: "Miembros interesados en el servicio",
    texto:
      "Pueden asistir como observadores para conocer el funcionamiento del Área y formarse en el servicio.",
  },
];

const desarrollo = [
  {
    titulo: "Espacios informativos",
    texto:
      "Los servidores presentan informes sobre el servicio que desempeñan y las actividades realizadas por los diferentes comités, permitiendo a la Asamblea conocer el trabajo desarrollado y el avance de los proyectos.",
  },
  {
    titulo: "Espacios deliberativos",
    texto:
      "Los miembros analizan los asuntos de servicio, presentan sugerencias y, mediante la conciencia de grupo, toman las decisiones que orientan el trabajo del Área.",
  },
  {
    titulo: "Espacios electivos",
    texto:
      "Cuando corresponde, la Asamblea elige a los compañeros que prestarán los diferentes servicios dentro de la estructura del Área, de acuerdo con los procedimientos de la Comunidad.",
  },
];

function AsambleaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          La Asamblea de Área
        </h1>
      </header>

      <Section id="que-es" title="¿Qué es la Asamblea de Área?">
        <p>
          La Asamblea de Área es la reunión de servicio en la que los grupos del Área 2
          Metropolitana, a través de sus Representantes de Servicios Generales, comparten
          información, estudian los asuntos de servicio y toman las decisiones que orientan el
          trabajo del Área. Por lo general se realiza una vez al mes.
        </p>
        <p>
          En la Asamblea reside la conciencia colectiva del Área: es allí donde la experiencia de
          cada grupo se une para servir mejor al propósito primordial de Alcohólicos Anónimos.
        </p>
      </Section>

      <Section id="participantes" title="¿Quiénes participan?">
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          {participantes.map((p) => (
            <article
              key={p.titulo}
              className="card-aa"
            >
              <h3 className="font-serif text-lg italic text-brand">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{p.texto}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="desarrollo" title="¿Cómo se desarrolla?">
        <p>Durante su desarrollo, la Asamblea puede incluir:</p>
        <div className="space-y-4 pt-2">
          {desarrollo.map((d) => (
            <div
              key={d.titulo}
              className="card-aa"
            >
              <h4 className="font-serif text-lg italic text-brand">{d.titulo}</h4>
              <p className="mt-2 text-base leading-relaxed text-ink/85">{d.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="decisiones" title="¿Cómo se toman las decisiones?">
        <p>
          Las decisiones se toman mediante la conciencia de grupo, después de escuchar todas las
          opiniones. Se procura siempre la unanimidad sustancial y se respeta el derecho de
          participación de la minoría, cuya opinión puede ser escuchada antes de confirmar
          cualquier acuerdo.
        </p>
        <p>
          Ningún servidor decide por sí solo: la autoridad final reside en la conciencia de los
          grupos, expresada a través de sus representantes.
        </p>
      </Section>

      <Section id="importancia" title="Su importancia para la vida del Área">
        <p>
          La Asamblea mantiene viva la comunicación entre los grupos y la estructura de servicio,
          fortalece la unidad y garantiza que las decisiones respondan a la experiencia común y no
          a criterios individuales.
        </p>
        <p>
          Participar en ella es una forma concreta de servicio: permite conocer el trabajo de los
          comités, formarse en las Doce Tradiciones y los Doce Conceptos, y asegurar que la mano
          de Alcohólicos Anónimos siempre esté disponible para quien la necesite.
        </p>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
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
