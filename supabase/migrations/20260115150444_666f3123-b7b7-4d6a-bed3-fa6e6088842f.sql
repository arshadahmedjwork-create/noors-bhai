-- Fix the overly permissive audit_log INSERT policy
-- The audit_log should only be insertable by authenticated users for their own actions
-- or by service role for system operations

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_log;

-- Create a more restrictive policy that allows authenticated users to log their own actions
CREATE POLICY "Authenticated users can insert audit logs for their actions"
  ON public.audit_log FOR INSERT
  TO authenticated
  WITH CHECK (actor_user_id = auth.uid() OR actor_user_id IS NULL);

-- Also allow service role to insert any audit logs (for webhook operations)
-- This is handled automatically by the service role bypassing RLS