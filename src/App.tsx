import { useState } from 'react';
import { AREAS, WORLD_DESCRIPTIONS } from './data/areas';
import { APPENDIX_DATA } from './data/appendix';
import { LITH_HARBOR_NPCS, LITH_HARBOR_MONSTERS } from './data/lithHarborDetails';
import type { WorldType, Area } from './data/areas';
import type { AppendixCategory } from './data/appendix';

type TabType = WorldType | 'appendix';
type DetailSubTab = 'area' | 'npc' | 'monster';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<TabType>('maple-world');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const [detailSubTab, setDetailSubTab] = useState<DetailSubTab>('area');
  const [selectedNpcId, setSelectedNpcId] = useState<string | null>(null);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(null);

  // ホバー用ポップアップ状態
  const [hoveredTarget, setHoveredTarget] = useState<{
    type: 'npc' | 'monster';
    id: string;
    name: string;
    image?: string;
  } | null>(null);

  const [appendixCat, setAppendixCat] = useState<AppendixCategory | null>(null);
  const [appendixItem, setAppendixItem] = useState<{ num: number; title: string; description: string } | null>(null);

  const currentAreas = AREAS.filter((area) => area.world === selectedTab);

  const getBookColorClass = (color: Area['bookColor']) => {
    switch (color) {
      case 'red': return 'from-red-600 to-red-800 border-red-500 text-white';
      case 'blue': return 'from-sky-700 to-blue-900 border-sky-600 text-white';
      case 'green': return 'from-emerald-600 to-emerald-800 border-emerald-500 text-white';
      case 'purple': return 'from-purple-700 to-slate-800 border-purple-600 text-white';
      case 'brown': default: return 'from-amber-700 to-amber-900 border-amber-600 text-white';
    }
  };

// -----------------------------------------------------------------
// 🔗 スマートテキスト描画コンポーネント ([[npc:id|表示名]])
// -----------------------------------------------------------------
const renderSmartText = (text: string) => {
  const regex = /\[\[(npc|monster):([a-zA-Z0-9_-]+)\|([^\]]+)\]\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // タグ前の通常の文章を配列に追加
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const type = match[1] as 'npc' | 'monster';
    const targetId = match[2];
    const label = match[3];

    // 💡【100点への追加機能】自己参照スキップ！
    // 現在表示中のNPCまたはモンスター自身のIDと一致する場合はリンクにせず太字テキストで返す
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
      continue; // ボタン描画を行わずに次のループへ
    }

    // 該当ターゲットのデータを検索
    const targetData =
      type === 'npc'
        ? LITH_HARBOR_NPCS.find((n) => n.id === targetId)
        : LITH_HARBOR_MONSTERS.find((m) => m.id === targetId);

    // リンク用ボタン ＆ ツールチップの描画
    parts.push(
      <span key={`${type}-${targetId}-${match.index}`} className="relative inline-block group">
        <button
          onClick={() => {
            if (type === 'npc') {
              setDetailSubTab('npc');
              setSelectedNpcId(targetId);
            } else {
              setDetailSubTab('monster');
              setSelectedMonsterId(targetId);
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

        {/* ホバーポップアップ（ミニカード） */}
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

  // 残りの文章を追加
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-wide drop-shadow-sm">
            メイプルヒストリア
          </h1>
          <span className="text-xs bg-orange-600/60 px-2.5 py-1 rounded-full border border-orange-300/40">
            WORLD ARCHIVE
          </span>
        </div>
      </header>

      {/* 🚧 制作中案内バナー 🚧 */}
      <div className="bg-amber-100/80 border-b border-amber-200 text-amber-900 text-xs py-2 px-4 text-center">
        <span className="font-bold">🚧 お知らせ：</span> 当サイトは現在制作中のファンサイトです。データや機能は順次アップデート予定です。
      </div>

      {/* メインコンテンツエリア */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* ワールド＆付録 切替タブ */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {(['maple-world', 'arcane-river', 'grandis'] as WorldType[]).map((world) => (
            <button
              key={world}
              onClick={() => {
                setSelectedTab(world);
                setSelectedArea(null);
                setAppendixCat(null);
                setAppendixItem(null);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border ${
                selectedTab === world
                  ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {WORLD_DESCRIPTIONS[world].name}
            </button>
          ))}

          <button
            onClick={() => {
              setSelectedTab('appendix');
              setSelectedArea(null);
              setAppendixCat(null);
              setAppendixItem(null);
            }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border ${
              selectedTab === 'appendix'
                ? 'bg-stone-700 text-amber-100 border-stone-800 shadow-md scale-105'
                : 'bg-amber-100/80 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
          >
            📜 別冊付録
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 別冊付録の画面表示 */}
        {/* ------------------------------------------------------------- */}
        {selectedTab === 'appendix' ? (
          <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 md:p-10 shadow-xl border-2 border-amber-300 max-w-3xl mx-auto min-h-[420px] font-serif relative">
            {!appendixCat ? (
              <div>
                <div className="text-center border-b border-amber-300 pb-4 mb-6">
                  <h2 className="text-2xl font-black text-amber-950">別冊付録</h2>
                  <p className="text-xs text-amber-800 mt-1">メイプルワールドの歴史・種族・各種用語の記録</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  {APPENDIX_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setAppendixCat(cat);
                        setAppendixItem(null);
                      }}
                      className="w-full bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 rounded-xl p-4 text-left font-bold text-amber-950 shadow-sm transition flex justify-between items-center group"
                    >
                      <span className="text-lg">{cat.title}</span>
                      <span className="text-xs text-amber-700 group-hover:translate-x-1 transition">開く ➔</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center border-b border-amber-300 pb-3 mb-6">
                  <button
                    onClick={() => {
                      setAppendixCat(null);
                      setAppendixItem(null);
                    }}
                    className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition"
                  >
                    ← 目次に戻る
                  </button>
                  <h3 className="text-lg font-bold text-amber-950">{appendixCat.title}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {appendixCat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setAppendixItem(item)}
                        className={`w-full p-3 rounded-lg text-left text-sm font-bold transition border ${
                          appendixItem?.title === item.title
                            ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                            : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
                        }`}
                      >
                        {item.num}. {item.title}
                      </button>
                    ))}
                  </div>

                  <div className="bg-amber-100/50 border border-amber-300 rounded-xl p-5 min-h-[200px]">
                    {appendixItem ? (
                      <div>
                        <h4 className="text-lg font-black text-amber-950 mb-3 border-b border-amber-300 pb-1">
                          {appendixItem.num}. {appendixItem.title}
                        </h4>
                        <p className="text-sm text-amber-900/90 leading-relaxed whitespace-pre-line">
                          {appendixItem.description}
                        </p>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-amber-700/60 text-center">
                        左側の項目を選択すると<br />解説文が表示されます
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* 通常の地域アーカイブ画面 */
          /* ------------------------------------------------------------- */
          selectedArea ? (
            <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 md:p-10 shadow-xl border border-amber-200 max-w-4xl mx-auto relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setSelectedArea(null);
                  setDetailSubTab('area');
                  setSelectedNpcId(null);
                  setSelectedMonsterId(null);
                }}
                className="absolute top-4 right-4 bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition"
              >
                ✕ 一覧に戻る
              </button>

              {/* サブタブ */}
              <div className="flex gap-2 mb-6 border-b border-amber-200 pb-3">
                <button
                  onClick={() => setDetailSubTab('area')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
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
                    if (selectedArea.id === 'lith-harbor' && !selectedNpcId) {
                      setSelectedNpcId(LITH_HARBOR_NPCS[0].id);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    detailSubTab === 'npc'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-amber-200/50 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  人物 {selectedArea.id === 'lith-harbor' ? `(${LITH_HARBOR_NPCS.length})` : '(準備中)'}
                </button>
                <button
                  onClick={() => {
                    setDetailSubTab('monster');
                    if (selectedArea.id === 'lith-harbor' && !selectedMonsterId) {
                      setSelectedMonsterId(LITH_HARBOR_MONSTERS[0].id);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    detailSubTab === 'monster'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-amber-200/50 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  モンスター {selectedArea.id === 'lith-harbor' ? `(${LITH_HARBOR_MONSTERS.length})` : '(準備中)'}
                </button>
              </div>

              {/* === タブ1: 地域説明 === */}
              {detailSubTab === 'area' && (
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px] text-center shadow-inner">
                    <div className="text-5xl mb-2">🍁</div>
                    <h3 className="text-xl font-bold text-amber-950">{selectedArea.name}</h3>
                    <span className="text-xs text-amber-800 mt-2 bg-amber-200/60 px-3 py-1 rounded-full">
                      収集数: {selectedArea.monsterCount}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-amber-950 mb-4 border-b border-amber-300 pb-2">
                      {selectedArea.name}
                    </h2>
                    <p className="text-amber-900/90 leading-relaxed text-sm whitespace-pre-line font-serif">
                      {selectedArea.description}
                    </p>
                  </div>
                </div>
              )}

              {/* === タブ2: 人物 (NPC) === */}
              {detailSubTab === 'npc' && (
                selectedArea.id === 'lith-harbor' ? (
                  <div className="grid md:grid-cols-3 gap-6 font-serif">
                    {/* 左側：NPCリスト (アイコン画像付き) */}
<div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
  {LITH_HARBOR_NPCS.map((npc) => (
    <button
      key={npc.id}
      onClick={() => setSelectedNpcId(npc.id)}
      className={`w-full p-2 rounded-lg text-left text-xs font-bold transition border flex items-center gap-2.5 ${
        selectedNpcId === npc.id
          ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
          : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
      }`}
    >
      {/* 32x32px のミニドット絵アイコン */}
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
                              {renderSmartText(npc.description)}
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

              {/* === タブ3: モンスター === */}
              {detailSubTab === 'monster' && (
                selectedArea.id === 'lith-harbor' ? (
                  <div className="grid md:grid-cols-3 gap-6 font-serif">
                    {/* 左側：モンスターリスト (アイコン画像付き) */}
<div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
  {LITH_HARBOR_MONSTERS.map((mon) => (
    <button
      key={mon.id}
      onClick={() => setSelectedMonsterId(mon.id)}
      className={`w-full p-2 rounded-lg text-left text-xs font-bold transition border flex items-center gap-2.5 ${
        selectedMonsterId === mon.id
          ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
          : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
      }`}
    >
      {/* 32x32px のミニドット絵アイコン */}
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
                              {renderSmartText(mon.description)}
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
          ) : (
            <div>
              <div className="bg-white border border-slate-200/80 p-4 rounded-xl mb-6 text-xs text-slate-600 leading-relaxed max-w-3xl mx-auto text-center font-serif shadow-sm">
                {WORLD_DESCRIPTIONS[selectedTab as WorldType].desc}
              </div>

              {currentAreas.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {currentAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setSelectedArea(area)}
                      className={`bg-gradient-to-b ${getBookColorClass(
                        area.bookColor
                      )} border-2 rounded-xl p-3 flex flex-col items-center text-center shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200 group relative overflow-hidden`}
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
          )
        )}
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500 space-y-2 mt-auto">
        <p className="font-semibold text-slate-600">
          メイプルヒストリア - MapleStory Fan Site
        </p>
        <p className="text-[11px] leading-relaxed max-w-2xl mx-auto text-slate-400">
          当サイトは『メイプルストーリー』の個人ファンサイトであり、株式会社ネクソン様および関連会社様とは一切関係ありません。<br />
          非営利・無広告で運営されています。使用しているゲーム画像・テキスト等の著作権および商標権は、NEXON Korea Corporation 及び NEXON Co., Ltd. に帰属します。<br />
          権利者様からの削除・修正要請があった場合は、速やかに対応いたします。
        </p>
        <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 max-w-xs mx-auto">
          &copy; NEXON Korea Corp. & NEXON Co., Ltd. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}