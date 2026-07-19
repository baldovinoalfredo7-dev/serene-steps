import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  UserPlus,
  KeyRound,
  Trash2,
  Copy,
  ShieldCheck,
  UserRound,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  listMembers,
  createMember,
  resetMemberPassword,
  deactivateMember,
  type MemberRow,
} from "@/lib/members.functions";

export const Route = createFileRoute("/_authenticated/servicio/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuarios · Centro de servicio · AA Área 2" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  const qc = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["service", "members"],
    queryFn: () => listMembers(),
  });

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    role: "member" as "member" | "editor" | "admin",
  });
  const [issued, setIssued] = useState<{ email: string; tempPassword: string } | null>(null);

  const createMut = useMutation({
    mutationFn: () => createMember({ data: form }),
    onSuccess: (res) => {
      toast.success(`Cuenta creada para ${res.email}`);
      setIssued(res);
      setForm({ email: "", fullName: "", role: "member" });
      qc.invalidateQueries({ queryKey: ["service", "members"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetMut = useMutation({
    mutationFn: (userId: string) => resetMemberPassword({ data: { userId } }),
    onSuccess: (res, userId) => {
      setIssued({ email: userId, tempPassword: res.tempPassword });
      toast.success("Contraseña temporal generada.");
      qc.invalidateQueries({ queryKey: ["service", "members"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (userId: string) => deactivateMember({ data: { userId } }),
    onSuccess: () => {
      toast.success("Cuenta eliminada.");
      qc.invalidateQueries({ queryKey: ["service", "members"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const isAdminForbidden = (error as Error | null)?.message?.includes("administrador");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand">
          Administración
        </p>
        <h1 className="mt-1 font-serif text-3xl italic text-brand md:text-4xl">Usuarios</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/75">
          Crea cuentas para servidores y miembros autorizados. El sistema genera una contraseña
          temporal; el usuario deberá cambiarla en su primer inicio de sesión.
        </p>
      </header>

      {isAdminForbidden && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p>Solo un administrador puede gestionar usuarios.</p>
        </div>
      )}

      {/* Formulario de creación */}
      <section className="rounded-3xl border border-brand/10 bg-paper p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg text-brand">
          <UserPlus className="size-5" /> Crear nueva cuenta
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMut.mutate();
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          <label className="block md:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-ink/70">Nombre completo</span>
            <input
              required
              minLength={2}
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className="w-full rounded-xl border border-brand/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-ink/70">Correo electrónico</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border border-brand/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-1.5 block text-xs font-medium text-ink/70">Rol</span>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value as typeof f.role }))
              }
              className="w-full rounded-xl border border-brand/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-brand"
            >
              <option value="member">Miembro</option>
              <option value="editor">Editor</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={createMut.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand/90 disabled:opacity-60"
            >
              {createMut.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <UserPlus className="size-4" />
              )}
              Crear cuenta
            </button>
          </div>
        </form>

        {issued && <TempPasswordCard issued={issued} onClose={() => setIssued(null)} />}
      </section>

      {/* Lista */}
      <section className="rounded-3xl border border-brand/10 bg-paper p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg text-brand">
          <UserRound className="size-5" /> Cuentas existentes
        </h2>
        {isLoading ? (
          <p className="flex items-center gap-2 text-sm text-ink/60">
            <Loader2 className="size-4 animate-spin" /> Cargando…
          </p>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
            {(error as Error).message}{" "}
            <button className="underline" onClick={() => refetch()}>
              Reintentar
            </button>
          </div>
        ) : !data || data.length === 0 ? (
          <p className="text-sm text-ink/60">No hay cuentas registradas.</p>
        ) : (
          <ul className="divide-y divide-brand/10">
            {data.map((m) => (
              <MemberRowItem
                key={m.userId}
                m={m}
                onReset={() => resetMut.mutate(m.userId)}
                onDelete={() => {
                  if (confirm(`¿Eliminar la cuenta de ${m.email}?`)) deleteMut.mutate(m.userId);
                }}
                resetting={resetMut.isPending && resetMut.variables === m.userId}
                deleting={deleteMut.isPending && deleteMut.variables === m.userId}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function MemberRowItem({
  m,
  onReset,
  onDelete,
  resetting,
  deleting,
}: {
  m: MemberRow;
  onReset: () => void;
  onDelete: () => void;
  resetting: boolean;
  deleting: boolean;
}) {
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-medium text-ink">{m.fullName ?? "Sin nombre"}</p>
        <p className="truncate text-xs text-ink/60">{m.email}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {m.roles.length === 0 ? (
            <span className="rounded-full bg-soft px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-ink/60">
              Sin rol
            </span>
          ) : (
            m.roles.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand"
              >
                <ShieldCheck className="size-3" /> {r}
              </span>
            ))
          )}
          {m.mustChangePassword && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-amber-800">
              Pendiente cambio
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={resetting}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 px-3 py-1.5 text-xs font-medium text-brand hover:bg-soft disabled:opacity-60"
        >
          {resetting ? <Loader2 className="size-3.5 animate-spin" /> : <KeyRound className="size-3.5" />}
          Restablecer
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
        >
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
          Eliminar
        </button>
      </div>
    </li>
  );
}

function TempPasswordCard({
  issued,
  onClose,
}: {
  issued: { email: string; tempPassword: string };
  onClose: () => void;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <p className="mb-2 text-sm font-semibold text-emerald-900">
        Contraseña temporal generada
      </p>
      <p className="mb-3 text-xs text-emerald-900/80">
        Compártela con <strong>{issued.email}</strong> por un canal seguro. Solo se muestra una vez;
        el usuario deberá cambiarla en su primer inicio de sesión.
      </p>
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-lg bg-paper px-3 py-2 font-mono text-sm text-ink">
          {issued.tempPassword}
        </code>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(issued.tempPassword);
            toast.success("Copiada al portapapeles.");
          }}
          className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-2 text-xs font-semibold text-paper hover:bg-brand/90"
        >
          <Copy className="size-3.5" /> Copiar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-brand/20 px-3 py-2 text-xs text-ink/70 hover:bg-soft"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
