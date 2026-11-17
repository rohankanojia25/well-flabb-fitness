import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Users, Calendar, AlertCircle, PlusCircle, CreditCard, 
  Phone, MessageCircle, CheckCircle, XCircle, Search, 
  ArrowLeft, Lock, LogOut, Sparkles
} from 'lucide-react';
import { 
  Lead, Member, Payment, 
  getLeads, updateLeadStatus, 
  getMembers, createMember, 
  getPayments, createPayment, 
  isConfigured 
} from '../lib/supabase';
import { TIMINGS } from '../data';

export const AdminDashboard: React.FC<{ onBackToSite: () => void }> = ({ onBackToSite }) => {
  // Staff Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wf_staff_session') === 'active';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'trials' | 'leads' | 'expiring' | 'members' | 'payments'
  const [activeTab, setActiveTab] = useState<'trials' | 'leads' | 'expiring' | 'members' | 'payments'>('trials');

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [paymentSelectedMemberId, setPaymentSelectedMemberId] = useState('');

  // New Member Form State
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    plan: 'Quarterly',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    trainer: 'Rahul',
    batch: 'Morning',
    opted_in: true,
  });

  // New Payment Form State
  const [newPayment, setNewPayment] = useState({
    member_id: '',
    amount: 6500,
    paid_on: new Date().toISOString().split('T')[0],
    mode: 'UPI',
    notes: '',
  });

  // Calculate default end date based on plan
  useEffect(() => {
    const start = new Date(newMember.start_date || new Date());
    let daysToAdd = 90;
    if (newMember.plan === 'Monthly') daysToAdd = 30;
    else if (newMember.plan === 'Quarterly') daysToAdd = 90;
    else if (newMember.plan === 'Half-Yearly') daysToAdd = 180;
    else if (newMember.plan === 'Yearly') daysToAdd = 365;

    start.setDate(start.getDate() + daysToAdd);
    setNewMember((prev) => ({ ...prev, end_date: start.toISOString().split('T')[0] }));
  }, [newMember.plan, newMember.start_date]);

  // Load dashboard data
  const loadData = async () => {
    setLoading(true);
    const [l, m, p] = await Promise.all([getLeads(), getMembers(), getPayments()]);
    setLeads(l);
    setMembers(m);
    setPayments(p);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Handle Staff Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allows owner/coach login
    if (
      (loginEmail === 'admin@wellflabb.com' && loginPassword === 'wellflabb2026') ||
      loginPassword === '9999636973' ||
      loginPassword === 'admin'
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('wf_staff_session', 'active');
      setLoginError('');
    } else {
      setLoginError('Invalid staff credentials. (Hint: password is "admin" or "9999636973")');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wf_staff_session');
  };

  // Filter: Today's Trials
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTrials = leads.filter((l) => {
    return l.status === 'trial_booked' && (l.trial_date === todayStr || (!l.trial_date && l.created_at.startsWith(todayStr)));
  });

  // Filter: New Leads
  const newLeads = leads.filter((l) => l.status === 'new');

  // Filter: Members expiring in next 7 days
  const expiringMembers = members.filter((m) => {
    if (!m.end_date) return false;
    const end = new Date(m.end_date);
    const now = new Date();
    const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  // Filter: Inactive Members (10+ days without checkin)
  const inactiveMembers = members.filter((m) => {
    if (!m.last_checkin) return true;
    const last = new Date(m.last_checkin);
    const diffDays = Math.floor((Date.now() - last.getTime()) / (1000 * 3600 * 24));
    return diffDays >= 10;
  });

  // Status Updater
  const handleUpdateStatus = async (leadId: string, status: Lead['status'], trial_date?: string) => {
    await updateLeadStatus(leadId, status, trial_date);
    await loadData();
  };

  // Submit Add Member
  const handleAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.phone) return;
    await createMember(newMember);
    setShowAddMember(false);
    setNewMember({
      name: '',
      phone: '',
      plan: 'Quarterly',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      trainer: 'Rahul',
      batch: 'Morning',
      opted_in: true,
    });
    await loadData();
  };

  // Submit Add Payment
  const handleAddPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.member_id || !newPayment.amount) return;
    await createPayment(newPayment);
    setShowAddPayment(false);
    setNewPayment({
      member_id: '',
      amount: 6500,
      paid_on: new Date().toISOString().split('T')[0],
      mode: 'UPI',
      notes: '',
    });
    await loadData();
  };

  /* =========================================================================
     LOGIN SCREEN
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F1115] text-[#F5F5F5] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-[#1A1D23] border border-[#2B303C] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E4572E] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#E4572E]/30">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading text-white tracking-wide">
              STAFF PORTAL LOGIN
            </h1>
            <p className="text-xs text-[#9EABB8] mt-1">
              Well Flabb Fitness Club • Chander Nagar, Krishna Nagar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-1.5">
                Staff Email / Username
              </label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@wellflabb.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm focus:border-[#E4572E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17BEBB] uppercase tracking-wider mb-1.5">
                Staff Password / PIN
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password (e.g. admin)"
                className="w-full px-4 py-3 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm focus:border-[#E4572E] focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 p-2.5 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Log In to Staff Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#2B303C] text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-[#9EABB8] hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     AUTHENTICATED STAFF DASHBOARD
     ========================================================================= */
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F5F5] pb-24 md:pb-12">
      
      {/* Top Admin Header */}
      <header className="bg-[#1A1D23] border-b border-[#2B303C] sticky top-0 z-30 shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E4572E] text-white flex items-center justify-center shadow-md">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl text-white tracking-wide">
                  WELL FLABB ADMIN
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                  isConfigured ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {isConfigured ? 'Supabase Live' : 'Demo Mode'}
                </span>
              </div>
              <p className="text-[11px] text-[#9EABB8]">Lead Management &amp; Membership Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddMember(true)}
              className="px-3 py-1.5 rounded-lg bg-[#17BEBB] hover:bg-[#139f9d] text-[#0F1115] font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Member</span>
            </button>

            <button
              onClick={() => setShowAddPayment(true)}
              className="px-3 py-1.5 rounded-lg bg-[#232730] hover:bg-[#2B303C] border border-[#2B303C] text-white font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-[#E4572E]" />
              <span>Record Payment</span>
            </button>

            <button
              onClick={onBackToSite}
              className="px-2.5 py-1.5 rounded-lg bg-[#0F1115] border border-[#2B303C] text-[#9EABB8] hover:text-white text-xs flex items-center gap-1"
              title="View Public Site"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#9EABB8] hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick KPI Stat Ribbon */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 border-t border-[#2B303C]/50 flex items-center gap-4 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('trials')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              activeTab === 'trials' ? 'bg-[#E4572E] text-white font-bold' : 'text-[#9EABB8] hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today&apos;s Trials:</span>
            <span className="font-mono bg-[#0F1115]/60 px-1.5 py-0.2 rounded text-white font-bold">
              {todaysTrials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              activeTab === 'leads' ? 'bg-[#17BEBB] text-[#0F1115] font-bold' : 'text-[#9EABB8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Leads:</span>
            <span className="font-mono bg-[#0F1115]/60 px-1.5 py-0.2 rounded text-white font-bold">
              {newLeads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('expiring')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              activeTab === 'expiring' ? 'bg-amber-500 text-black font-bold' : 'text-[#9EABB8] hover:text-white'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Expiring (7d):</span>
            <span className="font-mono bg-[#0F1115]/60 px-1.5 py-0.2 rounded text-white font-bold">
              {expiringMembers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              activeTab === 'members' ? 'bg-blue-600 text-white font-bold' : 'text-[#9EABB8] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Members:</span>
            <span className="font-mono bg-[#0F1115]/60 px-1.5 py-0.2 rounded text-white font-bold">
              {members.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
              activeTab === 'payments' ? 'bg-emerald-600 text-white font-bold' : 'text-[#9EABB8] hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payments:</span>
            <span className="font-mono bg-[#0F1115]/60 px-1.5 py-0.2 rounded text-white font-bold">
              {payments.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {loading ? (
          <div className="py-20 text-center text-sm text-[#9EABB8]">
            <div className="w-8 h-8 border-2 border-[#E4572E] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading Supabase records...
          </div>
        ) : (
          <div>
            
            {/* =========================================================================
                TAB 1: TODAY'S TRIALS
                ========================================================================= */}
            {activeTab === 'trials' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl text-white">TODAY&apos;S SCHEDULED TRIALS</h2>
                    <p className="text-xs text-[#9EABB8]">Free trial sessions reserved for today ({todayStr})</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#E4572E]/10 border border-[#E4572E]/30 text-[#E4572E] font-bold">
                    {todaysTrials.length} Sessions Expected
                  </span>
                </div>

                {todaysTrials.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#1A1D23] border border-[#2B303C] text-center text-sm text-[#9EABB8]">
                    No trials booked specifically for today yet. Check &quot;New Leads&quot; to book upcoming trials.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todaysTrials.map((lead) => (
                      <div key={lead.id} className="p-5 rounded-2xl bg-[#1A1D23] border-2 border-[#E4572E] shadow-lg flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg text-white font-bold">{lead.name}</h3>
                              <p className="text-xs font-mono text-[#17BEBB]">{lead.phone}</p>
                            </div>
                            <span className="text-[10px] uppercase font-bold bg-[#E4572E] text-white px-2 py-0.5 rounded">
                              {lead.batch || 'Morning'}
                            </span>
                          </div>

                          <div className="text-xs text-[#9EABB8] space-y-1 mb-4">
                            <p><strong>Goal:</strong> {lead.goal || 'General Fitness'}</p>
                            <p><strong>Source:</strong> {lead.source || 'website'}</p>
                            <p className="text-[11px] text-[#9EABB8]/80">
                              Booked on: {new Date(lead.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-[#2B303C] flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                            className="flex-1 py-2 rounded-lg bg-[#232730] hover:bg-[#2B303C] text-xs font-bold text-white flex items-center justify-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#17BEBB]" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, Coach Rahul here from Well Flabb Fitness Club. Looking forward to seeing you for your free trial session today!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg bg-[#E4572E] hover:bg-[#cf4720] text-xs font-bold text-white flex items-center justify-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            onClick={() => {
                              handleUpdateStatus(lead.id, 'joined');
                              setNewMember((prev) => ({
                                ...prev,
                                name: lead.name,
                                phone: lead.phone,
                                batch: lead.batch || 'Morning',
                              }));
                              setShowAddMember(true);
                            }}
                            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                            title="Convert to Member"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                TAB 2: NEW LEADS
                ========================================================================= */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl text-white">NEW INCOMING LEADS</h2>
                    <p className="text-xs text-[#9EABB8]">Leads awaiting trial scheduling or owner response</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#17BEBB]/10 border border-[#17BEBB]/30 text-[#17BEBB] font-bold">
                    {newLeads.length} Unconverted Leads
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads.map((lead) => {
                    const isNew = lead.status === 'new';
                    return (
                      <div
                        key={lead.id}
                        className={`p-5 rounded-2xl bg-[#1A1D23] border ${
                          isNew ? 'border-[#17BEBB]' : 'border-[#2B303C]'
                        } flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-base text-white font-bold">{lead.name}</h3>
                              <p className="text-xs font-mono text-[#9EABB8]">{lead.phone}</p>
                            </div>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              lead.status === 'new' ? 'bg-[#17BEBB] text-[#0F1115]' :
                              lead.status === 'trial_booked' ? 'bg-[#E4572E] text-white' :
                              lead.status === 'joined' ? 'bg-emerald-600 text-white' : 'bg-zinc-700 text-zinc-300'
                            }`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-xs text-[#9EABB8] space-y-1 mb-4">
                            <p><strong>Goal:</strong> {lead.goal || 'Weight loss'}</p>
                            <p><strong>Batch:</strong> {lead.batch || 'Morning'}</p>
                            <p className="text-[11px] text-[#9EABB8]/70">
                              Received: {new Date(lead.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-[#2B303C] space-y-2">
                          <div className="flex gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, your free trial at Well Flabb Fitness Club is reserved! Which day suits you for your first session?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 rounded-lg bg-[#232730] hover:bg-[#E4572E] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-[#17BEBB]" />
                              <span>Instant WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                              className="px-3 py-2 rounded-lg bg-[#232730] hover:bg-[#2B303C] text-white text-xs font-bold flex items-center justify-center"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#17BEBB]" />
                            </a>
                          </div>

                          <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                            <button
                              onClick={() => handleUpdateStatus(lead.id, 'trial_booked', todayStr)}
                              className="py-1 rounded bg-[#0F1115] hover:bg-[#E4572E] border border-[#2B303C] text-[#9EABB8] hover:text-white"
                            >
                              Book Trial
                            </button>
                            <button
                              onClick={() => {
                                handleUpdateStatus(lead.id, 'joined');
                                setNewMember((prev) => ({ ...prev, name: lead.name, phone: lead.phone }));
                                setShowAddMember(true);
                              }}
                              className="py-1 rounded bg-[#0F1115] hover:bg-emerald-600 border border-[#2B303C] text-[#9EABB8] hover:text-white"
                            >
                              Joined
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(lead.id, 'lost')}
                              className="py-1 rounded bg-[#0F1115] hover:bg-red-800 border border-[#2B303C] text-[#9EABB8] hover:text-white"
                            >
                              Lost
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 3: EXPIRING IN 7 DAYS
                ========================================================================= */}
            {activeTab === 'expiring' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl text-white">MEMBERSHIPS EXPIRING IN 7 DAYS</h2>
                    <p className="text-xs text-[#9EABB8]">Send timely renewal reminders with Razorpay payment link</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                    {expiringMembers.length} Expiring Soon
                  </span>
                </div>

                {expiringMembers.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#1A1D23] border border-[#2B303C] text-center text-sm text-[#9EABB8]">
                    No memberships expiring in the next 7 days.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expiringMembers.map((member) => {
                      const diffDays = Math.ceil((new Date(member.end_date).getTime() - Date.now()) / (1000 * 3600 * 24));
                      const renewalText = `Hi ${member.name}, your ${member.plan} gym membership at Well Flabb Fitness Club expires in ${diffDays} day(s) on ${member.end_date}. Continue your progress with coach Rahul — pay online via Razorpay here: [LINK] or renew at the reception.`;
                      
                      return (
                        <div key={member.id} className="p-5 rounded-2xl bg-[#1A1D23] border-2 border-amber-500/60 shadow-lg flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg text-white font-bold">{member.name}</h3>
                                <p className="text-xs font-mono text-[#17BEBB]">{member.phone}</p>
                              </div>
                              <span className="text-[10px] uppercase font-bold bg-amber-500 text-black px-2 py-0.5 rounded font-mono">
                                {diffDays <= 0 ? 'Expires Today' : `${diffDays}d Left`}
                              </span>
                            </div>

                            <div className="text-xs text-[#9EABB8] space-y-1 mb-4">
                              <p><strong>Plan:</strong> {member.plan} ({member.batch})</p>
                              <p><strong>Expiry Date:</strong> <span className="text-white font-mono">{member.end_date}</span></p>
                              <p><strong>Trainer:</strong> {member.trainer}</p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#2B303C] space-y-2">
                            <a
                              href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(renewalText)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Send WhatsApp Renewal (+ Link)</span>
                            </a>

                            <button
                              onClick={() => {
                                setPaymentSelectedMemberId(member.id);
                                setNewPayment((prev) => ({
                                  ...prev,
                                  member_id: member.id,
                                  amount: member.plan === 'Monthly' ? 2500 : member.plan === 'Quarterly' ? 6500 : 12000,
                                }));
                                setShowAddPayment(true);
                              }}
                              className="w-full py-2 rounded-xl bg-[#232730] hover:bg-[#2B303C] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-[#17BEBB]" />
                              <span>Record Renewal Payment</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                TAB 4: ALL MEMBERS & INACTIVE AUDIT
                ========================================================================= */}
            {activeTab === 'members' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl text-white">ACTIVE GYM MEMBERS</h2>
                    <p className="text-xs text-[#9EABB8]">Full member directory, active plans &amp; attendance audits</p>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 text-[#9EABB8] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search member..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#1A1D23] border border-[#2B303C] text-xs text-white placeholder-[#9EABB8]/50 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddMember(true)}
                      className="px-3 py-1.5 rounded-xl bg-[#E4572E] text-white text-xs font-bold shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Inactive Members Callout */}
                {inactiveMembers.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#1A1D23] border border-amber-500/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        {inactiveMembers.length} Members Inactive for 10+ Days (No Check-in)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {inactiveMembers.map((inact) => (
                        <div key={inact.id} className="p-2 rounded-lg bg-[#0F1115] border border-[#2B303C] text-xs flex items-center gap-3">
                          <span className="text-white font-semibold">{inact.name}</span>
                          <a
                            href={`https://wa.me/${inact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${inact.name}, Coach Rahul from Well Flabb here! Noticed you haven't checked in for workouts recently. Everything okay? Let's get your training momentum back this week!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded bg-[#E4572E] text-white text-[10px] font-bold uppercase"
                          >
                            Nudge on WhatsApp
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Members Table */}
                <div className="rounded-2xl bg-[#1A1D23] border border-[#2B303C] overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EABB8]">
                    <thead className="bg-[#0F1115] text-[#17BEBB] uppercase tracking-wider text-[10px] border-b border-[#2B303C]">
                      <tr>
                        <th className="p-3.5">Member Name</th>
                        <th className="p-3.5">Phone</th>
                        <th className="p-3.5">Plan &amp; Batch</th>
                        <th className="p-3.5">End Date</th>
                        <th className="p-3.5">Trainer</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B303C]">
                      {members
                        .filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.phone.includes(searchQuery))
                        .map((m) => (
                          <tr key={m.id} className="hover:bg-[#232730]/50 transition-colors">
                            <td className="p-3.5 font-bold text-white">{m.name}</td>
                            <td className="p-3.5 font-mono">{m.phone}</td>
                            <td className="p-3.5">
                              <span className="text-white font-semibold">{m.plan}</span> ({m.batch})
                            </td>
                            <td className="p-3.5 font-mono text-white">{m.end_date}</td>
                            <td className="p-3.5">{m.trainer}</td>
                            <td className="p-3.5 text-right space-x-2">
                              <a
                                href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block p-1.5 rounded-lg bg-[#232730] hover:bg-[#E4572E] text-white"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => {
                                  setPaymentSelectedMemberId(m.id);
                                  setNewPayment((prev) => ({ ...prev, member_id: m.id }));
                                  setShowAddPayment(true);
                                }}
                                className="inline-block p-1.5 rounded-lg bg-[#232730] hover:bg-[#17BEBB] text-white hover:text-black"
                                title="Add Payment"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 5: PAYMENTS
                ========================================================================= */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl text-white">PAYMENT HISTORY</h2>
                    <p className="text-xs text-[#9EABB8]">Logged fee transactions (UPI, Cash, Razorpay)</p>
                  </div>
                  <button
                    onClick={() => setShowAddPayment(true)}
                    className="px-3 py-1.5 rounded-xl bg-[#E4572E] text-white text-xs font-bold"
                  >
                    + Record Fee
                  </button>
                </div>

                <div className="rounded-2xl bg-[#1A1D23] border border-[#2B303C] overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EABB8]">
                    <thead className="bg-[#0F1115] text-[#17BEBB] uppercase tracking-wider text-[10px] border-b border-[#2B303C]">
                      <tr>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5">Member</th>
                        <th className="p-3.5">Amount (INR)</th>
                        <th className="p-3.5">Payment Mode</th>
                        <th className="p-3.5">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B303C]">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-[#232730]/50 transition-colors">
                          <td className="p-3.5 font-mono">{p.paid_on}</td>
                          <td className="p-3.5 font-bold text-white">{p.member_name || 'Member'}</td>
                          <td className="p-3.5 font-mono text-emerald-400 font-bold">₹{p.amount}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-[#0F1115] border border-[#2B303C] text-white font-mono text-[10px]">
                              {p.mode}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#9EABB8]">{p.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* =========================================================================
          MODAL 1: ADD MEMBER
          ========================================================================= */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1A1D23] border border-[#2B303C] rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#2B303C]">
              <h3 className="text-xl text-white font-heading">ENROLL NEW GYM MEMBER</h3>
              <button onClick={() => setShowAddMember(false)} className="text-[#9EABB8] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#17BEBB] font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Phone (+91)</label>
                  <input
                    type="tel"
                    required
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    placeholder="+91 99999 00000"
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Plan</label>
                  <select
                    value={newMember.plan}
                    onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newMember.start_date}
                    onChange={(e) => setNewMember({ ...newMember, start_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={newMember.end_date}
                    onChange={(e) => setNewMember({ ...newMember, end_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Batch</label>
                  <select
                    value={newMember.batch}
                    onChange={(e) => setNewMember({ ...newMember, batch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  >
                    <option value="Morning">Morning Batch ({TIMINGS.morning.time})</option>
                    <option value="Evening">Evening Batch ({TIMINGS.evening.time})</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Assigned Trainer</label>
                  <input
                    type="text"
                    value={newMember.trainer}
                    onChange={(e) => setNewMember({ ...newMember, trainer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#2B303C] flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#232730] text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold shadow-lg"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: RECORD PAYMENT
          ========================================================================= */}
      {showAddPayment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1A1D23] border border-[#2B303C] rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#2B303C]">
              <h3 className="text-xl text-white font-heading">RECORD FEE PAYMENT</h3>
              <button onClick={() => setShowAddPayment(false)} className="text-[#9EABB8] hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPaymentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#17BEBB] font-bold uppercase mb-1">Select Member</label>
                <select
                  required
                  value={newPayment.member_id || paymentSelectedMemberId}
                  onChange={(e) => setNewPayment({ ...newPayment, member_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                >
                  <option value="">-- Choose Member --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.phone}) - {m.plan}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#17BEBB] font-bold uppercase mb-1">Payment Mode</label>
                  <select
                    value={newPayment.mode}
                    onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                  >
                    <option value="UPI">UPI / GPay / PhonePe</option>
                    <option value="Cash">Cash at Counter</option>
                    <option value="Razorpay">Razorpay Online Link</option>
                    <option value="Card">Card (POS)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#17BEBB] font-bold uppercase mb-1">Payment Date</label>
                <input
                  type="date"
                  required
                  value={newPayment.paid_on}
                  onChange={(e) => setNewPayment({ ...newPayment, paid_on: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[#17BEBB] font-bold uppercase mb-1">Notes / Transaction Ref</label>
                <input
                  type="text"
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  placeholder="Optional reference ID or notes"
                  className="w-full px-3 py-2 rounded-xl bg-[#0F1115] border border-[#2B303C] text-white text-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#2B303C] flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddPayment(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#232730] text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#E4572E] hover:bg-[#cf4720] text-white font-bold shadow-lg"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
