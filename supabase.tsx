import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://smtahwszfwziqyzwbnrg.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
// const serviceRoleKey = process.env.serviceRoleKey ?? "";

// const supabase = createClient(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
