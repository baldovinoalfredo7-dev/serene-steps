import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { slugify } from "./slug";

export type EventStatus = "draft" | "published" | "archived";

export type PublicEvent = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  addressLine: string | null;
  municipalityId: string | null;
  municipalityName: string | null;
  imageUrl: string | null;
  organizer: string | null;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  isFeatured: boolean;
};

export type AdminEventListItem = {
  id: string;
  slug: string;
  title: string;
  startsAt: string;
  endsAt: string | null;
  status: EventStatus;
  isFeatured: boolean;
  municipalityName: string | null;
  location: string | null;
  updatedAt: string;
};

export type AdminEventDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  startsAt: string; // ISO
  endsAt: string | null;
  location: string | null;
  addressLine: string | null;
  municipalityId: string | null;
  imageUrl: string | null;
  organizer: string | null;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  status: EventStatus;
  isFeatured: boolean;
};

export type UpsertEventInput = {
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (optional, empty allowed)
  time: string; // HH:MM (optional)
  location: string;
  addressLine: string;
  municipalityId: string; // uuid or empty
  imageUrl: string;
  organizer: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: EventStatus;
  isFeatured: boolean;
};

function composeStartsAt(date: string, time: string): string {
  const t = time && /^\d{2}:\d{2}$/.test(time) ? time : "00:00";
  return new Date(`${date}T${t}:00`).toISOString();
}

function composeEndsAt(endDate: string, startDate: string, time: string): string | null {
  if (!endDate) return null;
  const t = time && /^\d{2}:\d{2}$/.test(time) ? time : "23:59";
  const iso = new Date(`${endDate}T${t}:00`).toISOString();
  // If endDate < startDate, still store — validated client-side.
  void startDate;
  return iso;
}

function validate(input: UpsertEventInput) {
  if (!input.title.trim()) throw new Error("El título es obligatorio");
  if (!input.startDate) throw new Error("La fecha de inicio es obligatoria");
  if (input.endDate && input.endDate < input.startDate)
    throw new Error("La fecha de finalización no puede ser anterior al inicio");
  if (!["draft", "published", "archived"].includes(input.status))
    throw new Error("Estado inválido");
}

function toRow(input: UpsertEventInput) {
  return {
    title: input.title.trim(),
    description: input.description.trim() || null,
    starts_at: composeStartsAt(input.startDate, input.time),
    ends_at: composeEndsAt(input.endDate, input.startDate, input.time),
    location: input.location.trim() || null,
    address_line: input.addressLine.trim() || null,
    municipality_id: input.municipalityId || null,
    image_url: input.imageUrl.trim() || null,
    organizer: input.organizer.trim() || null,
    contact_name: input.contactName.trim() || null,
    contact_phone: input.contactPhone.trim() || null,
    contact_email: input.contactEmail.trim() || null,
    status: input.status,
    is_featured: input.isFeatured,
    is_published: input.status === "published",
  };
}

async function ensureUniqueSlug(
  supabase: ReturnType<typeof createClient<Database>>,
  base: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugify(base) || "evento";
  let candidate = baseSlug;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let q = supabase.from("events").select("id").eq("slug", candidate).limit(1);
    if (excludeId) q = q.neq("id", excludeId);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return candidate;
    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
}

// ---------------- PUBLIC (anon) ----------------
function publicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublicEvents = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicEvent[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("events")
      .select(
        `id, slug, title, description, starts_at, ends_at, location, address_line,
         municipality_id, image_url, organizer, contact_name, contact_phone, contact_email,
         is_featured, municipality:municipalities ( name )`,
      )
      .eq("status", "published")
      .order("starts_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      startsAt: r.starts_at,
      endsAt: r.ends_at,
      location: r.location,
      addressLine: r.address_line,
      municipalityId: r.municipality_id,
      municipalityName: (r.municipality as { name: string } | null)?.name ?? null,
      imageUrl: r.image_url,
      organizer: r.organizer,
      contactName: r.contact_name,
      contactPhone: r.contact_phone,
      contactEmail: r.contact_email,
      isFeatured: r.is_featured,
    }));
  },
);

export const getPublicEvent = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<PublicEvent | null> => {
    const supabase = publicClient();
    const { data: r, error } = await supabase
      .from("events")
      .select(
        `id, slug, title, description, starts_at, ends_at, location, address_line,
         municipality_id, image_url, organizer, contact_name, contact_phone, contact_email,
         is_featured, municipality:municipalities ( name )`,
      )
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!r) return null;
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      startsAt: r.starts_at,
      endsAt: r.ends_at,
      location: r.location,
      addressLine: r.address_line,
      municipalityId: r.municipality_id,
      municipalityName: (r.municipality as { name: string } | null)?.name ?? null,
      imageUrl: r.image_url,
      organizer: r.organizer,
      contactName: r.contact_name,
      contactPhone: r.contact_phone,
      contactEmail: r.contact_email,
      isFeatured: r.is_featured,
    };
  });

// ---------------- ADMIN ----------------
export const listEventsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminEventListItem[]> => {
    const { data, error } = await context.supabase
      .from("events")
      .select(
        `id, slug, title, starts_at, ends_at, status, is_featured, location, updated_at,
         municipality:municipalities ( name )`,
      )
      .order("starts_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      startsAt: r.starts_at,
      endsAt: r.ends_at,
      status: r.status as EventStatus,
      isFeatured: r.is_featured,
      municipalityName: (r.municipality as { name: string } | null)?.name ?? null,
      location: r.location,
      updatedAt: r.updated_at,
    }));
  });

export const getEventAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<AdminEventDetail> => {
    const { data: r, error } = await context.supabase
      .from("events")
      .select(
        `id, slug, title, description, starts_at, ends_at, location, address_line,
         municipality_id, image_url, organizer, contact_name, contact_phone, contact_email,
         status, is_featured`,
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!r) throw new Error("Evento no encontrado");
    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      startsAt: r.starts_at,
      endsAt: r.ends_at,
      location: r.location,
      addressLine: r.address_line,
      municipalityId: r.municipality_id,
      imageUrl: r.image_url,
      organizer: r.organizer,
      contactName: r.contact_name,
      contactPhone: r.contact_phone,
      contactEmail: r.contact_email,
      status: r.status as EventStatus,
      isFeatured: r.is_featured,
    };
  });

export const createEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertEventInput) => data)
  .handler(async ({ context, data }): Promise<{ id: string; slug: string }> => {
    validate(data);
    const slug = await ensureUniqueSlug(context.supabase, data.title);
    const row = { ...toRow(data), slug };
    const { data: inserted, error } = await context.supabase
      .from("events")
      .insert(row)
      .select("id, slug")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted.id, slug: inserted.slug };
  });

export const updateEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpsertEventInput & { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true; slug: string }> => {
    validate(data);
    // Recompute slug only if title changed (compare via current row)
    const { data: current, error: cErr } = await context.supabase
      .from("events")
      .select("title, slug")
      .eq("id", data.id)
      .maybeSingle();
    if (cErr) throw new Error(cErr.message);
    if (!current) throw new Error("Evento no encontrado");
    let slug = current.slug;
    if (current.title.trim() !== data.title.trim()) {
      slug = await ensureUniqueSlug(context.supabase, data.title, data.id);
    }
    const { error } = await context.supabase
      .from("events")
      .update({ ...toRow(data), slug })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true, slug };
  });

export const setEventStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: EventStatus }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    if (!["draft", "published", "archived"].includes(data.status))
      throw new Error("Estado inválido");
    const { error } = await context.supabase
      .from("events")
      .update({ status: data.status, is_published: data.status === "published" })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const duplicateEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ id: string }> => {
    const { data: src, error } = await context.supabase
      .from("events")
      .select(
        `title, description, starts_at, ends_at, location, address_line, municipality_id,
         image_url, organizer, contact_name, contact_phone, contact_email, is_featured`,
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!src) throw new Error("Evento no encontrado");
    const newTitle = `${src.title} (copia)`;
    const slug = await ensureUniqueSlug(context.supabase, newTitle);
    const { data: inserted, error: insErr } = await context.supabase
      .from("events")
      .insert({
        ...src,
        title: newTitle,
        slug,
        status: "draft",
        is_published: false,
      })
      .select("id")
      .single();
    if (insErr) throw new Error(insErr.message);
    return { id: inserted.id };
  });

export const deleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const { error } = await context.supabase.from("events").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
