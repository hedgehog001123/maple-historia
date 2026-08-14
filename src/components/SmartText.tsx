import { useState } from 'react';
import { LITH_HARBOR_NPCS, LITH_HARBOR_MONSTERS } from '../data/lithHarborDetails';

interface SmartTextProps {
  text: string;
  detailSubTab: 'area' | 'npc' | 'monster';
  selectedNpcId: string | null;
  selectedMonsterId: string | null;
  onSelectNpc: (id: string) => void;
  onSelectMonster: (id: string) => void;
}

export const SmartText = ({
  text,
  detailSubTab,
  selectedNpcId,
  selectedMonsterId,
  onSelectNpc,
  onSelectMonster,
}: SmartTextProps) => {
  const [hoveredTarget, setHoveredTarget] = useState<{
    type: 'npc' | 'monster';
    id: string;
    name: string;
    image?: string;
  } | null>(null);

  const regex = /\[\[(npc|monster):([a-zA-Z0-9_-]+)\|([^\]]+)\]\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const type = match[1] as 'npc' | 'monster';
    const targetId = match[2];
    const label = match[3];

    // 自己参照チェック（自分自身を開いている時はリンクにしない）
    const isSelf =
      (type === 'npc' && detailSubTab === 'npc' && targetId === selectedNpcId) ||
      (type === 'monster' && detailSubTab === 'monster' && targetId === selectedMonsterId);

    if (isSelf) {
      parts.push(
        <strong key={`self-${targetId}-${match.index}`} className="font-bold text-amber-950">
          {label}
        </strong>
      );
      lastIndex = regex.lastIndex;
      continue;
    }

    const targetData =
      type === 'npc'
        ? LITH_HARBOR_NPCS.find((n) => n.id === targetId)
        : LITH_HARBOR_MONSTERS.find((m) => m.id === targetId);

    parts.push(
      <span key={`${type}-${targetId}-${match.index}`} className="relative inline-block group">
        <button
          onClick={() => {
            if (type === 'npc') {
              onSelectNpc(targetId);
            } else {
              onSelectMonster(targetId);
            }
          }}
          onMouseEnter={() => {
            if (targetData) {
              setHoveredTarget({
                type,
                id: targetId,
                name: targetData.name,
                image: targetData.image,
              });
            }
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          className="text-orange-700 font-bold underline decoration-orange-400 decoration-2 underline-offset-2 hover:text-orange-900 hover:bg-orange-100/80 px-1 rounded transition cursor-pointer"
        >
          {label}
        </button>

        {hoveredTarget && hoveredTarget.id === targetId && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-stone-900 text-amber-100 p-3 rounded-xl shadow-2xl border border-amber-500/40 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5">
              {hoveredTarget.image ? (
                <img
                  src={hoveredTarget.image}
                  alt={hoveredTarget.name}
                  className="w-12 h-12 object-contain bg-black/40 rounded border border-amber-400/30 p-0.5"
                />
              ) : (
                <div className="w-10 h-10 bg-stone-800 rounded flex items-center justify-center text-lg">
                  {hoveredTarget.type === 'npc' ? '👤' : '👾'}
                </div>
              )}
              <div>
                <p className="font-bold text-xs text-amber-200">{hoveredTarget.name}</p>
                <p className="text-[10px] text-amber-400/80">
                  リス港口 - {hoveredTarget.type === 'npc' ? '人物' : 'モンスター'}
                </p>
              </div>
            </div>
            <div className="text-[9px] text-stone-400 mt-2 text-center border-t border-stone-800 pt-1">
              クリックで詳細へジャンプ ➔
            </div>
          </div>
        )}
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
};