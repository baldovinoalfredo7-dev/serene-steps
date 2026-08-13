
-- 1. Public views with minimal columns
CREATE OR REPLACE VIEW public.public_groups AS
SELECT g.id, g.slug, g.name, g.area, g.municipality_id, g.neighborhood,
       g.address_line, g.address_full, g.phone, g.photo_url, g.history
FROM public.groups g
WHERE g.is_published = true;

CREATE OR REPLACE VIEW public.public_meetings AS
SELECT m.id, m.group_id, m.weekday, m.start_time, m.end_time, m.type
FROM public.meetings m
JOIN public.groups g ON g.id = m.group_id
WHERE g.is_published = true;

CREATE OR REPLACE VIEW public.public_events AS
SELECT e.id, e.slug, e.title, e.description, e.starts_at, e.ends_at, e.location,
       e.address_line, e.municipality_id, e.image_url, e.organizer, e.is_featured
FROM public.events e
WHERE e.status = 'published';

GRANT SELECT ON public.public_groups TO anon, authenticated;
GRANT SELECT ON public.public_meetings TO anon, authenticated;
GRANT SELECT ON public.public_events TO anon, authenticated;

-- 2. Remove anonymous access to the base tables
DROP POLICY IF EXISTS "Grupos publicados visibles para todos" ON public.groups;
DROP POLICY IF EXISTS "Eventos publicados visibles" ON public.events;
DROP POLICY IF EXISTS "Reuniones visibles para todos" ON public.meetings;

CREATE POLICY "Grupos publicados visibles para servidores"
ON public.groups FOR SELECT TO authenticated USING (is_published = true);

CREATE POLICY "Eventos publicados visibles para servidores"
ON public.events FOR SELECT TO authenticated USING (status = 'published');

CREATE POLICY "Reuniones visibles para servidores"
ON public.meetings FOR SELECT TO authenticated USING (true);

REVOKE SELECT ON public.groups FROM anon;
REVOKE SELECT ON public.events FROM anon;
REVOKE SELECT ON public.meetings FROM anon;
