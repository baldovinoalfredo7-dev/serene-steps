/**
 * Directorio oficial de grupos de Alcohólicos Anónimos.
 *
 * Fase actual: grupos oficiales del Área 2 Metropolitana de Barranquilla.
 * La estructura está preparada para incorporar más adelante grupos de otras
 * áreas (por ejemplo Área 3) sin cambios de UI: el visitante nunca necesita
 * saber a qué Área pertenece un grupo, sólo encontrarlo por ciudad, barrio,
 * nombre o —más adelante— día, horario o cercanía.
 *
 * Cada grupo reserva campos opcionales pendientes de confirmar por el Área:
 * - Fotografía del lugar (`photoUrl`)
 * - Teléfono de contacto (`phone`)
 * - Indicaciones para llegar (`directions`)
 * - Coordenadas para Google Maps (`coordinates`)
 */

export type AreaId = "area-2-metropolitana" | "area-3";

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
  /** Área a la que pertenece el grupo. Uso interno; no se muestra al visitante. */
  area: AreaId;
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

/**
 * Directorio oficial pendiente de incorporación.
 *
 * Se retiraron todos los grupos de ejemplo. La arquitectura (buscador,
 * tarjetas y páginas individuales) queda preparada para recibir el
 * directorio oficial en la próxima actualización.
 */
export const placeholderGroups: PlaceholderGroup[] = [];


export function findPlaceholderGroup(slug: string): PlaceholderGroup | undefined {
  return placeholderGroups.find((g) => g.slug === slug);
}

export function formatMeetings(meetings: PlaceholderMeeting[]): string[] {
  return meetings
    .slice()
    .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start))
    .map((m) => `${weekdayLabels[m.weekday]} · ${m.start}–${m.end}`);
}
