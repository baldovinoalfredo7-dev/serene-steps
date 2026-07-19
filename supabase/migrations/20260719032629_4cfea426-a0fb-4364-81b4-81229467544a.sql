
-- =========================================================
-- SPRINT 2 · Infraestructura de datos (extensión)
-- =========================================================

-- 1) CATEGORÍAS DE DOCUMENTOS -----------------------------
CREATE TABLE IF NOT EXISTS public.document_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.document_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_categories TO authenticated;
GRANT ALL ON public.document_categories TO service_role;

ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorías publicadas visibles para todos"
  ON public.document_categories FOR SELECT
  USING (is_published = true OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admin/editor gestionan categorías"
  ON public.document_categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TRIGGER trg_document_categories_updated
  BEFORE UPDATE ON public.document_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.document_categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_documents_category_id ON public.documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_is_published ON public.documents(is_published);


-- 2) PERMISOS Y PERMISOS POR ROL --------------------------
CREATE TABLE IF NOT EXISTS public.permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.permissions TO authenticated;
GRANT ALL ON public.permissions TO service_role;

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquier autenticado consulta el catálogo"
  ON public.permissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Solo admin modifica permisos"
  ON public.permissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));


CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role, permission_id)
);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON public.role_permissions(role);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON public.role_permissions(permission_id);

GRANT SELECT ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquier autenticado consulta la matriz"
  ON public.role_permissions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Solo admin modifica la matriz"
  ON public.role_permissions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _code text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role
    JOIN public.permissions p ON p.id = rp.permission_id
    WHERE ur.user_id = _user_id AND p.code = _code
  )
$$;

REVOKE ALL ON FUNCTION public.has_permission(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_permission(uuid, text) TO authenticated, service_role;


-- 3) AUDITORÍA --------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_table ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON public.audit_log(user_id);

GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo admin consulta la auditoría"
  ON public.audit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));


-- 4) ÍNDICES DE RENDIMIENTO ADICIONALES -------------------
CREATE INDEX IF NOT EXISTS idx_groups_municipality ON public.groups(municipality_id);
CREATE INDEX IF NOT EXISTS idx_groups_is_published ON public.groups(is_published);
CREATE INDEX IF NOT EXISTS idx_meetings_group ON public.meetings(group_id);
CREATE INDEX IF NOT EXISTS idx_meetings_weekday ON public.meetings(weekday);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON public.events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_is_published ON public.events(is_published);


-- 5) CATÁLOGO INICIAL ------------------------------------
INSERT INTO public.document_categories (slug, name, description, sort_order) VALUES
  ('libros',       'Libros',                 'Literatura oficial de AA en formato libro.', 10),
  ('folletos',     'Folletos',               'Folletos aprobados por la Conferencia de Servicios Generales.', 20),
  ('boletines',    'Boletines',              'Boletines informativos del Área 2 Metropolitana.', 30),
  ('formularios',  'Formularios de servicio','Formatos para uso interno de servidores y comités.', 40),
  ('actas',        'Actas y reportes',       'Actas de asambleas, foros y reportes del área.', 50)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.permissions (code, description) VALUES
  ('grupos.leer',            'Consultar grupos'),
  ('grupos.editar',          'Crear y editar grupos'),
  ('grupos.eliminar',        'Eliminar grupos'),
  ('reuniones.editar',       'Crear y editar reuniones'),
  ('eventos.editar',         'Crear y editar eventos'),
  ('documentos.editar',      'Publicar y editar documentos'),
  ('categorias.editar',      'Administrar categorías de documentos'),
  ('usuarios.gestionar',     'Invitar, editar y desactivar usuarios'),
  ('roles.asignar',          'Asignar roles a usuarios'),
  ('auditoria.consultar',    'Consultar la bitácora de auditoría')
ON CONFLICT (code) DO NOTHING;

-- admin: todo
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin'::app_role, id FROM public.permissions
ON CONFLICT DO NOTHING;

-- editor: contenido
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'editor'::app_role, id FROM public.permissions
WHERE code IN (
  'grupos.leer','grupos.editar',
  'reuniones.editar','eventos.editar',
  'documentos.editar','categorias.editar'
)
ON CONFLICT DO NOTHING;

-- member: solo lectura
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'member'::app_role, id FROM public.permissions
WHERE code IN ('grupos.leer')
ON CONFLICT DO NOTHING;
