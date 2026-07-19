
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS address_line text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS organizer text,
  ADD COLUMN IF NOT EXISTS contact_name text,
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS contact_email text;

UPDATE public.events SET status = CASE WHEN is_published THEN 'published' ELSE 'draft' END
  WHERE status = 'draft';

ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_status_check;
ALTER TABLE public.events ADD CONSTRAINT events_status_check
  CHECK (status IN ('draft','published','archived'));

UPDATE public.events
  SET slug = regexp_replace(lower(coalesce(title,'evento')), '[^a-z0-9]+', '-', 'g')
             || '-' || substr(id::text, 1, 6)
  WHERE slug IS NULL;

ALTER TABLE public.events ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS events_slug_key ON public.events(slug);
CREATE INDEX IF NOT EXISTS events_status_starts_at_idx ON public.events(status, starts_at);

DROP POLICY IF EXISTS "Eventos publicados visibles" ON public.events;
CREATE POLICY "Eventos publicados visibles" ON public.events
  FOR SELECT USING (status = 'published');

GRANT SELECT ON public.events TO anon;
