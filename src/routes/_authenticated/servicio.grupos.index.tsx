import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Eye, EyeOff, Pencil, ExternalLink } from "lucide-react";
import {
  listGroupsAdmin,
  listMunicipalitiesAdmin,
  setGroupPublished,
} from "@/lib/service.functions";

export const Route = createFileRoute("/_authenticated/servicio/grupos/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "groups"],
      queryFn: () => listGroupsAdmin(),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    });
  },
  component: GroupsListPage,
});

function GroupsListPage() {
  const callGroups = useServerFn(listGroupsAdmin);
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callToggle = useServerFn(setGroupPublished);
  const queryClient = useQueryClient();

  const { data: groups } = useSuspenseQuery({
    queryKey: ["service", "groups"],
    queryFn: () => callGroups(),
  });
  const { data: municipalities } = useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const [q, setQ] = useState("");
  const [muni, setMuni] = useState<string>("");
  const [status, setStatus] = useState<"all" | "published" | "unpublished">("all");

  const toggle = useMutation({
    mutationFn: (v: { id: string; isPublished: boolean }) =>
      callToggle({ data: v }),
    onSuccess: () => {
      toast.success("Estado actualizado");
      queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return groups.filter((g) => {
      if (muni && g.municipalityId !== muni) return false;
      if (status === "published" && !g.isPublished) return false;
      if (status === "unpublished" && g.isPublished) return false;
      if (
        term &&
        !g.name.toLowerCase().includes(term) &&
        !g.addressLine.toLowerCase().includes(term) &&
        !g.municipalityName.toLowerCase().includes(term)
      )
        return false;
      return true;
    });
  }, [groups, q, muni, status]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl italic text-brand md:text-4xl">Grupos</h1>
          <p className="mt-1 text-sm text-ink/70">
            {groups.length} grupos registrados en el Área 2.
          </p>
        </div>
        <Link
          to="/servicio/grupos/nuevo"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90"
        >
          <Plus className="size-4" /> Nuevo grupo
        </Link>
      </header>

      <section className="grid gap-3 rounded-2xl border border-brand/10 bg-paper p-4 sm:grid-cols-[1fr_auto_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, dirección o municipio…"
            className="w-full rounded-full border border-brand/15 bg-soft/40 py-2.5 pl-10 pr-4 text-sm focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15"
          />
        </label>
        <select
          value={muni}
          onChange={(e) => setMuni(e.target.value)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm focus:border-brand/40 focus:outline-none"
        >
          <option value="">Todos los municipios</option>
          {municipalities.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="rounded-full border border-brand/15 bg-soft/40 px-4 py-2.5 text-sm focus:border-brand/40 focus:outline-none"
        >
          <option value="all">Todos</option>
          <option value="published">Activos</option>
          <option value="unpublished">Inactivos</option>
        </select>
      </section>

      <section className="overflow-hidden rounded-2xl border border-brand/10 bg-paper">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-ink/60">
            No hay grupos que coincidan con los filtros.
          </div>
        ) : (
          <ul className="divide-y divide-brand/5">
            {filtered.map((g) => (
              <li
                key={g.id}
                className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-soft/30"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-serif text-lg text-brand">{g.name}</span>
                    {!g.isPublished && (
                      <span className="rounded-full bg-soft px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-ink/60">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-ink/60">
                    {g.municipalityName} · {g.addressLine} · {g.meetingCount} reuniones
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggle.mutate({ id: g.id, isPublished: !g.isPublished })
                    }
                    disabled={toggle.isPending}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft disabled:opacity-50"
                    title={g.isPublished ? "Desactivar" : "Activar"}
                  >
                    {g.isPublished ? (
                      <>
                        <EyeOff className="size-3.5" /> Desactivar
                      </>
                    ) : (
                      <>
                        <Eye className="size-3.5" /> Activar
                      </>
                    )}
                  </button>
                  <Link
                    to="/grupos/$slug"
                    params={{ slug: g.slug }}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-soft"
                    title="Ver en portal público"
                  >
                    <ExternalLink className="size-3.5" />
                  </Link>
                  <Link
                    to="/servicio/grupos/$id"
                    params={{ id: g.id }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-paper hover:bg-brand/90"
                  >
                    <Pencil className="size-3.5" /> Editar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
