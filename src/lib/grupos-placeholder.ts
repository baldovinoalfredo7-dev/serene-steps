/**
 * Datos de ejemplo (placeholders) para la página "Encuentra un grupo".
 *
 * NOTA: En una fase posterior estos datos serán reemplazados por el
 * directorio oficial del Área 2. La arquitectura de esta página está
 * pensada para acoger filtros adicionales (día, horario, ubicación
 * cercana) sin cambios estructurales.
 */

export interface PlaceholderMeeting {
  weekday: number; // 0 = Domingo ... 6 = Sábado
  start: string; // "HH:mm"
  end: string;
}

export interface PlaceholderGroup {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  addressLine: string;
  addressFull: string;
  phone: string;
  meetings: PlaceholderMeeting[];
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
    slug: "grupo-esperanza",
    name: "Grupo Esperanza",
    city: "Barranquilla",
    neighborhood: "El Prado",
    addressLine: "Calle 72 # 41-20, El Prado",
    addressFull: "Calle 72 # 41-20, El Prado, Barranquilla",
    phone: "+57 300 000 0000",
    meetings: [
      { weekday: 1, start: "19:00", end: "20:30" },
      { weekday: 3, start: "19:00", end: "20:30" },
      { weekday: 5, start: "19:00", end: "20:30" },
    ],
  },
  {
    slug: "grupo-nueva-vida",
    name: "Grupo Nueva Vida",
    city: "Barranquilla",
    neighborhood: "Boston",
    addressLine: "Carrera 46 # 58-12, Boston",
    addressFull: "Carrera 46 # 58-12, Boston, Barranquilla",
    phone: "+57 300 000 0001",
    meetings: [
      { weekday: 2, start: "18:30", end: "20:00" },
      { weekday: 4, start: "18:30", end: "20:00" },
      { weekday: 6, start: "10:00", end: "11:30" },
    ],
  },
  {
    slug: "grupo-serenidad",
    name: "Grupo Serenidad",
    city: "Soledad",
    neighborhood: "Centro",
    addressLine: "Calle 18 # 20-05, Centro",
    addressFull: "Calle 18 # 20-05, Centro, Soledad",
    phone: "+57 300 000 0002",
    meetings: [
      { weekday: 0, start: "09:00", end: "10:30" },
      { weekday: 3, start: "19:30", end: "21:00" },
    ],
  },
  {
    slug: "grupo-amanecer",
    name: "Grupo Amanecer",
    city: "Barranquilla",
    neighborhood: "Villa Country",
    addressLine: "Carrera 51B # 80-58, Villa Country",
    addressFull: "Carrera 51B # 80-58, Villa Country, Barranquilla",
    phone: "+57 300 000 0003",
    meetings: [
      { weekday: 1, start: "06:30", end: "07:45" },
      { weekday: 4, start: "06:30", end: "07:45" },
    ],
  },
  {
    slug: "grupo-libertad",
    name: "Grupo Libertad",
    city: "Malambo",
    neighborhood: "Centro",
    addressLine: "Calle 10 # 12-30, Centro",
    addressFull: "Calle 10 # 12-30, Centro, Malambo",
    phone: "+57 300 000 0004",
    meetings: [
      { weekday: 2, start: "19:00", end: "20:30" },
      { weekday: 5, start: "19:00", end: "20:30" },
    ],
  },
  {
    slug: "grupo-un-dia-a-la-vez",
    name: "Grupo Un Día a la Vez",
    city: "Puerto Colombia",
    neighborhood: "Pradomar",
    addressLine: "Carrera 2 # 4-15, Pradomar",
    addressFull: "Carrera 2 # 4-15, Pradomar, Puerto Colombia",
    phone: "+57 300 000 0005",
    meetings: [
      { weekday: 3, start: "18:00", end: "19:30" },
      { weekday: 6, start: "17:00", end: "18:30" },
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
