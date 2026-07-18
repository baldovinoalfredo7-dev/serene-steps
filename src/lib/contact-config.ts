// Configuración del contacto humano del Área 2 Metropolitana.
// Estos valores serán editables desde el panel de administración
// cuando se habilite el Área de Servicio. Por ahora se mantienen
// como constantes para permitir cambios rápidos sin modificar UI.

export const contactConfig = {
  // Número en formato internacional, sin '+' ni espacios, para wa.me
  whatsappNumber: "573001234567",
  // Número para tel: (con '+' y prefijo de país)
  phoneNumber: "+573001234567",
  // Etiqueta legible para mostrar en pantalla
  phoneDisplay: "+57 300 123 4567",
  // Municipios disponibles en el formulario
  municipalities: [
    "Barranquilla",
    "Soledad",
    "Malambo",
    "Galapa",
    "Puerto Colombia",
    "Otro",
  ] as const,
};

export function whatsappLink(prefilled?: string) {
  const base = `https://wa.me/${contactConfig.whatsappNumber}`;
  return prefilled ? `${base}?text=${encodeURIComponent(prefilled)}` : base;
}

export function telLink() {
  return `tel:${contactConfig.phoneNumber}`;
}
