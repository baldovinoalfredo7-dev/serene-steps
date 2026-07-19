import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { createGroup, listMunicipalitiesAdmin } from "@/lib/service.functions";
import { GroupForm, type GroupFormValues } from "@/components/service/GroupForm";

export const Route = createFileRoute("/_authenticated/servicio/grupos/nuevo")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["service", "municipalities"],
      queryFn: () => listMunicipalitiesAdmin(),
    }),
  component: NewGroupPage,
});

function NewGroupPage() {
  const callMun = useServerFn(listMunicipalitiesAdmin);
  const callCreate = useServerFn(createGroup);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: municipalities } = useSuspenseQuery({
    queryKey: ["service", "municipalities"],
    queryFn: () => callMun(),
  });

  const [values, setValues] = useState<GroupFormValues>({
    name: "",
    municipalityId: municipalities[0]?.id ?? "",
    addressLine: "",
    addressFull: "",
    phone: "",
    history: "",
    publicInfoName: "",
    publicInfoPhone: "",
    publicInfoEmail: "",
    isPublished: true,
  });

  const create = useMutation({
    mutationFn: () =>
      callCreate({
        data: {
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
    onSuccess: async (res) => {
      toast.success("Grupo creado");
      await queryClient.invalidateQueries({ queryKey: ["service", "groups"] });
      navigate({ to: "/servicio/grupos/$id", params: { id: res.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/servicio/grupos"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="size-3.5" /> Volver a grupos
      </Link>
      <header>
        <h1 className="font-serif text-3xl italic text-brand md:text-4xl">Nuevo grupo</h1>
        <p className="mt-1 text-sm text-ink/70">
          Completa los datos esenciales. Podrás añadir reuniones después de crear el grupo.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
        className="space-y-6"
      >
        <GroupForm
          values={values}
          onChange={setValues}
          municipalities={municipalities}
        />
        <div className="flex flex-wrap justify-end gap-3">
          <Link
            to="/servicio/grupos"
            className="inline-flex items-center rounded-full border border-brand/20 px-5 py-2.5 text-sm font-semibold text-brand hover:bg-soft"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={create.isPending}
            className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper shadow-sm hover:bg-brand/90 disabled:opacity-60"
          >
            {create.isPending ? "Creando…" : "Crear grupo"}
          </button>
        </div>
      </form>
    </div>
  );
}
