import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vpqaxtnitwkmlbqogkjc.supabase.co";
const SUPABASE_KEY = "sb_publishable_bEjRGYjpsehU7XiTcXZRfw_vG3tXgV8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
