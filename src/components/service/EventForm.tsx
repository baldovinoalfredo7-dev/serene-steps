import { useEffect, useState } from "react";
import type { UpsertEventInput, EventStatus } from "@/lib/events.functions";
import type { AdminMunicipality } from "@/lib/service.functions";

export type EventFormValues = UpsertEventInput;

export const emptyEvent: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  time: "",
  location: "",
  addressLine: "",
  municipalityId: "",
  imageUrl: "",
  organizer: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  status: "draft",
  isFeatured: false,
};

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
];

export function EventForm({
  initialValues,
  municipalities,
  submitting,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialValues: EventFormValues;
  municipalities: AdminMunicipality[];
  submitting: boolean;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => void;
  onCancel?: () => void;
}) {
  const [values, setValues] = useState<EventFormValues>(initialValues);

  useEffect(() => setValues(initialValues), [initialValues]);

  function set<K extends keyof EventFormValues>(key: K, v: EventFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6"
    >
      <Section title="Información general">
        <Field label="Título *" full>
          <input
            required
            maxLength={140}
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Descripción" full>
          <textarea
            rows={4}
            maxLength={2000}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputCls + " resize-y"}
          />
        </Field>
      </Section>

      <Section title="Fecha y hora">
        <Field label="Fecha de inicio *">
          <input
            type="date"
            required
            value={values.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Fecha de finalización">
          <input
            type="date"
            value={values.endDate}
            onChange={(e) => set("endDate", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Hora">
          <input
            type="time"
            value={values.time}
            onChange={(e) => set("time", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Lugar">
        <Field label="Lugar / Salón">
          <input
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputCls}
            placeholder="Ej. Salón del Grupo Amanecer"
          />
        </Field>
        <Field label="Municipio">
          <select
            value={values.municipalityId}
            onChange={(e) => set("municipalityId", e.target.value)}
            className={inputCls}
          >
            <option value="">Sin especificar</option>
            {municipalities.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Dirección" full>
          <input
            value={values.addressLine}
            onChange={(e) => set("addressLine", e.target.value)}
            className={inputCls}
            placeholder="Calle, número, referencia"
          />
        </Field>
      </Section>

      <Section title="Imagen y organización">
        <Field label="URL de imagen principal" full>
          <input
            type="url"
            value={values.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            className={inputCls}
            placeholder="https://…"
          />
          {values.imageUrl ? (
            <img
              src={values.imageUrl}
              alt=""
              className="mt-2 h-32 w-full max-w-xs rounded-lg object-cover ring-1 ring-brand/10"
            />
          ) : null}
        </Field>
        <Field label="Organizador">
          <input
            value={values.organizer}
            onChange={(e) => set("organizer", e.target.value)}
            className={inputCls}
            placeholder="Comité, grupo o área"
          />
        </Field>
      </Section>

      <Section title="Contacto">
        <Field label="Persona de contacto">
          <input
            value={values.contactName}
            onChange={(e) => set("contactName", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Teléfono">
          <input
            value={values.contactPhone}
            onChange={(e) => set("contactPhone", e.target.value)}
            className={inputCls}
            placeholder="+57 …"
          />
        </Field>
        <Field label="Correo">
          <input
            type="email"
            value={values.contactEmail}
            onChange={(e) => set("contactEmail", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Publicación">
        <Field label="Estado">
          <select
            value={values.status}
            onChange={(e) => set("status", e.target.value as EventStatus)}
            className={inputCls}
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Destacado">
          <label className="flex items-center gap-2 pt-2 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={values.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="size-4 rounded border-brand/30 text-brand focus:ring-brand/40"
            />
            Marcar este evento como destacado
          </label>
        </Field>
      </Section>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-brand/10 pt-4">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-soft"
          >
            Cancelar
          </button>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90 disabled:opacity-60"
        >
          {submitting ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-brand/15 bg-paper px-3 py-2 text-sm text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-brand/10 bg-paper p-5">
      <legend className="px-2 text-xs font-semibold uppercase tracking-widest text-brand/70">
        {title}
      </legend>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={"block " + (full ? "md:col-span-2" : "")}>
      <span className="mb-1 block text-xs font-medium text-ink/70">{label}</span>
      {children}
    </label>
  );
}
