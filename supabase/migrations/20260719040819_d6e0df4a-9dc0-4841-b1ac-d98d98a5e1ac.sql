-- Add must_change_password flag to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS must_change_password boolean NOT NULL DEFAULT false;

-- RPC: user marks their own password as changed
CREATE OR REPLACE FUNCTION public.clear_password_change_flag()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid;
BEGIN
  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'No hay usuario autenticado';
  END IF;
  UPDATE public.profiles SET must_change_password = false WHERE id = v_uid;
  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.clear_password_change_flag() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clear_password_change_flag() TO authenticated;

-- RPC: current user reads their own must_change_password flag (RLS-safe helper)
CREATE OR REPLACE FUNCTION public.my_must_change_password()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT must_change_password FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

REVOKE EXECUTE ON FUNCTION public.my_must_change_password() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_must_change_password() TO authenticated;
