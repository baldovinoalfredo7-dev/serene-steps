import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, Plus, Trash2, Pencil } from "lucide-react";
import {
  getGroupAdmin,
  listMunicipalitiesAdmin,
  updateGroup,
  deleteGroup,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  type AdminMeeting,
} from "@/lib/service.functions";
import { GroupForm, type GroupFormValues } from "@/components/service/GroupForm";
import { MeetingForm } from "@/components/service/MeetingForm";
import { weekdayLabels, meetingTypeLabel } from "@/lib/groups-data";

export const Route = createFileRoute("/_authenticated/servicio/grupos/$id")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "group", params.id],
      queryFn: () => getGroupAdmin({ data: { id: params.id } }),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    });
  },
  component: EditGroupPage,
});

function EditGroupPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const callGet = useServerFn(getGroupAdmin);
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callUpdate = useServerFn(updateGroup);
  const callDelete = useServerFn(deleteGroup);
  const callCreateM = useServerFn(createMeeting);
  const callUpdateM = useServerFn(updateMeeting);
  const callDeleteM = useServerFn(deleteMeeting);

  const { data: group } = useSuspenseQuery({
    queryKey: ["service", "group", id],
    queryFn: () => callGet({ data: { id } }),
  });
  const { data: municipalities } = useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const [values, setValues] = useState<GroupFormValues>({
    name: group.name,
    municipalityId: group.municipalityId,
    addressLine: group.addressLine,
    addressFull: group.addressFull,
    phone: group.phone ?? "",
    history: group.history ?? "",
    publicInfoName: group.publicInfoName ?? "",
    publicInfoPhone: group.publicInfoPhone ?? "",
    publicInfoEmail: group.publicInfoEmail ?? "",
    isPublished: group.isPublished,
  });

  // Sync form when server data changes (e.g. after invalidation)
  useEffect(() => {
    setValues({
      name: group.name,
      municipalityId: group.municipalityId,
      addressLine: group.addressLine,
      addressFull: group.addressFull,
      phone: group.phone ?? "",
      history: group.history ?? "",
      publicInfoName: group.publicInfoName ?? "",
      publicInfoPhone: group.publicInfoPhone ?? "",
      publicInfoEmail: group.publicInfoEmail ?? "",
      isPublished: group.isPublished,
    });
  }, [group]);

  const save = useMutation({
    mutationFn: () =>
      callUpdate({
        data: {
          id,
          name: values.name,
          municipalityId: values.municipalityId,
          addressLine: values.addressLine,
          addressFull: values.addressFull || values.addressLine,
          phone: values.phone || null,
          history: values.history || null,
          publicInfoName: values.publicInfoName || null,
          publicInfoPhone: values.publicInfoPhone || null,
          publicInfoEmail: values.publicInfoEmail || null,
          isPublished: values.isPublished,
        },
      }),
    onSuccess: () => {
      toast.success("Cambios guardados");
      queryClient.invalidateQueries({ queryKey: ["service", "group", id] });
      queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: () => callDelete({ data: { id } }),
    onSuccess: async () => {
      toast.success("Grupo eliminado");
      await queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
      navigate({ to: "/servicio/grupos" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const invalidateMeetings = () => {
    queryClient.invalidateQueries({ queryKey: ["service", "group", id] });
    queryClient.invalidateQueries({ queryKey: ["service", "meetings"] });
    queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
  };

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const createM = useMutation({
    mutationFn: (v: { weekday: number; start: string; end: string; type: AdminMeeting["type"] }) =>
      callCreateM({ data: { groupId: id, ...v } }),
    onSuccess: () => {
      toast.success("Reunión añadida");
      setAdding(false);
      invalidateMeetings();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateM = useMutation({
    mutationFn: (v: { id: string; weekday: number; start: string; end: string; type: AdminMeeting["type"] }) =>
      callUpdateM({ data: { id: v.id, groupId: id, weekday: v.weekday, start: v.start, end: v.end, type: v.type } }),
    onSuccess: () => {
      toast.success("Reunión actualizada");
      setEditingId(null);
      invalidateMeetings();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteM = useMutation({
    mutationFn: (mid: string) => callDeleteM({ data: { id: mid } }),
    onSuccess: () => {
      toast.success("Reunión eliminada");
      invalidateMeetings();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/servicio/grupos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="size-3.5" /> Volver a grupos
        </Link>
        <Link
          to="/grupos/$slug"
          params={{ slug: group.slug }}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <ExternalLink className="size-3.5" /> Ver en portal público
        </Link>
      </div>

      <header>
        <h1 className="font-serif text-3xl italic text-brand md:text-4xl">{group.name}</h1>
        <p className="mt-1 text-sm text-ink/70">
          {group.isPublished ? "Publicado" : "Inactivo"} · {group.meetings.length} reuniones
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
        className="space-y-6"
      >
        <GroupForm
          values={values}
          onChange={setValues}
          municipalities={municipalities}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm(`¿Eliminar el grupo "${group.name}"? Esta acción no se puede deshacer.`))
                del.mutate();
            }}
            disabled={del.isPending}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            <Trash2 className="size-3.5" /> Eliminar grupo
          </button>
          <button
            type="submit"
            disabled={save.isPending}
            className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90 disabled:opacity-60"
          >
            {save.isPending ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-brand/10 bg-paper p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl text-brand">Reuniones</h2>
            <p className="text-xs text-ink/60">
              Días, horarios y tipo de reunión del grupo.
            </p>
          </div>
          {!adding && (
            <button
              type="button"
              onClick={() => {
                setAdding(true);
                setEditingId(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-paper shadow-sm hover:bg-brand/90"
            >
              <Plus className="size-3.5" /> Añadir reunión
            </button>
          )}
        </div>

        {adding && (
          <div className="mt-4 rounded-xl border border-brand/15 bg-soft/40 p-4">
            <MeetingForm
              onSubmit={(v) => createM.mutate(v)}
              onCancel={() => setAdding(false)}
              submitLabel={createM.isPending ? "Guardando…" : "Guardar"}
              busy={createM.isPending}
            />
          </div>
        )}

        <ul className="mt-4 divide-y divide-brand/5">
          {group.meetings.length === 0 && !adding && (
            <li className="py-6 text-center text-sm text-ink/60">
              Aún no hay reuniones. Añade la primera.
            </li>
          )}
          {group.meetings.map((m) => (
            <li key={m.id} className="py-3">
              {editingId === m.id ? (
                <div className="rounded-xl border border-brand/15 bg-soft/40 p-4">
                  <MeetingForm
                    initial={m}
                    onSubmit={(v) => updateM.mutate({ id: m.id, ...v })}
                    onCancel={() => setEditingId(null)}
                    submitLabel={updateM.isPending ? "Guardando…" : "Guardar"}
                    busy={updateM.isPending}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium text-brand">
                      {weekdayLabels[m.weekday]} · {m.start} – {m.end}
                    </div>
                    <div className="text-xs text-ink/60">{meetingTypeLabel[m.type]}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(m.id);
                      setAdding(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft"
                  >
                    <Pencil className="size-3.5" /> Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("¿Eliminar esta reunión?")) deleteM.mutate(m.id);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
