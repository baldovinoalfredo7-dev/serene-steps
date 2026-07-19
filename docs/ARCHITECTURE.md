# Arquitectura — Portal AA Área 2 Metropolitana

Documento vivo de arquitectura técnica. Se actualiza al cierre de cada fase.

---

## Estado actual: Fase 2 en curso 🔧

**Fase 1 — cerrada ✅**
- Lovable Cloud, esquema, RLS, migración de datos y Portal Público leyendo desde la base de datos.

**Fase 2 — Autenticación (entregado)**
- Supabase Auth con correo + contraseña, HIBP (comprobación de contraseñas filtradas) activa, auto-confirmación de correo activa para agilizar el bootstrap.
- Recuperación de contraseña vía `resetPasswordForEmail` + página pública `/reset-password`.
- Gate `_authenticated/` (`ssr: false`, redirect a `/auth`).
- Página `/perfil` con datos del usuario, roles, cierre de sesión, cambio de contraseña y **bootstrap del primer administrador**.
- Header consciente de sesión: alterna entre "Acceso para miembros" y "Mi cuenta".
- Función SQL `bootstrap_first_admin()`: solo promueve al primer usuario si aún no existe ningún admin; después siempre devuelve `false`.
- Función SQL `admin_exists()`: consulta ligera para ocultar el CTA de bootstrap una vez asignado el primer admin.
- Autenticación, login, Google Auth → Fase 2.
- Panel administrativo, CRUD de grupos y reuniones → Fase 3.
- Eventos activos, documentos, storage, auditoría, permisos avanzados → Fase 4.

---

## Stack

- **Frontend / SSR**: TanStack Start v1, React 19, Vite 7, Tailwind v4.
- **Datos**: PostgreSQL (Lovable Cloud / Supabase gestionado).
- **Acceso a datos**: `createServerFn` desde el servidor + TanStack Query en el cliente.
- **RLS**: activo en todas las tablas públicas. Rol `anon` con lectura sobre datos públicos únicamente.

---

## Modelo de datos

### Tablas ACTIVAS en Fase 1

| Tabla | Responsabilidad | Consumida por |
|---|---|---|
| `municipalities` | Catálogo de los 5 municipios del Área 2 (Barranquilla, Soledad, Malambo, Galapa, Puerto Colombia). | `/grupos`, `/horarios`, `MeetingFinder` |
| `groups` | Los 9 grupos del Área 2 (nombre, slug, dirección, historia, contacto IP, coordenadas, `municipality_id`). | `/grupos`, `/grupos/$slug`, `sitemap.xml` |
| `meetings` | Horarios semanales por grupo (día, hora, tipo de reunión). | `/grupos/$slug`, `/horarios`, `MeetingFinder` |
| `profiles` | Perfil público mínimo asociado a `auth.users` (nombre). Preparada, sin registros aún. | Fase 2 en adelante |
| `user_roles` | Asignación `user_id → app_role` (`admin`, `editor`, `member`). Base de la función `has_role()`. Preparada, sin registros aún. | Fase 2 en adelante |

### Tablas ADELANTADAS — inactivas en Fase 1 ⏸️

Estas tablas ya existen en la base de datos con RLS activo, pero **no son leídas ni escritas por ningún código del Portal Público**. Se conservan porque el esquema ya está validado y esto acelera la Fase 4.

| Tabla | Por qué existe ya | Se activa en | Responsabilidad futura |
|---|---|---|---|
| `document_categories` | Catálogo semilla (libros, folletos, actas) ya insertado. | **Fase 4** | Categorizar la biblioteca de literatura AA autorizada. |
| `permissions` | Matriz de 10 permisos granulares ya sembrada (`groups.manage`, `events.publish`, etc.). | **Fase 4** | Definir acciones administrables por código estable. |
| `role_permissions` | Mapeo `app_role → permission_id` ya sembrado para `admin`, `editor`, `member`. | **Fase 4** | Autorizar acciones del panel según rol. |
| `audit_log` | Estructura inmutable lista para bitácora de cambios. | **Fase 4** | Registrar quién modificó qué, cuándo y desde dónde en el panel administrativo. |

### Función adelantada — inactiva

- `has_permission(_user_id uuid, _code text) → boolean`
  - SECURITY DEFINER, `search_path = public`.
  - No es invocada por ninguna política RLS ni por ningún `createServerFn` actual.
  - **Se activará en Fase 4** para autorizar operaciones del panel según `permissions` + `role_permissions`.

### Función ACTIVA usada por RLS

- `has_role(_user_id uuid, _role app_role) → boolean`
  - Utilizada por políticas RLS de escritura sobre `groups`, `meetings`, `events`, `documents`. Sin usuarios con rol asignado, esas políticas simplemente no conceden acceso — el Portal Público sigue funcionando en modo solo lectura pública.

---

## Confirmación de no-afectación

Se confirma que las tablas y funciones adelantadas **no afectan el comportamiento actual del sistema**:

1. **Ningún componente, ruta o `createServerFn` del Portal Público las importa o consulta.**
   Búsqueda verificada: `audit_log`, `permissions`, `role_permissions`, `document_categories`, `has_permission` no aparecen en `src/`.
2. **RLS bloquea por defecto** cualquier acceso desde `anon` a estas tablas — no hay superficie de exposición pública.
3. **Sus datos semilla son metadatos estáticos** (nombres de permisos, categorías), no información visible al visitante.
4. **No hay triggers activos** que las escriban de forma implícita.
5. **Rendimiento**: al no ser consultadas, no añaden latencia ni carga al Portal Público.

---

## Flujo de datos actual (Fase 1)

```
Visitante → Ruta pública (SSR)
         → loader: ensureQueryData(queryOptions)
         → createServerFn (servidor)
         → cliente Supabase publishable (rol anon)
         → PostgreSQL con RLS pública
         → DTO serializable
         → useSuspenseQuery en el componente
```

Sin sesión, sin cookies de auth, sin escritura.

---

## Roadmap

- **Fase 2 — Autenticación**: email + Google OAuth, bootstrap del primer administrador, gate `_authenticated/`, atacher de bearer token.
- **Fase 3 — Panel administrativo**: CRUD de grupos y reuniones bajo `/admin`, validación con Zod, invalidación de caches del Portal Público tras mutaciones.
- **Fase 4 — Contenido y gobernanza**: activación de `events`, `documents` (con Storage), `audit_log`, `permissions` + `role_permissions` + `has_permission()` en políticas RLS y middlewares de servidor.
