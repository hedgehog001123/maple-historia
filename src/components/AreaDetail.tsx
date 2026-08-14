import { useState } from 'react';
import type { Area } from '../data/areas';
import { LITH_HARBOR_NPCS, LITH_HARBOR_MONSTERS } from '../data/lithHarborDetails';
import { SmartText } from './SmartText';

type DetailSubTab = 'area' | 'npc' | 'monster';

interface AreaDetailProps {
  area: Area;
  onBack: () => void;
}

export const AreaDetail = ({ area, onBack }: AreaDetailProps) => {
  const [detailSubTab, setDetailSubTab] = useState<DetailSubTab>('area');
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(
    area.id === 'lith-harbor' ? LITH_HARBOR_NPCS[0].id : null
  );
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    area.id === 'lith-harbor' ? LITH_HARBOR_MONSTERS[0].id : null
  );

  return (
    <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 md:p-10 shadow-xl border border-amber-200 max-w-4xl mx-auto relative animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={onBack}
        className="absolute top-4 right-4 bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
      >
        ✕ 一覧に戻る
      </button>

      {/* サブタブ */}
      <div className="flex gap-2 mb-6 border-b border-amber-200 pb-3">
        <button
          onClick={() => setDetailSubTab('area')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            detailSubTab === 'area'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-amber-200/50 text-amber-900 hover:bg-amber-200'
          }`}
        >
          地域
        </button>
        <button
          onClick={() => {
            setDetailSubTab('npc');
            if (area.id === 'lith-harbor' && !selectedNpcId) {
              setSelectedNpcId(LITH_HARBOR_NPCS[0].id);
            }
          }}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            detailSubTab === 'npc'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-amber-200/50 text-amber-900 hover:bg-amber-200'
          }`}
        >
          人物 {area.id === 'lith-harbor' ? `(${LITH_HARBOR_NPCS.length})` : '(準備中)'}
        </button>
        <button
          onClick={() => {
            setDetailSubTab('monster');
            if (area.id === 'lith-harbor' && !selectedMonsterId) {
              setSelectedMonsterId(LITH_HARBOR_MONSTERS[0].id);
            }
          }}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            detailSubTab === 'monster'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-amber-200/50 text-amber-900 hover:bg-amber-200'
          }`}
        >
          モンスター {area.id === 'lith-harbor' ? `(${LITH_HARBOR_MONSTERS.length})` : '(準備中)'}
        </button>
      </div>

      {/* サブタブ1: 地域 */}
      {detailSubTab === 'area' && (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px] text-center shadow-inner">
            <div className="text-5xl mb-2">🍁</div>
            <h3 className="text-xl font-bold text-amber-950">{area.name}</h3>
            <span className="text-xs text-amber-800 mt-2 bg-amber-200/60 px-3 py-1 rounded-full">
              収集数: {area.monsterCount}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-amber-950 mb-4 border-b border-amber-300 pb-2">
              {area.name}
            </h2>
            <p className="text-amber-900/90 leading-relaxed text-sm whitespace-pre-line font-serif">
              {area.description}
            </p>
          </div>
        </div>
      )}

      {/* サブタブ2: 人物 */}
      {detailSubTab === 'npc' && (
        area.id === 'lith-harbor' ? (
          <div className="grid md:grid-cols-3 gap-6 font-serif">
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              {LITH_HARBOR_NPCS.map((npc) => (
                <button
                  key={npc.id}
                  onClick={() => setSelectedNpcId(npc.id)}
                  className={`w-full p-2 rounded-lg text-left text-xs font-bold transition border flex items-center gap-2.5 cursor-pointer ${
                    selectedNpcId === npc.id
                      ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                      : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
                  }`}
                >
                  {npc.image ? (
                    <img
                      src={npc.image}
                      alt={npc.name}
                      loading="lazy"
                      className="w-8 h-8 object-contain rounded bg-amber-200/40 p-0.5 border border-amber-300/60 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-amber-200/50 rounded flex items-center justify-center text-sm flex-shrink-0">
                      👤
                    </div>
                  )}
                  <span className="truncate">{npc.name}</span>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 bg-amber-100/50 border border-amber-300 rounded-xl p-5 min-h-[340px]">
              {(() => {
                const npc = LITH_HARBOR_NPCS.find((n) => n.id === selectedNpcId) || LITH_HARBOR_NPCS[0];
                return (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                      {npc.image ? (
                        <img
                          src={npc.image}
                          alt={npc.name}
                          className="w-28 h-28 object-contain rounded bg-amber-100/40 p-1 border border-amber-300/60 shadow-sm"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-amber-200/50 rounded flex items-center justify-center text-2xl">
                          👤
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-black text-amber-950 mb-1">{npc.name}</h3>
                        <span className="text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-sans">
                          リス港口 - 人物
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line border-t border-amber-200/80 pt-3">
                      <SmartText
                        text={npc.description}
                        detailSubTab={detailSubTab}
                        selectedNpcId={selectedNpcId}
                        selectedMonsterId={selectedMonsterId}
                        onSelectNpc={(id) => {
                          setDetailSubTab('npc');
                          setSelectedNpcId(id);
                        }}
                        onSelectMonster={(id) => {
                          setDetailSubTab('monster');
                          setSelectedMonsterId(id);
                        }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-amber-800/60 text-sm font-serif">
            この地域の人物情報は現在調査中です。
          </div>
        )
      )}

      {/* サブタブ3: モンスター */}
      {detailSubTab === 'monster' && (
        area.id === 'lith-harbor' ? (
          <div className="grid md:grid-cols-3 gap-6 font-serif">
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              {LITH_HARBOR_MONSTERS.map((mon) => (
                <button
                  key={mon.id}
                  onClick={() => setSelectedMonsterId(mon.id)}
                  className={`w-full p-2 rounded-lg text-left text-xs font-bold transition border flex items-center gap-2.5 cursor-pointer ${
                    selectedMonsterId === mon.id
                      ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                      : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
                  }`}
                >
                  {mon.image ? (
                    <img
                      src={mon.image}
                      alt={mon.name}
                      loading="lazy"
                      className="w-8 h-8 object-contain rounded bg-amber-200/40 p-0.5 border border-amber-300/60 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-amber-200/50 rounded flex items-center justify-center text-sm flex-shrink-0">
                      👾
                    </div>
                  )}
                  <span className="truncate">{mon.name}</span>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 bg-amber-100/50 border border-amber-300 rounded-xl p-5 min-h-[340px]">
              {(() => {
                const mon = LITH_HARBOR_MONSTERS.find((m) => m.id === selectedMonsterId) || LITH_HARBOR_MONSTERS[0];
                return (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                      {mon.image ? (
                        <img
                          src={mon.image}
                          alt={mon.name}
                          className="w-28 h-28 object-contain rounded bg-amber-100/40 p-1 border border-amber-300/60 shadow-sm"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-amber-200/50 rounded flex items-center justify-center text-2xl">
                          👾
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-black text-amber-950 mb-1">{mon.name}</h3>
                        <span className="text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-sans">
                          リス港口 - モンスター
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line border-t border-amber-200/80 pt-3">
                      <SmartText
                        text={mon.description}
                        detailSubTab={detailSubTab}
                        selectedNpcId={selectedNpcId}
                        selectedMonsterId={selectedMonsterId}
                        onSelectNpc={(id) => {
                          setDetailSubTab('npc');
                          setSelectedNpcId(id);
                        }}
                        onSelectMonster={(id) => {
                          setDetailSubTab('monster');
                          setSelectedMonsterId(id);
                        }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-amber-800/60 text-sm font-serif">
            この地域のモンスター情報は現在調査中です。
          </div>
        )
      )}
    </div>
  );
};