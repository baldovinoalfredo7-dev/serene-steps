import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { createEvent } from "@/lib/events.functions";
import { listMunicipalitiesAdmin } from "@/lib/service.functions";
import { EventForm, emptyEvent, type EventFormValues } from "@/components/service/EventForm";

export const Route = createFileRoute("/_authenticated/servicio/eventos/nuevo")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    });
  },
  component: NewEventPage,
});

function NewEventPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callCreate = useServerFn(createEvent);

  const { data: municipalities } = useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const create = useMutation({
    mutationFn: (v: EventFormValues) => callCreate({ data: v }),
    onSuccess: ({ id }) => {
      toast.success("Evento creado");
      queryClient.invalidateQueries({ queryKey: ["service", "events"] });
      navigate({ to: "/servicio/eventos/$id", params: { id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        to="/servicio/eventos"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver
      </Link>
      <header>
        <h1 className="font-serif text-3xl italic text-brand md:text-4xl">Nuevo evento</h1>
        <p className="mt-1 text-sm text-ink/70">
          Completa la información. Puedes guardarlo como borrador y publicarlo después.
        </p>
      </header>
      <EventForm
        initialValues={emptyEvent}
        municipalities={municipalities}
        submitting={create.isPending}
        submitLabel="Crear evento"
        onSubmit={(v) => create.mutate(v)}
        onCancel={() => navigate({ to: "/servicio/eventos" })}
      />
    </div>
  );
}
