import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient('https://ohbxcxznqqdiufreknoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4', {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data } = await supabaseAdmin.from('profiles').select('status').limit(5);
  console.log('Statuses:', data);
}
run();
