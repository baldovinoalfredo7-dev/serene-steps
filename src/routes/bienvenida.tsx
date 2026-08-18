import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { MapPin, Building2, Clock, Phone, Mail, PhoneCall, ArrowRight, MessageCircle, Navigation } from "lucide-react";
import type { ReactNode } from "react";
import { contactConfig, telLink, whatsappLink } from "@/lib/contact-config";

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
    links: [{ rel: "canonical", href: "https://hope-finds-you-here.lovable.app/bienvenida" }],
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
        <div className="mt-6 rounded-2xl bg-paper p-8 ring-1 ring-brand/10 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <InfoBlock icon={<MapPin className="size-5" />} label="Dirección">
              <a
                href={contactConfig.officeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-brand underline underline-offset-4"
              >
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {contactConfig.officeAddressLine1}
                  <br />
                  {contactConfig.officeAddressLine2}
                </span>
              </a>
            </InfoBlock>
            <InfoBlock icon={<Building2 className="size-5" />} label="Ciudad">
              {contactConfig.officeCity}
            </InfoBlock>
            <InfoBlock icon={<Clock className="size-5" />} label="Horario de atención">
              Lunes a viernes
              <br />
              2:00 p. m. – 6:00 p. m.
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-5" />} label="Teléfono">
              {contactConfig.phoneDisplay}
            </InfoBlock>
            <InfoBlock icon={<Mail className="size-5" />} label="Correo electrónico">
              <a
                href={`mailto:${contactConfig.email}`}
                className="text-brand underline underline-offset-4"
              >
                {contactConfig.email}
              </a>
            </InfoBlock>
            <InfoBlock icon={<MessageCircle className="size-5" />} label="WhatsApp">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-4"
              >
                {contactConfig.phoneDisplay}
              </a>
            </InfoBlock>
            <InfoBlock icon={<Navigation className="size-5" />} label="Cómo llegar">
              <a
                href={contactConfig.officeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-4"
              >
                Ver ruta en el mapa
              </a>
            </InfoBlock>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telLink()}
              className="btn-aa"
            >
              <PhoneCall className="size-4" /> Llamar a la oficina
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aa-outline"
            >
              <MessageCircle className="size-4" /> Escribir por WhatsApp
            </a>
            <a href={`mailto:${contactConfig.email}`} className="btn-aa-outline">
              <Mail className="size-4" /> Enviar correo
            </a>
            <a
              href={contactConfig.officeMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aa-outline"
            >
              <Navigation className="size-4" /> Cómo llegar
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-paper p-8 ring-1 ring-brand/10 sm:p-10">
        <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
          Alcohólicos Anónimos en Colombia
        </h2>
        <p className="mt-5 max-w-prose text-pretty text-base leading-[1.7] text-ink/85">
          El Área 2 Metropolitana de Barranquilla hace parte de la comunidad de Alcohólicos Anónimos en Colombia,
          integrada por Áreas, Distritos y Grupos que trabajan unidos para llevar el mensaje de recuperación a
          quien aún sufre. Si deseas conocer más sobre la organización nacional, puedes visitar el sitio oficial
          de la Corporación Nacional de Alcohólicos Anónimos de Colombia.
        </p>
        <div className="mt-8">
          <a
            href="https://aacolombia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aa"
          >
            Visitar AA Colombia <ArrowRight className="size-4" />
          </a>
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
