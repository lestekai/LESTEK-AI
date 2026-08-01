import { supabaseAdmin } from './supabase-admin';

export const logAdminAction = async (adminId: string, actionType: string, targetId: string, details?: any) => {
  try {
    await supabaseAdmin.from('admin_logs').insert([{
      user_id: adminId,
      action_type: actionType,
      target_id: targetId,
      details: details || {}
    }]);
  } catch(e) {}
};
