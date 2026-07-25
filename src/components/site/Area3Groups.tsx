import { Clock, MapPin, Navigation } from "lucide-react";
import { area3Groups } from "@/lib/area3-groups";

/**
 * Listado informativo de los grupos del Área 3.
 * Reutiliza el mismo lenguaje visual de las tarjetas del Área 2.
 */
export function Area3Groups() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {area3Groups.map((g) => {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          `${g.address}, Barranquilla, Atlántico, Colombia`,
        )}`;
        return (
          <article
            key={g.name}
            className="flex flex-col rounded-3xl bg-paper p-7 shadow-soft ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-lift md:p-8"
          >
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand/80">
              Barranquilla
            </span>
            <h3 className="mb-4 font-serif text-2xl italic text-brand">{g.name}</h3>

            <p className="mb-5 flex items-start gap-2 text-sm text-ink/80">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
              <span>{g.address}</span>
            </p>

            <ul className="mb-6 space-y-1.5 text-sm text-ink/85">
              {g.schedule.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand/70" strokeWidth={1.8} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand transition-colors hover:bg-brand hover:text-paper"
              >
                <Navigation className="size-4" />
                Cómo llegar
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
