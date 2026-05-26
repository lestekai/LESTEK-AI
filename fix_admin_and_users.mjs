import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient('https://ohbxcxznqqdiufreknoh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4', {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error } = await supabaseAdmin.from('profiles').select('*');
  
  const msmotivacional = data?.find(u => u.email === 'msmotivacional@gmail.com' || u.username === 'ADM_TESTE' || u.username === 'adm_teste');
  if (msmotivacional) {
    await supabaseAdmin.from('profiles').update({
       equipped_cosmetics: {
         ...(msmotivacional.equipped_cosmetics || {}),
         plan: 'infinite'
       }
    }).eq('id', msmotivacional.id);
    console.log("Updated", msmotivacional.email, "to infinite plan");
  } else {
    console.log("Could not find ADM_TESTE or msmotivacional@gmail.com user.");
    for(const u of data) {
       console.log('User:', u.username, u.email);
    }
  }
}
run();
