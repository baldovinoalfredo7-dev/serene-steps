import type { AdminMunicipality } from "@/lib/service.functions";

export type GroupFormValues = {
  name: string;
  municipalityId: string;
  addressLine: string;
  addressFull: string;
  phone: string;
  history: string;
  publicInfoName: string;
  publicInfoPhone: string;
  publicInfoEmail: string;
  isPublished: boolean;
};

export function GroupForm({
  values,
  onChange,
  municipalities,
}: {
  values: GroupFormValues;
  onChange: (next: GroupFormValues) => void;
  municipalities: AdminMunicipality[];
}) {
  const set = <K extends keyof GroupFormValues>(k: K, v: GroupFormValues[K]) =>
    onChange({ ...values, [k]: v });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-brand/10 bg-paper p-6">
        <h2 className="font-serif text-lg text-brand">Datos del grupo</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Nombre" required>
            <input
              type="text"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              required
              maxLength={120}
              className={inputCls}
            />
          </Field>
          <Field label="Municipio" required>
            <select
              value={values.municipalityId}
              onChange={(e) => set("municipalityId", e.target.value)}
              required
              className={inputCls}
            >
              {municipalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Dirección corta" required hint="Ej: Cra 43 #70-45">
            <input
              type="text"
              value={values.addressLine}
              onChange={(e) => set("addressLine", e.target.value)}
              required
              maxLength={200}
              className={inputCls}
            />
          </Field>
          <Field label="Dirección completa" hint="Referencias para el mapa">
            <input
              type="text"
              value={values.addressFull}
              onChange={(e) => set("addressFull", e.target.value)}
              maxLength={250}
              className={inputCls}
            />
          </Field>
          <Field label="Teléfono del grupo">
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              maxLength={30}
              className={inputCls}
            />
          </Field>
          <Field label="Estado">
            <label className="mt-1 inline-flex items-center gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={values.isPublished}
                onChange={(e) => set("isPublished", e.target.checked)}
                className="size-4 rounded border-brand/30 text-brand focus:ring-brand/30"
              />
              Visible en el portal público
            </label>
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-brand/10 bg-paper p-6">
        <h2 className="font-serif text-lg text-brand">Historia del grupo</h2>
        <p className="mt-1 text-xs text-ink/60">
          Texto opcional que aparecerá en la página pública del grupo.
        </p>
        <textarea
          value={values.history}
          onChange={(e) => set("history", e.target.value)}
          rows={5}
          maxLength={2000}
          className={inputCls + " mt-4"}
        />
      </section>

      <section className="rounded-2xl border border-brand/10 bg-paper p-6">
        <h2 className="font-serif text-lg text-brand">Contacto de Información Pública</h2>
        <p className="mt-1 text-xs text-ink/60">
          Datos del servidor IP que atenderá a personas nuevas.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Field label="Nombre">
            <input
              type="text"
              value={values.publicInfoName}
              onChange={(e) => set("publicInfoName", e.target.value)}
              maxLength={120}
              className={inputCls}
            />
          </Field>
          <Field label="Teléfono">
            <input
              type="tel"
              value={values.publicInfoPhone}
              onChange={(e) => set("publicInfoPhone", e.target.value)}
              maxLength={30}
              className={inputCls}
            />
          </Field>
          <Field label="Correo">
            <input
              type="email"
              value={values.publicInfoEmail}
              onChange={(e) => set("publicInfoEmail", e.target.value)}
              maxLength={200}
              className={inputCls}
            />
          </Field>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-brand/15 bg-soft/30 px-3 py-2.5 text-sm text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/15";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink/70">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[0.7rem] text-ink/50">{hint}</span>}
    </label>
  );
}
