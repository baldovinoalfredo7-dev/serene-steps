import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/miembros/eventos")({
  head: () => ({
    meta: [
      {
        title: "Calendario de Asambleas y Actividades · AA Área 2 Metropolitana",
      },
      {
        name: "description",
        content:
          "Fechas de las Asambleas de Área y de las principales actividades de servicio programadas del Área 2 Metropolitana.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CalendarioPage,
});

const actividades = [
  {
    titulo: "Capacitación sobre los servicios del Área",
    detalles: [
      { etiqueta: "Fecha", valor: "Domingo 2 de agosto de 2026" },
      { etiqueta: "Hora", valor: "10:00 a. m." },
      { etiqueta: "Lugar", valor: "Oficina del Área" },
    ],
  },
  {
    titulo: "XXXI Foro de Servicios de la Región A",
    detalles: [
      { etiqueta: "Fechas", valor: "10, 11 y 12 de octubre de 2026" },
      { etiqueta: "Lugar", valor: "Montería" },
    ],
  },
];

const asambleas = [
  "Domingo 9 de agosto de 2026",
  "Domingo 13 de septiembre de 2026",
  "Domingo 18 de octubre de 2026",
  "Domingo 8 de noviembre de 2026",
  "Domingo 13 de diciembre de 2026",
];

function CalendarioPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          Calendario de Asambleas y Actividades de Servicio
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink/85">
          En esta sección encontrará las fechas de las Asambleas de Área y de las principales
          actividades de servicio programadas. Le recomendamos consultarla periódicamente para
          mantenerse informado.
        </p>
      </header>

      <Section id="actividades" title="Actividades de servicio">
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          {actividades.map((a) => (
            <article
              key={a.titulo}
              className="card-aa"
            >
              <h3 className="font-serif text-lg italic text-brand">{a.titulo}</h3>
              <dl className="mt-3 space-y-1 text-sm leading-relaxed text-ink/85">
                {a.detalles.map((d) => (
                  <div key={d.etiqueta} className="flex gap-2">
                    <dt className="font-semibold text-brand/90">{d.etiqueta}:</dt>
                    <dd>{d.valor}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <Section id="asambleas" title="Próximas Asambleas de Área">
        <ul className="mt-2 space-y-3">
          {asambleas.map((f) => (
            <li
              key={f}
              className="rounded-2xl border border-brand/10 bg-paper px-6 py-4 text-base text-ink/85 shadow-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <section className="rounded-2xl border border-brand/10 bg-brand-soft/40 p-6">
        <p className="text-sm leading-relaxed text-ink/85">
          <span className="font-semibold text-brand">Importante:</span> Las fechas de las
          Asambleas de Área corresponden a la programación vigente. Si por alguna circunstancia
          fuera necesario realizar un cambio, este será informado oportunamente a todos los grupos
          y miembros del Área a través de los canales oficiales de comunicación.
        </p>
      </section>
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
