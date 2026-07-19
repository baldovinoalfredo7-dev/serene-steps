import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Archive,
  Star,
  ExternalLink,
} from "lucide-react";
import {
  listEventsAdmin,
  setEventStatus,
  duplicateEvent,
  deleteEvent,
  type EventStatus,
} from "@/lib/events.functions";
import { listMunicipalitiesAdmin } from "@/lib/service.functions";

export const Route = createFileRoute("/_authenticated/servicio/eventos/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "events"],
      queryFn: () => listEventsAdmin(),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    });
  },
  component: EventsAdminList,
});

const statusMeta: Record<EventStatus, { label: string; className: string }> = {
  draft: { label: "Borrador", className: "bg-soft text-ink/70" },
  published: { label: "Publicado", className: "bg-brand/10 text-brand" },
  archived: { label: "Archivado", className: "bg-ink/10 text-ink/60" },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}

function EventsAdminList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const callList = useServerFn(listEventsAdmin);
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callStatus = useServerFn(setEventStatus);
  const callDup = useServerFn(duplicateEvent);
  const callDel = useServerFn(deleteEvent);

  const { data: events } = useSuspenseQuery({
    queryKey: ["service", "events"],
    queryFn: () => callList(),
  });
  useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | EventStatus>("all");

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["service", "events"] });

  const changeStatus = useMutation({
    mutationFn: (v: { id: string; status: EventStatus }) => callStatus({ data: v }),
    onSuccess: () => {
      toast.success("Estado actualizado");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const duplicate = useMutation({
    mutationFn: (id: string) => callDup({ data: { id } }),
    onSuccess: ({ id }) => {
      toast.success("Evento duplicado");
      invalidate();
      navigate({ to: "/servicio/eventos/$id", params: { id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => callDel({ data: { id } }),
    onSuccess: () => {
      toast.success("Evento eliminado");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return events.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (
        term &&
        !e.title.toLowerCase().includes(term) &&
        !(e.location ?? "").toLowerCase().includes(term) &&
        !(e.municipalityName ?? "").toLowerCase().includes(term)
      )
        return false;
      return true;
    });
  }, [events, q, status]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl italic text-brand md:text-4xl">Eventos</h1>
          <p className="mt-1 text-sm text-ink/70">
            {events.length} eventos en el sistema.
          </p>
        </div>
        <Link
          to="/servicio/eventos/nuevo"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90"
        >
          <Plus className="size-4" /> Nuevo evento
        </Link>
      </header>

      <section className="grid gap-3 rounded-2xl border border-brand/10 bg-paper p-4 sm:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, lugar o municipio…"
            className="w-full rounded-full border border-brand/15 bg-soft/40 py-2.5 pl-10 pr-4 text-sm focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm focus:border-brand/40 focus:outline-none"
        >
          <option value="all">Todos los estados</option>
          <option value="draft">Borradores</option>
          <option value="published">Publicados</option>
          <option value="archived">Archivados</option>
        </select>
      </section>

      <section className="overflow-hidden rounded-2xl border border-brand/10 bg-paper">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink/60">
            No hay eventos que coincidan con los filtros.
          </div>
        ) : (
          <ul className="divide-y divide-brand/5">
            {filtered.map((e) => {
              const meta = statusMeta[e.status];
              return (
                <li
                  key={e.id}
                  className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-soft/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-serif text-lg text-brand">
                        {e.title}
                      </span>
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide " +
                          meta.className
                        }
                      >
                        {meta.label}
                      </span>
                      {e.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-700">
                          <Star className="size-3" /> Destacado
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-ink/60">
                      {fmtDate(e.startsAt)}
                      {e.endsAt ? ` – ${fmtDate(e.endsAt)}` : ""}
                      {e.location ? ` · ${e.location}` : ""}
                      {e.municipalityName ? ` · ${e.municipalityName}` : ""}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {e.status === "published" ? (
                      <IconBtn
                        onClick={() =>
                          changeStatus.mutate({ id: e.id, status: "draft" })
                        }
                        disabled={changeStatus.isPending}
                        title="Despublicar"
                      >
                        <EyeOff className="size-3.5" /> Despublicar
                      </IconBtn>
                    ) : (
                      <IconBtn
                        onClick={() =>
                          changeStatus.mutate({ id: e.id, status: "published" })
                        }
                        disabled={changeStatus.isPending}
                        title="Publicar"
                      >
                        <Eye className="size-3.5" /> Publicar
                      </IconBtn>
                    )}
                    {e.status !== "archived" && (
                      <IconBtn
                        onClick={() =>
                          changeStatus.mutate({ id: e.id, status: "archived" })
                        }
                        disabled={changeStatus.isPending}
                        title="Archivar"
                      >
                        <Archive className="size-3.5" /> Archivar
                      </IconBtn>
                    )}
                    <IconBtn
                      onClick={() => duplicate.mutate(e.id)}
                      disabled={duplicate.isPending}
                      title="Duplicar"
                    >
                      <Copy className="size-3.5" /> Duplicar
                    </IconBtn>
                    {e.status === "published" && (
                      <Link
                        to="/eventos/$slug"
                        params={{ slug: e.slug }}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft"
                        title="Ver en el portal público"
                      >
                        <ExternalLink className="size-3.5" /> Ver
                      </Link>
                    )}
                    <Link
                      to="/servicio/eventos/$id"
                      params={{ id: e.id }}
                      className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-paper hover:bg-brand/90"
                    >
                      <Pencil className="size-3.5" /> Editar
                    </Link>
                    <IconBtn
                      onClick={() => {
                        if (confirm(`¿Eliminar el evento "${e.title}"?`))
                          remove.mutate(e.id);
                      }}
                      disabled={remove.isPending}
                      title="Eliminar"
                      danger
                    >
                      <Trash2 className="size-3.5" />
                    </IconBtn>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold hover:bg-soft disabled:opacity-50 " +
        (danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-brand/15 text-brand")
      }
    >
      {children}
    </button>
  );
}
