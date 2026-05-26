-- ==============================================
-- SUPABASE ADVANCED SCHEMA INIT - EVOLUX
-- Copy and paste this into Supabase SQL Editor
-- ==============================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE plan_type AS ENUM ('base', 'nova', 'infinite');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'banned');
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin', 'premium');
CREATE TYPE feedback_status AS ENUM ('aberto', 'respondido', 'resolvido', 'ignorado');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'closed');

-- 3. USERS (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE NOT NULL,
  name text,
  email text,
  
  -- Settings & Role
  role user_role DEFAULT 'user',
  status user_status DEFAULT 'active',
  
  -- Gamification
  avatar_level integer DEFAULT 1,
  xp integer DEFAULT 0,
  streak integer DEFAULT 0,
  max_streak integer DEFAULT 0,
  total_tasks_completed integer DEFAULT 0,
  
  -- Cosmetics & Inventory
  equipped_cosmetics jsonb DEFAULT '{}'::jsonb,
  unlocked_cosmetics text[] DEFAULT '{}',
  unlocked_achievements text[] DEFAULT '{}',
  
  -- Offline / Sync
  last_sync_at timestamp with time zone DEFAULT now(),
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 4. SUBSCRIPTIONS & PLANS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan plan_type DEFAULT 'base',
  starts_at timestamp with time zone DEFAULT now() NOT NULL,
  ends_at timestamp with time zone,
  is_active boolean DEFAULT true,
  auto_renew boolean DEFAULT false,
  payment_provider text,
  provider_subscription_id text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 5. TASKS & HABITS
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text DEFAULT 'custom',
  xp_reward integer DEFAULT 10,
  
  -- Scheduling logic
  date text,
  base_date text,
  is_recurring boolean DEFAULT false,
  is_long_term boolean DEFAULT false,
  
  -- Progress
  completed boolean DEFAULT false,
  target_amount real,
  current_amount real,
  unit text,
  sub_tasks jsonb DEFAULT '[]'::jsonb,
  
  is_offline_created boolean DEFAULT false,
  offline_id text,
  
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 6. WORKOUTS
CREATE TABLE IF NOT EXISTS public.workouts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_data jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.workout_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date text NOT NULL,
  duration_minutes integer NOT NULL,
  total_volume real NOT NULL,
  completed_exercises integer NOT NULL,
  log_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 7. AI HISTORY & MEMORY
CREATE TABLE IF NOT EXISTS public.ai_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  context_type text NOT NULL, -- e.g., 'workout_generation', 'daily_motivation', 'behavior_analysis'
  prompt_data jsonb NOT NULL,
  ai_response jsonb NOT NULL,
  tokens_used integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.ai_memory (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  preferences jsonb DEFAULT '{}'::jsonb,
  behavior_patterns jsonb DEFAULT '{}'::jsonb,
  last_analysis_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 8. FEEDBACKS, REPORTS & TICKETS
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL, -- feedback, sugestao, problema, denuncia
  message text NOT NULL,
  status feedback_status DEFAULT 'aberto',
  admin_response text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  status ticket_status DEFAULT 'open',
  messages jsonb DEFAULT '[]'::jsonb, -- Array of { sender, text, timestamp }
  attachments text[],
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 9. NOTIFICATIONS & ADMIN LOGS
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- NULL if global notification? We can enforce user specific or use a global flag
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  type text DEFAULT 'system',
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admin_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
  action_type text NOT NULL,
  target_id text,
  details jsonb,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins update all profiles" ON public.profiles FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 2. Subscriptions Policies
CREATE POLICY "Users view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all subscriptions" ON public.subscriptions FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can insert/update subscriptions" ON public.subscriptions FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 3. Tasks Policies
CREATE POLICY "Users manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);

-- 4. Workouts & History Policies
CREATE POLICY "Users manage own workouts" ON public.workouts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own history" ON public.workout_history FOR ALL USING (auth.uid() = user_id);

-- 5. AI Policies
CREATE POLICY "Users manage own AI history" ON public.ai_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own AI memory" ON public.ai_memory FOR ALL USING (auth.uid() = user_id);

-- 6. Feedbacks & Tickets
CREATE POLICY "Users insert own feedback" ON public.feedbacks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own feedback" ON public.feedbacks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all feedback" ON public.feedbacks FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users manage own tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all tickets" ON public.support_tickets FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 7. Notifications
CREATE POLICY "Users manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- 8. Admin Logs
CREATE POLICY "Admins view logs" ON public.admin_logs FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id, date);
CREATE INDEX idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX idx_workout_history_user_id ON public.workout_history(user_id, date);
CREATE INDEX idx_feedbacks_status ON public.feedbacks(status);
CREATE INDEX idx_profiles_xp ON public.profiles(xp DESC);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ==========================================
-- TRIGGERS
-- ==========================================

-- Function to update modified timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_tasks_modtime BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_workouts_modtime BEFORE UPDATE ON public.workouts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_feedbacks_modtime BEFORE UPDATE ON public.feedbacks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_tickets_modtime BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- User auto-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, name, avatar_level, xp, streak, total_tasks_completed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    1, 0, 0, 0
  );
  -- Also create default AI Memory
  INSERT INTO public.ai_memory (user_id) VALUES (NEW.id);
  
  -- Create free base subscription
  INSERT INTO public.subscriptions (user_id, plan, starts_at) VALUES (NEW.id, 'base', now());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Realtime Setup
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedbacks;
