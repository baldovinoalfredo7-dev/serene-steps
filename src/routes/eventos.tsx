import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Foros, convenciones, talleres, aniversarios y actividades de información pública.",
      },
      { property: "og:title", content: "Eventos AA Área 2" },
      {
        property: "og:description",
        content: "Calendario de foros, convenciones, aniversarios y talleres del Área 2.",
      },
    ],
  }),
  component: Eventos,
});

function Eventos() {
  return (
    <PageShell
      eyebrow="Calendario"
      title="Eventos"
      intro="Foros, convenciones, talleres, aniversarios y actividades de información pública del Área 2 Metropolitana."
    >
      <div className="space-y-4">
        {events.map((e) => (
          <article
            key={e.title}
            className="flex flex-col gap-4 rounded-2xl bg-paper p-6 ring-1 ring-black/5 md:flex-row md:items-center md:gap-8 md:p-8"
          >
            <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl bg-brand text-paper">
              <span className="text-[10px] font-semibold uppercase tracking-widest opacity-70">
                {e.month}
              </span>
              <span className="font-serif text-3xl italic leading-none">{e.day}</span>
            </div>
            <div className="flex-1">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-brand/50">
                {e.tag}
              </span>
              <h3 className="mb-1 font-serif text-xl text-brand">{e.title}</h3>
              <p className="text-sm text-ink/60">{e.location}</p>
            </div>
            <div className="text-sm text-ink/60">
              <Calendar className="mb-1 size-4 text-brand/60" />
              {e.time}
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink/55">
        Fechas y sedes están sujetas a confirmación por parte de los comités organizadores.
      </p>
    </PageShell>
  );
}

const events = [
  {
    month: "Feb",
    day: "15",
    tag: "Foro Distrital",
    title: "Foro de compartimientos abierto",
    location: "Salón del Grupo Amanecer, Cuauhtémoc",
    time: "10:00 – 14:00",
  },
  {
    month: "Mar",
    day: "08",
    tag: "Aniversario",
    title: "Aniversario 26 del Grupo Nueva Vida",
    location: "Grupo Nueva Vida, Benito Juárez",
    time: "18:00 – 21:00",
  },
  {
    month: "Abr",
    day: "20",
    tag: "Taller",
    title: "Taller de servicio y tradiciones",
    location: "Grupo San Ángel, Coyoacán",
    time: "16:00 – 19:00",
  },
  {
    month: "May",
    day: "10",
    tag: "Convención",
    title: "Convención Área 2 Metropolitana",
    location: "Por confirmar",
    time: "Todo el día",
  },
];
