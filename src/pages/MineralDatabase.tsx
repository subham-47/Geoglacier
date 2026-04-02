import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search, Database, Activity, Gem, Layers } from 'lucide-react';

// --- MOCK MINERAL DATA ---
const MINERAL_DATA = [
  { id: '1', name: 'Quartz', formula: 'SiO₂', group: 'Silicates', system: 'Hexagonal', hardness: '7', streak: 'White', color: 'Colorless, variable', desc: 'The second most abundant mineral in Earth\'s continental crust.' },
  { id: '2', name: 'Pyrite', formula: 'FeS₂', group: 'Sulfides', system: 'Isometric', hardness: '6 - 6.5', streak: 'Greenish black', color: 'Pale brass yellow', desc: 'Known as "Fool\'s Gold" due to its metallic luster and pale brass-yellow hue.' },
  { id: '3', name: 'Hematite', formula: 'Fe₂O₃', group: 'Oxides', system: 'Trigonal', hardness: '5.5 - 6.5', streak: 'Red to reddish brown', color: 'Steel grey to blood red', desc: 'One of the most important ores of iron, widely found in sedimentary rocks.' },
  { id: '4', name: 'Calcite', formula: 'CaCO₃', group: 'Carbonates', system: 'Trigonal', hardness: '3', streak: 'White', color: 'Colorless or white', desc: 'A major component of limestone and marble, known for high birefringence.' },
  { id: '5', name: 'Orthoclase', formula: 'KAlSi₃O₈', group: 'Silicates', system: 'Monoclinic', hardness: '6', streak: 'White', color: 'White, pink, pale yellow', desc: 'A typical tectosilicate mineral that forms igneous rock.' },
  { id: '6', name: 'Gold', formula: 'Au', group: 'Native Elements', system: 'Isometric', hardness: '2.5 - 3', streak: 'Yellow', color: 'Golden yellow', desc: 'A highly sought-after precious metal, extremely malleable and ductile.' },
  { id: '7', name: 'Olivine', formula: '(Mg,Fe)₂SiO₄', group: 'Silicates', system: 'Orthorhombic', hardness: '6.5 - 7', streak: 'Colorless', color: 'Olive green', desc: 'A primary component of the Earth\'s upper mantle.' },
  { id: '8', name: 'Fluorite', formula: 'CaF₂', group: 'Halides', system: 'Isometric', hardness: '4', streak: 'White', color: 'Purple, green, yellow', desc: 'Often highly fluorescent under ultraviolet light.' }
];

const CATEGORIES = ['All', 'Silicates', 'Oxides', 'Sulfides', 'Carbonates', 'Halides', 'Native Elements'];

export default function MineralDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  // Filter logic: matches search text AND selected category
  const filteredMinerals = useMemo(() => {
    return MINERAL_DATA.filter(mineral => {
      const matchesSearch = mineral.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            mineral.formula.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === 'All' || mineral.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [searchQuery, selectedGroup]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-body selection:bg-blue-500/30">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-8 py-6 flex items-center border-b border-white/5 bg-[#020617]/50 backdrop-blur-md">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Main
        </Link>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Header section */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <Database className="w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Reference Library</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">Mineral <span className="text-blue-400">Database</span></h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Search and filter through our comprehensive catalog of minerals. Explore their chemical formulas, crystal systems, and physical properties.
          </p>
        </header>

        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by mineral name or formula (e.g., Quartz, SiO₂)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedGroup(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
                  selectedGroup === category 
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredMinerals.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-slate-300 mb-2">No minerals found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMinerals.map(mineral => (
              <div key={mineral.id} className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all hover:-translate-y-1">
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{mineral.name}</h3>
                    <div className="font-mono text-sm text-blue-300 mt-1">{mineral.formula}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {mineral.group}
                  </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 h-16 line-clamp-3">
                  {mineral.desc}
                </p>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-t border-white/10 pt-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Activity className="w-3.5 h-3.5" /> Hardness
                    </div>
                    <div className="font-medium text-slate-200">{mineral.hardness}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Gem className="w-3.5 h-3.5" /> System
                    </div>
                    <div className="font-medium text-slate-200">{mineral.system}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                      <Layers className="w-3.5 h-3.5" /> Streak
                    </div>
                    <div className="font-medium text-slate-200 truncate" title={mineral.streak}>{mineral.streak}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
