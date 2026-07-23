
ALTER TABLE public.groups
  ADD COLUMN IF NOT EXISTS area smallint CHECK (area IN (2, 3)),
  ADD COLUMN IF NOT EXISTS neighborhood text,
  ADD COLUMN IF NOT EXISTS photo_url text;

INSERT INTO public.municipalities (name, slug)
SELECT v.name, v.slug FROM (VALUES
  ('Sabanalarga', 'sabanalarga'),
  ('Baranoa', 'baranoa'),
  ('Santo Tomás', 'santo-tomas'),
  ('Palmar de Varela', 'palmar-de-varela'),
  ('Ponedera', 'ponedera'),
  ('Sabanagrande', 'sabanagrande'),
  ('Polonuevo', 'polonuevo'),
  ('Usiacurí', 'usiacuri')
) AS v(name, slug)
WHERE NOT EXISTS (SELECT 1 FROM public.municipalities m WHERE m.name = v.name);
