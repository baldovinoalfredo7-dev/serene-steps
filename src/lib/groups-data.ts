export type MeetingType = "abierta" | "cerrada" | "mixta";

export interface Meeting {
  weekday: number; // 0 = Domingo ... 6 = Sábado
  start: string; // "18:00"
  end: string; // "19:30"
  type: MeetingType;
}

export interface Group {
  slug: string;
  name: string;
  municipality: string;
  addressLine: string;
  addressFull: string;
  lat: number;
  lng: number;
  phone?: string;
  history: string;
  meetings: Meeting[];
}

/**
 * Datos de referencia de los nueve grupos del Área 2 Metropolitana.
 * Reemplazar con la información oficial cuando esté disponible.
 */
export const groups: Group[] = [
  {
    slug: "grupo-nueva-vida",
    name: "Grupo Nueva Vida",
    municipality: "Benito Juárez",
    addressLine: "Calle Corina 117, Col. del Carmen",
    addressFull: "Calle Corina 117, Col. del Carmen, Benito Juárez, CDMX",
    lat: 19.3502,
    lng: -99.1638,
    phone: "55 5555 0101",
    history:
      "Nueva Vida abrió sus puertas en 1998 como respuesta a la necesidad de contar con un espacio de recuperación en el sur de la ciudad. Hoy sostiene reuniones diarias y acompaña a personas que dan sus primeros pasos.",
    meetings: [
      { weekday: 1, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 2, start: "18:00", end: "19:30", type: "cerrada" },
      { weekday: 3, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 4, start: "18:00", end: "19:30", type: "cerrada" },
      { weekday: 5, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 6, start: "10:00", end: "11:30", type: "mixta" },
    ],
  },
  {
    slug: "grupo-san-angel",
    name: "Grupo San Ángel",
    municipality: "Coyoacán",
    addressLine: "Av. Universidad 1900, Local 4",
    addressFull: "Av. Universidad 1900, Local 4, Coyoacán, CDMX",
    lat: 19.3423,
    lng: -99.1791,
    phone: "55 5555 0202",
    history:
      "Fundado por un pequeño grupo de miembros veteranos, San Ángel se distingue por su reunión de mediodía, un espacio para quienes buscan comenzar el día con serenidad.",
    meetings: [
      { weekday: 1, start: "13:00", end: "14:30", type: "abierta" },
      { weekday: 2, start: "13:00", end: "14:30", type: "abierta" },
      { weekday: 3, start: "13:00", end: "14:30", type: "cerrada" },
      { weekday: 4, start: "13:00", end: "14:30", type: "abierta" },
      { weekday: 5, start: "13:00", end: "14:30", type: "abierta" },
      { weekday: 6, start: "11:00", end: "12:30", type: "mixta" },
    ],
  },
  {
    slug: "grupo-despertar",
    name: "Grupo Despertar",
    municipality: "Tlalpan",
    addressLine: "Calzada de Tlalpan 4501",
    addressFull: "Calzada de Tlalpan 4501, Tlalpan, CDMX",
    lat: 19.2911,
    lng: -99.1489,
    phone: "55 5555 0303",
    history:
      "Despertar nació como grupo nocturno para acompañar a quienes salen de sus jornadas laborales. Mantiene sesiones tarde-noche y una reunión familiar los sábados.",
    meetings: [
      { weekday: 1, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 3, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 5, start: "20:00", end: "21:30", type: "cerrada" },
      { weekday: 6, start: "17:00", end: "18:30", type: "abierta" },
      { weekday: 0, start: "10:00", end: "11:30", type: "mixta" },
    ],
  },
  {
    slug: "grupo-amanecer",
    name: "Grupo Amanecer",
    municipality: "Cuauhtémoc",
    addressLine: "Av. Insurgentes Sur 450, Col. Roma Norte",
    addressFull: "Av. Insurgentes Sur 450, Col. Roma Norte, Cuauhtémoc, CDMX",
    lat: 19.4187,
    lng: -99.1667,
    phone: "55 5555 0404",
    history:
      "Amanecer se reúne en el corazón de la Roma. Es un grupo abierto a visitantes y a quienes buscan asistir a su primera reunión sin presión.",
    meetings: [
      { weekday: 1, start: "07:30", end: "08:45", type: "abierta" },
      { weekday: 2, start: "07:30", end: "08:45", type: "abierta" },
      { weekday: 3, start: "07:30", end: "08:45", type: "abierta" },
      { weekday: 4, start: "07:30", end: "08:45", type: "abierta" },
      { weekday: 5, start: "07:30", end: "08:45", type: "abierta" },
    ],
  },
  {
    slug: "grupo-libertad",
    name: "Grupo Libertad",
    municipality: "Naucalpan de Juárez",
    addressLine: "Av. Gustavo Baz 120, Local B",
    addressFull: "Av. Gustavo Baz 120, Local B, Naucalpan de Juárez, Edo. Méx.",
    lat: 19.4783,
    lng: -99.2371,
    phone: "55 5555 0505",
    history:
      "Libertad es uno de los grupos pilares de la zona norte del Área 2. Su tradición es abrir cada reunión con la lectura de un pasaje del libro azul.",
    meetings: [
      { weekday: 1, start: "19:00", end: "20:30", type: "abierta" },
      { weekday: 2, start: "19:00", end: "20:30", type: "cerrada" },
      { weekday: 3, start: "19:00", end: "20:30", type: "abierta" },
      { weekday: 4, start: "19:00", end: "20:30", type: "cerrada" },
      { weekday: 6, start: "18:00", end: "19:30", type: "mixta" },
    ],
  },
  {
    slug: "grupo-fraternidad",
    name: "Grupo Fraternidad",
    municipality: "Coyoacán",
    addressLine: "Calzada de Tlalpan 2890, Col. Avante",
    addressFull: "Calzada de Tlalpan 2890, Col. Avante, Coyoacán, CDMX",
    lat: 19.3211,
    lng: -99.1445,
    phone: "55 5555 0606",
    history:
      "Fraternidad se caracteriza por sus juntas de aniversario mensuales, donde miembros comparten sus años de sobriedad con la comunidad.",
    meetings: [
      { weekday: 2, start: "19:00", end: "20:30", type: "abierta" },
      { weekday: 4, start: "19:00", end: "20:30", type: "cerrada" },
      { weekday: 6, start: "18:00", end: "19:30", type: "abierta" },
    ],
  },
  {
    slug: "grupo-esperanza",
    name: "Grupo La Esperanza",
    municipality: "Tlalnepantla de Baz",
    addressLine: "Vía Adolfo López Mateos 45",
    addressFull: "Vía Adolfo López Mateos 45, Tlalnepantla de Baz, Edo. Méx.",
    lat: 19.5385,
    lng: -99.1957,
    phone: "55 5555 0707",
    history:
      "La Esperanza es un grupo joven, formado en 2015. Su enfoque está en acompañar a personas en su primer año de recuperación.",
    meetings: [
      { weekday: 1, start: "19:30", end: "21:00", type: "abierta" },
      { weekday: 3, start: "19:30", end: "21:00", type: "abierta" },
      { weekday: 5, start: "19:30", end: "21:00", type: "cerrada" },
      { weekday: 0, start: "11:00", end: "12:30", type: "abierta" },
    ],
  },
  {
    slug: "grupo-sendero",
    name: "Grupo Sendero de Vida",
    municipality: "Atizapán de Zaragoza",
    addressLine: "Blvd. Ignacio Zaragoza 210",
    addressFull: "Blvd. Ignacio Zaragoza 210, Atizapán de Zaragoza, Edo. Méx.",
    lat: 19.5747,
    lng: -99.2543,
    phone: "55 5555 0808",
    history:
      "Sendero de Vida ofrece un ambiente familiar en la zona metropolitana norte. Mantiene una reunión abierta cada domingo por la mañana.",
    meetings: [
      { weekday: 2, start: "18:30", end: "20:00", type: "abierta" },
      { weekday: 4, start: "18:30", end: "20:00", type: "cerrada" },
      { weekday: 0, start: "10:30", end: "12:00", type: "abierta" },
    ],
  },
  {
    slug: "grupo-unidad",
    name: "Grupo Unidad y Servicio",
    municipality: "Ecatepec de Morelos",
    addressLine: "Av. Central 315, Col. Nueva Aragón",
    addressFull: "Av. Central 315, Col. Nueva Aragón, Ecatepec, Edo. Méx.",
    lat: 19.6011,
    lng: -99.0498,
    phone: "55 5555 0909",
    history:
      "Unidad y Servicio es reconocido por su labor de información pública, llevando el mensaje de AA a escuelas y centros de salud de la zona.",
    meetings: [
      { weekday: 1, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 3, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 5, start: "20:00", end: "21:30", type: "mixta" },
      { weekday: 6, start: "17:00", end: "18:30", type: "abierta" },
    ],
  },
];

export const getGroupBySlug = (slug: string): Group | undefined =>
  groups.find((g) => g.slug === slug);

export const weekdayLabels = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export const weekdayShort = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

export const meetingTypeLabel: Record<MeetingType, string> = {
  abierta: "Reunión abierta",
  cerrada: "Reunión cerrada",
  mixta: "Reunión mixta",
};
