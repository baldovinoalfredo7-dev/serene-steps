import { useEffect, useState } from "react";
import type { AdminMeeting, MeetingType } from "@/lib/service.functions";
import { weekdayLabels } from "@/lib/groups-data";

export type MeetingFormValues = {
  weekday: number;
  start: string;
  end: string;
  type: MeetingType;
};

export function MeetingForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel,
  busy,
}: {
  initial?: AdminMeeting;
  onSubmit: (v: MeetingFormValues) => void;
  onCancel?: () => void;
  submitLabel: string;
  busy?: boolean;
}) {
  const [v, setV] = useState<MeetingFormValues>({
    weekday: initial?.weekday ?? 1,
    start: initial?.start ?? "19:00",
    end: initial?.end ?? "20:30",
    type: initial?.type ?? "abierta",
  });
  useEffect(() => {
    if (initial)
      setV({
        weekday: initial.weekday,
        start: initial.start,
        end: initial.end,
        type: initial.type,
      });
  }, [initial]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] sm:items-end"
    >
      <label className="block">
        <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
          Día
        </span>
        <select
          value={v.weekday}
          onChange={(e) => setV({ ...v, weekday: Number(e.target.value) })}
          className={inputCls}
        >
          {weekdayLabels.map((d, i) => (
            <option key={i} value={i}>
              {d}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
          Inicio
        </span>
        <input
          type="time"
          value={v.start}
          onChange={(e) => setV({ ...v, start: e.target.value })}
          required
          className={inputCls}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
          Fin
        </span>
        <input
          type="time"
          value={v.end}
          onChange={(e) => setV({ ...v, end: e.target.value })}
          required
          className={inputCls}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wide text-ink/60">
          Tipo
        </span>
        <select
          value={v.type}
          onChange={(e) => setV({ ...v, type: e.target.value as MeetingType })}
          className={inputCls}
        >
          <option value="abierta">Abierta</option>
          <option value="cerrada">Cerrada</option>
          <option value="mixta">Mixta</option>
        </select>
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-paper shadow-sm hover:bg-brand/90 disabled:opacity-60"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-brand/20 px-4 py-2 text-xs font-semibold text-brand hover:bg-soft"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-brand/15 bg-soft/30 px-3 py-2 text-sm text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15";
