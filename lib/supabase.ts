import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohbxcxznqqdiufreknoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTE4MzIsImV4cCI6MjA5NDM2NzgzMn0.J-4ClUvfSh01BgL4guZl-XcQJBX0A_A2pxC-F2k2Nc0';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnhjeHpucXFkaXVmcmVrbm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc5MTgzMiwiZXhwIjoyMDk0MzY3ODMyfQ.KmGZkhfOR0qagUD1yNyoKKbBVEdgb4HNDldlDM2kUK4';

// Global singleton pattern to prevent multiple GoTrueClient instances during HMR or multiple imports
interface GlobalSupabase {
  supabaseInstance?: any;
  supabaseAdminInstance?: any;
}

const globalObj = (typeof window !== 'undefined' ? window : globalThis) as unknown as GlobalSupabase;

export function getSupabase() {
  if (!globalObj.supabaseInstance) {
    globalObj.supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return globalObj.supabaseInstance;
}

export function getSupabaseAdmin() {
  if (!globalObj.supabaseAdminInstance) {
    globalObj.supabaseAdminInstance = createClient(supabaseUrl, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: 'supabase-admin-auth'
      }
    });
  }
  return globalObj.supabaseAdminInstance;
}

export const supabase = getSupabase();
export const supabaseAdmin = getSupabaseAdmin();

