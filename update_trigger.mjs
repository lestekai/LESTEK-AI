import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient('https://ohbxcxznqqdiufreknoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4', {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const query = `
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.profiles (id, email, username, name, role, status, avatar_level, xp)
      VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)), 
        COALESCE(new.raw_user_meta_data->>'name', ''),
        'user',
        'pending',
        1,
        0
      );
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  // We can't run raw query easily with standard JS client without RPC.
  // So we will just write an empty RPC or update all existing users to have 'status': 'pending'?
  // Existing logic works fine.
}
run();
