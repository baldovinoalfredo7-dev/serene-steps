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
 * Municipios del Área 2 Metropolitana (Atlántico, Colombia):
 * Barranquilla, Soledad, Malambo, Galapa, Puerto Colombia.
 */
export const municipalities = [
  "Soledad",
  "Barranquilla",
  "Malambo",
  "Galapa",
  "Puerto Colombia",
] as const;

export type Municipality = (typeof municipalities)[number];

/**
 * Datos de referencia de los nueve grupos del Área 2 Metropolitana.
 * Reemplazar con la información oficial cuando esté disponible.
 */
export const groups: Group[] = [
  {
    slug: "grupo-nueva-vida",
    name: "Grupo Nueva Vida",
    municipality: "Barranquilla",
    addressLine: "Cra. 43 #70-120, Barrio El Prado",
    addressFull: "Cra. 43 #70-120, Barrio El Prado, Barranquilla, Atlántico",
    lat: 10.9971,
    lng: -74.8069,
    phone: "300 555 0101",
    history:
      "Nueva Vida abrió sus puertas en 1998 como respuesta a la necesidad de contar con un espacio de recuperación en el norte de Barranquilla. Hoy sostiene reuniones diarias y acompaña a quienes dan sus primeros pasos.",
    meetings: [
      { weekday: 1, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 2, start: "18:00", end: "19:30", type: "cerrada" },
      { weekday: 3, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 4, start: "18:00", end: "19:30", type: "cerrada" },
      { weekday: 5, start: "18:00", end: "19:30", type: "abierta" },
      { weekday: 6, start: "10:00", end: "11:30", type: "mixta" },
    ],
    publicInfo: { name: "Comité de Información Pública", phone: "300 555 0000" },
  },
  {
    slug: "grupo-nuevo-amanecer",
    name: "Grupo Nuevo Amanecer",
    municipality: "Barranquilla",
    addressLine: "Cl. 84 #51B-45, Barrio Riomar",
    addressFull: "Cl. 84 #51B-45, Barrio Riomar, Barranquilla, Atlántico",
    lat: 11.0121,
    lng: -74.8231,
    phone: "300 555 0202",
    history:
      "Nuevo Amanecer se distingue por su reunión matutina, un espacio para quienes buscan comenzar el día con serenidad y compañía.",
    meetings: [
      { weekday: 1, start: "07:00", end: "08:30", type: "abierta" },
      { weekday: 2, start: "07:00", end: "08:30", type: "abierta" },
      { weekday: 3, start: "07:00", end: "08:30", type: "cerrada" },
      { weekday: 4, start: "07:00", end: "08:30", type: "abierta" },
      { weekday: 5, start: "07:00", end: "08:30", type: "abierta" },
      { weekday: 6, start: "09:00", end: "10:30", type: "mixta" },
    ],
  },
  {
    slug: "grupo-despertar",
    name: "Grupo Despertar",
    municipality: "Soledad",
    addressLine: "Cl. 30 #18-25, Centro",
    addressFull: "Cl. 30 #18-25, Centro, Soledad, Atlántico",
    lat: 10.9169,
    lng: -74.7663,
    phone: "300 555 0303",
    history:
      "Despertar nació como grupo nocturno para acompañar a quienes salen de sus jornadas laborales. Mantiene sesiones tarde-noche y una reunión familiar los sábados.",
    meetings: [
      { weekday: 1, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 3, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 5, start: "20:00", end: "21:30", type: "cerrada" },
      { weekday: 6, start: "17:00", end: "18:30", type: "abierta" },
      { weekday: 0, start: "10:00", end: "11:30", type: "mixta" },
    ],
    publicInfo: { name: "Información Pública Soledad", phone: "300 555 0300" },
  },
  {
    slug: "grupo-serenidad",
    name: "Grupo Serenidad",
    municipality: "Soledad",
    addressLine: "Cra. 22 #45-10, Barrio Ciudad Salitre",
    addressFull: "Cra. 22 #45-10, Barrio Ciudad Salitre, Soledad, Atlántico",
    lat: 10.9095,
    lng: -74.7712,
    phone: "300 555 0404",
    history:
      "Serenidad es un grupo abierto a visitantes y a quienes buscan asistir a su primera reunión sin presión. Se reúne al caer la tarde.",
    meetings: [
      { weekday: 1, start: "17:30", end: "19:00", type: "abierta" },
      { weekday: 2, start: "17:30", end: "19:00", type: "abierta" },
      { weekday: 3, start: "17:30", end: "19:00", type: "abierta" },
      { weekday: 4, start: "17:30", end: "19:00", type: "abierta" },
      { weekday: 5, start: "17:30", end: "19:00", type: "abierta" },
    ],
  },
  {
    slug: "grupo-libertad",
    name: "Grupo Libertad",
    municipality: "Malambo",
    addressLine: "Cl. 12 #8-40, Centro",
    addressFull: "Cl. 12 #8-40, Centro, Malambo, Atlántico",
    lat: 10.8593,
    lng: -74.7737,
    phone: "300 555 0505",
    history:
      "Libertad es uno de los grupos pilares del sur del Área 2. Su tradición es abrir cada reunión con la lectura de un pasaje del libro azul.",
    meetings: [
      { weekday: 1, start: "19:00", end: "20:30", type: "abierta" },
      { weekday: 2, start: "19:00", end: "20:30", type: "cerrada" },
      { weekday: 3, start: "19:00", end: "20:30", type: "abierta" },
      { weekday: 4, start: "19:00", end: "20:30", type: "cerrada" },
      { weekday: 6, start: "18:00", end: "19:30", type: "mixta" },
    ],
    publicInfo: { name: "Comité IP Malambo", phone: "300 555 0500" },
  },
  {
    slug: "grupo-fraternidad",
    name: "Grupo Fraternidad",
    municipality: "Galapa",
    addressLine: "Cra. 15 #10-25, Centro",
    addressFull: "Cra. 15 #10-25, Centro, Galapa, Atlántico",
    lat: 10.8975,
    lng: -74.8836,
    phone: "300 555 0606",
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
    municipality: "Puerto Colombia",
    addressLine: "Cl. 2 #4-15, Zona Centro",
    addressFull: "Cl. 2 #4-15, Zona Centro, Puerto Colombia, Atlántico",
    lat: 11.0025,
    lng: -74.9553,
    phone: "300 555 0707",
    history:
      "La Esperanza es un grupo joven, formado en 2015. Su enfoque está en acompañar a personas en su primer año de recuperación.",
    meetings: [
      { weekday: 1, start: "19:30", end: "21:00", type: "abierta" },
      { weekday: 3, start: "19:30", end: "21:00", type: "abierta" },
      { weekday: 5, start: "19:30", end: "21:00", type: "cerrada" },
      { weekday: 0, start: "11:00", end: "12:30", type: "abierta" },
    ],
    publicInfo: { name: "Comité IP Puerto Colombia", phone: "300 555 0700" },
  },
  {
    slug: "grupo-sendero",
    name: "Grupo Sendero de Vida",
    municipality: "Puerto Colombia",
    addressLine: "Cra. 4 #6-30, Barrio Salgar",
    addressFull: "Cra. 4 #6-30, Barrio Salgar, Puerto Colombia, Atlántico",
    lat: 10.9836,
    lng: -74.9764,
    phone: "300 555 0808",
    history:
      "Sendero de Vida ofrece un ambiente familiar frente al mar. Mantiene una reunión abierta cada domingo por la mañana.",
    meetings: [
      { weekday: 2, start: "18:30", end: "20:00", type: "abierta" },
      { weekday: 4, start: "18:30", end: "20:00", type: "cerrada" },
      { weekday: 0, start: "10:30", end: "12:00", type: "abierta" },
    ],
  },
  {
    slug: "grupo-unidad",
    name: "Grupo Unidad y Servicio",
    municipality: "Barranquilla",
    addressLine: "Cra. 38 #45-60, Barrio Boston",
    addressFull: "Cra. 38 #45-60, Barrio Boston, Barranquilla, Atlántico",
    lat: 10.9878,
    lng: -74.7998,
    phone: "300 555 0909",
    history:
      "Unidad y Servicio es reconocido por su labor de información pública, llevando el mensaje de AA a escuelas y centros de salud de la ciudad.",
    meetings: [
      { weekday: 1, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 3, start: "20:00", end: "21:30", type: "abierta" },
      { weekday: 5, start: "20:00", end: "21:30", type: "mixta" },
      { weekday: 6, start: "17:00", end: "18:30", type: "abierta" },
    ],
    publicInfo: { name: "Oficina Central de Servicios", phone: "300 555 0900" },
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
