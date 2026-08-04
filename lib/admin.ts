import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const logAdminAction = async (adminId: string, actionType: string, targetId: string, details?: any) => {
  try {
    await addDoc(collection(db, 'admin_logs'), {
      user_id: adminId,
      action_type: actionType,
      target_id: targetId,
      details: details || {},
      created_at: new Date().toISOString()
    });
  } catch(e) {}
};
