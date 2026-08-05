import libroGrandeCover from "@/assets/literatura/libro-grande.jpg";
import doceYDoceCover from "@/assets/literatura/doce-y-doce.jpg";
import viviendoSobrioCover from "@/assets/literatura/viviendo-sobrio.jpg";
import folletosCover from "@/assets/literatura/folletos.jpg";

export type PublicationCategory =
  | "Libro"
  | "Folleto"
  | "Revista"
  | "Audiolibro";

export type Publication = {
  /** Identificador para la ficha individual: /literatura/$slug */
  slug: string;
  title: string;
  /** Descripción breve para la tarjeta */
  summary: string;
  /** Descripción ampliada para la ficha individual */
  description: string[];
  category: PublicationCategory;
  /** Propósito de la obra */
  purpose: string;
  pages?: number;
  edition?: string;
  /** Portada oficial. Si aún no está disponible, se usa el marcador de posición. */
  cover?: string;
  /** Enlaces opcionales (lectura o descarga autorizada) */
  readUrl?: string;
  downloadUrl?: string;
  /** Permite preparar publicaciones futuras sin alterar el diseño */
  published: boolean;
};

export const publications: readonly Publication[] = [
  {
    slug: "libro-grande",
    title: "Libro Grande",
    summary:
      "La obra donde nació el programa de recuperación de Alcohólicos Anónimos.",
    description: [
      "Conocido también como el Libro Azul, es el texto básico de Alcohólicos Anónimos. Reúne la experiencia de los primeros miembros y describe, paso a paso, la manera en que miles de personas han encontrado una nueva forma de vivir sin alcohol.",
      "Sus primeros capítulos explican el programa de recuperación; la segunda parte recoge historias personales de hombres y mujeres que compartieron su experiencia, fortaleza y esperanza.",
    ],
    category: "Libro",
    purpose:
      "Presentar el programa de recuperación de Alcohólicos Anónimos a quien desea dejar de beber.",
    pages: 575,
    edition: "Cuarta edición en español",
    cover: libroGrandeCover,
    published: true,
  },
  {
    slug: "doce-pasos-y-doce-tradiciones",
    title: "Doce Pasos y Doce Tradiciones",
    summary:
      "Una reflexión sobre los principios de recuperación personal y de unidad de los grupos.",
    description: [
      "Este libro examina con detalle los Doce Pasos, que orientan la recuperación personal, y las Doce Tradiciones, que sostienen la unidad de los grupos y de la Comunidad.",
      "Es una lectura habitual en las reuniones de estudio y acompaña a quienes desean profundizar en la práctica diaria del programa.",
    ],
    category: "Libro",
    purpose:
      "Profundizar en la práctica de los Doce Pasos y en los principios que mantienen unida a la Comunidad.",
    pages: 192,
    cover: doceYDoceCover,
    published: true,
  },
  {
    slug: "viviendo-sobrio",
    title: "Viviendo Sobrio",
    summary:
      "Sugerencias sencillas y prácticas para mantenerse sobrio día a día.",
    description: [
      "Reúne métodos sencillos que muchos miembros de Alcohólicos Anónimos han utilizado para no beber: vivir un día a la vez, evitar la soledad, cuidar la salud y buscar la compañía de otros compañeros.",
      "No contiene teorías: solo experiencia compartida, expresada con un lenguaje cercano y accesible.",
    ],
    category: "Libro",
    purpose:
      "Ofrecer herramientas cotidianas para sostener la sobriedad en la vida diaria.",
    pages: 120,
    cover: viviendoSobrioCover,
    published: true,
  },
  {
    slug: "folletos",
    title: "Folletos",
    summary:
      "Publicaciones breves y gratuitas con respuestas a las preguntas más frecuentes.",
    description: [
      "Los folletos de Alcohólicos Anónimos abordan temas concretos: la primera reunión, el apadrinamiento, los jóvenes en A.A., la familia, la cooperación con profesionales y muchos otros.",
      "Son de lectura breve, se entregan sin costo en las reuniones y constituyen una buena puerta de entrada para quien se acerca por primera vez.",
    ],
    category: "Folleto",
    purpose:
      "Informar de manera clara y breve sobre A.A. a quien se acerca por primera vez y a la comunidad.",
    cover: folletosCover,
    published: true,
  },

  /* --- Preparado para publicar más adelante (misma estructura y diseño) ---
  {
    slug: "revista-el-mensaje",
    title: "Revista A.A. El Mensaje",
    summary: "La publicación periódica de la Comunidad en Colombia.",
    description: ["…"],
    category: "Revista",
    purpose: "Compartir experiencia, fortaleza y esperanza entre los grupos.",
    published: false,
  },
  */
];

export function getPublication(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug && p.published);
}

export const visiblePublications = publications.filter((p) => p.published);
