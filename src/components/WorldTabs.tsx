import type { WorldType } from '../data/areas';
import { WORLD_DESCRIPTIONS } from '../data/areas';

type TabType = WorldType | 'appendix';

interface WorldTabsProps {
  selectedTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const WorldTabs = ({ selectedTab, onSelectTab }: WorldTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
      {(['maple-world', 'arcane-river', 'grandis'] as WorldType[]).map((world) => (
        <button
          key={world}
          onClick={() => onSelectTab(world)}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer ${
            selectedTab === world
              ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-105'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          {WORLD_DESCRIPTIONS[world].name}
        </button>
      ))}

      <button
        onClick={() => onSelectTab('appendix')}
        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer ${
          selectedTab === 'appendix'
            ? 'bg-stone-700 text-amber-100 border-stone-800 shadow-md scale-105'
            : 'bg-amber-100/80 text-amber-900 border-amber-300 hover:bg-amber-200'
        }`}
      >
        📜 別冊付録
      </button>
    </div>
  );
};