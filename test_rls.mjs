import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTE4MzIsImV4cCI6MjA5NDM2NzgzMn0.J-4ClUvfSh01BgL4guZl-XcQJBX0A_A2pxC-F2k2Nc0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data: signData, error: signError } = await supabase.auth.signInWithPassword({
    email: "teste014@evolux.app",
    password: "password123"
  });
  
  if (signError) {
    console.log("Sign in error:", signError);
    return;
  }
  
  console.log("Signed in:", signData.user.id);
  
  const { data: profile, error: profError } = await supabase.from('profiles').select('*').single();
  console.log("Profile select:", JSON.stringify(profError || profile));
}
testFetch();
