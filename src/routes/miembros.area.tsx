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
  {
    rol: "Coordinador",
    companero: "Luis Yepes",
    descripcion:
      "Coordina las actividades del Área y promueve el buen funcionamiento de los distintos servicios. Elabora el cronograma anual de trabajo, preside las Asambleas de Área y las reuniones de servidores, y representa al Área junto con el Delegado en las reuniones de la Región A.",
  },
  {
    rol: "Secretario",
    companero: "Juan José Acosta",
    descripcion:
      "Lleva las actas de las Asambleas y de las reuniones de servidores. Se encarga de convocar e informar oportunamente a los Representantes de Servicios Generales (RSG) y demás servidores sobre las reuniones y actividades del Área, procurando que la comunicación sea clara y oportuna.",
  },
  {
    rol: "Tesorero",
    companero: "Alejandro Meza",
    descripcion:
      "Administra los recursos económicos del Área con responsabilidad y transparencia. Elabora el presupuesto, registra los ingresos y egresos, presenta informes financieros periódicos y vela por el adecuado manejo de las contribuciones destinadas al servicio.",
  },
  { rol: "Delegado", companero: "Efraín Rueda" },
];

const comitesEspeciales = [
  {
    rol: "Representante de Finanzas",
    companero: "John Ricardo",
    descripcion:
      "Colabora con el Tesorero en la administración de los recursos económicos del Área. Apoya la elaboración de balances e informes financieros, contribuye al registro de los ingresos y egresos y favorece una administración transparente y responsable, al servicio de las actividades y el funcionamiento del Área.",
  },
  {
    rol: "Representante del Comité de Eventos",
    companero: "Elías Gonzalez",
    descripcion:
      "Coordina la promoción de los eventos locales, regionales y nacionales de Alcohólicos Anónimos dentro del Área. Además, organiza y apoya actividades orientadas a fortalecer la participación de los grupos y a obtener recursos que contribuyan al sostenimiento de los servicios y proyectos del Área.",
  },
  {
    rol: "Representante de Literatura",
    companero: "César Osorio",
    descripcion:
      "Es responsable de administrar la literatura aprobada por Alcohólicos Anónimos dentro del Área. Mantiene un inventario actualizado, procura disponer de un catálogo variado de publicaciones y facilita su distribución a los grupos y a los demás servidores del Área, promoviendo el uso de la literatura como herramienta fundamental para llevar el mensaje de recuperación.",
  },
  {
    rol: "Comité de Cooperación con la Comunidad Profesional (CCP)",
    companero: "Alfredo Baldovino",
    descripcion:
      "Promueve la cooperación entre Alcohólicos Anónimos y los profesionales e instituciones de la comunidad. Visita entidades públicas y privadas, establecimientos de salud, centros educativos y otras organizaciones para dar a conocer el programa de recuperación de Alcohólicos Anónimos. En ausencia de un representante de Información Pública, también puede ofrecer charlas informativas, preservando siempre el anonimato de los miembros y centrando el mensaje en el problema del alcoholismo y la solución que ofrece AA.",
  },
  {
    rol: "Representante de Instituciones Carcelarias",
    companero: "Alex Carvajal",
    descripcion:
      "Coordina el servicio de Alcohólicos Anónimos en los centros de reclusión dentro del Área. Mantiene la comunicación con las autoridades competentes, promueve la realización de reuniones y el acceso a la literatura aprobada, y procura que el mensaje de recuperación llegue a las personas privadas de la libertad que deseen dejar de beber.",
  },
];


const rsgs = [
  { grupo: "Grupo La Nueva Vida", rsg: "Rafael Pineda" },
  { grupo: "Grupo Simón Bolívar", rsg: "Alonso Cuella Rodríguez" },
  { grupo: "Grupo Renacer", rsg: "Aldo Mario" },
  { grupo: "Grupo Santo Tomás", rsg: "Pendiente de designación" },
  { grupo: "Grupo El Triángulo", rsg: "Pendiente de designación" },
  { grupo: "Grupo Acción de Sabanalarga", rsg: "Pendiente de designación" },
  { grupo: "Grupo Cambio de Vida", rsg: "Pendiente de designación" },
  { grupo: "Grupo Las Nieves", rsg: "Pendiente de designación" },
  { grupo: "Grupo Vivir Mejor", rsg: "Pendiente de designación" },
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

      <Section title="¿Qué es el Área 2 Metropolitana de Barranquilla?">
        <p>
          El Área 2 Metropolitana de Barranquilla forma parte de la estructura de servicio de Alcohólicos Anónimos en Colombia. Está integrada por los grupos de AA de la región y tiene como propósito coordinar, apoyar y fortalecer las actividades de servicio, respetando siempre la autonomía de cada grupo y los principios de las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial.
        </p>
      </Section>

      <Section title="¿Cómo se eligen los servidores?">
        <p>
          Los servidores del Área son elegidos mediante un proceso democrático durante las asambleas de servicio. Los Representantes de Servicios Generales (RSG) de cada grupo participan con voz y voto en la elección de los distintos servidores del Área.
        </p>
        <p>
          Todos los servicios tienen una duración de dos años y se desempeñan de manera voluntaria, ad honorem, como una oportunidad para servir y contribuir al bienestar de Alcohólicos Anónimos.
        </p>
      </Section>

      <Section title="El Área dentro de la estructura de servicio">
        <p>
          El Área 2 Metropolitana de Barranquilla hace parte de la Región A de Alcohólicos Anónimos en Colombia.
        </p>
        <div className="mt-4 rounded-2xl border border-brand/10 bg-paper p-6 shadow-sm">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand/70">
            Custodio de la Región A
          </span>
          <p className="mt-2 font-serif text-xl italic text-brand">Olmedo Montero</p>
        </div>
      </Section>

      <Section title="Servidores del Comité de Área" intro="Período 2024-2026">
        <SubTitle>Comité de área</SubTitle>
        <CardsGrid>
          {comiteArea.map((s) => (
            <ServidorCard key={s.rol} rol={s.rol} companero={s.companero} descripcion={(s as { descripcion?: string }).descripcion} />

          ))}
        </CardsGrid>

        <SubTitle className="mt-12">Comités especiales</SubTitle>
        <CardsGrid>
          {comitesEspeciales.map((s) => (
            <ServidorCard key={s.rol} rol={s.rol} companero={s.companero} descripcion={s.descripcion} />
          ))}
        </CardsGrid>
      </Section>

      <Section title="Representantes de Servicios Generales (RSG)">
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {rsgs.map((r) => {
            const pendiente = r.rsg.toLowerCase().startsWith("pendiente");
            return (
              <article
                key={r.grupo}
                className="rounded-2xl border border-brand/10 bg-paper p-5 shadow-sm"
              >
                <p className="font-serif text-base text-brand">{r.grupo}</p>
                <dl className="mt-2 text-sm leading-relaxed">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink/60">
                    RSG
                  </dt>
                  <dd className={`mt-0.5 ${pendiente ? "italic text-ink/60" : "text-ink"}`}>
                    {r.rsg}
                  </dd>
                </dl>
              </article>
            );
          })}
        </div>
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
    <h3 className={`font-serif text-xl italic text-brand ${className}`}>{children}</h3>
  );
}

function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

function ServidorCard({
  rol,
  companero,
  descripcion,
}: {
  rol: string;
  companero: string;
  descripcion?: string;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/70">
        Servicio
      </span>
      <p className="mt-2 font-serif text-lg text-brand">{rol}</p>
      {descripcion && (
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{descripcion}</p>
      )}
      <dl className="mt-4 space-y-2 text-sm leading-relaxed text-ink/85">
        <div>
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Compañero
          </dt>
          <dd className="mt-0.5 text-ink">{companero}</dd>
        </div>
      </dl>
    </article>
  );
}

function AsambleaBloque({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-2xl border border-brand/10 bg-paper p-6 shadow-sm">
      <h4 className="font-serif text-lg italic text-brand">{titulo}</h4>
      <p className="mt-2 text-base leading-relaxed text-ink/85">{texto}</p>
    </div>
  );
}
