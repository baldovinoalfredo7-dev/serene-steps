import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Share2,
  Star,
} from "lucide-react";
import { getPublicEvent, type PublicEvent } from "@/lib/events.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/eventos/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["public", "event", params.slug],
      queryFn: () => getPublicEvent({ data: { slug: params.slug } }),
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Evento no disponible" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const e = loaderData as PublicEvent;
    const desc = (e.description ?? "Evento del Área 2 Metropolitana de AA").slice(0, 160);
    return {
      meta: [
        { title: `${e.title} — Eventos AA Área 2` },
        { name: "description", content: desc },
        { property: "og:title", content: e.title },
        { property: "og:description", content: desc },
        ...(e.imageUrl ? [{ property: "og:image", content: e.imageUrl }] : []),
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm text-red-600">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl italic text-brand">Evento no encontrado</h1>
      <p className="mt-3 text-sm text-ink/70">
        Puede haber sido despublicado o cambió de dirección.
      </p>
      <Link
        to="/eventos"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a eventos
      </Link>
    </div>
  ),
  component: EventDetailPage,
});

function fmtLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EventDetailPage() {
  const { slug } = Route.useParams();
  const call = useServerFn(getPublicEvent);
  const { data: e } = useSuspenseQuery({
    queryKey: ["public", "event", slug],
    queryFn: () => call({ data: { slug } }),
  });
  const [sharing, setSharing] = useState(false);

  if (!e) return null;

  async function handleShare() {
    if (!e) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    setSharing(true);
    try {
      const nav: Navigator | undefined =
        typeof navigator !== "undefined" ? navigator : undefined;
      if (nav && "share" in nav) {
        await nav.share({ title: e.title, url });
      } else if (nav?.clipboard) {
        await nav.clipboard.writeText(url);
        toast.success("Enlace copiado");
      }
    } catch {
      /* user cancelled */
    } finally {
      setSharing(false);
    }
  }

  const start = new Date(e.startsAt);

  return (
    <article className="bg-paper">
      {e.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <img
            src={e.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <section className="border-b border-brand/5 bg-soft/40 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/eventos"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            <ArrowLeft className="size-4" /> Todos los eventos
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {e.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-700">
                <Star className="size-3" /> Destacado
              </span>
            )}
            {e.municipalityName && (
              <span className="text-xs font-semibold uppercase tracking-widest text-brand/80">
                {e.municipalityName}
              </span>
            )}
          </div>
          <h1 className="text-balance font-serif text-4xl italic leading-tight text-brand md:text-5xl">
            {e.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={sharing}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 px-4 py-2 text-sm font-semibold text-brand hover:bg-paper"
            >
              <Share2 className="size-4" /> Compartir
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-3xl gap-8 px-6 md:grid-cols-[1fr_260px]">
          <div className="space-y-6">
            {e.description ? (
              <div className="whitespace-pre-wrap text-pretty text-base leading-relaxed text-ink/85">
                {e.description}
              </div>
            ) : (
              <p className="text-sm text-ink/60">Sin descripción.</p>
            )}
            {e.organizer && (
              <p className="text-sm text-ink/70">
                <span className="font-semibold text-brand">Organiza:</span> {e.organizer}
              </p>
            )}
          </div>

          <aside className="space-y-4 rounded-2xl border border-brand/10 bg-soft/40 p-5 text-sm">
            <InfoRow icon={Calendar} label="Fecha">
              <span className="capitalize">{fmtLongDate(e.startsAt)}</span>
              {e.endsAt && new Date(e.endsAt).toDateString() !== start.toDateString() && (
                <span className="block text-xs text-ink/60">
                  hasta {fmtLongDate(e.endsAt)}
                </span>
              )}
              <span className="mt-1 block text-xs text-ink/60">
                {fmtTime(e.startsAt)}
                {e.endsAt ? ` – ${fmtTime(e.endsAt)}` : ""}
              </span>
            </InfoRow>
            {(e.location || e.addressLine) && (
              <InfoRow icon={MapPin} label="Lugar">
                {e.location && <span className="block">{e.location}</span>}
                {e.addressLine && (
                  <span className="block text-xs text-ink/60">{e.addressLine}</span>
                )}
              </InfoRow>
            )}
            {e.contactName && (
              <InfoRow icon={User} label="Contacto">
                {e.contactName}
              </InfoRow>
            )}
            {e.contactPhone && (
              <InfoRow icon={Phone} label="Teléfono">
                <a href={`tel:${e.contactPhone}`} className="hover:underline">
                  {e.contactPhone}
                </a>
              </InfoRow>
            )}
            {e.contactEmail && (
              <InfoRow icon={Mail} label="Correo">
                <a href={`mailto:${e.contactEmail}`} className="hover:underline">
                  {e.contactEmail}
                </a>
              </InfoRow>
            )}
          </aside>
        </div>
      </section>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-brand/70" />
      <div className="min-w-0">
        <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-brand/70">
          {label}
        </div>
        <div className="text-ink/85">{children}</div>
      </div>
    </div>
  );
}
