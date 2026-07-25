/**
 * Grupos del Área 3 (información de referencia para el portal público).
 *
 * Se muestran como listado informativo complementario al directorio del
 * Área 2 Metropolitana. Los horarios se conservan en el formato textual
 * entregado por el Área 3.
 */
export interface Area3Group {
  name: string;
  address: string;
  schedule: string[];
}

export const area3Groups: readonly Area3Group[] = [
  {
    name: "Barranquilla",
    address: "Calle 45 #30-41, Barrio Chiquinquirá",
    schedule: [
      "Lun a Sáb · 7:00–9:00 a.m., 12:00–2:00 p.m. y 7:00–8:30 p.m.",
      "Dom y festivos · 12:00–2:00 p.m. y 5:00–7:00 p.m.",
    ],
  },
  {
    name: "Bahía Segura",
    address: "Calle 4 #5-08, Puerto Colombia (cerca de la Alcaldía Vieja)",
    schedule: ["Mar y Jue · 7:00–8:30 p.m.", "Sáb · 10:00 a.m.–12:00 m."],
  },
  {
    name: "Del Norte",
    address: "Calle 84 #51-45, Iglesia Torcoroma, San Vicente",
    schedule: [
      "Lun a Vie · 7:00–8:30 p.m.",
      "Sáb · 4:00–5:30 p.m.",
      "Dom · 10:00 a.m.–12:00 m.",
    ],
  },
  {
    name: "El Lenguaje del Corazón",
    address: "Calle 35 #43-118, Piso 4, Local 407, CC Colombia",
    schedule: ["Lun a Sáb · 12:30–2:00 p.m.", "Dom · 10:00 a.m.–12:00 m."],
  },
  {
    name: "El Mensaje",
    address: "Cra. 43 #69E-53, Piso 2, Of. 210, Barrio Boston",
    schedule: ["Lun a Dom · 6:30–8:00 p.m."],
  },
  {
    name: "La Aceptación",
    address: "Cra. 28 #100-14, Los Olivos I",
    schedule: [
      "Lun a Sáb · 6:00–7:30 a.m. y 7:30–9:00 p.m.",
      "Dom · 10:00 a.m.–12:00 m.",
      "Festivos · 5:00–7:00 p.m.",
    ],
  },
  {
    name: "La Autonomía",
    address: "Calle 67 #54-55, Barrio El Prado",
    schedule: ["Lun a Sáb · 7:30–9:00 p.m.", "Dom y festivos · 7:30–9:00 p.m."],
  },
  {
    name: "La Esperanza",
    address: "Calle 66 #1B-80B, Santo Domingo",
    schedule: [
      "Lun, Mié, Jue y Vie · 7:00–8:30 p.m.",
      "Dom y festivos · 7:30–9:00 a.m.",
    ],
  },
  {
    name: "La Paz",
    address: "Cra. 13D #105-72, Barrio La Paz",
    schedule: ["Lun a Sáb · 7:00–8:30 p.m.", "Dom y festivos · 7:30–9:30 a.m."],
  },
  {
    name: "La Solución",
    address: "Calle 44 #26-153, Barrio Atlántico",
    schedule: ["Lun a Dom · 7:30–9:00 p.m."],
  },
  {
    name: "La Unidad",
    address: "Calle 64 #9A-99, Barrio El Bosque",
    schedule: ["Lun a Sáb · 7:00–8:30 p.m.", "Dom y festivos · 3:00–5:00 p.m."],
  },
  {
    name: "Liberación",
    address: "Calle 46H con Cra. 18, Ciudadela 20 de Julio",
    schedule: [
      "Lun, Mié y Vie · 7:30–9:00 p.m.",
      "Sáb · 5:30–7:00 p.m.",
      "Dom · 10:00 a.m.–12:00 m.",
    ],
  },
  {
    name: "Madrugadores",
    address: "Cra. 64 #58-79, Barrio Modelo",
    schedule: [
      "Lun a Sáb · 6:30–8:30 a.m.",
      "Dom y festivos · 8:00–10:00 a.m.",
    ],
  },
  {
    name: "Paraíso",
    address: "Cra. 43 #68-20, Piso 2, Barrio Boston",
    schedule: ["Lun a Sáb · 6:30–8:00 p.m."],
  },
  {
    name: "Meridiano 10 de Junio",
    address: "Cl. 38 #38B-21, Biblioteca Departamental",
    schedule: ["Lun, Mié y Vie · 12:00–2:00 p.m."],
  },
  {
    name: "Villa Paraíso",
    address: "Cra. 75B #85B-28",
    schedule: ["Lun a Sáb · 7:30–9:00 p.m.", "Dom y festivos · 5:30–7:00 p.m."],
  },
  {
    name: "Viviendo Sobrio",
    address: "Cra. 56 con Calle 96, Local 301, Iglesia Espíritu Santo",
    schedule: ["Lun, Mié y Vie · 7:00–8:30 p.m.", "Sáb · 5:00–6:30 p.m."],
  },
  {
    name: "La Playa",
    address: "Calle 8 #13-164, Corregimiento La Playa",
    schedule: ["Dom · 4:00 p.m."],
  },
  {
    name: "Amigos de Bill y Bob",
    address: "Calle 44 #44-71, Local 2",
    schedule: [
      "Lun a Sáb · 12:00–2:00 p.m.",
      "Lun, Mié y Vie · 6:00–8:00 p.m.",
      "Dom y festivos · 8:00–10:00 a.m.",
    ],
  },
  {
    name: "Llegamos a Creer",
    address:
      "Calle 40 entre Cra. 7D y 7E, detrás de la Iglesia Auxiliadora, La Magdalena",
    schedule: ["Mar y Jue · 7:00–8:30 p.m."],
  },
  {
    name: "Despertar de la Pradera",
    address: "Calle 117B #31-71",
    schedule: [
      "Lun a Sáb · 7:00–8:30 p.m.",
      "Dom y festivos · 10:00 a.m.–12:00 m.",
    ],
  },
] as const;
