import type { ReactNode } from "react";
import {
  MapPin,
  Home,
  Building2,
  CalendarClock,
  Users,
  UserCheck,
  History,
  Hash,
  ClipboardList,
  CalendarDays,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Ficha técnica reutilizable para un grupo del Área.
 * Preparada para ser alimentada más adelante con datos reales (desde
 * la tabla `groups` o desde contenido editorial). Todos los campos son
 * opcionales: los que no vengan informados se muestran como "Por
 * confirmar" para conservar la maquetación y facilitar la incorporación
 * progresiva de contenido.
 */
export interface GroupProfileData {
  name: string;
  foundedOn?: string;
  address?: string;
  neighborhood?: string;
  municipality?: string;
  meetingSchedule?: string;
  modality?: string;
  history?: string;
  approximateMembers?: number | string;
  averageAttendance?: number | string;
  weeklyMeetings?: number | string;
  servants?: Array<{ role: string; name?: string }>;
  notes?: string;
}

export function GroupProfileTemplate({ group }: { group: GroupProfileData }) {
  const {
    name,
    foundedOn,
    address,
    neighborhood,
    municipality,
    meetingSchedule,
    modality,
    history,
    approximateMembers,
    averageAttendance,
    weeklyMeetings,
    servants,
    notes,
  } = group;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <header>
        <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand/80">
          Ficha del grupo
        </span>
        <h1 className="font-serif text-3xl italic leading-tight text-brand sm:text-4xl">
          {name}
        </h1>
        {foundedOn && (
          <p className="mt-3 text-sm text-ink/70">
            Fundado el <span className="font-medium text-ink/90">{foundedOn}</span>
          </p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <InfoRow icon={MapPin} label="Dirección" value={address} />
        <InfoRow icon={Home} label="Barrio" value={neighborhood} />
        <InfoRow icon={Building2} label="Municipio" value={municipality} />
        <InfoRow icon={CalendarClock} label="Días y horarios de reunión" value={meetingSchedule} />
        <InfoRow icon={Sparkles} label="Modalidad" value={modality} />
        <InfoRow
          icon={CalendarDays}
          label="Reuniones semanales"
          value={weeklyMeetings != null ? String(weeklyMeetings) : undefined}
        />
        <InfoRow
          icon={Users}
          label="Miembros (aprox.)"
          value={approximateMembers != null ? String(approximateMembers) : undefined}
        />
        <InfoRow
          icon={Hash}
          label="Promedio de asistencia"
          value={averageAttendance != null ? String(averageAttendance) : undefined}
        />
      </section>

      <Block icon={History} title="Historia del grupo">
        {history ? (
          <p className="whitespace-pre-line">{history}</p>
        ) : (
          <Placeholder>La historia de este grupo se publicará próximamente.</Placeholder>
        )}
      </Block>

      <Block icon={UserCheck} title="Cuerpo de servidores">
        {servants && servants.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {servants.map((s, i) => (
              <li
                key={`${s.role}-${i}`}
                className="rounded-xl border border-brand/10 bg-paper px-4 py-3 text-sm"
              >
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand/70">
                  {s.role}
                </span>
                <span className="mt-1 block text-ink/90">{s.name ?? "Por confirmar"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder>La conformación del cuerpo de servidores se publicará próximamente.</Placeholder>
        )}
      </Block>

      <Block icon={ClipboardList} title="Observaciones">
        {notes ? (
          <p className="whitespace-pre-line">{notes}</p>
        ) : (
          <Placeholder>Sin observaciones registradas.</Placeholder>
        )}
      </Block>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-brand/10 bg-paper p-4">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand/70">
          {label}
        </span>
        <span className="mt-1 block text-sm text-ink/90">
          {value && value.trim() ? value : <span className="text-ink/50">Por confirmar</span>}
        </span>
      </div>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-serif text-xl text-brand">
        <Icon className="size-4" /> {title}
      </h2>
      <div className="rounded-2xl border border-brand/10 bg-paper p-5 text-sm leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return <p className="text-ink/60">{children}</p>;
}
