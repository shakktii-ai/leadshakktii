'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  User,
  Key,
  LogOut,
  Search,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Phone,
  MessageCircle,
  Building2,
  MapPin,
  Calendar,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  TrendingDown,
  X,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    highRiskCount: 0,
    moderateRiskCount: 0,
    lowRiskCount: 0,
    avgScore: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Check existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('shakktii_admin_auth');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('shakktii_admin_auth', data.token);
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shakktii_admin_auth');
    setIsAuthenticated(false);
    setLeads([]);
    setUsername('');
    setPassword('');
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm(`Are you sure you want to permanently delete lead ${leadId}?`)) {
      return;
    }

    setDeletingId(leadId);
    try {
      const res = await fetch(`/api/admin/leads?leadId=${encodeURIComponent(leadId)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) => prev.filter((l) => l.leadId !== leadId));
        if (selectedLead?.leadId === leadId) {
          setSelectedLead(null);
        }
      } else {
        alert(data.error || 'Failed to delete lead');
      }
    } catch (err) {
      alert('Delete error');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        !searchTerm ||
        lead.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.firmName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.microMarket?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsappNumber?.includes(searchTerm) ||
        lead.leadId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRisk =
        riskFilter === 'all' || lead.riskLevel?.toLowerCase() === riskFilter.toLowerCase();

      return matchesSearch && matchesRisk;
    });
  }, [leads, searchTerm, riskFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = [
      'Lead ID',
      'Full Name',
      'Firm Name',
      'Focus Micro-Market',
      'WhatsApp Number',
      'CRM Old Leads Volume',
      'Risk Score (out of 18)',
      'Risk Status',
      'Submitted Date',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.leadId || ''}"`,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.firmName || '').replace(/"/g, '""')}"`,
      `"${(l.microMarket || '').replace(/"/g, '""')}"`,
      `"${l.whatsappNumber || ''}"`,
      `"${l.crmLeadVolume || ''}"`,
      l.score ?? '',
      `"${l.statusLabel || l.riskLevel || ''}"`,
      `"${l.createdAt ? new Date(l.createdAt).toLocaleString('en-IN') : ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Shakktii_Lead_Audit_Submissions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-8 text-white text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center">
                <Lock className="w-7 h-7 text-brand-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              Admin Portal
            </h1>
            <p className="text-xs text-brand-accent-light font-medium">
              Shakktii AI · Real Estate Lead Audit Management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Log In to Dashboard</span>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs text-stone-500 hover:text-brand-primary transition-colors font-semibold"
              >
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DASHBOARD SCREEN
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/image.png"
                alt="Shakktii AI Logo"
                width={160}
                height={60}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
              title="Refresh leads"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Page Title & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Lead Audit Submissions
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Real-time records submitted by real estate brokers and channel partners.
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Leads */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Total Leads
              </span>
              <span className="text-3xl font-extrabold text-stone-900">
                {stats.totalLeads}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">
              <User className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: High Risk Leads */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                High Risk Leads
              </span>
              <span className="text-3xl font-extrabold text-rose-600">
                {stats.highRiskCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Avg Risk Score */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Average Score
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-stone-900">{stats.avgScore}</span>
                <span className="text-xs font-semibold text-stone-400">/50</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Moderate / Low Risk */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Moderate / Protected
              </span>
              <span className="text-3xl font-extrabold text-emerald-700">
                {stats.moderateRiskCount + stats.lowRiskCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, Firm, Phone, Area..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 shrink-0">
              Risk:
            </span>
            <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
              {['all', 'high', 'moderate', 'low'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRiskFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    riskFilter === filter
                      ? 'bg-white text-brand-dark shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Leads Table Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  <th className="py-4 px-5">Agent &amp; Firm</th>
                  <th className="py-4 px-5">Micro-Market</th>
                  <th className="py-4 px-5">WhatsApp Contact</th>
                  <th className="py-4 px-5">Old Leads</th>
                  <th className="py-4 px-5">Score &amp; Status</th>
                  <th className="py-4 px-5">Submitted At</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const isHigh = lead.riskLevel === 'high';
                    const isModerate = lead.riskLevel === 'moderate';

                    return (
                      <tr
                        key={lead.leadId}
                        className="hover:bg-stone-50/80 transition-colors group"
                      >
                        {/* Name & Firm */}
                        <td className="py-4 px-5">
                          <div className="font-bold text-stone-900">
                            {lead.fullName || 'Unnamed'}
                          </div>
                          <div className="text-xs text-stone-500 font-medium flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>{lead.firmName || 'Proprietary Firm'}</span>
                          </div>
                        </td>

                        {/* Micro-Market */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>{lead.microMarket || '—'}</span>
                          </div>
                        </td>

                        {/* WhatsApp Phone */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-800 text-xs sm:text-sm">
                              {lead.whatsappNumber}
                            </span>
                            <a
                              href={`https://wa.me/${lead.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hi ${lead.fullName}, thank you for completing the Shakktii AI Lead Protection Audit for ${lead.firmName}. We are ready to present your customized strategy report.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </td>

                        {/* Old Leads Volume */}
                        <td className="py-4 px-5 text-xs text-stone-600 font-medium">
                          {lead.crmLeadVolume || '—'}
                        </td>

                        {/* Score & Risk Badge */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                isHigh
                                  ? 'bg-rose-100 text-rose-800'
                                  : isModerate
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {isHigh ? (
                                <ShieldAlert className="w-3 h-3" />
                              ) : (
                                <ShieldCheck className="w-3 h-3" />
                              )}
                              <span>{lead.score ?? 0}/50</span>
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 mt-1 capitalize font-medium">
                            {lead.statusLabel || lead.riskLevel}
                          </div>
                        </td>

                        {/* Submitted Date */}
                        <td className="py-4 px-5 text-xs text-stone-500 font-medium whitespace-nowrap">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : '—'}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/report/${lead.reportId || lead.leadId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-stone-100 hover:bg-emerald-600 hover:text-white text-stone-700 transition-colors cursor-pointer"
                              title="Open public report page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-brand-primary hover:text-white text-stone-700 transition-colors cursor-pointer"
                              title="View complete audit details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.leadId)}
                              disabled={deletingId === lead.leadId}
                              className="p-2 rounded-lg bg-stone-100 hover:bg-rose-600 hover:text-white text-stone-500 transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500">
                      <div className="max-w-sm mx-auto space-y-2">
                        <User className="w-8 h-8 text-stone-300 mx-auto" />
                        <p className="font-bold text-stone-700">No lead submissions found</p>
                        <p className="text-xs text-stone-400">
                          {searchTerm
                            ? 'No records match your search filter.'
                            : 'Submitted leads from your website form will appear here in real time.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ---------------------------------------------------- */}
      {/* LEAD DETAIL MODAL */}
      {/* ---------------------------------------------------- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6 sm:p-8 relative">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider">
                  Lead Audit Record
                </span>
                <span className="text-xs text-brand-accent-light">
                  ID: {selectedLead.reportId || selectedLead.leadId}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {selectedLead.fullName} · {selectedLead.firmName}
              </h2>
              <p className="text-xs sm:text-sm text-brand-accent-light">
                Micro-Market: <strong className="text-white">{selectedLead.microMarket || 'Local Focus Area'}</strong> · WhatsApp: <strong className="text-white">{selectedLead.whatsappNumber}</strong>
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Quick Contact & WhatsApp Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      WhatsApp Number
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      {selectedLead.whatsappNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/report/${selectedLead.reportId || selectedLead.leadId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public Report</span>
                  </a>

                  <a
                    href={`https://wa.me/${selectedLead.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hi ${selectedLead.fullName}, thank you for completing the Shakktii AI Lead Protection Audit for ${selectedLead.firmName}. You can view your complete strategy report at: ${typeof window !== 'undefined' ? window.location.origin : ''}/report/${selectedLead.reportId || selectedLead.leadId}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Assessment Breakdown */}
              {selectedLead.analysis && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
                    Diagnostic Analysis &amp; Score
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-semibold text-stone-500 block">Total Risk Score</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-stone-900">{selectedLead.score ?? selectedLead.analysis.totalScore}</span>
                        <span className="text-xs text-stone-400 font-bold">/50 Points</span>
                      </div>
                      <span className="text-xs font-bold text-stone-600 mt-1 block capitalize">
                        Status: {selectedLead.statusLabel || selectedLead.analysis.statusLabel}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-semibold text-stone-500 block">Old CRM Leads</span>
                      <span className="text-lg font-bold text-stone-900 block mt-1">
                        {selectedLead.crmLeadVolume || '—'}
                      </span>
                      <span className="text-xs text-stone-500 mt-1 block">
                        Dormant database re-engagement potential
                      </span>
                    </div>
                  </div>

                  {/* Summary Headline */}
                  {selectedLead.analysis.summaryText && (
                    <div className="p-4 rounded-xl bg-brand-surface border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      <strong className="block font-bold text-brand-dark mb-1">
                        {selectedLead.analysis.summaryHeadline}
                      </strong>
                      {selectedLead.analysis.summaryText}
                    </div>
                  )}

                  {/* 10 Questions Answers Summary */}
                  {selectedLead.analysis.answersSummary && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        10 Evaluated Question Responses
                      </h4>
                      <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white text-xs">
                        {selectedLead.analysis.answersSummary.map((ans, idx) => (
                          <div key={idx} className="p-3 hover:bg-stone-50 transition-colors">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-stone-800">
                                {idx + 1}. {ans.question}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-bold shrink-0">
                                {ans.riskPoints} pts
                              </span>
                            </div>
                            <p className="text-stone-600 font-medium">
                              Selected: <span className="text-brand-primary font-bold">{ans.selectedOptionText}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-6 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
