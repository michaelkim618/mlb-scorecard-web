import { createClient } from "@supabase/supabase-js";
import { mockSupabase } from "./supabaseMock";

const SUPABASE_URL = "https://vpqaxtnitwkmlbqogkjc.supabase.co";
const SUPABASE_KEY = "sb_publishable_bEjRGYjpsehU7XiTcXZRfw_vG3tXgV8";

// Set VITE_USE_MOCK=1 to run against the in-memory fake (see supabaseMock.js).
// Never true in a production build — the flag is only set in local dev.
// import.meta.env.DEV is statically false in a production build, so the whole
// mock branch (and the module it pulls in) is dead code and gets dropped.
export const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "1";

export const supabase = USE_MOCK
  ? mockSupabase
  : createClient(SUPABASE_URL, SUPABASE_KEY);
