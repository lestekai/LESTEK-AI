-- ==============================================
-- SUPABASE ADVANCED SCHEMA V2 - EVOLUX
-- Features: 
-- 1. Adds finances
-- 2. Expands AI Memory for Questionnaire
-- 3. Adds explicit item tracking inside user inventory
-- ==============================================

-- 10. FINANCES
CREATE TABLE IF NOT EXISTS public.finances (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  amount numeric(10, 2) NOT NULL,
  category text,
  description text,
  date timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 11. INVENTORY (Explicits items received/equipped if needed, beyond profile arrays)
CREATE TABLE IF NOT EXISTS public.user_inventory (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_id text NOT NULL,
  item_type text NOT NULL, -- e.g., 'aura', 'armor'
  is_equipped boolean DEFAULT false,
  acquired_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Let's update `ai_memory` to make sure it exists and uses questionnaire effectively
ALTER TABLE public.ai_memory 
ADD COLUMN IF NOT EXISTS questionnaire_data jsonb DEFAULT '{}'::jsonb;

-- RLS FOR NEW TABLES
ALTER TABLE public.finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own finances" ON public.finances FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own inventory" ON public.user_inventory FOR ALL USING (auth.uid() = user_id);

-- Add updated_at trigger for new tables if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_finances_modtime') THEN
        CREATE TRIGGER update_finances_modtime BEFORE UPDATE ON public.finances FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
    END IF;
END $$;
