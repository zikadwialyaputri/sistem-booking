import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dcugbzvvlzmxzfyaqmbd.supabase.co";

const supabaseAnonKey =
  "sb_publishable_tz4dUW1oE6OAG-fgRgMtNg_A7aY4oFl";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);