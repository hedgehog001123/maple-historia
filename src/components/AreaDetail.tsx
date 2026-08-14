import { useState, useEffect } from 'react';
import type { Area } from '../data/areas';
import { SmartText } from './SmartText';

type DetailSubTab = 'area' | 'npc' | 'monster';

interface AreaDetailProps {
  area: Area;
  selectedEntityId?: string | null;
  onBack: () => void;
}

export const AreaDetail = ({ area, selectedEntityId, onBack }: AreaDetailProps) => {
  const [detailSubTab, setDetailSubTab] = useState<DetailSubTab>('area');
  const [selectedNpcName, setSelectedNpcName] = useState<string | null>(
    area.npcs && area.npcs.length > 0 ? area.npcs[0].name : null
  );
  const [selectedMonsterName, setSelectedMonsterName] = useState<string | null>(
    area.monsters && area.monsters.length > 0 ? area.monsters[0].name : null
  );

  // 💡 URLハッシュ（#/リス港口/クン など）に応じてサブタブ＆選択状態を自動切り替え
  useEffect(() => {
    if (selectedEntityId) {
      const isNpc = area.npcs?.some((n) => n.name === selectedEntityId);
      const isMonster = area.monsters?.some((m) => m.name === selectedEntityId);

      if (isNpc) {
        setDetailSubTab('npc');
        setSelectedNpcName(selectedEntityId);
      } else if (isMonster) {
        setDetailSubTab('monster');
        setSelectedMonsterName(selectedEntityId);
      }
    } else {
      setDetailSubTab('area');
    }
  }, [selectedEntityId, area]);

  // エンティティ選択時のハッシュ更新
  const handleSelectNpc = (name: string) => {
    setSelectedNpcName(name);
    window.location.hash = `#/${area.id}/${encodeURIComponent(name)}`;
  };

  const handleSelectMonster = (name: string) => {
    setSelectedMonsterName(name);
    window.location.hash = `#/${area.id}/${encodeURIComponent(name)}`;
  };

  const selectedNpc = area.npcs?.find((n) => n.name === selectedNpcName);
  const selectedMonster = area.monsters?.find((m) => m.name === selectedMonsterName);

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto font-serif">
      {/* 1. サブタブ & 一覧に戻るボタン (2枚目画像の上部バー) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/80 pb-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => {
              setDetailSubTab('area');
              window.location.hash = `#/${area.id}`;
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              detailSubTab === 'area'
                ? 'bg-amber-800 text-amber-50 shadow'
                : 'bg-amber-200/60 text-amber-900 hover:bg-amber-200'
            }`}
          >
            地域
          </button>

          <button
            onClick={() => {
              setDetailSubTab('npc');
              if (selectedNpcName) handleSelectNpc(selectedNpcName);
            }}
            disabled={!area.npcs || area.npcs.length === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              detailSubTab === 'npc'
                ? 'bg-amber-800 text-amber-50 shadow'
                : 'bg-amber-200/60 text-amber-900 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            人物 ({area.npcs?.length || 0})
          </button>

          <button
            onClick={() => {
              setDetailSubTab('monster');
              if (selectedMonsterName) handleSelectMonster(selectedMonsterName);
            }}
            disabled={!area.monsters || area.monsters.length === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              detailSubTab === 'monster'
                ? 'bg-amber-800 text-amber-50 shadow'
                : 'bg-amber-200/60 text-amber-900 hover:bg-amber-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            モンスター ({area.monsters?.length || 0})
          </button>
        </div>

        {/* 2枚目の「✕ 一覧に戻る」ボタン */}
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-amber-200/80 text-amber-950 font-bold text-xs hover:bg-amber-300 transition cursor-pointer flex items-center gap-1 shadow-sm"
        >
          ✕ 一覧に戻る
        </button>
      </div>

      {/* --- メインコンテンツ領域 --- */}

      {/* 1. 地域概要タブ */}
      {detailSubTab === 'area' && (
        <div className="bg-amber-100/50 border border-amber-300/80 rounded-2xl p-6 min-h-[380px] shadow-inner space-y-4">
          <div className="flex items-center gap-3 border-b border-amber-300/60 pb-3">
            <span className="text-3xl">
              {area.bookColor === 'blue'
                ? '📘'
                : area.bookColor === 'red'
                ? '📕'
                : area.bookColor === 'green'
                ? '📗'
                : area.bookColor === 'purple'
                ? '📙'
                : '📔'}
            </span>
            <h1 className="text-2xl font-black text-amber-950">{area.name}</h1>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
            {area.description}
          </p>
        </div>
      )}

      {/* 2. 人物 (NPC) タブ */}
      {detailSubTab === 'npc' && area.npcs && (
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* 左: NPC縦並びリスト (2枚目通りの本棚ボタン風) */}
          <div className="space-y-1.5 bg-amber-100/40 p-2.5 rounded-xl border border-amber-200/80 max-h-[520px] overflow-y-auto">
            {area.npcs.map((npc) => {
              const isSelected = selectedNpcName === npc.name;
              return (
                <button
                  key={npc.name}
                  onClick={() => handleSelectNpc(npc.name)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-800 text-amber-50 shadow-md'
                      : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/70'
                  }`}
                >
                  {npc.image ? (
                    <div className="w-8 h-8 rounded-lg bg-amber-50/80 border border-amber-200/60 flex items-center justify-center p-0.5 shrink-0">
                      <img src={npc.image} alt={npc.name} className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <span className="text-sm">👤</span>
                  )}
                  <span className="truncate">{npc.name}</span>
                </button>
              );
            })}
          </div>

          {/* 右: 選択されたNPCの詳細カード (2枚目通りの立ち絵＆カードデザイン) */}
          {selectedNpc && (
            <div className="md:col-span-2 bg-amber-100/50 border border-amber-300/80 rounded-2xl p-6 min-h-[420px] shadow-inner space-y-5">
              {/* 立ち絵と名前 */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex items-center gap-5">
                {selectedNpc.image && (
                  <div className="w-20 h-20 bg-amber-100/40 border border-amber-300/60 rounded-xl flex items-center justify-center p-1 shrink-0">
                    <img src={selectedNpc.image} alt={selectedNpc.name} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-black text-amber-950">{selectedNpc.name}</h2>
                  <span className="inline-block mt-1 text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    {area.name} - 人物
                  </span>
                </div>
              </div>

              {/* 説明文 (SmartText連動) */}
              {selectedNpc.description && (
                <div className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
                  <SmartText
                    text={selectedNpc.description}
                    detailSubTab="npc"
                    selectedNpcId={selectedNpcName}
                    selectedMonsterId={null}
                    onSelectNpc={(name) => handleSelectNpc(name)}
                    onSelectMonster={(name) => handleSelectMonster(name)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. モンスター タブ */}
      {detailSubTab === 'monster' && area.monsters && (
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* 左: モンスター縦並びリスト */}
          <div className="space-y-1.5 bg-amber-100/40 p-2.5 rounded-xl border border-amber-200/80 max-h-[520px] overflow-y-auto">
            {area.monsters.map((monster) => {
              const isSelected = selectedMonsterName === monster.name;
              return (
                <button
                  key={monster.name}
                  onClick={() => handleSelectMonster(monster.name)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-800 text-amber-50 shadow-md'
                      : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/70'
                  }`}
                >
                  {monster.image ? (
                    <div className="w-8 h-8 rounded-lg bg-amber-50/80 border border-amber-200/60 flex items-center justify-center p-0.5 shrink-0">
                      <img src={monster.image} alt={monster.name} className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <span className="text-sm">👾</span>
                  )}
                  <span className="truncate">{monster.name}</span>
                </button>
              );
            })}
          </div>

          {/* 右: 選択されたモンスターの詳細カード */}
          {selectedMonster && (
            <div className="md:col-span-2 bg-amber-100/50 border border-amber-300/80 rounded-2xl p-6 min-h-[420px] shadow-inner space-y-5">
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex items-center gap-5">
                {selectedMonster.image && (
                  <div className="w-20 h-20 bg-amber-100/40 border border-amber-300/60 rounded-xl flex items-center justify-center p-1 shrink-0">
                    <img src={selectedMonster.image} alt={selectedMonster.name} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-black text-amber-950">{selectedMonster.name}</h2>
                  <span className="inline-block mt-1 text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    {area.name} - モンスター
                  </span>
                </div>
              </div>

              {selectedMonster.description && (
                <div className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
                  <SmartText
                    text={selectedMonster.description}
                    detailSubTab="monster"
                    selectedNpcId={null}
                    selectedMonsterId={selectedMonsterName}
                    onSelectNpc={(name) => handleSelectNpc(name)}
                    onSelectMonster={(name) => handleSelectMonster(name)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};