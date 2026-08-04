import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Users2,
  CalendarDays,
  FileDown,
  Building2,
  ScrollText,
  BookOpenText,
  Landmark,
  HandHeart,
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

type Block = {
  id: string;
  title: string;
  intro: string;
  cards: Card[];
};

const blocks: Block[] = [
  {
    id: "estructura",
    title: "Nuestra estructura de servicio",
    intro:
      "Un recorrido paso a paso: del grupo al Área, de la Asamblea a la Conferencia.",
    cards: [
      {
        to: "/miembros/el-grupo",
        icon: Users,
        emoji: "🏠",
        title: "El Grupo",
        description:
          "Conozca qué es un grupo de Alcohólicos Anónimos, cómo funciona, cuál es el papel del Representante de Servicios Generales (RSG) y consulte el directorio de los RSG de nuestra Área.",
      },
      {
        to: "/miembros/area",
        icon: Building2,
        emoji: "👥",
        title: "El Comité de Área y los Comités Especiales",
        description:
          "Conozca cómo está conformado el Comité de Área, las responsabilidades de sus servidores y el trabajo que realizan los diferentes comités especiales al servicio de los grupos.",
      },
      {
        to: "/miembros/asamblea",
        icon: Users2,
        emoji: "🗣️",
        title: "La Asamblea de Área",
        description:
          "Descubra qué es la Asamblea de Área, quiénes participan, cómo se desarrolla y cuál es su importancia dentro de la estructura de servicio.",
      },
      {
        to: "/miembros/eventos",
        icon: CalendarDays,
        emoji: "📅",
        title: "Calendario de Asambleas y Eventos",
        description:
          "Consulta las asambleas, foros, reuniones de servicio, talleres y demás actividades del Área.",
      },
      {
        to: "/miembros/conferencia",
        icon: Landmark,
        emoji: "🏛️",
        title: "Conferencia de Servicios Generales",
        description:
          "Conoce qué es la Conferencia, cómo está conformada y cuál es su función dentro de la estructura de servicio de A.A. en Colombia.",
      },
      {
        to: "/miembros/principios",
        icon: ScrollText,
        emoji: "📖",
        title: "Los 36 principios",
        description:
          "Consulta los Doce Pasos, las Doce Tradiciones y los Doce Conceptos para el Servicio Mundial.",
      },
    ],
  },
  {
    id: "recursos",
    title: "Biblioteca de documentos",
    intro:
      "Documentos de servicio, talleres y material de consulta autorizado por el Área.",
    cards: [
      {
        to: "/miembros/documentos",
        icon: FileDown,
        emoji: "📄",
        title: "Documentos para descargar",
        description:
          "Accede a actas, circulares, talleres, formatos y demás documentos autorizados por el Área.",
      },
    ],
  },
  {
    id: "vida-en-aa",
    title: "Vida en AA",
    intro:
      "La vida de nuestros grupos, nuestro compromiso y las oraciones que compartimos.",
    cards: [
      {
        to: "/miembros/grupos",
        icon: Users,
        emoji: "🏠",
        title: "Nuestros grupos",
        description:
          "Consulta el directorio oficial de grupos del Área 2, horarios y lugares de reunión.",
      },
      {
        to: "/miembros/responsabilidad",
        icon: HandHeart,
        emoji: "🤝",
        title: "Declaración de Responsabilidad",
        description:
          "Conoce la Declaración de Responsabilidad y su significado en nuestro compromiso de estar siempre disponibles para quien pide ayuda.",
      },
      {
        to: "/miembros/oraciones",
        icon: BookOpenText,
        emoji: "🙏",
        title: "Nuestras oraciones",
        description:
          "Consulta las oraciones utilizadas habitualmente en Alcohólicos Anónimos.",
      },
    ],
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
        <h1 className="font-serif text-3xl italic text-brand sm:text-4xl">
          Portal para Miembros
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          Este espacio reúne recursos, documentos e información sobre la
          estructura de servicio de Alcohólicos Anónimos. Aquí encontrarás
          herramientas para fortalecer tu participación en el servicio, conocer
          el funcionamiento del Área y comprender mejor la organización de los
          Servicios Generales.
        </p>
      </header>

      <div className="space-y-12">
        {blocks.map((block) => (
          <section key={block.id} aria-labelledby={`block-${block.id}`}>
            <div className="mb-5 border-b border-brand/10 pb-3">
              <h2
                id={`block-${block.id}`}
                className="font-serif text-xl italic text-brand"
              >
                {block.title}
              </h2>
              <p className="mt-1 text-sm text-ink/70">{block.intro}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {block.cards.map((c) => (
                <article
                  key={c.to}
                  className="card-aa flex flex-col"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"
                    >
                      <c.icon className="size-5" />
                    </span>
                    <h3 className="font-serif text-lg text-brand">
                      <span aria-hidden className="mr-1">
                        {c.emoji}
                      </span>
                      {c.title}
                    </h3>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-ink/75">
                    {c.description}
                  </p>
                  <Link
                    to={c.to}
                    className="btn-aa mt-6 self-start"
                  >
                    Ingresar <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="rounded-3xl border border-brand/10 bg-brand-soft/40 p-6 text-center">
        <p className="text-sm leading-relaxed text-ink/80">
          Gracias por tu servicio. Cada acción fortalece nuestro propósito de
          llevar el mensaje de recuperación a quien aún sufre.
        </p>
      </footer>
    </div>
  );
}
