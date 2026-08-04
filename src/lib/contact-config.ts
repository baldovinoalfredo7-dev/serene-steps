// Configuración del contacto humano del Área 2 Metropolitana.
// Estos valores serán editables desde el panel de administración
// cuando se habilite el Área de Servicio. Por ahora se mantienen
// como constantes para permitir cambios rápidos sin modificar UI.

export const contactConfig = {
  // --- Identidad del Área (reemplazable para otras Áreas de Servicio) ---
  areaName: "Área 2 Metropolitana de Barranquilla",
  areaShortName: "Área 2 Metropolitana",
  siteUrl: "https://hope-finds-you-here.lovable.app",
  email: "area2metropolitana@gmail.com",
  // Número en formato internacional, sin '+' ni espacios, para wa.me
  whatsappNumber: "573245577038",

  // Número para tel: (con '+' y prefijo de país)
  phoneNumber: "+573245577038",
  // Etiqueta legible para mostrar en pantalla
  phoneDisplay: "324 557 7038",
  // Comité de Cooperación (CCP/IP)
  cooperationPhoneNumber: "+573015257665",
  cooperationPhoneDisplay: "301 525 7665",
  // Dirección oficial de la Oficina del Área
  officeAddressLine1: "Calle 63 #22D-39, Local 2",
  officeAddressLine2: "Las Moras IV Etapa",
  officeCity: "Soledad, Atlántico",
  officeMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Calle+63+%2322D-39+Local+2,+Las+Moras+IV+Etapa,+Soledad,+Atl%C3%A1ntico",
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

export function cooperationTelLink() {
  return `tel:${contactConfig.cooperationPhoneNumber}`;
}
