/**
 * Información financiera del Área 2 Metropolitana.
 *
 * Para publicar un nuevo informe mensual basta con subir la imagen como asset
 * y agregar una entrada al inicio de `informesMensuales` (orden cronológico
 * descendente). No es necesario modificar la página.
 */

import presupuesto2026 from "@/assets/finanzas/presupuesto-2026.jpg.asset.json";
import tesoreriaJulio2026 from "@/assets/finanzas/tesoreria-julio-2026.png.asset.json";

export type FinanceDoc = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  format: "PNG" | "JPG";
};

export const presupuesto: FinanceDoc = {
  id: "presupuesto-2026",
  title: "Presupuesto del Área 2 · Año 2026",
  subtitle: "Presentado el 17 de mayo de 2026",
  image: presupuesto2026.url,
  format: "JPG",
};

export const informesMensuales: FinanceDoc[] = [
  {
    id: "tesoreria-2026-07",
    title: "Informe de Tesorería — Julio 2026",
    subtitle: "Corte al 31 de julio de 2026",
    image: tesoreriaJulio2026.url,
    format: "PNG",
  },
];
