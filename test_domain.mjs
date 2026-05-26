import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4';
const admin = createClient(supabaseUrl, secretKey);
async function run() {
  const { data, error } = await admin.auth.admin.createUser({
    email: "teste014@evolux.app",
    password: "password123",
    email_confirm: true,
  });
  console.log("Result:", error ? error.message : "Success");
}
run();
