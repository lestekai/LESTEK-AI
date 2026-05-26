import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTE4MzIsImV4cCI6MjA5NDM2NzgzMn0.J-4ClUvfSh01BgL4guZl-XcQJBX0A_A2pxC-F2k2Nc0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'lestekadm@evolux.app',
      password: 'Lestek!7570',
    });
    console.log('data:', data);
    console.log('error:', error);
  } catch (e) {
    console.log('exception:', e);
  }
}
testFetch();
