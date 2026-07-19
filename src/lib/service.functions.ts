import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { slugify } from "./slug";

export type MeetingType = "abierta" | "cerrada" | "mixta";

export type AdminMunicipality = { id: string; name: string; slug: string };

export type AdminMeeting = {
  id: string;
  groupId: string;
  weekday: number;
  start: string; // HH:MM
  end: string;
  type: MeetingType;
};

export type AdminGroupListItem = {
  id: string;
  slug: string;
  name: string;
  municipalityId: string;
  municipalityName: string;
  addressLine: string;
  isPublished: boolean;
  meetingCount: number;
  updatedAt: string;
};

export type AdminGroupDetail = {
  id: string;
  slug: string;
  name: string;
  municipalityId: string;
  addressLine: string;
  addressFull: string;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  history: string | null;
  publicInfoName: string | null;
  publicInfoPhone: string | null;
  publicInfoEmail: string | null;
  isPublished: boolean;
  meetings: AdminMeeting[];
};

function toTime(v: string): string {
  // ensure HH:MM:SS
  if (/^\d{2}:\d{2}$/.test(v)) return `${v}:00`;
  return v;
}

// ---------------- MUNICIPALITIES ----------------
export const listMunicipalitiesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminMunicipality[]> => {
    const { data, error } = await context.supabase
      .from("municipalities")
      .select("id,name,slug")
      .order("name");
    if (error) throw new Error(error.message);
    return (data ?? []).map((m) => ({ id: m.id, name: m.name, slug: m.slug }));
  });

// ---------------- GROUPS ----------------
export const listGroupsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminGroupListItem[]> => {
    const { data, error } = await context.supabase
      .from("groups")
      .select(
        `id, slug, name, address_line, is_published, updated_at, municipality_id,
         municipality:municipalities ( name ),
         meetings ( id )`,
      )
      .order("name");
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      municipalityId: r.municipality_id,
      municipalityName: r.municipality?.name ?? "",
      addressLine: r.address_line,
      isPublished: r.is_published,
      meetingCount: (r.meetings ?? []).length,
      updatedAt: r.updated_at,
    }));
  });

export const getGroupAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<AdminGroupDetail> => {
    const { data: g, error } = await context.supabase
      .from("groups")
      .select(
        `id, slug, name, municipality_id, address_line, address_full, lat, lng,
         phone, history, public_info_name, public_info_phone, public_info_email,
         is_published,
         meetings ( id, group_id, weekday, start_time, end_time, type )`,
      )
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);
    return {
      id: g.id,
      slug: g.slug,
      name: g.name,
      municipalityId: g.municipality_id,
      addressLine: g.address_line,
      addressFull: g.address_full,
      lat: g.lat,
      lng: g.lng,
      phone: g.phone,
      history: g.history,
      publicInfoName: g.public_info_name,
      publicInfoPhone: g.public_info_phone,
      publicInfoEmail: g.public_info_email,
      isPublished: g.is_published,
      meetings: (g.meetings ?? [])
        .map((m) => ({
          id: m.id,
          groupId: m.group_id,
          weekday: m.weekday,
          start: (m.start_time as string).slice(0, 5),
          end: (m.end_time as string).slice(0, 5),
          type: m.type as MeetingType,
        }))
        .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start)),
    };
  });

export type UpsertGroupInput = {
  id?: string;
  name: string;
  slug?: string;
  municipalityId: string;
  addressLine: string;
  addressFull?: string;
  lat?: number | null;
  lng?: number | null;
  phone?: string | null;
  history?: string | null;
  publicInfoName?: string | null;
  publicInfoPhone?: string | null;
  publicInfoEmail?: string | null;
  isPublished?: boolean;
};

export const createGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertGroupInput) => data)
  .handler(async ({ context, data }): Promise<{ id: string; slug: string }> => {
    const name = data.name.trim();
    if (!name) throw new Error("El nombre es obligatorio");
    if (!data.municipalityId) throw new Error("Selecciona un municipio");
    if (!data.addressLine.trim()) throw new Error("La dirección es obligatoria");
    const slug = (data.slug?.trim() || slugify(name)) || slugify(name);
    const { data: row, error } = await context.supabase
      .from("groups")
      .insert({
        name,
        slug,
        municipality_id: data.municipalityId,
        address_line: data.addressLine.trim(),
        address_full: (data.addressFull ?? data.addressLine).trim(),
        lat: data.lat ?? null,
        lng: data.lng ?? null,
        phone: data.phone ?? null,
        history: data.history ?? null,
        public_info_name: data.publicInfoName ?? null,
        public_info_phone: data.publicInfoPhone ?? null,
        public_info_email: data.publicInfoEmail ?? null,
        is_published: data.isPublished ?? true,
      })
      .select("id,slug")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id, slug: row.slug };
  });

export const updateGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertGroupInput & { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const patch: Partial<{
      name: string;
      slug: string;
      municipality_id: string;
      address_line: string;
      address_full: string;
      lat: number | null;
      lng: number | null;
      phone: string | null;
      history: string | null;
      public_info_name: string | null;
      public_info_phone: string | null;
      public_info_email: string | null;
      is_published: boolean;
    }> = {};
    if (data.name !== undefined) patch.name = data.name.trim();
    if (data.slug !== undefined) patch.slug = data.slug.trim();
    if (data.municipalityId) patch.municipality_id = data.municipalityId;
    if (data.addressLine !== undefined) patch.address_line = data.addressLine.trim();
    if (data.addressFull !== undefined)
      patch.address_full = data.addressFull.trim() || data.addressLine?.trim() || "";
    if (data.lat !== undefined) patch.lat = data.lat;
    if (data.lng !== undefined) patch.lng = data.lng;
    if (data.phone !== undefined) patch.phone = data.phone;
    if (data.history !== undefined) patch.history = data.history;
    if (data.publicInfoName !== undefined) patch.public_info_name = data.publicInfoName;
    if (data.publicInfoPhone !== undefined) patch.public_info_phone = data.publicInfoPhone;
    if (data.publicInfoEmail !== undefined) patch.public_info_email = data.publicInfoEmail;
    if (data.isPublished !== undefined) patch.is_published = data.isPublished;
    const { error } = await context.supabase.from("groups").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });


export const setGroupPublished = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; isPublished: boolean }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const { error } = await context.supabase
      .from("groups")
      .update({ is_published: data.isPublished })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteGroup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const { error } = await context.supabase.from("groups").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------------- MEETINGS ----------------
export type MeetingListItem = AdminMeeting & {
  groupName: string;
  groupSlug: string;
  municipalityName: string;
};

export const listMeetingsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MeetingListItem[]> => {
    const { data, error } = await context.supabase
      .from("meetings")
      .select(
        `id, group_id, weekday, start_time, end_time, type,
         group:groups ( name, slug, municipality:municipalities ( name ) )`,
      )
      .order("weekday")
      .order("start_time");
    if (error) throw new Error(error.message);
    return (data ?? []).map((m) => ({
      id: m.id,
      groupId: m.group_id,
      weekday: m.weekday,
      start: (m.start_time as string).slice(0, 5),
      end: (m.end_time as string).slice(0, 5),
      type: m.type as MeetingType,
      groupName: m.group?.name ?? "",
      groupSlug: m.group?.slug ?? "",
      municipalityName: m.group?.municipality?.name ?? "",
    }));
  });

export type UpsertMeetingInput = {
  id?: string;
  groupId: string;
  weekday: number;
  start: string;
  end: string;
  type: MeetingType;
};

export const createMeeting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertMeetingInput) => data)
  .handler(async ({ context, data }): Promise<{ id: string }> => {
    if (!data.groupId) throw new Error("Selecciona un grupo");
    if (data.weekday < 0 || data.weekday > 6) throw new Error("Día inválido");
    if (data.end <= data.start) throw new Error("La hora de fin debe ser mayor a la de inicio");
    const { data: row, error } = await context.supabase
      .from("meetings")
      .insert({
        group_id: data.groupId,
        weekday: data.weekday,
        start_time: toTime(data.start),
        end_time: toTime(data.end),
        type: data.type,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const updateMeeting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertMeetingInput & { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    if (data.end <= data.start) throw new Error("La hora de fin debe ser mayor a la de inicio");
    const { error } = await context.supabase
      .from("meetings")
      .update({
        group_id: data.groupId,
        weekday: data.weekday,
        start_time: toTime(data.start),
        end_time: toTime(data.end),
        type: data.type,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMeeting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const { error } = await context.supabase.from("meetings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
