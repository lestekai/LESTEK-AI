import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL as string, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string);
supabase.from('feedbacks').select('*, profiles(name, username)').then(res => console.log(JSON.stringify(res, null, 2)));
