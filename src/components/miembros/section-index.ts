/**
 * Índice contextual del Portal para Miembros.
 * Para cada sección principal define los apartados internos que se muestran
 * en el menú lateral cuando el usuario está consultando esa página.
 * `hash` navega dentro de la misma página; `to` lleva a una subpágina.
 */
export type SubItem = { label: string; hash?: string; to?: string };

export const sectionIndex: Record<string, SubItem[]> = {
  "/miembros/documentos": [
    { label: "Documentos de servicio", hash: "documentos-servicio" },
    { label: "Talleres", hash: "talleres" },
    { label: "Formatos", hash: "formatos" },
  ],
  "/miembros/conferencia": [
    { label: "¿Qué es la Conferencia?", hash: "que-es" },
    { label: "¿Quiénes la conforman?", hash: "quienes" },
    { label: "La Reunión Anual", hash: "reunion-anual" },
    { label: "Los comités", hash: "comites" },
    { label: "El lenguaje de la Conferencia", hash: "lenguaje" },
  ],
  "/miembros/area": [
    { label: "¿Qué es el Área 2?", hash: "que-es" },
    { label: "¿Cómo se eligen los servidores?", hash: "eleccion" },
    { label: "Dentro de la estructura", hash: "estructura" },
    { label: "Servidores del Comité de Área", hash: "servidores" },
    { label: "Representantes de Servicios Generales", hash: "rsg" },
    { label: "Las Asambleas de Área", hash: "asambleas" },
    { label: "Reuniones de servicio", hash: "reuniones" },
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
