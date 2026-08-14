import type { Area, WorldType } from '../data/areas';
import { WORLD_DESCRIPTIONS } from '../data/areas';

interface AreaGridProps {
  selectedTab: WorldType;
  areas: Area[];
  onSelectArea: (area: Area) => void;
}

export const AreaGrid = ({ selectedTab, areas, onSelectArea }: AreaGridProps) => {
  const getBookColorClass = (color: Area['bookColor']) => {
    switch (color) {
      case 'red': return 'from-red-600 to-red-800 border-red-500 text-white';
      case 'blue': return 'from-sky-700 to-blue-900 border-sky-600 text-white';
      case 'green': return 'from-emerald-600 to-emerald-800 border-emerald-500 text-white';
      case 'purple': return 'from-purple-700 to-slate-800 border-purple-600 text-white';
      case 'brown': default: return 'from-amber-700 to-amber-900 border-amber-600 text-white';
    }
  };

  return (
    <div>
      <div className="bg-white border border-slate-200/80 p-4 rounded-xl mb-6 text-xs text-slate-600 leading-relaxed max-w-3xl mx-auto text-center font-serif shadow-sm">
        {WORLD_DESCRIPTIONS[selectedTab].desc}
      </div>

      {areas.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => onSelectArea(area)}
              className={`bg-gradient-to-b ${getBookColorClass(
                area.bookColor
              )} border-2 rounded-xl p-3 flex flex-col items-center text-center shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200 group relative overflow-hidden cursor-pointer`}
            >
              <div className="w-12 h-16 bg-black/20 rounded border border-white/20 flex items-center justify-center my-2 shadow-inner group-hover:scale-105 transition">
                <span className="text-xl">🍁</span>
              </div>

              <span className="font-bold text-xs tracking-wide text-white group-hover:text-amber-200 transition line-clamp-1 mt-1">
                {area.name}
              </span>

              <span className="text-[10px] text-white/80 mt-1 bg-black/30 px-2 py-0.5 rounded-full">
                {area.monsterCount}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
          <p className="text-lg font-bold mb-1">準備中</p>
          <p className="text-xs">このワールドの地域情報はまだ登録されていません。</p>
        </div>
      )}
    </div>
  );
};