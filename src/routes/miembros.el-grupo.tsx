import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/miembros/el-grupo")({
  head: () => ({
    meta: [
      { title: "El Grupo · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ElGrupoPage,
});

const servidoresGrupo = [
  {
    rol: "Coordinador del grupo",
    descripcion:
      "Orienta el desarrollo de las reuniones, procura que se cumpla el propósito primordial del grupo y promueve un ambiente de respeto, unidad y participación entre los miembros.",
  },
  {
    rol: "Secretario",
    descripcion:
      "Lleva el registro de las actividades y de la conciencia de grupo, apoya la comunicación con los demás servidores y conserva la información de las reuniones y acuerdos del grupo.",
  },
  {
    rol: "Tesorero",
    descripcion:
      "Administra con transparencia las contribuciones voluntarias del grupo, informa periódicamente sobre los ingresos y egresos y vela por el sostenimiento del grupo y su aporte a la estructura de servicio.",
  },
  {
    rol: "Representante de Literatura",
    descripcion:
      "Mantiene disponible la literatura aprobada por Alcohólicos Anónimos, facilita su consulta y distribución entre los miembros y promueve su uso como herramienta de recuperación.",
  },
  {
    rol: "Representante de Servicios Generales (RSG)",
    descripcion:
      "Es el enlace entre el grupo y la estructura de servicio de Alcohólicos Anónimos. Lleva la conciencia de grupo a las Asambleas de Área y comparte con su grupo la información de los Servicios Generales.",
  },
];

const funcionesRsg = [
  "Asistir a las Asambleas de Área y a las reuniones de servicio, llevando la conciencia de su grupo.",
  "Informar al grupo sobre las decisiones, recomendaciones y actividades del Área y de los Servicios Generales.",
  "Promover la participación de los miembros del grupo en el servicio.",
  "Fomentar el estudio de las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial.",
  "Mantener actualizada la información del grupo ante el Área y la Oficina de Servicios Generales.",
  "Favorecer la unidad y la comunicación entre el grupo y el resto de la Comunidad.",
];

const rsgs = [
  { grupo: "Grupo La Nueva Vida", rsg: "Rafael Pineda", telefono: "300 750 30 90" },
  { grupo: "Grupo Simón Bolívar", rsg: "Alonso Rueda Rodríguez", telefono: "300 665 40 34" },
  { grupo: "Grupo Renacer", rsg: "Aldo Mario Ortiz", telefono: "301 355 15 76" },
  { grupo: "Grupo Santo Tomás", rsg: "Geovany Polo", telefono: "304 564 44 77" },
  { grupo: "Grupo El Triángulo", rsg: "Pablo Nieto", telefono: "300 771 08 26" },
  { grupo: "Grupo Acción de Sabanalarga", rsg: "Cesar Sabalza", telefono: "312 290 30 53" },
  { grupo: "Grupo Cambio de Vida", rsg: "Atilio Barrios", telefono: "300 492 45 29" },
  { grupo: "Grupo La Decisión", rsg: "Armando Niño", telefono: "300 449 40 38" },
  { grupo: "Grupo Las Nieves", rsg: "Pendiente de designación" },
  { grupo: "Grupo Vivir Mejor", rsg: "Pendiente de designación" },
];

function ElGrupoPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          El Grupo
        </h1>
      </header>

      <Section id="que-es" title="¿Qué es un grupo de Alcohólicos Anónimos?">
        <p>
          Un grupo de Alcohólicos Anónimos está formado por dos o más alcohólicos que se reúnen
          con regularidad para compartir su experiencia, fortaleza y esperanza, con el propósito
          de mantenerse sobrios y ayudar a otros a lograr la sobriedad.
        </p>
        <p>
          El grupo es autónomo, salvo en asuntos que afecten a otros grupos o a Alcohólicos
          Anónimos en su totalidad. Se sostiene con las contribuciones voluntarias de sus miembros
          y guía su vida interna por las Doce Tradiciones, procurando que su único propósito sea
          llevar el mensaje al alcohólico que aún sufre.
        </p>
      </Section>

      <Section id="servidores" title="Servidores del grupo">
        <p>
          Los servicios dentro del grupo se realizan de manera voluntaria y por períodos definidos
          mediante la conciencia de grupo. Quienes los desempeñan no gobiernan: sirven.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servidoresGrupo.map((s) => (
            <article
              key={s.rol}
              className="card-aa flex flex-col"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/70">
                Servicio
              </span>
              <p className="mt-2 font-serif text-lg text-brand">{s.rol}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">{s.descripcion}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="rsg" title="El Representante de Servicios Generales (RSG)">
        <p>
          El RSG es el servidor elegido por el grupo para representarlo ante la estructura de
          servicio de Alcohólicos Anónimos. Es el vínculo que mantiene informado al grupo sobre
          la vida del Área, de la Región y de los Servicios Generales, y el que lleva la voz del
          grupo a las Asambleas.
        </p>
        <p>
          Su servicio tiene una duración definida y se desempeña de manera voluntaria, ad honorem,
          como una oportunidad para contribuir al bienestar de la Comunidad.
        </p>
      </Section>

      <Section id="funciones-rsg" title="Funciones del RSG">
        <ul className="mt-2 space-y-3">
          {funcionesRsg.map((f) => (
            <li
              key={f}
              className="rounded-2xl border border-brand/10 bg-paper p-5 text-sm leading-relaxed text-ink/85 shadow-sm"
            >
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="directorio-rsg" title="Directorio de los RSG del Área">
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {rsgs.map((r) => {
            const pendiente = r.rsg.toLowerCase().startsWith("pendiente");
            const telefono = (r as { telefono?: string }).telefono;
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
                  {telefono && (
                    <>
                      <dt className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink/60">
                        Contacto
                      </dt>
                      <dd className="mt-0.5 text-ink">📞 {telefono}</dd>
                    </>
                  )}
                </dl>
              </article>
            );
          })}
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
