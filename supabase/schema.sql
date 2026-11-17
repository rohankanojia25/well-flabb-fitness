-- =========================================================================
-- Well Flabb Fitness Club - Supabase SQL Schema & RLS Setup
-- Location: Chander Nagar, Krishna Nagar, Delhi
-- =========================================================================

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    goal TEXT,
    batch TEXT,
    source TEXT DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'trial_booked', 'joined', 'lost')),
    trial_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create members table
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    plan TEXT NOT NULL, -- e.g. Monthly, Quarterly, Half-Yearly, Yearly
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    trainer TEXT NOT NULL DEFAULT 'Rahul',
    batch TEXT NOT NULL, -- e.g. Morning, Evening
    opted_in BOOLEAN NOT NULL DEFAULT true,
    last_checkin TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    paid_on DATE NOT NULL DEFAULT CURRENT_DATE,
    mode TEXT NOT NULL, -- UPI, Cash, Card, Razorpay
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Indexes for rapid queries and scheduled n8n jobs
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_members_end_date ON public.members(end_date);
CREATE INDEX IF NOT EXISTS idx_members_last_checkin ON public.members(last_checkin);
CREATE INDEX IF NOT EXISTS idx_members_phone ON public.members(phone);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON public.payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_paid_on ON public.payments(paid_on);

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Public can ONLY insert new leads from the website free trial form
DROP POLICY IF EXISTS "Public can insert leads only" ON public.leads;
CREATE POLICY "Public can insert leads only"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Authenticated staff can perform all operations on leads
DROP POLICY IF EXISTS "Staff can do everything on leads" ON public.leads;
CREATE POLICY "Staff can do everything on leads"
    ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Authenticated staff can perform all operations on members
DROP POLICY IF EXISTS "Staff can do everything on members" ON public.members;
CREATE POLICY "Staff can do everything on members"
    ON public.members
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Authenticated staff can perform all operations on payments
DROP POLICY IF EXISTS "Staff can do everything on payments" ON public.payments;
CREATE POLICY "Staff can do everything on payments"
    ON public.payments
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- =========================================================================
-- Helper Views for Admin Dashboard & n8n Automation
-- =========================================================================

-- View: Today's Trials (Trial booked for today or created today with trial status)
CREATE OR REPLACE VIEW public.v_todays_trials AS
SELECT *
FROM public.leads
WHERE status = 'trial_booked'
  AND (trial_date = CURRENT_DATE OR (trial_date IS NULL AND DATE(created_at AT TIME ZONE 'Asia/Kolkata') = CURRENT_DATE));

-- View: Members expiring in next 7 days
CREATE OR REPLACE VIEW public.v_expiring_members AS
SELECT 
    m.*,
    (m.end_date - CURRENT_DATE) AS days_remaining
FROM public.members m
WHERE m.end_date >= CURRENT_DATE 
  AND m.end_date <= (CURRENT_DATE + INTERVAL '7 days')
ORDER BY m.end_date ASC;

-- View: Inactive members (10+ days without checkin)
CREATE OR REPLACE VIEW public.v_inactive_members AS
SELECT 
    m.*,
    DATE_PART('day', now() - COALESCE(m.last_checkin, m.created_at)) AS days_inactive
FROM public.members m
WHERE (now() - COALESCE(m.last_checkin, m.created_at)) >= INTERVAL '10 days'
  AND m.end_date >= CURRENT_DATE;
