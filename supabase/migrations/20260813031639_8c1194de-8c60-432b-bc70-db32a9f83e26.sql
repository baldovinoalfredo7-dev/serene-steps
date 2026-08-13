
DROP VIEW IF EXISTS public.public_groups;
DROP VIEW IF EXISTS public.public_meetings;
DROP VIEW IF EXISTS public.public_events;

-- Restore anonymous read policies (row level), column access is limited by grants below
DROP POLICY IF EXISTS "Grupos publicados visibles para servidores" ON public.groups;
DROP POLICY IF EXISTS "Eventos publicados visibles para servidores" ON public.events;
DROP POLICY IF EXISTS "Reuniones visibles para servidores" ON public.meetings;

CREATE POLICY "Grupos publicados visibles para todos"
ON public.groups FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Eventos publicados visibles"
ON public.events FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE POLICY "Reuniones visibles para todos"
ON public.meetings FOR SELECT TO anon, authenticated USING (true);

-- Column-level grants: anon can only read non-sensitive columns
REVOKE SELECT ON public.groups FROM anon;
REVOKE SELECT ON public.events FROM anon;
REVOKE SELECT ON public.meetings FROM anon;

GRANT SELECT (id, slug, name, area, municipality_id, neighborhood, address_line, address_full, phone, photo_url, history, is_published)
  ON public.groups TO anon;

GRANT SELECT (id, slug, title, description, starts_at, ends_at, location, address_line, municipality_id, image_url, organizer, is_featured, status)
  ON public.events TO anon;

GRANT SELECT (id, group_id, weekday, start_time, end_time, type)
  ON public.meetings TO anon;
