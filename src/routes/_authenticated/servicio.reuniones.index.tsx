import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Pencil, Trash2, Plus, X } from "lucide-react";
import {
  listMeetingsAdmin,
  listGroupsAdmin,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  type AdminMeeting,
  type MeetingType,
} from "@/lib/service.functions";
import { MeetingForm } from "@/components/service/MeetingForm";
import { weekdayLabels, meetingTypeLabel } from "@/lib/groups-data";

export const Route = createFileRoute("/_authenticated/servicio/reuniones/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "meetings"],
      queryFn: () => listMeetingsAdmin(),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "groups"],
      queryFn: () => listGroupsAdmin(),
    });
  },
  component: MeetingsPage,
});

function MeetingsPage() {
  const callMeetings = useServerFn(listMeetingsAdmin);
  const callGroups = useServerFn(listGroupsAdmin);
  const callCreate = useServerFn(createMeeting);
  const callUpdate = useServerFn(updateMeeting);
  const callDelete = useServerFn(deleteMeeting);
  const queryClient = useQueryClient();

  const { data: meetings } = useSuspenseQuery({
    queryKey: ["service", "meetings"],
    queryFn: () => callMeetings(),
  });
  const { data: groups } = useSuspenseQuery({
    queryKey: ["service", "groups"],
    queryFn: () => callGroups(),
  });

  const [q, setQ] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [dayFilter, setDayFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const [showCreate, setShowCreate] = useState(false);
  const [createGroupId, setCreateGroupId] = useState<string>(groups[0]?.id ?? "");
  const [editing, setEditing] = useState<AdminMeeting & { groupName?: string } | null>(null);
  const [editGroupId, setEditGroupId] = useState<string>("");

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["service", "meetings"] });
    queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
    queryClient.invalidateQueries({ queryKey: ["service", "group"] });
  };

  const createM = useMutation({
    mutationFn: (v: { weekday: number; start: string; end: string; type: MeetingType }) =>
      callCreate({ data: { groupId: createGroupId, ...v } }),
    onSuccess: () => {
      toast.success("Reunión creada");
      setShowCreate(false);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateM = useMutation({
    mutationFn: (v: { id: string; weekday: number; start: string; end: string; type: MeetingType }) =>
      callUpdate({ data: { ...v, groupId: editGroupId } }),
    onSuccess: () => {
      toast.success("Reunión actualizada");
      setEditing(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteM = useMutation({
    mutationFn: (id: string) => callDelete({ data: { id } }),
    onSuccess: () => {
      toast.success("Reunión eliminada");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return meetings.filter((m) => {
      if (groupFilter && m.groupId !== groupFilter) return false;
      if (dayFilter !== "" && m.weekday !== Number(dayFilter)) return false;
      if (typeFilter && m.type !== typeFilter) return false;
      if (
        term &&
        !m.groupName.toLowerCase().includes(term) &&
        !m.municipalityName.toLowerCase().includes(term)
      )
        return false;
      return true;
    });
  }, [meetings, q, groupFilter, dayFilter, typeFilter]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl italic text-brand md:text-4xl">Reuniones</h1>
          <p className="mt-1 text-sm text-ink/70">
            {meetings.length} reuniones registradas en el Área 2.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowCreate(true);
            if (!createGroupId) setCreateGroupId(groups[0]?.id ?? "");
          }}
          disabled={groups.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90 disabled:opacity-50"
        >
          <Plus className="size-4" /> Nueva reunión
        </button>
      </header>

      <section className="grid gap-3 rounded-2xl border border-brand/10 bg-paper p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar…"
            className="w-full rounded-full border border-brand/15 bg-soft/40 py-2.5 pl-10 pr-4 text-sm focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </label>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm"
        >
          <option value="">Todos los grupos</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm"
        >
          <option value="">Todos los días</option>
          {weekdayLabels.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm"
        >
          <option value="">Todos los tipos</option>
          <option value="abierta">Abierta</option>
          <option value="cerrada">Cerrada</option>
          <option value="mixta">Mixta</option>
        </select>
      </section>

      {showCreate && (
        <section className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg text-brand">Nueva reunión</h2>
            <button
              onClick={() => setShowCreate(false)}
              className="rounded-full p-1.5 text-ink/60 hover:bg-paper"
            >
              <X className="size-4" />
            </button>
          </div>
          <label className="mb-3 block">
            <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
              Grupo
            </span>
            <select
              value={createGroupId}
              onChange={(e) => setCreateGroupId(e.target.value)}
              className="w-full rounded-lg border border-brand/15 bg-paper px-3 py-2 text-sm sm:max-w-md"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} — {g.municipalityName}
                </option>
              ))}
            </select>
          </label>
          <MeetingForm
            onSubmit={(v) => createM.mutate(v)}
            onCancel={() => setShowCreate(false)}
            submitLabel={createM.isPending ? "Guardando…" : "Crear reunión"}
            busy={createM.isPending}
          />
        </section>
      )}

      <section className="overflow-hidden rounded-2xl border border-brand/10 bg-paper">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink/60">
            No hay reuniones que coincidan con los filtros.
          </div>
        ) : (
          <ul className="divide-y divide-brand/5">
            {filtered.map((m) => (
              <li key={m.id} className="px-5 py-4">
                {editing?.id === m.id ? (
                  <div className="rounded-xl border border-brand/15 bg-soft/40 p-4">
                    <label className="mb-3 block">
                      <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
                        Grupo
                      </span>
                      <select
                        value={editGroupId}
                        onChange={(e) => setEditGroupId(e.target.value)}
                        className="w-full rounded-lg border border-brand/15 bg-paper px-3 py-2 text-sm sm:max-w-md"
                      >
                        {groups.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name} — {g.municipalityName}
                          </option>
                        ))}
                      </select>
                    </label>
                    <MeetingForm
                      initial={m}
                      onSubmit={(v) => updateM.mutate({ id: m.id, ...v })}
                      onCancel={() => setEditing(null)}
                      submitLabel={updateM.isPending ? "Guardando…" : "Guardar"}
                      busy={updateM.isPending}
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-brand">
                        {weekdayLabels[m.weekday]} · {m.start} – {m.end}
                      </div>
                      <div className="text-xs text-ink/60">
                        <Link
                          to="/servicio/grupos/$id"
                          params={{ id: m.groupId }}
                          className="hover:underline"
                        >
                          {m.groupName}
                        </Link>
                        {" · "}
                        {m.municipalityName} · {meetingTypeLabel[m.type]}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(m);
                        setEditGroupId(m.groupId);
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
        )}
      </section>
    </div>
  );
}
