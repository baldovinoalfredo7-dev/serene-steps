import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Navigation, PhoneCall, CalendarDays } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/_authenticated/miembros/area")({
  head: () => ({
    meta: [
      { title: "Bienvenido a tu casa en el Área 2 · AA Área 2 Metropolitana" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AreaHome,
});

function AreaHome() {
  return (
    <div className="mx-auto max-w-4xl space-y-16">
      {/* 1. Bienvenida */}
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Área de miembros
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-5xl">
          Bienvenido a tu casa en el Área 2
        </h1>
        <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-ink/85">
          <p>Nos alegra recibirte.</p>
          <p>
            Este espacio fue creado para acercarte a la comunidad de Alcohólicos Anónimos del
            Área 2 Metropolitana de Barranquilla. Aquí encontrarás información sobre nuestro
            servicio, nuestras actividades y las diferentes formas de participar en la vida de AA.
          </p>
          <p>
            Queremos que esta página sea un lugar útil, cercano y fácil de recorrer, donde siempre
            encuentres orientación y una mano amiga.
          </p>
        </div>
      </header>

      {/* 2. ¿Qué es el Área 2? */}
      <Section title="¿Qué es el Área 2?">
        <p>
          El Área 2 Metropolitana de Barranquilla reúne a los grupos de Alcohólicos Anónimos de
          nuestra jurisdicción que trabajan unidos para fortalecer el servicio y llevar el mensaje
          de recuperación a quien aún sufre.
        </p>
        <p>
          Cada grupo conserva su autonomía y participa, junto con los demás, en un esfuerzo común
          basado en los principios de Alcohólicos Anónimos.
        </p>
      </Section>

      {/* 3. Cómo nos organizamos */}
      <Section title="Cómo nos organizamos">
        <p>
          Nuestro servicio se desarrolla a través de una estructura formada por grupos, distritos,
          comités y servidores de confianza que trabajan de manera voluntaria.
        </p>
        <p>
          Cada servidor cumple una función específica con un mismo propósito: apoyar a los grupos
          y contribuir para que el mensaje de Alcohólicos Anónimos llegue a quien lo necesita.
        </p>
      </Section>

      {/* 4. Nuestro servicio */}
      <Section
        title="Nuestro servicio"
        intro="Los comités de servicio del Área 2 acompañan el trabajo de los grupos en distintas áreas. Muy pronto encontrarás aquí la información oficial de cada uno."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex min-h-40 flex-col justify-between rounded-2xl border border-dashed border-brand/20 bg-paper p-6"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand/60">
                Comité
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                Próximamente publicaremos aquí el nombre y propósito de este comité.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Nuestra agenda */}
      <Section title="Nuestra agenda">
        <div className="rounded-2xl border border-brand/10 bg-paper p-8 text-center">
          <span className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-brand/10 text-brand">
            <CalendarDays className="size-5" />
          </span>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-ink/80">
            Próximamente encontrarás aquí las actividades programadas del Área 2 Metropolitana
            de Barranquilla: asambleas, talleres, foros y actividades de servicio.
          </p>
        </div>
      </Section>

      {/* 6. Visítanos */}
      <Section title="Visítanos">
        <div className="rounded-2xl bg-paper p-8 ring-1 ring-black/5 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <InfoBlock icon={<MapPin className="size-5" />} label="Dirección">
              Calle 63 # 22D-39, Local 2
              <br />
              Las Moras IV Etapa
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-5" />} label="Teléfono">
              324 557 7038
            </InfoBlock>
            <InfoBlock icon={<Clock className="size-5" />} label="Horario de atención">
              Lunes a viernes
              <br />
              2:00 p. m. a 6:00 p. m.
            </InfoBlock>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand/90"
            >
              <Navigation className="size-4" /> Cómo llegar
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-paper px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-soft"
            >
              <PhoneCall className="size-4" /> Llamar
            </button>
          </div>
        </div>
      </Section>

      {/* 7. Cierre */}
      <section className="rounded-3xl bg-soft/60 p-8 text-center sm:p-12">
        <h2 className="font-serif text-2xl italic text-brand sm:text-3xl">
          Esta también es tu casa.
        </h2>
        <div className="mx-auto mt-5 max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-ink/80">
          <p>
            El Área 2 Metropolitana de Barranquilla existe gracias al servicio voluntario de
            hombres y mujeres que comparten su experiencia, fortaleza y esperanza.
          </p>
          <p>
            Si haces parte de Alcohólicos Anónimos, aquí siempre encontrarás un espacio para
            servir, aprender y crecer junto a otros compañeros.
          </p>
          <p className="font-medium text-brand">Gracias por visitarnos. Siempre serás bienvenido.</p>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl leading-tight text-brand sm:text-3xl">{title}</h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-ink/75">{intro}</p>
      )}
      <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
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
