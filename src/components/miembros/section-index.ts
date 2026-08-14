/**
 * Índice contextual del Portal para Miembros.
 * Para cada sección principal define los apartados internos que se muestran
 * en el menú lateral cuando el usuario está consultando esa página.
 * `hash` navega dentro de la misma página; `to` lleva a una subpágina.
 */
export type SubItem = { label: string; hash?: string; to?: string };

export const sectionIndex: Record<string, SubItem[]> = {
  "/miembros/finanzas": [
    { label: "Presupuesto del Área", hash: "presupuesto" },
    { label: "Informes Financieros Mensuales", hash: "informes" },
  ],
  "/miembros/documentos": [
    { label: "Informes", hash: "informes" },
    { label: "Talleres", hash: "talleres" },
    { label: "Formatos", hash: "formatos" },
    { label: "Manual de Imagen Corporativa", hash: "manual" },
  ],
  "/miembros/conferencia": [
    { label: "¿Qué es la Conferencia?", hash: "que-es" },
    { label: "¿Quiénes la conforman?", hash: "quienes" },
    { label: "La Reunión Anual", hash: "reunion-anual" },
    { label: "Los comités", hash: "comites" },
    { label: "El lenguaje de la Conferencia", hash: "lenguaje" },
  ],
  "/miembros/el-grupo": [
    { label: "¿Qué es un grupo de AA?", hash: "que-es" },
    { label: "Servidores del grupo", hash: "servidores" },
    { label: "El RSG", hash: "rsg" },
    { label: "Funciones del RSG", hash: "funciones-rsg" },
    { label: "Directorio de los RSG", hash: "directorio-rsg" },
  ],
  "/miembros/area": [
    { label: "¿Qué es el Área 2?", hash: "que-es" },
    { label: "¿Cómo se eligen los servidores?", hash: "eleccion" },
    { label: "Dentro de la estructura", hash: "estructura" },
    { label: "Servidores del Comité de Área", hash: "servidores" },
    { label: "Reuniones de servicio", hash: "reuniones" },
  ],
  "/miembros/asamblea": [
    { label: "Informes de los RSG", hash: "rsg" },
    { label: "Comité de Área", hash: "comiteArea" },
    { label: "Comités Especiales", hash: "comitesEspeciales" },
    { label: "Asambleas anteriores", hash: "anteriores" },
    { label: "¿Qué es la Asamblea de Área?", to: "/miembros/asamblea/acerca-de" },
  ],

  "/miembros/eventos": [
    { label: "Actividades de servicio", hash: "actividades" },
    { label: "Próximas Asambleas de Área", hash: "asambleas" },
  ],

  "/miembros/principios": [
    { label: "Los Doce Pasos", to: "/miembros/principios/doce-pasos" },
    { label: "Las Doce Tradiciones", to: "/miembros/principios/doce-tradiciones" },
    { label: "Los Doce Conceptos", to: "/miembros/principios/doce-conceptos" },
  ],
  "/miembros/oraciones": [
    { label: "Oración de la Serenidad", to: "/miembros/oraciones/serenidad" },
    { label: "Oración del Tercer Paso", to: "/miembros/oraciones/tercer-paso" },
    { label: "Oración del Séptimo Paso", to: "/miembros/oraciones/septimo-paso" },
    { label: "Oración de San Francisco", to: "/miembros/oraciones/san-francisco" },
  ],
};
