import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Users,
  Clock,
  CalendarDays,
  BookOpen,
  FileText,
  UserRound,
  Plus,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { listGroupsAdmin, listMeetingsAdmin } from "@/lib/service.functions";

export const Route = createFileRoute("/_authenticated/servicio/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ["service", "groups"],
      queryFn: () => listGroupsAdmin(),
    });
    context.queryClient.ensureQueryData({
      queryKey: ["service", "meetings"],
      queryFn: () => listMeetingsAdmin(),
    });
  },
  component: DashboardPage,
});

type Card = {
  to: string;
  label: string;
  icon: LucideIcon;
  description: string;
  disabled?: boolean;
};

const cards: Card[] = [
  {
    to: "/servicio/grupos",
    label: "Grupos",
    icon: Users,
    description: "Gestiona los nueve grupos del Área 2.",
  },
  {
    to: "/servicio/reuniones",
    label: "Reuniones",
    icon: Clock,
    description: "Días, horarios y tipos de reunión.",
  },
  {
    to: "/servicio/eventos",
    label: "Eventos",
    icon: CalendarDays,
    description: "Foros, congresos y aniversarios.",
    disabled: true,
  },
  {
    to: "/servicio/literatura",
    label: "Literatura",
    icon: BookOpen,
    description: "Biblioteca autorizada.",
    disabled: true,
  },
  {
    to: "/servicio/documentos",
    label: "Documentos",
    icon: FileText,
    description: "Actas y comunicaciones internas.",
    disabled: true,
  },
  {
    to: "/servicio/perfil",
    label: "Mi perfil",
    icon: UserRound,
    description: "Tu cuenta y rol de servicio.",
  },
];

function DashboardPage() {
  const callGroups = useServerFn(listGroupsAdmin);
  const callMeetings = useServerFn(listMeetingsAdmin);
  const { data: groups } = useSuspenseQuery({
    queryKey: ["service", "groups"],
    queryFn: () => callGroups(),
  });
  const { data: meetings } = useSuspenseQuery({
    queryKey: ["service", "meetings"],
    queryFn: () => callMeetings(),
  });

  const published = groups.filter((g) => g.isPublished).length;
  const unpublished = groups.length - published;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand/70">
            Área 2 Metropolitana
          </span>
          <h1 className="mt-1 font-serif text-3xl italic text-brand md:text-4xl">
            Centro de servicio
          </h1>
          <p className="mt-1 text-sm text-ink/70">
            Un espacio de trabajo para servidores del Área.
          </p>
        </div>
        <Link
          to="/servicio/grupos/nuevo"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90"
        >
          <Plus className="size-4" /> Nuevo grupo
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Grupos activos" value={published} />
        <Stat label="Grupos sin publicar" value={unpublished} />
        <Stat label="Reuniones registradas" value={meetings.length} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const body = (
            <>
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <c.icon className="size-5" />
              </span>
              <div className="mt-4 flex items-center gap-2">
                <h2 className="font-serif text-xl text-brand">{c.label}</h2>
                {c.disabled && (
                  <span className="rounded-full bg-soft px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-ink/60">
                    Pronto
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink/70">{c.description}</p>
              {!c.disabled && (
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  Abrir <ArrowRight className="size-3.5" />
                </span>
              )}
            </>
          );
          if (c.disabled) {
            return (
              <div
                key={c.to}
                className="rounded-2xl border border-brand/10 bg-paper/60 p-5 opacity-70"
              >
                {body}
              </div>
            );
          }
          return (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-2xl border border-brand/10 bg-paper p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
            >
              {body}
            </Link>
          );
        })}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-brand/10 bg-paper p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-ink/60">{label}</div>
      <div className="mt-2 font-serif text-3xl italic text-brand">{value}</div>
    </div>
  );
}
