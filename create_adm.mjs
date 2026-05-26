import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient('https://ohbxcxznqqdiufreknoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4', {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'msmotivacional@gmail.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        name: 'Admin Teste',
        username: 'adm_teste'
      }
    });

  if (data?.user) {
    console.log("Created adm_teste", data.user.id);
    await supabaseAdmin.from('profiles').update({
       equipped_cosmetics: {
         plan: 'infinite',
         plan_expires_at: ''
       }
    }).eq('id', data.user.id);
    console.log("Updated to infinite plan");
  } else {
    console.error("error:", error);
  }
}
run();
