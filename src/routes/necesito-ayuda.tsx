import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/necesito-ayuda")({
  head: () => ({
    meta: [
      { title: "Necesito ayuda ahora — AA Área 2 Metropolitana" },
      {
        name: "description",
        content: "Contacto inmediato con Alcohólicos Anónimos. Línea disponible las 24 horas.",
      },
      { property: "og:title", content: "Necesito ayuda ahora" },
      {
        property: "og:description",
        content: "Línea de ayuda 24h y acceso directo a los grupos del Área 2 Metropolitana.",
      },
    ],
  }),
  component: NecesitoAyuda,
});

function NecesitoAyuda() {
  return (
    <section className="bg-brand py-20 text-paper md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-paper/60">
          Estamos aquí
        </span>
        <h1 className="mb-6 text-balance font-serif text-4xl italic leading-tight md:text-6xl">
          Respira. La ayuda está a una llamada de distancia.
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-paper/85">
          Llama en cualquier momento. Contestará un miembro de AA. No hay juicios, no hay costo, no
          hay compromiso. Solo alguien que ha estado donde tú estás ahora.
        </p>

        <a
          href="tel:+525555550000"
          className="mb-6 inline-flex items-center gap-3 rounded-sm bg-paper px-10 py-5 text-lg font-semibold uppercase tracking-wider text-brand shadow-2xl transition-transform hover:-translate-y-0.5"
        >
          <Phone className="size-5" />
          55 5555 0000
        </a>
        <p className="text-sm text-paper/60">Disponible las 24 horas, los 365 días del año.</p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            to="/grupos"
            className="group flex items-center justify-between rounded-2xl bg-paper/5 p-6 text-left ring-1 ring-paper/10 transition-colors hover:bg-paper/10"
          >
            <div>
              <MapPin className="mb-3 size-5 text-paper/70" />
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-paper/50">
                O si prefieres
              </span>
              <span className="font-serif text-xl italic">Encuentra un grupo</span>
            </div>
            <ArrowRight className="size-5 opacity-60 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/primera-reunion"
            className="group flex items-center justify-between rounded-2xl bg-paper/5 p-6 text-left ring-1 ring-paper/10 transition-colors hover:bg-paper/10"
          >
            <div>
              <span className="mb-3 block size-5 rounded-full bg-paper/20" />
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-paper/50">
                Preguntas frecuentes
              </span>
              <span className="font-serif text-xl italic">Tu primera reunión</span>
            </div>
            <ArrowRight className="size-5 opacity-60 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
