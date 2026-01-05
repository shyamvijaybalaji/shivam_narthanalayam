-- Fix security issues with views by using SECURITY INVOKER
-- This makes views execute with the permissions of the querying user
-- rather than the view creator (SECURITY DEFINER)

-- Recreate recent_contacts view with SECURITY INVOKER
CREATE OR REPLACE VIEW recent_contacts
WITH (security_invoker = true)
AS
SELECT
  id,
  name,
  email,
  message,
  created_at
FROM contacts
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

COMMENT ON VIEW recent_contacts IS 'View showing contact submissions from the last 30 days (security invoker)';

-- Recreate recent_enquiries view with SECURITY INVOKER
CREATE OR REPLACE VIEW recent_enquiries
WITH (security_invoker = true)
AS
SELECT
  id,
  name,
  email,
  phone,
  message,
  preferred_class_type,
  source,
  created_at
FROM enquiries
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

COMMENT ON VIEW recent_enquiries IS 'View showing enquiry submissions from the last 30 days (security invoker)';
