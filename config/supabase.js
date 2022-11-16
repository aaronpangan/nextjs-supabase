import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.supabase_project_url,
  process.env.supabase_project_key,
);

export default supabase;
