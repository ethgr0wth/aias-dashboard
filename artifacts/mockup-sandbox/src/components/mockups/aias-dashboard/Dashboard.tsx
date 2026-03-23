import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Cpu, Sparkles, Code, Layers, Rocket, Target, BookOpen, Mic,
  Activity, Shield, History, UserPlus, Globe, Users, Settings,
  FileText, MessageSquare, Database, Wrench, Radio, Flame, Crown, Diamond,
  Search, Command, ChevronRight, ChevronLeft, Palette, X, Check, GripVertical
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type AppItem = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  gradient: string;
  url: string;
};

const defaultApps: AppItem[] = [
  { id: 'artifacts', label: 'Artifacts', icon: Cpu, gradient: 'from-cyan-500 to-blue-600', url: 'https://aiassist.net/dashboard/artifact-portal' },
  { id: 'playground', label: 'Playground', icon: Sparkles, gradient: 'from-amber-400 to-orange-500', url: 'https://aiassist.net/m/playground' },
  { id: 'codegen', label: 'Code Gen', icon: Code, gradient: 'from-emerald-400 to-green-600', url: 'https://aiassist.net/dashboard/code-generator' },
  { id: 'templates', label: 'Templates', icon: Layers, gradient: 'from-pink-500 to-rose-500', url: 'https://aiassist.net/dashboard/templates' },
  { id: 'agents', label: 'Agents', icon: Rocket, gradient: 'from-green-400 to-emerald-600', url: 'https://aiassist.net/dashboard/deployed-agents' },
  { id: 'directives', label: 'Directives', icon: Target, gradient: 'from-purple-500 to-violet-600', url: 'https://aiassist.net/dashboard/directives' },
  { id: 'keystone', label: 'KeyStone', icon: Code, gradient: 'from-indigo-500 to-blue-600', url: 'https://aiassist.net/keystone' },
  { id: 'blog', label: 'Blog', icon: BookOpen, gradient: 'from-teal-400 to-cyan-500', url: 'https://aiassist.net/blog' },
  { id: 'voice', label: 'Voice', icon: Mic, gradient: 'from-violet-500 to-purple-600', url: 'https://aiassist.net/dashboard/voice-chat' },
  { id: 'control', label: 'Control', icon: Activity, gradient: 'from-blue-500 to-indigo-600', url: 'https://aiassist.net/dashboard/control-center' },
  { id: 'policies', label: 'Policies', icon: Shield, gradient: 'from-cyan-400 to-teal-500', url: 'https://aiassist.net/dashboard/policy-snapshots' },
  { id: 'changes', label: 'Changes', icon: History, gradient: 'from-rose-500 to-red-600', url: 'https://aiassist.net/dashboard/change-log' },
  { id: 'leads', label: 'Leads', icon: UserPlus, gradient: 'from-sky-400 to-blue-500', url: 'https://aiassist.net/dashboard/leads' },
  { id: 'environments', label: 'Environments', icon: Globe, gradient: 'from-lime-400 to-green-500', url: 'https://aiassist.net/dashboard/environments' },
  { id: 'team', label: 'Team', icon: Users, gradient: 'from-fuchsia-500 to-pink-500', url: 'https://aiassist.net/dashboard/team-members' },
  { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-slate-500 to-gray-600', url: 'https://aiassist.net/dashboard/settings' },
  { id: 'plans', label: 'Plans', icon: FileText, gradient: 'from-yellow-400 to-amber-500', url: 'https://aiassist.net/pricing' },
  { id: 'convos', label: 'Convos', icon: MessageSquare, gradient: 'from-cyan-500 to-blue-500', url: 'https://aiassist.net/workspaces' },
  { id: 'pin', label: 'PIN', icon: Database, gradient: 'from-orange-500 to-red-500', url: 'https://aiassist.net/pin' },
  { id: 'tools', label: 'Tools', icon: Wrench, gradient: 'from-orange-400 to-amber-600', url: 'https://aiassist.net/dashboard/tools' },
  { id: 'saas-signal', label: 'SaaS Signal', icon: Radio, gradient: 'from-violet-500 to-fuchsia-500', url: 'https://saas-signal.com' },
  { id: 'malachi', label: 'Malachi', icon: Flame, gradient: 'from-red-500 to-orange-500', url: 'https://malachi.aiassist.net' },
  { id: 'white-glove', label: 'White Glove', icon: Crown, gradient: 'from-amber-300 to-yellow-500', url: 'https://whiteglove.aiassist.net' },
  { id: 'keystone-lite', label: 'KeyStone Lite', icon: Diamond, gradient: 'from-sky-400 to-indigo-500', url: 'https://aiassistsecure.github.io/KeyStone-Lite' },
];

const backgrounds = [
  { id: 'midnight', label: 'Midnight', value: '#0A0A0B' },
  { id: 'deep-ocean', label: 'Deep Ocean', value: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)' },
  { id: 'aurora', label: 'Aurora', value: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0a1a2e 60%, #0a0a1a 100%)' },
  { id: 'ember', label: 'Ember', value: 'linear-gradient(135deg, #1a0a0a 0%, #2a0a0a 50%, #1a0a0a 100%)' },
  { id: 'forest', label: 'Forest', value: 'linear-gradient(135deg, #0a1a0a 0%, #0a1a1a 50%, #0a0a1a 100%)' },
  { id: 'cosmos', label: 'Cosmos', value: 'linear-gradient(135deg, #0a0a1e 0%, #1e0a2e 25%, #0a1a2e 50%, #0a0a1e 75%, #1e0a1e 100%)' },
  { id: 'slate', label: 'Slate', value: 'linear-gradient(135deg, #111118 0%, #1a1a24 50%, #111118 100%)' },
  { id: 'warm-dark', label: 'Warm Dark', value: 'linear-gradient(135deg, #141210 0%, #1c1814 50%, #141210 100%)' },
];

const ICONS_PER_PAGE = 12;

function loadOrder(): string[] | null {
  try {
    const saved = localStorage.getItem('aias-icon-order');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveOrder(ids: string[]) {
  try {
    localStorage.setItem('aias-icon-order', JSON.stringify(ids));
  } catch {}
}

function loadBg(): string {
  try {
    return localStorage.getItem('aias-bg') || backgrounds[0].value;
  } catch {
    return backgrounds[0].value;
  }
}

function saveBg(bg: string) {
  try {
    localStorage.setItem('aias-bg', bg);
  } catch {}
}

function SortableAppTile({ app, editMode }: { app: AppItem; editMode: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id, disabled: !editMode });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const IconComp = app.icon;

  const inner = (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex flex-col items-center gap-2.5 select-none ${editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
      {...(editMode ? { ...attributes, ...listeners } : {})}
    >
      <div
        className={`relative flex items-center justify-center w-[76px] h-[76px] rounded-[1.25rem] bg-gradient-to-br ${app.gradient} shadow-lg transition-transform duration-150
        ${editMode ? 'jiggle' : 'group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95'}
        group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]`}
      >
        <div className="absolute inset-0 rounded-[1.25rem] bg-black/10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
        <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-white/20" />
        <IconComp className="w-9 h-9 text-white drop-shadow-md relative z-10" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide text-center leading-tight max-w-[80px]">
        {app.label}
      </span>
    </div>
  );

  if (editMode) return inner;

  return (
    <a href={app.url} target="_blank" rel="noopener noreferrer" className="no-underline">
      {inner}
    </a>
  );
}

function AppTileOverlay({ app }: { app: AppItem }) {
  const IconComp = app.icon;
  return (
    <div className="flex flex-col items-center gap-2.5 pointer-events-none">
      <div className={`relative flex items-center justify-center w-[76px] h-[76px] rounded-[1.25rem] bg-gradient-to-br ${app.gradient} shadow-2xl scale-110 ring-2 ring-white/30`}>
        <IconComp className="w-9 h-9 text-white drop-shadow-md" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] font-medium text-white tracking-wide text-center">{app.label}</span>
    </div>
  );
}

const activities = [
  { id: 1, message: "Agent 'SalesBot' deployed to production", time: "2 min ago", icon: Rocket },
  { id: 2, message: "API key rotated for OpenAI", time: "15 min ago", icon: Settings },
  { id: 3, message: "Template 'Customer Support v3' updated", time: "1 hr ago", icon: Layers },
  { id: 4, message: "Environment 'staging-v2' provisioned", time: "3 hr ago", icon: Globe },
];

export default function Dashboard() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [bg, setBg] = useState(loadBg);
  const [activeId, setActiveId] = useState<string | null>(null);

  const savedOrder = loadOrder();
  const [appOrder, setAppOrder] = useState<string[]>(
    savedOrder || defaultApps.map(a => a.id)
  );

  const orderedApps = appOrder
    .map(id => defaultApps.find(a => a.id === id))
    .filter(Boolean) as AppItem[];

  const totalPages = Math.ceil(orderedApps.length / ICONS_PER_PAGE);
  const pageApps = orderedApps.slice(
    currentPage * ICONS_PER_PAGE,
    (currentPage + 1) * ICONS_PER_PAGE
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const globalOldIndex = appOrder.indexOf(active.id as string);
    const globalNewIndex = appOrder.indexOf(over.id as string);

    if (globalOldIndex === -1 || globalNewIndex === -1) return;

    const newOrder = arrayMove(appOrder, globalOldIndex, globalNewIndex);
    setAppOrder(newOrder);
    saveOrder(newOrder);
  };

  const swipeRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && currentPage < totalPages - 1) setCurrentPage(p => p + 1);
      if (diff < 0 && currentPage > 0) setCurrentPage(p => p - 1);
    }
  };

  const handleMouseDown = useRef(0);
  const handleMouseSwipeStart = (e: React.MouseEvent) => {
    if (editMode) return;
    handleMouseDown.current = e.clientX;
  };
  const handleMouseSwipeEnd = (e: React.MouseEvent) => {
    if (editMode) return;
    const diff = handleMouseDown.current - e.clientX;
    if (Math.abs(diff) > 80) {
      if (diff > 0 && currentPage < totalPages - 1) setCurrentPage(p => p + 1);
      if (diff < 0 && currentPage > 0) setCurrentPage(p => p - 1);
    }
  };

  const changeBg = (value: string) => {
    setBg(value);
    saveBg(value);
  };

  const bgStyle: React.CSSProperties = bg.startsWith('linear-gradient')
    ? { background: bg }
    : { backgroundColor: bg };

  const activeApp = activeId ? defaultApps.find(a => a.id === activeId) : null;

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden" style={bgStyle}>
      <style>{`
        @keyframes jiggle {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        .jiggle {
          animation: jiggle 0.3s ease-in-out infinite;
        }
        .jiggle:nth-child(2n) {
          animation-delay: 0.05s;
        }
        .jiggle:nth-child(3n) {
          animation-delay: 0.1s;
        }
      `}</style>

      <header className="sticky top-0 z-50 flex h-14 items-center justify-between px-5 bg-black/40 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white/90">AiAssist.net</span>
        </div>

        <div className="flex-1 max-w-sm px-6 hidden md:block">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border transition-all duration-200 ${
              searchFocused ? 'border-indigo-500/40 bg-white/[0.06]' : 'border-white/[0.08] hover:border-white/15'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${searchFocused ? 'text-indigo-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search apps, agents, or commands..."
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-500 text-slate-200"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="flex items-center gap-0.5 text-slate-500 bg-white/[0.06] px-1.5 py-0.5 rounded text-[10px] border border-white/[0.08]">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBgPicker(!showBgPicker)}
            className={`p-1.5 rounded-lg transition-colors ${showBgPicker ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'}`}
            title="Change background"
          >
            <Palette className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${editMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'}`}
          >
            {editMode ? (
              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Done</span>
            ) : (
              <span className="flex items-center gap-1"><GripVertical className="w-3 h-3" /> Edit</span>
            )}
          </button>
          <Avatar className="w-7 h-7 ring-1 ring-white/10 cursor-pointer hover:ring-white/25 transition-all">
            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-[10px] text-white font-semibold">AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {showBgPicker && (
        <div className="absolute top-14 right-4 z-50 p-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-medium text-slate-300">Background</span>
            <button onClick={() => setShowBgPicker(false)} className="text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {backgrounds.map(b => (
              <button
                key={b.id}
                onClick={() => changeBg(b.value)}
                className={`w-12 h-12 rounded-xl border-2 transition-all ${bg === b.value ? 'border-indigo-400 scale-105' : 'border-white/10 hover:border-white/25'}`}
                style={b.value.startsWith('linear') ? { background: b.value } : { backgroundColor: b.value }}
                title={b.label}
              />
            ))}
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 pt-10 pb-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            ref={swipeRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseSwipeStart}
            onMouseUp={handleMouseSwipeEnd}
            className="relative"
          >
            <SortableContext items={pageApps.map(a => a.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-5 gap-y-8 justify-items-center min-h-[320px] py-4">
                {pageApps.map(app => (
                  <SortableAppTile key={app.id} app={app} editMode={editMode} />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeApp ? <AppTileOverlay app={activeApp} /> : null}
            </DragOverlay>
          </div>
        </DndContext>

        <div className="flex items-center justify-center gap-3 mt-6 mb-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === i ? 'bg-white w-6' : 'bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-6 border-t border-white/[0.05]">
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] mb-3 px-1">System Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col gap-1.5 hover:bg-white/[0.05] transition-colors">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Active Agents</span>
                <div className="text-2xl font-light text-white tracking-tight">12</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col gap-1.5 hover:bg-white/[0.05] transition-colors">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">API Keys</span>
                <div className="text-2xl font-light text-white tracking-tight">4</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col gap-1.5 hover:bg-white/[0.05] transition-colors">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Requests (24h)</span>
                <div className="text-2xl font-light text-white tracking-tight">14.2k</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col gap-1.5 hover:bg-white/[0.05] transition-colors">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Status</span>
                <div className="flex items-center gap-1.5 mt-auto">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-medium text-emerald-400">Operational</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] mb-3 px-1">Recent Activity</h3>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
              {activities.map((activity, index) => {
                const AIcon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-3 px-3.5 py-2.5 hover:bg-white/[0.04] transition-colors cursor-pointer group ${
                      index !== activities.length - 1 ? 'border-b border-white/[0.04]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.05] text-slate-400 group-hover:text-indigo-400 transition-colors shrink-0">
                      <AIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-300 group-hover:text-slate-100 transition-colors truncate">{activity.message}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
