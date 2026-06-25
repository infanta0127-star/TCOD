/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Skull, 
  ShieldAlert, 
  Footprints, 
  ChevronsRight, 
  ChevronDown,
  Users,
  Shield,
  HeartPulse,
  Sword,
  Sparkles,
  MapPin,
  RefreshCw,
  Image
} from 'lucide-react';

// Expandable component for phase-specific instructions
const ExpandableRule = ({ 
  title, 
  summary, 
  roleTags = [], 
  activeRole = 'all', 
  children 
}: { 
  title: string; 
  summary: string; 
  roleTags?: ('T' | 'H' | 'D')[]; 
  activeRole?: 'all' | 'T' | 'H' | 'D'; 
  children: React.ReactNode; 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if this rule is relevant to the currently selected role
  const isRelevant = activeRole === 'all' || roleTags.length === 0 || roleTags.includes(activeRole);

  return (
    <div className={`mb-3 border transition-all duration-200 ${
      isRelevant 
        ? 'border-border bg-panel shadow-sm shadow-black/40' 
        : 'border-border/20 bg-panel/40 opacity-50'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-3 sm:p-4 text-left hover:bg-border/30 transition-colors cursor-pointer"
      >
        <div className="flex-1 pr-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`font-serif text-[15px] sm:text-[16px] tracking-wide font-medium ${isRelevant ? 'text-accent' : 'text-accent/60'}`}>
              {title}
            </span>
            {roleTags.map(role => (
              <span key={role} className={`text-[9px] px-1.5 py-0.5 font-mono uppercase tracking-wider rounded ${
                role === 'T' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' :
                role === 'H' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                'bg-amber-950/60 text-amber-400 border border-amber-800/50'
              }`}>
                {role === 'T' ? '坦' : role === 'H' ? '補' : '輸'}
              </span>
            ))}
          </div>
          <span className="text-muted text-[12px] sm:text-[13px] line-clamp-1">{summary}</span>
        </div>
        <ChevronDown 
          className={`shrink-0 text-muted transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>
      {isOpen && (
        <div className="p-3 sm:p-4 border-t border-border/80 bg-[#0c0c0c] text-[13px] sm:text-[14px] leading-relaxed text-[#d4d4d4]">
          {children}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'roles' | 'warnings'>('strategy');
  const [selectedRole, setSelectedRole] = useState<'all' | 'T' | 'H' | 'D'>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'p3_simulator'>('overview');
  
  // Phase 3 Area sub-toggle: 'all' | 'inner' | 'outer'
  const [p3Area, setP3Area] = useState<'all' | 'inner' | 'outer'>('all');

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 lg:p-8 mx-auto max-w-7xl overflow-x-hidden gap-4 bg-bg text-text font-sans">
      
      {/* Header with tactical branding */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-3 shrink-0 gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h1 className="font-serif text-xl sm:text-2xl md:text-[28px] font-normal tracking-[2px] text-accent uppercase">
              The Cloud of Darkness
            </h1>
          </div>
          <p className="text-[11px] sm:text-[12px] text-muted tracking-[1.5px] uppercase mt-1 font-mono">
            滅 黑暗之雲激鬥戰 - Tactical Briefing / 子言攻略重點摘要
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-4 self-end md:self-auto">
          {/* View Toggle */}
          <div className="flex bg-panel/50 p-1 border border-border/80 rounded-md">
            <button
              onClick={() => setViewMode('overview')}
              className={`py-1.5 px-3 rounded text-[12px] font-medium transition-all ${
                viewMode === 'overview' ? 'bg-accent/20 text-accent font-semibold' : 'text-muted hover:text-text'
              }`}
            >
              綜合戰術
            </button>
            <button
              onClick={() => setViewMode('p3_simulator')}
              className={`py-1.5 px-3 rounded text-[12px] font-medium transition-all ${
                viewMode === 'p3_simulator' ? 'bg-purple-500/20 text-purple-400 font-semibold' : 'text-muted hover:text-text'
              }`}
            >
              P3 專屬模擬
            </button>
          </div>
          <div className="flex gap-4">
            <div className="text-right border-r border-border/50 pr-4">
              <div className="font-serif text-[16px] sm:text-[18px] text-text font-bold text-accent">SAVAGE</div>
              <div className="text-[9px] text-muted uppercase tracking-widest mt-0.5 font-mono">Difficulty</div>
            </div>
            <div className="text-right">
              <div className="font-serif text-[16px] sm:text-[18px] text-text">8 MAN</div>
              <div className="text-[9px] text-muted uppercase tracking-widest mt-0.5 font-mono">Party Size</div>
            </div>
          </div>
        </div>
      </header>

      {viewMode === 'overview' ? (
        <>
          {/* Role Selector: Crucial for high-utility on mobile */}
          <section className="bg-panel/40 border border-border/80 p-3 rounded-lg shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              <span className="text-[12px] sm:text-[13px] font-medium text-[#f0f0f0]">
                職責專屬篩選器 (Role Filter)：
              </span>
            </div>
            <div className="grid grid-cols-4 sm:flex gap-1.5 sm:gap-2">
              <button
                onClick={() => setSelectedRole('all')}
                className={`py-1.5 px-2 rounded text-[11px] font-medium tracking-wider flex items-center justify-center gap-1 min-h-[40px] sm:min-h-[34px] cursor-pointer border transition-all ${
                  selectedRole === 'all'
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-bg/40 border-border text-muted hover:text-text'
                }`}
              >
                <Users size={12} />
                <span>全部</span>
              </button>
              <button
                onClick={() => setSelectedRole('T')}
                className={`py-1.5 px-2 rounded text-[11px] font-medium tracking-wider flex items-center justify-center gap-1 min-h-[40px] sm:min-h-[34px] cursor-pointer border transition-all ${
                  selectedRole === 'T'
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 font-semibold'
                    : 'bg-bg/40 border-border text-muted hover:text-text'
                }`}
              >
                <Shield size={12} />
                <span>坦克</span>
              </button>
              <button
                onClick={() => setSelectedRole('H')}
                className={`py-1.5 px-2 rounded text-[11px] font-medium tracking-wider flex items-center justify-center gap-1 min-h-[40px] sm:min-h-[34px] cursor-pointer border transition-all ${
                  selectedRole === 'H'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-semibold'
                    : 'bg-bg/40 border-border text-muted hover:text-text'
                }`}
              >
                <HeartPulse size={12} />
                <span>補師</span>
              </button>
              <button
                onClick={() => setSelectedRole('D')}
                className={`py-1.5 px-2 rounded text-[11px] font-medium tracking-wider flex items-center justify-center gap-1 min-h-[40px] sm:min-h-[34px] cursor-pointer border transition-all ${
                  selectedRole === 'D'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-semibold'
                    : 'bg-bg/40 border-border text-muted hover:text-text'
                }`}
              >
                <Sword size={12} />
                <span>輸出</span>
              </button>
            </div>
          </section>

      {/* Mobile/Tablet View Tabs (Hidden on desktop) */}
      <div className="grid grid-cols-3 gap-1.5 lg:hidden shrink-0">
        <button
          onClick={() => setActiveTab('strategy')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-md border text-center transition-all min-h-[48px] cursor-pointer ${
            activeTab === 'strategy'
              ? 'border-accent bg-accent/15 text-accent font-semibold shadow-sm shadow-accent/5'
              : 'border-border/60 bg-panel/60 text-muted hover:text-text'
          }`}
        >
          <CheckCircle2 size={16} className="mb-1" />
          <span className="text-[11px] sm:text-[12px] tracking-wide">核心戰術 (Phases)</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-md border text-center transition-all min-h-[48px] cursor-pointer ${
            activeTab === 'roles'
              ? 'border-accent bg-accent/15 text-accent font-semibold shadow-sm shadow-accent/5'
              : 'border-border/60 bg-panel/60 text-muted hover:text-text'
          }`}
        >
          <Footprints size={16} className="mb-1" />
          <span className="text-[11px] sm:text-[12px] tracking-wide">職責優先級</span>
        </button>
        
        <button
          onClick={() => setActiveTab('warnings')}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-md border text-center transition-all min-h-[48px] cursor-pointer ${
            activeTab === 'warnings'
              ? 'border-accent bg-accent/15 text-accent font-semibold shadow-sm shadow-accent/5'
              : 'border-border/60 bg-panel/60 text-muted hover:text-text'
          }`}
        >
          <Skull size={16} className="mb-1" />
          <span className="text-[11px] sm:text-[12px] tracking-wide">警示與訣竅</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-6 min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0">
        
        {/* Left Column: Role Priorities (Visible on Desktop OR active 'roles' tab on Mobile) */}
        <aside className={`${activeTab === 'roles' ? 'flex' : 'hidden'} lg:flex flex-col gap-5 lg:border-r border-border/60 lg:pr-6 overflow-y-auto custom-scrollbar`}>
          
          <div className="bg-panel/20 p-4 border border-border/50 rounded-md">
            <h2 className="font-serif italic text-[17px] text-accent mb-3 border-l-2 border-accent pl-3 flex items-center justify-between">
              <span>機制優先級</span>
              <span className="text-[9px] uppercase tracking-wider font-mono text-muted bg-[#151515] px-1.5 py-0.5 rounded">Priorities</span>
            </h2>
            <ul className="list-none flex flex-col divide-y divide-border/40">
              <li className="text-[13px] py-2.5 flex justify-between items-center gap-2">
                <span className="flex items-center gap-2 shrink-0"><Footprints size={14} className="text-blue-400 shrink-0"/> 踩塔 (內場)</span>
                <span className="text-accent font-mono text-[11px] bg-[#111] px-2 py-0.5 border border-border/40 rounded truncate">B.H1 → B.H2 → B.D1 → B.D2</span>
              </li>
              <li className="text-[13px] py-2.5 flex justify-between items-center">
                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400 shrink-0"/> 放種子彈</span>
                <span className="text-accent font-mono text-[11.5px] bg-[#111] px-2 py-0.5 border border-border/40 rounded">H &gt; D &gt; T</span>
              </li>
              <li className="text-[13px] py-2.5 flex justify-between items-center">
                <span className="flex items-center gap-2"><ChevronsRight size={14} className="text-amber-400 shrink-0"/> 迴旋移動</span>
                <span className="text-accent font-mono text-[11.5px] bg-[#111] px-2 py-0.5 border border-border/40 rounded">T &gt; H &gt; D</span>
              </li>
              <li className="text-[13px] py-2.5 flex justify-between items-center">
                <span className="flex items-center gap-2"><ShieldAlert size={14} className="text-red-400 shrink-0"/> 渾沌換位</span>
                <span className="text-accent font-mono text-[11.5px] bg-[#111] px-2 py-0.5 border border-border/40 rounded">坦逆時針入口</span>
              </li>
            </ul>
          </div>

          <div className="bg-panel/20 p-4 border border-border/50 rounded-md">
            <h2 className="font-serif italic text-[17px] text-accent mb-3 border-l-2 border-accent pl-3">
              核心口訣
            </h2>
            <ul className="list-none flex flex-col divide-y divide-border/40">
              <li className="text-[13px] py-2 flex justify-between items-center">
                <span>暗之刃 (胸前交叉)</span>
                <span className="text-red-400 font-semibold text-[12px] bg-red-950/20 px-2 py-0.5 border border-red-900/30 rounded">交叉 遠離</span>
              </li>
              <li className="text-[13px] py-2 flex justify-between items-center">
                <span>暗之刃 (單手舉起)</span>
                <span className="text-emerald-400 font-semibold text-[12px] bg-emerald-950/20 px-2 py-0.5 border border-emerald-900/30 rounded">靠近下手處</span>
              </li>
              <li className="text-[13px] py-2 flex justify-between items-center">
                <span>極石化 (大眼睛)</span>
                <span className="text-amber-400 font-semibold text-[12px] bg-amber-950/20 px-2 py-0.5 border border-amber-900/30 rounded">背對眼睛</span>
              </li>
              <li className="text-[13px] py-2 flex justify-between items-center">
                <span>飆風 (風暴吹襲)</span>
                <span className="text-blue-400 font-semibold text-[12px] bg-blue-950/20 px-2 py-0.5 border border-blue-900/30 rounded">靠近防退</span>
              </li>
              <li className="text-[13px] py-2 flex justify-between items-center">
                <span>極死 (吸引重力)</span>
                <span className="text-purple-400 font-semibold text-[12px] bg-purple-950/20 px-2 py-0.5 border border-purple-900/30 rounded">遠離踩圈</span>
              </li>
            </ul>
          </div>

        </aside>

        {/* Center Column: Detailed Phases & Expandables (Visible on Desktop OR active 'strategy' tab on Mobile) */}
        <main className={`${activeTab === 'strategy' ? 'flex' : 'hidden'} lg:flex flex-col gap-6 overflow-y-auto custom-scrollbar lg:pr-2`}>
          
          {/* Phase 1 & 2 */}
          <div className="bg-panel border border-border p-4 sm:p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono tracking-wider text-accent bg-accent/15 border border-accent/25 px-2.5 py-0.5 rounded font-bold uppercase">
                Phase 01 & 02
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f0f0f0]">基礎熱身與分支機制</h3>
              <p className="text-[12px] text-muted mt-0.5">點擊各項機制以展開查看精細跑位與應對細節：</p>
            </div>
            
            <ExpandableRule title="暗之刃 (交叉與舉手)" summary="雙手交叉則遠離，舉起手則走入下手側" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted">
                  <li><strong className="text-white">交叉手勢：</strong>BOSS 雙手在胸前交叉。這是一個超大範圍圓形 AOE，全體應立即<span className="text-accent font-semibold">遠離 BOSS</span>。</li>
                  <li><strong className="text-white">舉手手勢：</strong>BOSS 舉起一隻手。這是一個大範圍環形 AOE (月環)，安全點位於王下側。請立即<span className="text-accent font-semibold">靠近 BOSS 朝下的那隻手</span>。</li>
                </ul>
              </div>
            </ExpandableRule>

            <ExpandableRule title="陰冷擁抱 (手心與手背)" summary="看清王的手心或手背，進行黑手或黃線引導" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong className="text-emerald-400">心面王 (手心朝玩家)：</strong>所有人立刻走到<strong className="text-white">場邊並面對 BOSS</strong>。當看見黑色之手出現的瞬間，立刻<span className="text-accent font-semibold">往前走</span>，即可輕鬆躲掉追擊。</li>
                  <li><strong className="text-amber-400">背背王 (手背朝玩家)：</strong>所有人立刻走到<strong className="text-white">場邊並背對 BOSS</strong>。當畫面上出現黃色警戒線的瞬間，立刻<span className="text-accent font-semibold">轉身走開</span>躲避。</li>
                  <li><strong className="text-red-400 font-semibold">滅團警告：</strong>若不幸被擊中，會被附加「死亡宣告」Debuff。請<strong className="text-emerald-400">補師立刻驅散</strong>，否則倒數結束即死。</li>
                </ul>
              </div>
            </ExpandableRule>

            <ExpandableRule title="雲之魔刃 (儲存與判定)" summary="儲存飆風或極死，配合暗之刃打出組合技" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong className="text-white">儲存機制：</strong>BOSS 讀條「雲之魔刃」時，會儲存「飆風」或「極死」之一。此時不進行傷害判定。</li>
                  <li><strong className="text-white">後續釋放：</strong>在接下來暗之刃判定結束後，會立刻釋放剛剛儲存的技能。</li>
                  <li><strong className="text-blue-400">飆風 (靠近)：</strong>高額擊退。所有人必須貼近王，或者<span className="text-accent font-semibold">開啟防擊退技能 (如堅毅、沉穩)</span> 避免被吹落場外。</li>
                  <li><strong className="text-purple-400">極死 (遠離)：</strong>黑洞吸引。所有人必須遠離，當中間的黑圈判定、黑球效果出現後，立即<span className="text-accent font-semibold">走入剛剛踩踏出的月環圈內</span>閃避。吃到亦會被附加「死亡宣告」(可驅散)。</li>
                </ul>
              </div>
            </ExpandableRule>

            <ExpandableRule title="核爆與多重射線" summary="核爆去三角，分攤站最前，射線注意站位" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong className="text-red-400">核爆 (Flare)：</strong>被點名的 3 人必須分散跑到場地的三個角落（A、B、C 標點）進行釋放。如果時間來不及或站錯位，<strong className="text-white">請直接選擇跳樓</strong>，這可以阻止核爆在大群體中炸裂造成滅團。</li>
                  <li><strong className="text-emerald-400">黑暗神聖 (補師分攤)：</strong>點名兩位補師進行分攤。此時 A、B、C 各自隊伍需一對一重疊分攤。</li>
                  <li><strong className="text-blue-400">連射式波動炮 (3組集合)：</strong>BOSS 的持續射線。A、B、C 三組依規定站位進行分攤。越靠近王傷害越劇烈，因此<strong className="text-white">必須由坦克站在最前排</strong>開減傷擋槍。</li>
                  <li><strong className="text-amber-400">齊射式波動炮：</strong>外場小怪隨機方向射線，注意小怪朝向並橫向移動閃開。</li>
                </ul>
              </div>
            </ExpandableRule>
          </div>

          {/* Phase 3 with dedicated Inner/Outer switch */}
          <div className="bg-panel border border-border p-4 sm:p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono tracking-wider text-accent bg-accent/15 border border-accent/25 px-2.5 py-0.5 rounded font-bold uppercase">
                Phase 03
              </span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f0f0f0]">內外場分裂與阿托莫斯</h3>
              <p className="text-[12px] text-muted mt-0.5 mb-4">場地分裂為 A、B、C 區。請使用下方按鈕切換查看內場與外場專屬重點：</p>
              
              {/* Basic Position Map */}
              <div className="rounded-lg overflow-hidden border border-border/50 relative mb-4 bg-black/40">
                 <img 
                   src="/p3_base_position.png" 
                   alt="P3 基礎站位圖" 
                   width={1024}
                   height={800}
                   className="w-full h-auto" 
                   onError={(e) => { 
                     e.currentTarget.style.display = 'none'; 
                     e.currentTarget.nextElementSibling?.classList.remove('hidden'); 
                   }} 
                 />
                 <div className="hidden bg-bg/50 p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[150px]">
                   <Image size={24} className="text-muted" />
                   <p className="text-[12px] text-muted">請將您上傳的圖片命名為 <code className="text-accent bg-accent/10 px-1 py-0.5 rounded">p3_base_position.png</code> 並放入 public 資料夾中</p>
                 </div>
              </div>
            </div>

            {/* Local Switcher for Inner / Outer Focus */}
            <div className="flex bg-bg/60 p-1 border border-border/80 rounded-md mb-4">
              <button
                onClick={() => setP3Area('all')}
                className={`flex-1 py-1.5 px-2 rounded text-[12px] font-medium text-center cursor-pointer transition-all ${
                  p3Area === 'all' ? 'bg-accent/15 text-accent font-semibold' : 'text-muted hover:text-text'
                }`}
              >
                全部機制
              </button>
              <button
                onClick={() => setP3Area('inner')}
                className={`flex-1 py-1.5 px-2 rounded text-[12px] font-medium text-center cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  p3Area === 'inner' ? 'bg-blue-500/10 text-blue-400 font-semibold' : 'text-muted hover:text-text'
                }`}
              >
                <MapPin size={12} />
                內場重點
              </button>
              <button
                onClick={() => setP3Area('outer')}
                className={`flex-1 py-1.5 px-2 rounded text-[12px] font-medium text-center cursor-pointer transition-all flex items-center justify-center gap-1 ${
                  p3Area === 'outer' ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-muted hover:text-text'
                }`}
              >
                <MapPin size={12} />
                外場重點
              </button>
            </div>

            {/* Inner Field Section */}
            {(p3Area === 'all' || p3Area === 'inner') && (
              <div className="space-y-3">
                <div className="text-[11px] font-mono tracking-wider text-blue-400 uppercase bg-blue-950/20 border border-blue-900/30 px-2 py-0.5 rounded w-max">
                  內場組專屬焦點 (Inner Team Focus)
                </div>
                
                <ExpandableRule title="【內場】波動球踩塔優先級" summary="內場為1人或2人塔，必須依規定嚴格補位" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-blue-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 內場踩塔攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">塔的形狀：</strong>為發光光球，分為 1 人塔與 2 人塔。</li>
                      <li><strong className="text-white">優先級一：</strong><span className="text-accent font-semibold">B.H1 → B.H2 → B.D1 → B.D2</span></li>
                      <li><strong className="text-white">優先級二：</strong><span className="text-accent font-semibold">A.H1 → A.H2 → B.D3 → B.D4</span></li>
                      <li><strong className="text-white">坦克職責：</strong>坦克不參與初始分配，但需要時刻關注場上是否有漏塔，並跨區進行補位。</li>
                      <li><strong className="text-white font-semibold">防刀提醒：</strong>踩塔時務必<strong className="text-red-400">貼近大暗雲位置</strong>，避免被外場的左右刀順便削死。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【內場】恐懼之雲十字與環形" summary="矩形雲走十字閃避，環狀雲向內走一格" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-blue-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 內場躲雲攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">矩形黑雲 (十字形 AOE)：</strong>治療與輸出 (HD) 先向安全區移動，坦克 (T) 在後補位。判定結束後全體立刻回原位。</li>
                      <li><strong className="text-white">環形黑雲 (環狀 AOE)：</strong>AC 區的 H1 以及 B 隊的 D3、D4 玩家<span className="text-accent font-semibold">往內場(王方向)跨走一格</span>躲避。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【內場】種子放置與拉斷荊棘" summary="四角放種子，中間扯線連線左右不動中間跑" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-blue-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 內場荊棘攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">種子放置：</strong>每組均有 HDT 各一人。依照 <strong className="text-white">H → D → T</strong> 由遠到近的順序放置於 1, 2, 3, 4 標記點磚塊角落。</li>
                      <li><strong className="text-white">拉斷連線：</strong>出現 2-2 荊棘連線時，採取<strong className="text-accent">「左右不動，中間跑」</strong>原則。中間的人靠近引導連線後，向橫向遠離拉斷。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【內場】大暗雲波動炮與迴旋跑位" summary="集散判斷，順/逆時針依T-H-D順序移動跑圈" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-blue-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 內場跑圈攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white font-semibold">波動炮分攤與分散：</strong>
                        <br />- 往中間吸特效：<strong className="text-accent">凝縮 (6組分攤)</strong>，坦克最前排擋槍。
                        <br />- 漂浮黑球特效：<strong className="text-accent">分散</strong>。
                      </li>
                      <li><strong className="text-white font-semibold">迴旋雷射移動：</strong>
                        <br />- 順時針：往 3、4 斜角，由 <strong className="text-[#f0f0f0]">B.H1 / B.D2</strong> 領隊。
                        <br />- 逆時針：往 1、2 斜角，由 <strong className="text-[#f0f0f0]">B.H2 / B.D1</strong> 領隊。
                        <br />全體依 <strong className="text-accent">T → H → D</strong> 順序移動，前面空一格就往前一格，B.D1、B.D4 注意屁股安全。
                      </li>
                    </ul>
                  </div>
                </ExpandableRule>
              </div>
            )}

            {/* Separator if all selected */}
            {p3Area === 'all' && <div className="my-5 border-t border-border/40" />}

            {/* Outer Field Section */}
            {(p3Area === 'all' || p3Area === 'outer') && (
              <div className="space-y-3">
                <div className="text-[11px] font-mono tracking-wider text-amber-400 uppercase bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded w-max">
                  外場組專屬焦點 (Outer Team Focus)
                </div>

                <ExpandableRule title="【外場】小怪擊殺與沉默打斷" summary="遠程轉火阿托莫斯，MT沉默打斷黑暗氾濫" roleTags={['T', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-amber-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 外場打斷攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">小怪刷新：</strong>四隻阿托莫斯會給大BOSS回血，遠程職業必須第一時間轉火。</li>
                      <li><strong className="text-red-400 font-bold">致命讀條打斷：</strong>阿托莫斯讀條「黑暗氾濫」時，<strong className="text-red-400 font-bold">主坦 (MT) 必須立刻施加沉默打斷</strong>。漏打斷會導致直接團滅。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【外場】三重暗之戰技與死記順序" summary="單觸手半場、雙觸手MT/D1/D2靠近、身體分散" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-amber-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 外場戰技攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">隨機3組合：</strong>大暗雲會隨機組合以下 3 種機制，玩家需要默記釋放順序：</li>
                      <li><strong className="text-white">單觸手發光：</strong>半場 AOE。安全區為沒發光的那一側。</li>
                      <li><strong className="text-white">雙邊觸手發光：</strong>由 <strong className="text-accent">MT、D1、D2</strong> 靠近王進行引導傷害。</li>
                      <li><strong className="text-white">身體發光：</strong>6 人大分散站位，不要與隊友重疊。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【外場】波動球與恐懼之雲" summary="外場必定為3人塔，注意十字雲到外圈" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-amber-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 外場塔雲攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">外場光球塔：</strong>外場的波動球塔<strong className="text-white">必定為 3 人塔</strong>。固定為：MT組左/上，H2組右/下。</li>
                      <li><strong className="text-white">恐懼之雲：</strong>環形黑雲時靠近內場；十字形黑雲時則必須移動至外圈躲避。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【外場】種子彈與拉斷荊棘" summary="按左至右順序放標點，MT與D1朝外環拉斷" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-amber-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 外場放種子攻略：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">平台站位：</strong>種子點名前全體先到平台上集合，以場中為 12 點。</li>
                      <li><strong className="text-white">放種子順序：</strong>由左至右分別為：<strong className="text-accent font-mono">MT → H2 → D1 → D2 → D3 → D4</strong>。</li>
                      <li><strong className="text-white">引導拉斷：</strong>連線荊棘後，<strong className="text-accent">MT 與 D1</strong> 必須立刻朝向外環最邊緣奔跑拉斷連線。</li>
                    </ul>
                  </div>
                </ExpandableRule>

                <ExpandableRule title="【外場】波動的詛咒與跳躍波動炮" summary="Debuff倒數結束朝外射線，跳躍看好再躲" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
                  <div className="space-y-2">
                    <p className="text-amber-400 border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                      <Info size={14} /> 外場特殊機制：
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted">
                      <li><strong className="text-white">波動的詛咒：</strong>扣除 30% 當前 HP 的真實傷害。每個人的 Debuff 倒數時間不一致，<strong className="text-accent">在倒數結束時務必面朝場外</strong>發射設線，避免射到隊友。</li>
                      <li><strong className="text-white">正側/側正跳躍波動炮：</strong>看清楚特效再移動，跳躍結束後，去箭頭相反方向躲避中間 BOSS 的「迴旋式波動炮」。</li>
                    </ul>
                  </div>
                </ExpandableRule>
              </div>
            )}
          </div>

          {/* Phase 4 */}
          <div className="bg-panel border border-border p-4 sm:p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono tracking-wider text-accent bg-accent/15 border border-accent/25 px-2.5 py-0.5 rounded font-bold uppercase">
                Phase 04
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f0f0f0]">大風吹換位與最終收尾</h3>
              <p className="text-[12px] text-muted mt-0.5">混沌將至，此階段為全體高壓考驗：</p>
            </div>

            <ExpandableRule title="渾沌逼近 (全員大換位)" summary="扣除最大HP的50%，重新交換內外場" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong className="text-red-400 font-bold">血量警告：</strong>「渾沌逼近」發動時，會對全員強制造成最大生命值 <strong className="text-white font-bold">50% 的真實傷害</strong>。</li>
                  <li><strong className="text-emerald-400 font-semibold">治療要點 (補師)：</strong>此時全體站位極其分散，必須在換位前使用高額的<span className="text-accent font-semibold">單體大治療技能和護盾</span>將血量完全抬滿，否則會當場暴斃。</li>
                  <li><strong className="text-white">換位站法：</strong>外場平台的 D2, D3, D4 立刻移動 to 靠近大暗雲的這一側。換位完成後，所有的坦克(T)需集中站在逆時針入口處。</li>
                  <li><strong className="text-blue-400 font-semibold">仇恨重置 (坦克)：</strong>換位後大暗雲仇恨會重置，<strong className="text-white">所有坦克必須第一時間使用嘲諷 (Provoke)</strong> 建立仇恨。</li>
                </ul>
              </div>
            </ExpandableRule>

            <ExpandableRule title="換位後特殊機制 (潛地與三重戰技)" summary="內場沿邊緣跑圈躲潛地波動，外場記住三重戰技" roleTags={['T', 'H', 'D']} activeRole={selectedRole}>
              <div className="space-y-2">
                <p className="text-accent border-b border-border/40 pb-1 font-semibold flex items-center gap-1">
                  <Info size={14} /> 跑位指南：
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted">
                  <li><strong className="text-amber-400">新內場-潛地式波動炮：</strong>全體必須站好固定角落。隨機點名 1 人腳下出現連續圓形追擊 AOE。</li>
                  <li><strong className="text-white">潛地跑路：</strong>當被點名的玩家腳下出現黃圈時，立即開始<span className="text-accent font-semibold">沿著場地邊緣跑一整圈</span>，最後回到各自組別的位置。沒被點名的 T 請在原地站定，等隊友開始移動後，再去角落。</li>
                  <li><strong className="text-blue-400">新外場-三重暗之戰技：</strong>大暗雲會隨機組合以下 3 種機制依次釋放，<strong className="text-white font-bold">必須記住王的提示順序，連續躲避</strong>：
                    <br />1. <strong className="text-white">單觸手發光：</strong>半場超大範圍 AOE。
                    <br />2. <strong className="text-white">雙邊觸手發光：</strong>MT、D1、D2 必須上前靠近王進行引導傷害。
                    <br />3. <strong className="text-white">身體發光：</strong>6 人大分散，嚴禁重疊。
                  </li>
                  <li><strong className="text-accent font-semibold">最終狂暴：</strong>最後大暗雲會讀條「黑暗氾濫」狂暴 AOE，此時全隊全爆發藥水全開，在讀條結束前集火擊殺 BOSS。</li>
                </ul>
              </div>
            </ExpandableRule>
          </div>

        </main>

        {/* Right Column: Warnings & Mastery Tips (Visible on Desktop OR active 'warnings' tab on Mobile) */}
        <aside className={`${activeTab === 'warnings' ? 'flex' : 'hidden'} lg:flex flex-col gap-5 overflow-y-auto custom-scrollbar`}>
          
          <div className="border border-[#451a1a] bg-[#1a0a0a] p-4 rounded-md">
            <h4 className="text-[#f87171] text-[13px] uppercase mb-2.5 tracking-[1px] flex items-center gap-2 font-bold">
              <Skull size={15} /> 滅團級警告 (Wipe Alerts)
            </h4>
            <div className="space-y-3.5 text-[13px] leading-relaxed">
              <p className="text-[#fca5a5]">
                ⚠️ <strong className="text-white">阿托莫斯打斷：</strong>外場阿托莫斯小怪讀條「黑暗氾濫」時，<strong className="text-red-400 font-bold">坦克必須成功打斷</strong>，漏一隻就會直接造成全隊秒殺。
              </p>
              <p className="text-[#fca5a5] border-t border-[#451a1a] pt-3">
                ⚠️ <strong className="text-white">渾沌逼近抬血：</strong>全員大換位時有 50% 扣血。若隊伍血量未在發動前抬滿，或換位後坦克沒立刻重嘲諷，大怪會平A秒殺治療。
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 bg-panel/20 p-4 border border-border/50 rounded-md">
            <h2 className="font-serif italic text-[17px] text-accent border-l-2 border-accent pl-3">
              進階技巧 (Mastery Tips)
            </h2>
            <div className="space-y-3 text-[12px] text-muted leading-[1.6]">
              <div className="pl-3 border-l border-muted">
                <strong className="text-[#f0f0f0]">死亡宣告驅散：</strong>
                如果不小心踩到極死，或者沒成功引導陰冷擁抱，會中死亡宣告。請立刻在麥克風中語音呼叫，補師必須在第一時間用 Esuna 驅散。
              </div>
              <div className="pl-3 border-l border-muted">
                <strong className="text-[#f0f0f0]">跳躍波動炮：</strong>
                「正側跳躍波動炮」有隨機性。請確實看清大暗雲特效(吸引=分攤，黑球=分散)再走位，絕不可提早起跑。
              </div>
              <div className="pl-3 border-l border-muted">
                <strong className="text-[#f0f0f0]">中間場地禁忌：</strong>
                內場的中間是禁站區。兩個人絕對不能同時站在上面，否則承重過高會使得場地當場碎裂。
              </div>
              <div className="pl-3 border-l border-muted">
                <strong className="text-[#f0f0f0]">換坦平A：</strong>
                王平A傷害極高，附帶易傷。坦克請在 <strong className="text-accent font-mono">4 ~ 6 層</strong> 時確實完成換坦 (Tank Swap)。
              </div>
            </div>
          </div>

        </aside>

      </div>
      </>
      ) : (
        <P3Simulator />
      )}

      {/* Footer with briefing indicators */}
      <footer className="border-t border-border/60 pt-3.5 shrink-0 flex flex-col sm:flex-row justify-between items-center text-[10px] text-muted uppercase tracking-[1.5px] gap-2">
        <span>Confidential Tactical Summary</span>
        <span className="text-accent font-serif tracking-[2px] hidden sm:inline">Reference: OS-G-2026-CLOUD</span>
        <span>Authorized for Field Use Only</span>
      </footer>

    </div>
  );
}

const P3Simulator = () => {
  const [team, setTeam] = useState<'A'|'B'|'C'>('A');
  const [role, setRole] = useState<'T'|'H'|'M'|'R'>('T');
  const [group, setGroup] = useState<'MT'|'ST'>('MT');

  const getExactRole = () => {
    if (role === 'T') return group === 'MT' ? 'MT' : 'ST';
    if (role === 'H') return group === 'MT' ? 'H1' : 'H2';
    if (role === 'M') return group === 'MT' ? 'D1' : 'D2';
    if (role === 'R') return group === 'MT' ? 'D3' : 'D4';
    return '';
  };

  const exactRole = getExactRole();

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pb-10">
      {/* Controls */}
      <div className="bg-panel/40 border border-border/80 rounded-lg p-4 sm:p-5 flex flex-col gap-5">
        <h2 className="text-[15px] sm:text-[17px] font-semibold text-[#f0f0f0] flex items-center gap-2">
          <MapPin size={18} className="text-purple-400" />
          滅黑暗之雲：我該去哪裡？ (P3 專屬模擬器)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium text-[#f0f0f0]">你在哪個隊伍？</span>
            <div className="flex gap-2">
              {['A', 'B', 'C'].map(t => (
                <button key={t} className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold border transition-colors ${team === t ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setTeam(t as any)}>{t}</button>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium text-[#f0f0f0]">你打什麼位置？</span>
            <div className="flex flex-wrap gap-2">
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${role === 'T' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setRole('T')}>坦克</button>
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${role === 'H' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setRole('H')}>治療</button>
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${role === 'M' ? 'bg-red-500/20 border-red-500/50 text-red-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setRole('M')}>近戰</button>
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${role === 'R' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setRole('R')}>遠程</button>
            </div>
          </div>

          {/* Group */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium text-[#f0f0f0]">你在MT組還是ST組？</span>
            <div className="flex flex-wrap gap-2">
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${group === 'MT' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setGroup('MT')}>MT組</button>
              <button className={`px-4 py-1.5 rounded-full text-[12px] border transition-colors ${group === 'ST' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-semibold' : 'bg-bg/40 border-border text-muted hover:text-[#d0d0d0]'}`} onClick={() => setGroup('ST')}>ST組</button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4 bg-panel/30 border border-border/50 rounded-lg p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
          <span className="bg-[#111] border border-border/60 text-accent px-3 py-1.5 rounded text-[13px] font-mono tracking-wide shadow-sm shadow-black/50">
            當前職責定位：{team}隊 {exactRole}
          </span>
          <span className="text-muted text-[12px]">以下為您在 P3 階段的專屬跑位重點</span>
        </div>

        {/* Phase blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ActionCard 
            title="基礎站位"
            content={`根據你的隊伍，前往對應區域的指定位置待命。確認自己是負責${group === 'MT' ? '左側半邊 (西/北方向)' : '右側半邊 (東/南方向)'}，隨時準備應對機制。`}
            imageUrl="base_position"
          />
          <ActionCard 
            title="種子彈預站位 & 放置"
            content={`放置優先級：補師 > 輸出 > 坦克。${role === 'H' ? '你是補師，最優先放置於安全角！' : role === 'T' ? '你是坦克，最後放置或進行補位。' : '你是輸出，第二順位放置。'} 請確保不要與隊友重疊。`}
            imageUrl="seed_drop"
          />
          <ActionCard 
            title="凝縮式波動炮 (分攤)"
            content={role === 'T' ? "身為坦克，必須第一時間站到隊伍最前方開啟減傷擋下高傷死刑射線！" : "緊跟隊伍集中分攤，確實躲在坦克後方確保不吃到首發高傷。"}
            imageUrl="stack_laser"
          />
          <ActionCard 
            title="分散式波動炮"
            content="在你的專屬象限內找尋安全區散開，嚴禁與隊友重疊。遠程職業注意不要退到太外圍導致吃不到補血。"
            imageUrl="spread_laser"
          />
          <ActionCard 
            title="換線 (拉斷荊棘)"
            content={group === 'MT' ? "你是 MT 組，一旦荊棘連線出現，請立刻向外場或指定邊緣方向拉斷連線。" : "你是 ST 組，根據連線對象與場地配置，判斷是否需要跑動拉斷，或者原地不動。"}
            imageUrl="line_swap"
          />
          <ActionCard 
            title="轉場：潛地炮預站位"
            content="轉移到新平台後，迅速前往角落突起處站好。如果被點名腳下黃圈，立刻順著外圍場邊跑動繞圈；若未被點名則留在原地。"
            imageUrl="underground_cannon"
          />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, content, imageUrl }: { title: string, content: string, imageUrl: string }) => {
  return (
    <div className="bg-panel border border-border rounded-lg overflow-hidden flex flex-col shadow-sm shadow-black/20">
      <div className="p-3 border-b border-border/40 bg-[#111] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <h4 className="font-semibold text-accent/90 text-[14px] tracking-wide">{title}</h4>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-4">
        <p className="text-[13px] text-[#e0e0e0] leading-[1.6]">{content}</p>
        <div className="mt-auto h-[120px] bg-[#080808] border border-border/40 rounded flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_25%,transparent_25%,transparent_50%,rgba(139,92,246,0.05)_50%,rgba(139,92,246,0.05)_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
          <MapPin className="text-border/60 group-hover:text-purple-400/50 transition-colors mb-2 z-10" size={24} />
          <span className="text-[10px] text-muted/50 uppercase tracking-[2px] font-mono z-10">SIMULATED AREA</span>
        </div>
      </div>
    </div>
  );
};