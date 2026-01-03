-- Create enquiries table for storing class enquiry submissions
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone TEXT CHECK (char_length(phone) >= 10 AND char_length(phone) <= 20),
  message TEXT CHECK (char_length(message) <= 1000),
  preferred_class_type TEXT CHECK (char_length(preferred_class_type) <= 100),
  source TEXT DEFAULT 'contact_form' CHECK (char_length(source) <= 50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE enquiries IS 'Stores enquiry submissions for dance classes from the website';

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);

-- Create index on source for analytics
CREATE INDEX IF NOT EXISTS idx_enquiries_source ON enquiries(source);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public enquiry form)
CREATE POLICY "Allow public to submit enquiries"
  ON enquiries
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow authenticated users to view enquiries"
  ON enquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update (for marking as read, etc.)
CREATE POLICY "Allow authenticated users to update enquiries"
  ON enquiries
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create trigger to call the function before any update
CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for recent enquiries (last 30 days)
CREATE OR REPLACE VIEW recent_enquiries AS
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

COMMENT ON VIEW recent_enquiries IS 'View showing enquiry submissions from the last 30 days';
