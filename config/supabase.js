import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY,
);

async function countSameSlug(name) {
  const { count } = await supabase
    .from('concert')
    .select('*', { count: 'exact' })
    .ilike('name', `%${name}%`);

  return count;
}

export { supabase, countSameSlug };
