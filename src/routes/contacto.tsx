import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import {
  Presentation,
  Building2,
  Stethoscope,
  Newspaper,
  MapPin,
  Phone,
  Clock,
  PhoneCall,
} from "lucide-react";
import type { ReactNode } from "react";
import { contactConfig, cooperationTelLink } from "@/lib/contact-config";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Quiero cooperar — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Información para profesionales, instituciones y medios de comunicación que desean cooperar con Alcohólicos Anónimos del Área 2 Metropolitana.",
      },
      { property: "og:title", content: "Quiero cooperar con Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Charlas informativas, cooperación con instituciones e información pública. Todas nuestras actividades son gratuitas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Cooperar,
});

type Card = {
  icon: typeof Stethoscope;
  title: string;
  body: string;
};

const cards: readonly Card[] = [
  {
    icon: Presentation,
    title: "Charlas informativas",
    body: "Ofrecemos charlas gratuitas en las que miembros de Alcohólicos Anónimos explican qué es nuestra Comunidad, cómo funciona el programa de recuperación y de qué manera una persona puede acercarse por primera vez.",
  },
  {
    icon: Building2,
    title: "Cooperación con instituciones",
    body: "Colaboramos con hospitales, clínicas, universidades, colegios, empresas y entidades públicas o privadas facilitando información, material impreso y actividades conjuntas que respetan la autonomía de cada organización.",
  },
  {
    icon: Stethoscope,
    title: "Información para profesionales",
    body: "Brindamos a médicos, psicólogos, trabajadores sociales y orientadores información clara sobre cómo remitir a una persona a AA y qué puede esperar de nuestra Comunidad como recurso complementario a su tratamiento.",
  },
  {
    icon: Newspaper,
    title: "Información pública y medios",
    body: "Ponemos a disposición de los medios de comunicación información institucional veraz sobre Alcohólicos Anónimos y facilitamos el contacto con nuestros servidores de Información Pública, preservando el anonimato de los miembros.",
  },
];

const principios: readonly string[] = [
  "Todas nuestras actividades son gratuitas.",
  "No sustituimos la atención médica, psicológica o psiquiátrica.",
  "Compartimos únicamente nuestra experiencia en recuperación.",
  "Respetamos la autonomía de cada institución.",
  "Nuestro único propósito es ayudar al alcohólico que aún sufre.",
];

const faqs: readonly { q: string; a: string }[] = [
  {
    q: "¿AA cobra por sus actividades?",
    a: "No. Todas nuestras charlas, reuniones informativas y actividades de cooperación son completamente gratuitas. Alcohólicos Anónimos se sostiene con las contribuciones voluntarias de sus propios miembros.",
  },
  {
    q: "¿Cómo puedo solicitar una charla?",
    a: "Puedes comunicarte con la Oficina del Área 2 por teléfono. Coordinaremos la fecha, el lugar y el enfoque de la charla con el Comité de Cooperación con la Comunidad Profesional e Información Pública.",
  },
  {
    q: "¿Cómo remitir una persona a AA?",
    a: "Basta con indicarle la dirección y el horario de un grupo cercano, o comunicarte con nosotros para orientar el primer contacto. No se requiere remisión escrita, cita previa ni ningún trámite.",
  },
  {
    q: "¿Qué tipo de instituciones visitan?",
    a: "Hospitales, clínicas, centros de tratamiento, universidades, colegios, empresas, entidades públicas y organizaciones sociales que deseen conocer nuestra Comunidad.",
  },
  {
    q: "¿Quién puede solicitar información?",
    a: "Cualquier persona o institución interesada: profesionales de la salud, docentes, empleadores, medios de comunicación, familiares o cualquier persona que desee conocer más sobre Alcohólicos Anónimos.",
  },
];

function Cooperar() {
  return (
    <PageShell
      eyebrow="Cooperación"
      title="No tengo problemas con el alcohol, pero quiero cooperar"
      intro="Si eres profesional de la salud, representas una institución, trabajas en un medio de comunicación o simplemente deseas conocer más sobre Alcohólicos Anónimos, este espacio es para ti. Nos alegrará compartir información y explorar formas de cooperación."
    >
      <div className="space-y-16">
        {/* Hero CTA */}
        <div>
          <a
            href={cooperationTelLink()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
          >
            <PhoneCall className="size-4" /> Llamar al Comité de Cooperación
          </a>
        </div>

        {/* 2. Qué significa cooperar */}
        <section>
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            ¿Qué significa cooperar con Alcohólicos Anónimos?
          </h2>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ink/80">
            Cooperar significa trabajar juntos para que más personas con problemas con el
            alcohol sepan que existe un lugar donde pueden encontrar ayuda. Compartimos
            información sobre nuestra Comunidad y colaboramos con profesionales e
            instituciones respetando siempre la autonomía de cada organización.
          </p>
        </section>

        {/* 3. Cómo podemos colaborar */}
        <section>
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            ¿Cómo podemos colaborar?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {cards.map((c) => (
              <CoopCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        {/* 4. Principios de cooperación */}
        <aside className="rounded-3xl bg-soft/60 p-8 sm:p-10 ring-1 ring-brand/10">
          <h2 className="font-serif text-2xl italic leading-tight text-brand sm:text-3xl">
            Nuestra cooperación se basa en principios sencillos
          </h2>
          <ul className="mt-6 space-y-3">
            {principios.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-relaxed text-ink/80">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/60" />
                <span className="text-pretty">{p}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* CTA única */}
        <section className="rounded-3xl bg-paper p-8 text-center ring-1 ring-brand/10 sm:p-12">
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            ¿Deseas cooperar con Alcohólicos Anónimos?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink/80">
            Si deseas solicitar una charla informativa, establecer un vínculo de cooperación
            con nuestra Comunidad o recibir más información, estaremos encantados de atenderte.
          </p>
          <div className="mt-8">
            <a
              href={cooperationTelLink()}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
            >
              <PhoneCall className="size-4" /> Llamar al Comité de Cooperación
            </a>
          </div>
        </section>

        {/* 5. Preguntas frecuentes */}
        <section>
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-paper p-6 ring-1 ring-black/5 transition-shadow hover:shadow-lift md:p-8"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg italic text-brand md:text-xl">
                  {f.q}
                  <span className="mt-1 shrink-0 text-brand/80 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 6. Contacto */}
        <section id="contacto">
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            Hablemos
          </h2>
          <div className="mt-6 rounded-2xl bg-paper p-8 ring-1 ring-black/5 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand/80">
              Oficina del Área 2 Metropolitana
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
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
                    <br />
                    {contactConfig.officeCity}
                  </span>
                </a>
              </InfoBlock>
              <InfoBlock icon={<Phone className="size-5" />} label="Teléfono">
                {contactConfig.phoneDisplay}
                <br />
                Comité de Cooperación: {contactConfig.cooperationPhoneDisplay}
              </InfoBlock>
              <InfoBlock icon={<Clock className="size-5" />} label="Horario de atención">
                Lunes a viernes
                <br />
                2:00 p. m. – 6:00 p. m.
              </InfoBlock>
            </div>
            <div className="mt-8">
              <a
                href={cooperationTelLink()}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
              >
                <PhoneCall className="size-4" /> Llamar al Comité de Cooperación
              </a>
            </div>
          </div>
        </section>

        {/* 7. Cierre */}
        <section className="rounded-3xl bg-soft/60 p-8 text-center sm:p-12">
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-ink/80">
            Gracias por tu interés en colaborar con Alcohólicos Anónimos. Cada esfuerzo
            conjunto puede ayudar a que una persona encuentre el camino hacia la recuperación.
          </p>
        </section>
      </div>
    </PageShell>
  );
}

function CoopCard({ icon: Icon, title, body }: Card) {
  return (
    <article className="flex flex-col rounded-2xl bg-paper p-8 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-brand/20">
      <span className="mb-4 grid size-11 place-items-center rounded-full bg-brand/10 text-brand">
        <Icon className="size-5" />
      </span>
      <h3 className="font-serif text-xl leading-tight text-brand">{title}</h3>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink/80">{body}</p>
    </article>
  );
}

function InfoBlock({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
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
