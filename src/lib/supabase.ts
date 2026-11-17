import { createClient } from '@supabase/supabase-js';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  goal?: string;
  batch?: string;
  source?: string;
  status: 'new' | 'trial_booked' | 'joined' | 'lost';
  trial_date?: string;
  notes?: string;
  created_at: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  plan: string;
  start_date: string;
  end_date: string;
  trainer: string;
  batch: string;
  opted_in: boolean;
  last_checkin?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  member_id: string;
  amount: number;
  paid_on: string;
  mode: string;
  notes?: string;
  created_at: string;
  member_name?: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial mock data for offline / preview demo mode
const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Amit Sharma',
    phone: '+91 98112 34567',
    goal: 'Weight loss',
    batch: 'Morning',
    source: 'website',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Pooja Verma',
    phone: '+91 98734 56789',
    goal: 'General fitness',
    batch: 'Evening',
    source: 'website',
    status: 'trial_booked',
    trial_date: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Rohan Mehra',
    phone: '+91 99100 12345',
    goal: 'Muscle gain',
    batch: 'Morning',
    source: 'website',
    status: 'joined',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const INITIAL_MOCK_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Vikram Malhotra',
    phone: '+91 98101 22334',
    plan: 'Quarterly',
    start_date: '2026-08-20',
    end_date: getFutureDate(3), // Expiring in 3 days!
    trainer: 'Rahul',
    batch: 'Morning',
    opted_in: true,
    last_checkin: new Date(Date.now() - 3600000 * 12).toISOString(),
    created_at: '2026-08-20T10:00:00Z',
  },
  {
    id: 'mem-2',
    name: 'Simran Kaur',
    phone: '+91 98991 33445',
    plan: 'Monthly',
    start_date: '2026-10-23',
    end_date: getFutureDate(6), // Expiring in 6 days!
    trainer: 'Rahul',
    batch: 'Evening',
    opted_in: true,
    last_checkin: new Date(Date.now() - 3600000 * 24).toISOString(),
    created_at: '2026-10-23T10:00:00Z',
  },
  {
    id: 'mem-3',
    name: 'Gaurav Joshi',
    phone: '+91 97112 44556',
    plan: 'Yearly',
    start_date: '2026-01-15',
    end_date: getFutureDate(180),
    trainer: 'Rahul',
    batch: 'Morning',
    opted_in: true,
    last_checkin: new Date(Date.now() - 3600000 * 240).toISOString(), // 10 days inactive!
    created_at: '2026-01-15T10:00:00Z',
  },
];

const INITIAL_MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    member_id: 'mem-1',
    amount: 6500,
    paid_on: '2026-08-20',
    mode: 'UPI',
    created_at: '2026-08-20T10:30:00Z',
    member_name: 'Vikram Malhotra',
  },
  {
    id: 'pay-2',
    member_id: 'mem-2',
    amount: 2500,
    paid_on: '2026-10-23',
    mode: 'Cash',
    created_at: '2026-10-23T11:00:00Z',
    member_name: 'Simran Kaur',
  },
];

// Local storage helpers for mock mode
function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // Ignore storage quota
  }
}

/* =========================================================================
   PUBLIC API
   ========================================================================= */

// Public can insert leads only
export async function createLead(data: Omit<Lead, 'id' | 'created_at' | 'status'> & { status?: Lead['status'] }): Promise<Lead> {
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: data.name,
    phone: data.phone,
    goal: data.goal,
    batch: data.batch,
    source: data.source || 'website',
    status: data.status || 'new',
    created_at: new Date().toISOString(),
  };

  if (isConfigured && supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('leads')
        .insert([{
          name: newLead.name,
          phone: newLead.phone,
          goal: newLead.goal,
          batch: newLead.batch,
          source: newLead.source,
          status: newLead.status,
        }])
        .select()
        .single();
      
      if (!error && inserted) return inserted as Lead;
    } catch {
      // Fallback to local storage
    }
  }

  const list = getStorage<Lead[]>('wf_leads', INITIAL_MOCK_LEADS);
  const updated = [newLead, ...list];
  setStorage('wf_leads', updated);
  return newLead;
}

// Staff: Fetch all leads
export async function getLeads(): Promise<Lead[]> {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Lead[];
    } catch {
      // fallback
    }
  }
  return getStorage<Lead[]>('wf_leads', INITIAL_MOCK_LEADS);
}

// Staff: Update lead status
export async function updateLeadStatus(id: string, status: Lead['status'], trial_date?: string): Promise<boolean> {
  if (isConfigured && supabase) {
    try {
      const updates: Partial<Lead> = { status };
      if (trial_date) updates.trial_date = trial_date;
      const { error } = await supabase.from('leads').update(updates).eq('id', id);
      if (!error) return true;
    } catch {
      // fallback
    }
  }

  const list = getStorage<Lead[]>('wf_leads', INITIAL_MOCK_LEADS);
  const updated = list.map((l) => (l.id === id ? { ...l, status, trial_date: trial_date || l.trial_date } : l));
  setStorage('wf_leads', updated);
  return true;
}

// Staff: Fetch members
export async function getMembers(): Promise<Member[]> {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('end_date', { ascending: true });
      if (!error && data) return data as Member[];
    } catch {
      // fallback
    }
  }
  return getStorage<Member[]>('wf_members', INITIAL_MOCK_MEMBERS);
}

// Staff: Add new member
export async function createMember(member: Omit<Member, 'id' | 'created_at'>): Promise<Member> {
  const newMember: Member = {
    ...member,
    id: `mem-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('members')
        .insert([member])
        .select()
        .single();
      if (!error && data) return data as Member;
    } catch {
      // fallback
    }
  }

  const list = getStorage<Member[]>('wf_members', INITIAL_MOCK_MEMBERS);
  const updated = [newMember, ...list];
  setStorage('wf_members', updated);
  return newMember;
}

// Staff: Fetch payments
export async function getPayments(): Promise<Payment[]> {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*, members(name)')
        .order('paid_on', { ascending: false });
      if (!error && data) {
        return data.map((p: Record<string, unknown>) => ({
          ...(p as unknown as Payment),
          member_name: (p.members as { name?: string })?.name || 'Unknown',
        }));
      }
    } catch {
      // fallback
    }
  }
  return getStorage<Payment[]>('wf_payments', INITIAL_MOCK_PAYMENTS);
}

// Staff: Record payment
export async function createPayment(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
  const newPayment: Payment = {
    ...payment,
    id: `pay-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert([{
          member_id: payment.member_id,
          amount: payment.amount,
          paid_on: payment.paid_on,
          mode: payment.mode,
          notes: payment.notes,
        }])
        .select()
        .single();
      if (!error && data) return data as Payment;
    } catch {
      // fallback
    }
  }

  const list = getStorage<Payment[]>('wf_payments', INITIAL_MOCK_PAYMENTS);
  const updated = [newPayment, ...list];
  setStorage('wf_payments', updated);
  return newPayment;
}
