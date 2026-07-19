export type MeetingType = "abierta" | "cerrada" | "mixta";

export interface Meeting {
  weekday: number; // 0 = Domingo ... 6 = Sábado
  start: string; // "18:00"
  end: string; // "19:30"
  type: MeetingType;
}

export interface PublicInfoContact {
  name?: string;
  phone?: string;
  email?: string;
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
  publicInfo?: PublicInfoContact;
}

/**
 * Municipios del Área 2 Metropolitana (Atlántico, Colombia).
 * Lista fija utilizada por selects/filtros del portal público.
 * La fuente autoritativa vive en la tabla `municipalities`.
 */
export const municipalities = [
  "Barranquilla",
  "Soledad",
  "Malambo",
  "Galapa",
  "Puerto Colombia",
] as const;

export type Municipality = (typeof municipalities)[number];

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

export type TimeOfDay = "manana" | "tarde" | "noche";

export const timeOfDayLabel: Record<TimeOfDay, string> = {
  manana: "Mañana",
  tarde: "Tarde",
  noche: "Noche",
};

export function getTimeOfDay(start: string): TimeOfDay {
  const hour = parseInt(start.split(":")[0] ?? "0", 10);
  if (hour < 12) return "manana";
  if (hour < 18) return "tarde";
  return "noche";
}

/** Devuelve el horario "principal" (primera reunión de la semana ordenada). */
export function getPrimaryMeeting(g: Group): Meeting | undefined {
  return g.meetings
    .slice()
    .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start))[0];
}
