-- Create contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE contacts IS 'Stores contact form submissions from the website';

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public contact form)
CREATE POLICY "Allow public to submit contact forms"
  ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated users to view contacts"
  ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update (for marking as read, etc.)
CREATE POLICY "Allow authenticated users to update contacts"
  ON contacts
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function before any update
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for recent contacts (last 30 days)
CREATE OR REPLACE VIEW recent_contacts AS
SELECT
  id,
  name,
  email,
  message,
  created_at
FROM contacts
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

COMMENT ON VIEW recent_contacts IS 'View showing contact submissions from the last 30 days';
