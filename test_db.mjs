import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4';
const admin = createClient(supabaseUrl, secretKey);
async function run() {
  const { data, error } = await admin.from('profiles').select('id, username').limit(10).order('created_at', { ascending: false });
  console.log("Profiles:", data);
  const { data: users, error: uErr } = await admin.auth.admin.listUsers();
  console.log("Auth Users:", users.users.map(u => ({ id: u.id, email: u.email })).slice(0, 10));
}
run();
