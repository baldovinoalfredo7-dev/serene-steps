/**
 * Archivo histórico de informes de las Asambleas del Área 2 Metropolitana.
 *
 * Para agregar una nueva Asamblea basta con añadir un objeto al inicio del
 * arreglo `asambleas`. Para agregar flyers, súbelos como assets y agrega la
 * entrada correspondiente en la categoría que corresponda (`rsg`,
 * `comiteArea` o `comitesEspeciales`). No es necesario modificar las páginas.
 */

export type Flyer = {
  /** Nombre del grupo, comité o servidor que presenta el informe */
  title: string;
  /** Texto secundario opcional (servidor, tipo de informe, etc.) */
  subtitle?: string;
  /** URL de la imagen del flyer (por ejemplo, la propiedad `url` de un .asset.json) */
  image?: string;
};

export type AssemblyCategoryKey = "rsg" | "comiteArea" | "comitesEspeciales";

export type Assembly = {
  /** Identificador para la URL, por ejemplo "2026-08-09" */
  id: string;
  /** Fecha en formato ISO, se usa para ordenar */
  date: string;
  /** Etiqueta legible, por ejemplo "9 de agosto de 2026" */
  label: string;
  rsg: Flyer[];
  comiteArea: Flyer[];
  comitesEspeciales: Flyer[];
};

export const categoryLabels: Record<AssemblyCategoryKey, string> = {
  rsg: "Informes de los RSG",
  comiteArea: "Comité de Área",
  comitesEspeciales: "Comités Especiales",
};

export const categoryDescriptions: Record<AssemblyCategoryKey, string> = {
  rsg: "Informes presentados por los Representantes de Servicios Generales de cada grupo.",
  comiteArea: "Informes de los servidores del Comité de Área.",
  comitesEspeciales: "Informes de los comités especiales que sirven al Área.",
};

export const categoryOrder: AssemblyCategoryKey[] = [
  "rsg",
  "comiteArea",
  "comitesEspeciales",
];

export const asambleas: Assembly[] = [
  {
    id: "2026-08-09",
    date: "2026-08-09",
    label: "9 de agosto de 2026",
    rsg: [
      {
        title: "Grupo Santo Tomás",
        subtitle: "RSG Geovanny Polo Pertuz",
        image: flyerSantoTomas.url,
      },
      {
        title: "Grupo Acción de Sabanalarga",
        subtitle: "RSG Cesar Augusto Sabolza Gómez",
        image: flyerAccion.url,
      },
      {
        title: "Grupo El Concord",
        subtitle: "RSG Carlos C.",
        image: flyerConcord.url,
      },
      {
        title: "Grupo Simón Bolívar",
        subtitle: "RSG Alonso Rueda Rodríguez",
        image: flyerSimonBolivar.url,
      },
    ],
    comiteArea: [],
    comitesEspeciales: [],
  },
];

export function sortedAsambleas(): Assembly[] {
  return [...asambleas].sort((a, b) => b.date.localeCompare(a.date));
}

export function getAsamblea(id: string): Assembly | undefined {
  return asambleas.find((a) => a.id === id);
}

export function countFlyers(a: Assembly): number {
  return a.rsg.length + a.comiteArea.length + a.comitesEspeciales.length;
}
