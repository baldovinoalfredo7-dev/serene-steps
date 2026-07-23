/**
 * Directorio oficial de grupos del Área 2 Metropolitana de Barranquilla.
 *
 * La estructura está preparada para incorporar más adelante, sin cambios de UI:
 * - Fotografía del lugar (`photoUrl`).
 * - Teléfono de contacto (`phone`).
 * - Indicaciones para llegar (`directions`).
 * - Coordenadas para Google Maps (`coordinates`).
 *
 * Mientras esos datos no estén confirmados oficialmente por el Área, se dejan
 * como `undefined` y la interfaz los oculta con elegancia.
 */

export interface PlaceholderMeeting {
  weekday: number; // 0 = Domingo ... 6 = Sábado
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

export interface GroupCoordinates {
  lat: number;
  lng: number;
}

export interface PlaceholderGroup {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  addressLine: string;
  addressFull: string;
  /** Nota adicional sobre días especiales (por ejemplo festivos). */
  holidayNote?: string;
  meetings: PlaceholderMeeting[];
  // Campos preparados para el directorio oficial (pendientes de confirmar).
  phone?: string;
  photoUrl?: string;
  directions?: string;
  coordinates?: GroupCoordinates;
}

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

export const placeholderGroups: PlaceholderGroup[] = [
  {
    slug: "accion-de-sabanalarga",
    name: "Acción de Sabanalarga",
    city: "Sabanalarga",
    neighborhood: "Centro",
    addressLine: "Plaza Principal — Casa Cural Vieja, frente a la Normal Santa Teresita",
    addressFull:
      "Plaza Principal, Casa Cural Vieja, frente a la Normal Santa Teresita, Sabanalarga, Atlántico",
    holidayNote: "Festivos: 4:00 p. m. – 6:00 p. m.",
    meetings: [
      { weekday: 1, start: "19:00", end: "21:00" },
      { weekday: 2, start: "19:00", end: "21:00" },
      { weekday: 3, start: "19:00", end: "21:00" },
      { weekday: 4, start: "19:00", end: "21:00" },
      { weekday: 5, start: "19:00", end: "21:00" },
      { weekday: 6, start: "12:30", end: "14:00" },
      { weekday: 6, start: "19:00", end: "21:00" },
      { weekday: 0, start: "16:00", end: "18:00" },
    ],
  },
  {
    slug: "cambio-de-vida-de-baranoa",
    name: "Cambio de Vida de Baranoa",
    city: "Baranoa",
    neighborhood: "Centro",
    addressLine: "Carrera 18 No. 22-05, al lado de la Estación de Policía",
    addressFull: "Carrera 18 No. 22-05, al lado de la Estación de Policía, Baranoa, Atlántico",
    holidayNote: "Primer y último domingo del mes: 12:00 m. – 2:00 p. m.",
    meetings: [
      { weekday: 0, start: "19:00", end: "21:00" },
      { weekday: 1, start: "19:00", end: "21:00" },
      { weekday: 2, start: "19:00", end: "21:00" },
      { weekday: 3, start: "19:00", end: "21:00" },
      { weekday: 4, start: "19:00", end: "21:00" },
      { weekday: 5, start: "19:00", end: "21:00" },
      { weekday: 6, start: "19:00", end: "21:00" },
    ],
  },
  {
    slug: "el-concord",
    name: "El Concord",
    city: "Barranquilla",
    neighborhood: "",
    addressLine: "Calle 17 No. 27-13, frente al Colegio Jesús de la Buena Esperanza",
    addressFull:
      "Calle 17 No. 27-13, frente al Colegio Jesús de la Buena Esperanza, Barranquilla, Atlántico",
    holidayNote: "Festivos: 4:30 p. m.",
    meetings: [
      { weekday: 1, start: "18:30", end: "20:00" },
      { weekday: 3, start: "18:30", end: "20:00" },
      { weekday: 5, start: "18:30", end: "20:00" },
      { weekday: 0, start: "16:30", end: "18:00" },
    ],
  },
  {
    slug: "el-triangulo",
    name: "El Triángulo",
    city: "Soledad",
    neighborhood: "",
    addressLine: "Carrera 12 No. 57-58",
    addressFull: "Carrera 12 No. 57-58, Soledad, Atlántico",
    holidayNote: "Festivos: 4:00 p. m.",
    meetings: [
      { weekday: 1, start: "19:30", end: "21:00" },
      { weekday: 3, start: "19:30", end: "21:00" },
      { weekday: 5, start: "19:30", end: "21:00" },
      { weekday: 0, start: "16:00", end: "17:30" },
    ],
  },
  {
    slug: "la-decision",
    name: "La Decisión",
    city: "Barranquilla",
    neighborhood: "Las Gaviotas",
    addressLine: "Carrera 34B No. 55A-01, apartamento 2, primer piso, barrio Las Gaviotas",
    addressFull:
      "Carrera 34B No. 55A-01, apartamento 2, primer piso, barrio Las Gaviotas, Barranquilla, Atlántico",
    meetings: [
      { weekday: 1, start: "18:30", end: "20:00" },
      { weekday: 3, start: "18:30", end: "20:00" },
      { weekday: 5, start: "18:30", end: "20:00" },
    ],
  },
  {
    slug: "la-nueva-vida",
    name: "La Nueva Vida",
    city: "Barranquilla",
    neighborhood: "El Parque",
    addressLine: "Carrera 41C No. 43-04, urbanización El Parque",
    addressFull: "Carrera 41C No. 43-04, urbanización El Parque, Barranquilla, Atlántico",
    holidayNote: "Festivos: 3:00 p. m. – 5:00 p. m.",
    meetings: [
      { weekday: 1, start: "06:30", end: "08:00" },
      { weekday: 1, start: "19:00", end: "20:45" },
      { weekday: 2, start: "19:00", end: "20:45" },
      { weekday: 3, start: "06:30", end: "08:00" },
      { weekday: 3, start: "19:00", end: "20:45" },
      { weekday: 4, start: "19:00", end: "20:45" },
      { weekday: 5, start: "06:30", end: "08:00" },
      { weekday: 5, start: "19:00", end: "20:45" },
      { weekday: 6, start: "19:00", end: "20:45" },
      { weekday: 0, start: "07:00", end: "09:00" },
    ],
  },
  {
    slug: "las-nieves",
    name: "Las Nieves",
    city: "Barranquilla",
    neighborhood: "Las Nieves",
    addressLine: "Calle 23 No. 12-20, barrio Las Nieves",
    addressFull: "Calle 23 No. 12-20, barrio Las Nieves, Barranquilla, Atlántico",
    meetings: [
      { weekday: 1, start: "19:00", end: "21:00" },
      { weekday: 2, start: "19:00", end: "21:00" },
      { weekday: 3, start: "19:00", end: "21:00" },
      { weekday: 4, start: "19:00", end: "21:00" },
      { weekday: 5, start: "19:00", end: "21:00" },
      { weekday: 6, start: "19:00", end: "21:00" },
    ],
  },
  {
    slug: "renacer",
    name: "Renacer",
    city: "Barranquilla",
    neighborhood: "San José",
    addressLine: "Calle 40 No. 18-147, barrio San José",
    addressFull: "Calle 40 No. 18-147, barrio San José, Barranquilla, Atlántico",
    holidayNote: "Festivos: 3:00 p. m. – 5:00 p. m.",
    meetings: [
      { weekday: 1, start: "19:00", end: "20:30" },
      { weekday: 3, start: "19:00", end: "20:30" },
      { weekday: 5, start: "19:00", end: "20:30" },
      { weekday: 6, start: "15:00", end: "17:00" },
      { weekday: 0, start: "15:00", end: "17:00" },
    ],
  },
  {
    slug: "santo-tomas",
    name: "Santo Tomás",
    city: "Santo Tomás",
    neighborhood: "Centro",
    addressLine: "Calle 3 No. 8-04, segundo piso",
    addressFull: "Calle 3 No. 8-04, segundo piso, Santo Tomás, Atlántico",
    meetings: [
      { weekday: 3, start: "18:00", end: "20:00" },
      { weekday: 0, start: "10:00", end: "12:00" },
    ],
  },
  {
    slug: "simon-bolivar",
    name: "Simón Bolívar",
    city: "Barranquilla",
    neighborhood: "",
    addressLine: "Calle 23B No. 6-45",
    addressFull: "Calle 23B No. 6-45, Barranquilla, Atlántico",
    meetings: [
      { weekday: 1, start: "19:00", end: "21:00" },
      { weekday: 2, start: "19:00", end: "21:00" },
      { weekday: 3, start: "19:00", end: "21:00" },
      { weekday: 4, start: "19:00", end: "21:00" },
      { weekday: 5, start: "19:00", end: "21:00" },
      { weekday: 6, start: "19:00", end: "21:00" },
      { weekday: 0, start: "12:30", end: "14:30" },
      { weekday: 0, start: "19:00", end: "21:00" },
    ],
  },
  {
    slug: "vivir-mejor-de-soledad",
    name: "Vivir Mejor de Soledad",
    city: "Soledad",
    neighborhood: "",
    addressLine: "Calle 19 No. 21-02",
    addressFull: "Calle 19 No. 21-02, Soledad, Atlántico",
    meetings: [
      { weekday: 2, start: "19:00", end: "21:00" },
      { weekday: 4, start: "19:00", end: "21:00" },
      { weekday: 6, start: "19:00", end: "21:00" },
    ],
  },
];

export function findPlaceholderGroup(slug: string): PlaceholderGroup | undefined {
  return placeholderGroups.find((g) => g.slug === slug);
}

export function formatMeetings(meetings: PlaceholderMeeting[]): string[] {
  return meetings
    .slice()
    .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start))
    .map((m) => `${weekdayLabels[m.weekday]} · ${m.start}–${m.end}`);
}
