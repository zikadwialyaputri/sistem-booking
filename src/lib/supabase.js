import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dcugbzvvlzmxzfyaqmbd.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdWdienZ2bHpteHpmeWFxbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNDI0MjYsImV4cCI6MjA5NzgxODQyNn0.cDipZdceedJnxRuggI1DFqTTOGWWRiWYefkMMtHNcRM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);