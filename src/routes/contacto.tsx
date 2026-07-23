import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Stethoscope, Building2, Newspaper, HandHeart, MapPin, Phone, Clock, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Quiero cooperar — AA Área 2 Metropolitana" },
      {
        name: "description",
        content:
          "Información para profesionales, instituciones y medios de comunicación que desean cooperar con Alcohólicos Anónimos del Área 2 Metropolitana de Barranquilla.",
      },
      { property: "og:title", content: "Quiero cooperar con Alcohólicos Anónimos" },
      {
        property: "og:description",
        content:
          "Profesionales, instituciones y medios de comunicación que desean conocer o cooperar con AA Área 2.",
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
    icon: Stethoscope,
    title: "Soy profesional de la salud",
    body: "Si eres médico, psicólogo, trabajador social, orientador o profesional de la salud, podemos brindarte información sobre Alcohólicos Anónimos y coordinar actividades de información pública cuando sean solicitadas.",
  },
  {
    icon: Building2,
    title: "Represento una institución",
    body: "Si haces parte de un hospital, clínica, universidad, colegio, empresa, entidad pública o privada, podemos coordinar charlas informativas y actividades de cooperación sobre Alcohólicos Anónimos.",
  },
  {
    icon: Newspaper,
    title: "Trabajo en un medio de comunicación",
    body: "Si representas un medio de comunicación, estaremos disponibles para brindar información institucional sobre Alcohólicos Anónimos y facilitar el contacto con nuestros servidores de Información Pública.",
  },
  {
    icon: HandHeart,
    title: "Quiero conocer más sobre Alcohólicos Anónimos",
    body: "Si deseas conocer mejor nuestra Comunidad, resolver inquietudes o solicitar información general, con gusto te orientaremos.",
  },
];

function Cooperar() {
  return (
    <PageShell
      eyebrow="Cooperación"
      title="Quiero cooperar"
      intro="En Alcohólicos Anónimos creemos en el valor de la cooperación para que nuestro mensaje de recuperación llegue a quien aún sufre. Si representas una institución, eres profesional, haces parte de un medio de comunicación o deseas conocer más sobre nuestra labor, estaremos encantados de atenderte."
    >
      <div className="space-y-16">
        {/* Bloque destacado */}
        <aside className="rounded-3xl bg-soft/60 p-8 sm:p-10 ring-1 ring-brand/10">
          <h2 className="font-serif text-2xl italic leading-tight text-brand sm:text-3xl">
            Toda la cooperación que ofrece Alcohólicos Anónimos es completamente gratuita.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink/80">
            Las charlas informativas, reuniones con instituciones, orientación a profesionales
            y demás actividades de cooperación no tienen costo. Nuestro único propósito es
            llevar el mensaje de recuperación a quien aún sufre.
          </p>
        </aside>

        {/* Tarjetas */}
        <section>
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            ¿Cómo podemos cooperar contigo?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {cards.map((c) => (
              <CoopCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section>
          <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">
            ¿Prefieres hablar con nosotros?
          </h2>
          <div className="mt-6 rounded-2xl bg-paper p-8 ring-1 ring-black/5 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand/80">
              Oficina del Área 2 Metropolitana de Barranquilla
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              <InfoBlock icon={<MapPin className="size-5" />} label="Dirección">
                Calle 63 #22D-39, Local 2
                <br />
                Las Moras IV Etapa
              </InfoBlock>
              <InfoBlock icon={<Phone className="size-5" />} label="Teléfono">
                324 557 7038
              </InfoBlock>
              <InfoBlock icon={<Clock className="size-5" />} label="Horario de atención">
                Lunes a viernes
                <br />
                2:00 p. m. – 6:00 p. m.
              </InfoBlock>
            </div>
            <div className="mt-8">
              <a
                href="tel:+573245577038"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
              >
                <PhoneCall className="size-4" /> Contáctanos
              </a>
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="rounded-3xl bg-soft/60 p-8 text-center sm:p-12">
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-ink/80">
            Cooperamos con personas e instituciones preservando siempre nuestra autonomía
            y nuestro propósito primordial.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink/80">
            Gracias por tu interés en Alcohólicos Anónimos. Estaremos atentos para brindarte
            la información que necesites.
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
      <div className="mt-6">
        <Link
          to="/contacto"
          hash="contacto"
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-paper px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-soft"
        >
          Solicitar información
        </Link>
      </div>
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
