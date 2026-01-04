-- Fix Row Level Security policy for enquiries table
-- This allows anonymous users (using the anon key) to insert enquiries

-- Drop all existing policies on enquiries table
DROP POLICY IF EXISTS "Allow public to submit enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow anonymous inserts to enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated inserts to enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view enquiries" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update enquiries" ON enquiries;

-- Create a simple policy that allows INSERT operations for anon users
CREATE POLICY "Enable insert for anon users" ON enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anon users to also SELECT (needed for the .select() after insert)
CREATE POLICY "Enable select for anon users" ON enquiries
  FOR SELECT TO anon
  USING (true);

-- Keep policies for authenticated users
CREATE POLICY "Enable all for authenticated users" ON enquiries
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
