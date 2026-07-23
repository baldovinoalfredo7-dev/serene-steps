import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Group, MeetingType } from "./groups-data";

/**
 * Server function pública: devuelve todos los grupos publicados
 * con sus reuniones y municipio, en el mismo shape que consume el
 * portal público (compatible con el antiguo `groups-data`).
 *
 * Usa la publishable key para respetar las políticas RLS de lectura anónima.
 */
export const listGroupsFn = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await supabase
    .from("groups")
    .select(
      `slug, name, area, neighborhood, address_line, address_full, lat, lng, phone, photo_url, history,
       public_info_name, public_info_phone, public_info_email,
       municipality:municipalities ( name ),
       meetings ( weekday, start_time, end_time, type )`,
    )
    .eq("is_published", true)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  const groups: Group[] = (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    area: (row.area as 2 | 3 | null) ?? undefined,
    municipality: row.municipality?.name ?? "",
    neighborhood: row.neighborhood ?? undefined,
    addressLine: row.address_line,
    addressFull: row.address_full,
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    phone: row.phone ?? undefined,
    photoUrl: row.photo_url ?? undefined,
    history: row.history ?? "",
    meetings: (row.meetings ?? [])
      .map((m) => ({
        weekday: m.weekday,
        start: (m.start_time as string).slice(0, 5),
        end: (m.end_time as string).slice(0, 5),
        type: m.type as MeetingType,
      }))
      .sort((a, b) => a.weekday - b.weekday || a.start.localeCompare(b.start)),
    publicInfo:
      row.public_info_name || row.public_info_phone || row.public_info_email
        ? {
            name: row.public_info_name ?? undefined,
            phone: row.public_info_phone ?? undefined,
            email: row.public_info_email ?? undefined,
          }
        : undefined,
  }));

  return groups;
});

