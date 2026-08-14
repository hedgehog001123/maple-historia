import { useState } from 'react';
import { AREAS } from '../data/areas';

interface SmartTextProps {
  text: string;
  detailSubTab?: 'area' | 'npc' | 'monster';
  selectedNpcId?: string | null;
  selectedMonsterId?: string | null;
  onSelectNpc?: (name: string) => void;
  onSelectMonster?: (name: string) => void;
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
    name: string;
    areaName: string;
    image?: string;
  } | null>(null);

  // [[npc:名前|表示ラベル]] または [[monster:名前|表示ラベル]]、あるいは [[npc:名前]] にマッチ
  // ※ 日本語名や英語名にも対応できるように正規表現を最適化
  const regex = /\[\[(npc|monster):([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const type = match[1] as 'npc' | 'monster';
    const targetName = match[2];
    const label = match[3] || targetName; // ラベルが未指定なら名前をそのまま使う

    // 自己参照チェック（自分自身を開いている時はリンクにしない）
    const isSelf =
      (type === 'npc' && detailSubTab === 'npc' && targetName === selectedNpcId) ||
      (type === 'monster' && detailSubTab === 'monster' && targetName === selectedMonsterId);

    if (isSelf) {
      parts.push(
        <strong key={`self-${targetName}-${match.index}`} className="font-bold text-amber-950">
          {label}
        </strong>
      );
      lastIndex = regex.lastIndex;
      continue;
    }

    // 💡 全地域のデータ (AREAS) から対象の NPC / モンスター を検索
    let targetData: { name: string; image?: string; areaName: string } | null = null;

    for (const area of AREAS) {
      if (type === 'npc' && area.npcs) {
        const found = area.npcs.find((n) => n.name === targetName);
        if (found) {
          targetData = { name: found.name, image: found.image, areaName: area.name };
          break;
        }
      } else if (type === 'monster' && area.monsters) {
        const found = area.monsters.find((m) => m.name === targetName);
        if (found) {
          targetData = { name: found.name, image: found.image, areaName: area.name };
          break;
        }
      }
    }

    parts.push(
      <span key={`${type}-${targetName}-${match.index}`} className="relative inline-block group">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 親カードのクリックイベント発火を防止
            if (type === 'npc' && onSelectNpc) {
              onSelectNpc(targetName);
            } else if (type === 'monster' && onSelectMonster) {
              onSelectMonster(targetName);
            }
          }}
          onMouseEnter={() => {
            if (targetData) {
              setHoveredTarget({
                type,
                name: targetData.name,
                areaName: targetData.areaName,
                image: targetData.image,
              });
            }
          }}
          onMouseLeave={() => setHoveredTarget(null)}
          className="text-orange-700 font-bold underline decoration-orange-400 decoration-2 underline-offset-2 hover:text-orange-900 hover:bg-orange-100/80 px-1 rounded transition cursor-pointer"
        >
          {label}
        </button>

        {/* ホバー時のポップアップ（ツールチップ） */}
        {hoveredTarget && hoveredTarget.name === targetData?.name && (
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
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs text-amber-200 truncate">{hoveredTarget.name}</p>
                <p className="text-[10px] text-amber-400/80 truncate">
                  {hoveredTarget.areaName} - {hoveredTarget.type === 'npc' ? '人物' : 'モンスター'}
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