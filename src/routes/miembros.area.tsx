import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/miembros/area")({
  head: () => ({
    meta: [
      { title: "El Área y sus servidores · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AreaPage,
});

const comiteArea = [
  { rol: "Coordinador", companero: "Luis Yepes" },
  { rol: "Secretario", companero: "Juan José Acosta" },
  { rol: "Tesorero", companero: "Alejandro Meza" },
  { rol: "Delegado", companero: "Efraín Rueda" },
];

const comitesEspeciales = [
  { rol: "Finanzas", companero: "John Ricardo" },
  { rol: "Eventos", companero: "Elías Gonzalez" },
  { rol: "Literatura y Rem", companero: "César Osorio" },
  { rol: "Cooperación con la Comunidad Profesional", companero: "Alfredo Baldovino" },
  { rol: "Instituciones carcelarias", companero: "Alex Carvajal" },
];

function AreaPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          El Área y sus servidores
        </h1>
      </header>

      <Section title="¿Qué es el Área 2?">
        <ReservedBlock />
      </Section>

      <Section
        title="Nuestros servidores"
        intro="Período 2024-2026"
      >
        <SubTitle>Comité de área</SubTitle>
        <CardsGrid>
          {comiteArea.map((s) => (
            <ServidorCard key={s.rol} rol={s.rol} companero={s.companero} />
          ))}
        </CardsGrid>

        <SubTitle className="mt-12">Comités especiales</SubTitle>
        <CardsGrid>
          {comitesEspeciales.map((s) => (
            <ServidorCard key={s.rol} rol={s.rol} companero={s.companero} />
          ))}
        </CardsGrid>
      </Section>

      <Section title="Las Asambleas de Área">
        <p>
          Las Asambleas de Área son reuniones de servicio que, por lo general, se realizan una vez al mes. En ellas participan los Representantes de Servicios Generales (RSG) y los servidores del Área para compartir información, estudiar los asuntos de servicio y fortalecer el trabajo de la Comunidad.
        </p>
        <p>Durante su desarrollo, la Asamblea puede incluir:</p>
        <div className="space-y-4 pt-2">
          <AsambleaBloque
            titulo="Espacios informativos"
            texto="Los servidores presentan informes sobre el servicio que desempeñan y las actividades realizadas por los diferentes comités, permitiendo a la Asamblea conocer el trabajo desarrollado y el avance de los proyectos."
          />
          <AsambleaBloque
            titulo="Espacios deliberativos"
            texto="Los miembros analizan los asuntos de servicio, presentan sugerencias y, mediante la conciencia de grupo, toman las decisiones que orientan el trabajo del Área."
          />
          <AsambleaBloque
            titulo="Espacios electivos"
            texto="Cuando corresponde, la Asamblea elige a los compañeros que prestarán los diferentes servicios dentro de la estructura del Área, de acuerdo con los procedimientos de la Comunidad."
          />
        </div>
      </Section>

      <Section title="Reuniones de servicio del Área">
        <p>
          Además de las Asambleas de Área, los servidores realizan reuniones de servicio para dar cumplimiento a las decisiones aprobadas por la conciencia de grupo.
        </p>
        <p>
          En estas reuniones se coordina el trabajo de los diferentes comités, se hace seguimiento a las actividades programadas, se preparan los informes que serán presentados a la Asamblea y se proponen iniciativas orientadas a fortalecer el servicio y el cumplimiento del propósito primordial de Alcohólicos Anónimos.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">{title}</h2>
      {intro && (
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-brand/70">
          {intro}
        </p>
      )}
      <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}

function SubTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={`font-serif text-xl italic text-brand ${className}`}
    >
      {children}
    </h3>
  );
}

function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

function ServidorCard({ rol, companero }: { rol: string; companero: string }) {
  return (
    <article className="flex flex-col rounded-2xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/70">
        Servicio
      </span>
      <p className="mt-2 font-serif text-lg text-brand">{rol}</p>
      <dl className="mt-4 space-y-2 text-sm leading-relaxed text-ink/85">
        <div>
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Compañero
          </dt>
          <dd className="mt-0.5 text-ink">{companero}</dd>
        </div>
        <div>
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Función
          </dt>
          <dd className="mt-0.5 italic text-ink/60">
            Pendiente de incorporar la descripción oficial del servicio.
          </dd>
        </div>
      </dl>
    </article>
  );
}

function ReservedBlock() {
  return (
    <div className="rounded-2xl border border-dashed border-brand/25 bg-paper p-8 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand/70">
        Espacio reservado para el texto oficial
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        Este contenido se incorporará cuando el Área suministre la versión oficial.
      </p>
    </div>
  );
}
