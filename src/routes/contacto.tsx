import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Contacto de la Oficina de Información Pública del Área 2 Metropolitana de AA.",
      },
      { property: "og:title", content: "Contacto AA Área 2" },
      {
        property: "og:description",
        content: "Teléfonos y correo de la oficina de información pública del Área 2.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <PageShell
      eyebrow="Información pública"
      title="Contacto"
      intro="Estamos aquí para responder tus preguntas sobre AA, orientarte hacia un grupo o coordinar actividades de información pública."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <ContactCard icon={<Phone className="size-5" />} label="Teléfono 24h" value="55 5555 0000" href="tel:+525555550000" />
        <ContactCard icon={<Mail className="size-5" />} label="Correo" value="info@aa-area2.org.mx" href="mailto:info@aa-area2.org.mx" />
        <ContactCard icon={<MapPin className="size-5" />} label="Oficina" value="Ciudad de México" />
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-ink/55">
        Si estás en una situación urgente y sientes que necesitas ayuda ahora mismo, usa el botón{" "}
        <strong className="text-brand">Necesito ayuda ahora</strong> disponible en cada página.
      </p>
    </PageShell>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="mb-4 grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
        {icon}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand/50">{label}</span>
      <span className="mt-2 font-serif text-xl text-brand">{value}</span>
    </>
  );
  const className =
    "flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20";
  if (href) return <a href={href} className={className}>{inner}</a>;
  return <div className={className}>{inner}</div>;
}
