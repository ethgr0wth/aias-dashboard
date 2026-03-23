import React, { useState } from 'react';
import {
  Cpu, Sparkles, Code, Layers, Rocket, Target, BookOpen, Mic,
  Activity, Shield, History, UserPlus, Globe, Users, Settings,
  FileText, MessageSquare, Database, Wrench, Radio, Flame, Crown, Diamond,
  Search, Command, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const apps = [
  { id: 1, label: 'Artifacts', icon: Cpu, gradient: 'from-cyan-500 to-blue-600', url: 'https://aiassist.net/dashboard/artifact-portal' },
  { id: 2, label: 'Playground', icon: Sparkles, gradient: 'from-amber-400 to-orange-500', url: 'https://aiassist.net/m/playground' },
  { id: 3, label: 'Code Gen', icon: Code, gradient: 'from-emerald-400 to-green-600', url: 'https://aiassist.net/dashboard/code-generator' },
  { id: 4, label: 'Templates', icon: Layers, gradient: 'from-pink-500 to-rose-500', url: 'https://aiassist.net/dashboard/templates' },
  { id: 5, label: 'Agents', icon: Rocket, gradient: 'from-green-400 to-emerald-600', url: 'https://aiassist.net/dashboard/deployed-agents' },
  { id: 6, label: 'Directives', icon: Target, gradient: 'from-purple-500 to-violet-600', url: 'https://aiassist.net/dashboard/directives' },
  { id: 7, label: 'KeyStone', icon: Code, gradient: 'from-indigo-500 to-blue-600', url: 'https://aiassist.net/keystone' },
  { id: 8, label: 'Blog', icon: BookOpen, gradient: 'from-teal-400 to-cyan-500', url: 'https://aiassist.net/blog' },
  { id: 9, label: 'Voice', icon: Mic, gradient: 'from-violet-500 to-purple-600', url: 'https://aiassist.net/dashboard/voice-chat' },
  { id: 10, label: 'Control', icon: Activity, gradient: 'from-blue-500 to-indigo-600', url: 'https://aiassist.net/dashboard/control-center' },
  { id: 11, label: 'Policies', icon: Shield, gradient: 'from-cyan-400 to-teal-500', url: 'https://aiassist.net/dashboard/policy-snapshots' },
  { id: 12, label: 'Changes', icon: History, gradient: 'from-rose-500 to-red-600', url: 'https://aiassist.net/dashboard/change-log' },
  { id: 13, label: 'Leads', icon: UserPlus, gradient: 'from-sky-400 to-blue-500', url: 'https://aiassist.net/dashboard/leads' },
  { id: 14, label: 'Environments', icon: Globe, gradient: 'from-lime-400 to-green-500', url: 'https://aiassist.net/dashboard/environments' },
  { id: 15, label: 'Team', icon: Users, gradient: 'from-fuchsia-500 to-pink-500', url: 'https://aiassist.net/dashboard/team-members' },
  { id: 16, label: 'Settings', icon: Settings, gradient: 'from-slate-500 to-gray-600', url: 'https://aiassist.net/dashboard/settings' },
  { id: 17, label: 'Plans', icon: FileText, gradient: 'from-yellow-400 to-amber-500', url: 'https://aiassist.net/pricing' },
  { id: 18, label: 'Convos', icon: MessageSquare, gradient: 'from-cyan-500 to-blue-500', url: 'https://aiassist.net/workspaces' },
  { id: 19, label: 'PIN', icon: Database, gradient: 'from-orange-500 to-red-500', url: 'https://aiassist.net/pin' },
  { id: 20, label: 'Tools', icon: Wrench, gradient: 'from-orange-400 to-amber-600', url: 'https://aiassist.net/dashboard/tools' },
  { id: 21, label: 'SaaS Signal', icon: Radio, gradient: 'from-violet-500 to-fuchsia-500', url: 'https://saas-signal.com' },
  { id: 22, label: 'Malachi', icon: Flame, gradient: 'from-red-500 to-orange-500', url: 'https://malachi.aiassist.net' },
  { id: 23, label: 'White Glove', icon: Crown, gradient: 'from-amber-300 to-yellow-500', url: 'https://whiteglove.aiassist.net' },
  { id: 24, label: 'KeyStone Lite', icon: Diamond, gradient: 'from-sky-400 to-indigo-500', url: 'https://aiassistsecure.github.io/KeyStone-Lite' },
];

const activities = [
  { id: 1, message: "Agent 'SalesBot' deployed to production", time: "2 min ago", icon: Rocket },
  { id: 2, message: "API key rotated for OpenAI", time: "15 min ago", icon: Settings },
  { id: 3, message: "Template 'Customer Support v3' updated", time: "1 hr ago", icon: Layers },
];

export default function Dashboard() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-indigo-500/30 dark">
      {/* Top Bar / Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-6 bg-[#0A0A0B]/70 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white/90">AiAssist.net</span>
        </div>

        <div className="flex-1 max-w-md px-8 hidden md:block">
          <div 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border transition-all duration-300 ${
              searchFocused ? 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] bg-white/[0.05]' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            <Search className={`w-4 h-4 transition-colors ${searchFocused ? 'text-indigo-400' : 'text-slate-400'}`} />
            <input 
              type="text" 
              placeholder="Search apps, agents, or commands..." 
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-500 text-slate-200"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="flex items-center gap-1 text-slate-500 bg-white/5 px-1.5 py-0.5 rounded text-xs border border-white/10">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="w-8 h-8 ring-1 ring-white/10 cursor-pointer hover:ring-white/30 transition-all shadow-md">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@user" />
            <AvatarFallback className="bg-slate-800 text-xs">AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* App Grid */}
        <section className="space-y-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-10 justify-items-center">
            {apps.map((app) => (
              <a 
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 cursor-pointer no-underline"
              >
                <div 
                  className={`relative flex items-center justify-center w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-[1.25rem] bg-gradient-to-br ${app.gradient} shadow-lg transition-all duration-300 
                  group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] group-active:scale-95`}
                >
                  <div className="absolute inset-0 rounded-[1.25rem] bg-black/10 mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-white/20 inset-ring-white/10"></div>
                  <app.icon className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide text-center">
                  {app.label}
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-white/5">
          {/* Quick Stats */}
          <section className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest px-1">System Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col gap-2 hover:bg-white/[0.04] transition-colors shadow-sm">
                <span className="text-xs font-medium text-slate-400">Active Agents</span>
                <div className="text-3xl font-light text-white tracking-tight">12</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col gap-2 hover:bg-white/[0.04] transition-colors shadow-sm">
                <span className="text-xs font-medium text-slate-400">API Keys</span>
                <div className="text-3xl font-light text-white tracking-tight">4</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col gap-2 hover:bg-white/[0.04] transition-colors shadow-sm">
                <span className="text-xs font-medium text-slate-400">Requests (24h)</span>
                <div className="text-3xl font-light text-white tracking-tight">14.2k</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col gap-2 hover:bg-white/[0.04] transition-colors shadow-sm relative overflow-hidden">
                <span className="text-xs font-medium text-slate-400">System Status</span>
                <div className="flex items-center gap-2 mt-auto pb-1">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                  </div>
                  <span className="text-sm font-medium text-emerald-400">Operational</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-4">
            <h3 className="text-xs font-medium text-slate-500 uppercase tracking-widest px-1">Recent Activity</h3>
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden shadow-sm">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start gap-4 p-4 hover:bg-white/[0.04] transition-colors cursor-pointer group ${
                    index !== activities.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors shrink-0 mt-0.5">
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors leading-snug pr-4">{activity.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 self-center" />
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
