import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CalendarDays,
  FileDown,
  Building2,
  ScrollText,
  BookOpenText,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Card = {
  to: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    to: "/miembros/grupos",
    icon: Users,
    emoji: "🏠",
    title: "Nuestros grupos",
    description:
      "Consulta el directorio oficial de grupos del Área 2, horarios y lugares de reunión.",
  },
  {
    to: "/miembros/eventos",
    icon: CalendarDays,
    emoji: "📅",
    title: "Calendario de eventos",
    description:
      "Consulta foros, asambleas, reuniones de servicio, talleres y demás actividades del Área.",
  },
  {
    to: "/miembros/documentos",
    icon: FileDown,
    emoji: "📄",
    title: "Documentos para descargar",
    description:
      "Accede a actas, circulares, formatos y demás documentos autorizados por el Área.",
  },
  {
    to: "/miembros/area",
    icon: Building2,
    emoji: "👥",
    title: "El Área y sus servidores",
    description:
      "Consulta la estructura de servicio, los comités y los servidores del Área 2.",
  },
  {
    to: "/miembros/principios",
    icon: ScrollText,
    emoji: "📖",
    title: "Los 36 principios",
    description:
      "Consulta los Doce Pasos, las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial.",
  },
  {
    to: "/miembros/oraciones",
    icon: BookOpenText,
    emoji: "🙏",
    title: "Nuestras oraciones",
    description:
      "Consulta las oraciones utilizadas habitualmente en Alcohólicos Anónimos.",
  },
  {
    to: "/miembros/aprendizaje",
    icon: GraduationCap,
    emoji: "🎓",
    title: "Centro de aprendizaje",
    description: "Accede a recursos de formación para miembros y servidores.",
  },
];

export const Route = createFileRoute("/miembros/")({
  head: () => ({
    meta: [
      { title: "Bienvenido · Portal para Miembros · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: MembersHome,
});

function MembersHome() {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <header className="max-w-2xl">
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Portal para Miembros
        </span>
        <h1 className="font-serif text-3xl italic text-brand sm:text-4xl">
          Bienvenido
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          Bienvenido al Portal para Miembros del Área 2 Metropolitana de
          Barranquilla. Aquí encontrarás recursos, documentos e información para
          apoyar tu participación en el servicio y en la vida de nuestra
          Comunidad.
        </p>
      </header>

      <section
        aria-label="Secciones del portal"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((c) => (
          <article
            key={c.to}
            className="flex flex-col rounded-3xl border border-brand/10 bg-paper p-6 shadow-sm transition-shadow hover:shadow-lift"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"
              >
                <c.icon className="size-5" />
              </span>
              <h2 className="font-serif text-lg text-brand">
                <span aria-hidden className="mr-1">
                  {c.emoji}
                </span>
                {c.title}
              </h2>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-ink/75">
              {c.description}
            </p>
            <Link
              to={c.to}
              className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand/90"
            >
              Ingresar <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </section>

      <footer className="rounded-3xl border border-brand/10 bg-brand-soft/40 p-6 text-center">
        <p className="text-sm leading-relaxed text-ink/80">
          Gracias por tu servicio. Cada acción fortalece nuestro propósito de
          llevar el mensaje de recuperación a quien aún sufre.
        </p>
      </footer>
    </div>
  );
}
