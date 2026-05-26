import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  console.log("Searching for user msmotivacional@gmail.com...");
  
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  const user = authUsers?.users.find(u => u.email === 'msmotivacional@gmail.com');
  
  if (user) {
    console.log("Found Auth User ID:", user.id);
    
    // Update profile plan in equipped_cosmetics JSON
    const { data: current, error: fetchErr } = await supabase
      .from('profiles')
      .select('equipped_cosmetics')
      .eq('id', user.id)
      .single();

    if (fetchErr) {
      console.error("Fetch error:", fetchErr);
      return;
    }

    const updatedCosmetics = {
      ...(current.equipped_cosmetics || {}),
      plan: 'infinite'
    };

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .update({ equipped_cosmetics: updatedCosmetics })
      .eq('id', user.id)
      .select();
      
    if (profileError) {
      console.error("Profile Update Error:", profileError);
    } else {
      console.log("Updated profile plan to infinite:", JSON.stringify(profile, null, 2));
    }
  }
}

run();
