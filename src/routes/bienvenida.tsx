import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { MapPin, Building2, Clock, Phone, Mail, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/bienvenida")({
  head: () => ({
    meta: [
      { title: "Bienvenido al Área 2 Metropolitana de Barranquilla — AA" },
      {
        name: "description",
        content:
          "Presentación del Área 2 Metropolitana de Barranquilla de Alcohólicos Anónimos e información de contacto de la Oficina del Área.",
      },
      {
        property: "og:title",
        content: "Bienvenido al Área 2 Metropolitana de Barranquilla",
      },
      {
        property: "og:description",
        content:
          "Quiénes somos y cómo contactar la Oficina del Área 2 Metropolitana de Barranquilla.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/bienvenida" }],
  }),
  component: Bienvenida,
});

function Bienvenida() {
  return (
    <PageShell
      eyebrow="El Área 2"
      title="Bienvenido al Área 2 Metropolitana de Barranquilla"
      intro="El Área 2 Metropolitana de Barranquilla forma parte de la estructura de servicio de Alcohólicos Anónimos en Colombia y reúne a los grupos de AA del área metropolitana de Barranquilla. Su propósito es apoyar y coordinar las actividades de servicio, respetando la autonomía de cada grupo y los principios de Alcohólicos Anónimos."
    >
      <section>
        <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
          Oficina del Área
        </h2>
        <div className="mt-6 rounded-2xl bg-paper p-8 ring-1 ring-black/5 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <InfoBlock icon={<MapPin className="size-5" />} label="Dirección">
              Calle 63 #22D-39, Local 2
              <br />
              Las Moras IV Etapa
            </InfoBlock>
            <InfoBlock icon={<Building2 className="size-5" />} label="Ciudad">
              Barranquilla, Atlántico
            </InfoBlock>
            <InfoBlock icon={<Clock className="size-5" />} label="Horario de atención">
              Lunes a viernes
              <br />
              2:00 p. m. – 6:00 p. m.
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-5" />} label="Teléfono">
              324 557 7038
            </InfoBlock>
            <InfoBlock icon={<Mail className="size-5" />} label="Correo electrónico">
              <a
                href="mailto:area2metropolitana@gmail.com"
                className="text-brand underline underline-offset-4"
              >
                area2metropolitana@gmail.com
              </a>
            </InfoBlock>
          </div>

          <div className="mt-8">
            <a
              href="tel:+573245577038"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
            >
              <PhoneCall className="size-4" /> Llamar a la oficina
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <span className="mb-3 grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
        {icon}
      </span>
      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/80">
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-ink/85">{children}</p>
    </div>
  );
}
