import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, Trash2, Copy, ExternalLink } from "lucide-react";
import {
  getEventAdmin,
  updateEvent,
  deleteEvent,
  duplicateEvent,
} from "@/lib/events.functions";
import { listMunicipalitiesAdmin } from "@/lib/service.functions";
import { EventForm, type EventFormValues } from "@/components/service/EventForm";

export const Route = createFileRoute("/_authenticated/servicio/eventos/$id")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "event", params.id],
      queryFn: () => getEventAdmin({ data: { id: params.id } }),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    });
  },
  component: EditEventPage,
});

function toDate(iso: string): string {
  return iso.slice(0, 10);
}
function toTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function EditEventPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const callGet = useServerFn(getEventAdmin);
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callUpdate = useServerFn(updateEvent);
  const callDelete = useServerFn(deleteEvent);
  const callDup = useServerFn(duplicateEvent);

  const { data: event } = useSuspenseQuery({
    queryKey: ["service", "event", id],
    queryFn: () => callGet({ data: { id } }),
  });
  const { data: municipalities } = useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const initial: EventFormValues = {
    title: event.title,
    description: event.description ?? "",
    startDate: toDate(event.startsAt),
    endDate: event.endsAt ? toDate(event.endsAt) : "",
    time: toTime(event.startsAt),
    location: event.location ?? "",
    addressLine: event.addressLine ?? "",
    municipalityId: event.municipalityId ?? "",
    imageUrl: event.imageUrl ?? "",
    organizer: event.organizer ?? "",
    contactName: event.contactName ?? "",
    contactPhone: event.contactPhone ?? "",
    contactEmail: event.contactEmail ?? "",
    status: event.status,
    isFeatured: event.isFeatured,
  };

  const update = useMutation({
    mutationFn: (v: EventFormValues) => callUpdate({ data: { id, ...v } }),
    onSuccess: () => {
      toast.success("Cambios guardados");
      queryClient.invalidateQueries({ queryKey: ["service", "event", id] });
      queryClient.invalidateQueries({ queryKey: ["service", "events"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: () => callDelete({ data: { id } }),
    onSuccess: () => {
      toast.success("Evento eliminado");
      queryClient.invalidateQueries({ queryKey: ["service", "events"] });
      navigate({ to: "/servicio/eventos" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const duplicate = useMutation({
    mutationFn: () => callDup({ data: { id } }),
    onSuccess: ({ id: newId }) => {
      toast.success("Evento duplicado");
      queryClient.invalidateQueries({ queryKey: ["service", "events"] });
      navigate({ to: "/servicio/eventos/$id", params: { id: newId } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/servicio/eventos"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          <ArrowLeft className="size-4" /> Volver
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {event.status === "published" && (
            <Link
              to="/eventos/$slug"
              params={{ slug: event.slug }}
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft"
            >
              <ExternalLink className="size-3.5" /> Ver público
            </Link>
          )}
          <button
            type="button"
            onClick={() => duplicate.mutate()}
            disabled={duplicate.isPending}
            className="inline-flex items-center gap-1 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft disabled:opacity-50"
          >
            <Copy className="size-3.5" /> Duplicar
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm(`¿Eliminar el evento "${event.title}"?`)) remove.mutate();
            }}
            disabled={remove.isPending}
            className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" /> Eliminar
          </button>
        </div>
      </div>

      <header>
        <h1 className="font-serif text-3xl italic text-brand md:text-4xl">
          Editar evento
        </h1>
        <p className="mt-1 text-sm text-ink/70">{event.title}</p>
      </header>

      <EventForm
        initialValues={initial}
        municipalities={municipalities}
        submitting={update.isPending}
        submitLabel="Guardar cambios"
        onSubmit={(v) => update.mutate(v)}
      />
    </div>
  );
}
