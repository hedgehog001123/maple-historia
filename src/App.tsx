import { useState } from 'react';
import { AREAS, WORLD_DESCRIPTIONS } from './data/areas';
import { APPENDIX_DATA } from './data/appendix';
import type { WorldType, Area } from './data/areas';
import type { AppendixCategory } from './data/appendix';

type TabType = WorldType | 'appendix';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<TabType>('maple-world');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  // 別冊付録の選択状態
  const [selectedAppendixCategory, setSelectedAppendixCategory] = useState<AppendixCategory | null>(null);
  const [selectedAppendixItem, setSelectedAppendixItem] = useState<{ num: number; title: string; description: string } | null>(null);

  const currentAreas = AREAS.filter((area) => area.world === selectedTab);

  const getBookColorClass = (color: Area['bookColor']) => {
    switch (color) {
      case 'red':
        return 'from-red-600 to-red-800 border-red-500 text-white';
      case 'blue':
        return 'from-sky-700 to-blue-900 border-sky-600 text-white';
      case 'green':
        return 'from-emerald-600 to-emerald-800 border-emerald-500 text-white';
      case 'purple':
        return 'from-purple-700 to-slate-800 border-purple-600 text-white';
      case 'brown':
      default:
        return 'from-amber-700 to-amber-900 border-amber-600 text-white';
    }
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
                setSelectedAppendixCategory(null);
                setSelectedAppendixItem(null);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border ${
                selectedTab === world
                  ? 'bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {WORLD_DESCRIPTIONS[world].name}
            </button>
          ))}

          {/* 別冊付録ボタン */}
          <button
            onClick={() => {
              setSelectedTab('appendix');
              setSelectedArea(null);
              setSelectedAppendixCategory(null);
              setSelectedAppendixItem(null);
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
            {!selectedAppendixCategory ? (
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
                        setSelectedAppendixCategory(cat);
                        setSelectedAppendixItem(null);
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
                      setSelectedAppendixCategory(null);
                      setSelectedAppendixItem(null);
                    }}
                    className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition"
                  >
                    ← 目次に戻る
                  </button>
                  <h3 className="text-lg font-bold text-amber-950">{selectedAppendixCategory.title}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {selectedAppendixCategory.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedAppendixItem(item)}
                        className={`w-full p-3 rounded-lg text-left text-sm font-bold transition border ${
                          selectedAppendixItem?.title === item.title
                            ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm'
                            : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border-amber-300/80'
                        }`}
                      >
                        {item.num}. {item.title}
                      </button>
                    ))}
                  </div>

                  <div className="bg-amber-100/50 border border-amber-300 rounded-xl p-5 min-h-[200px]">
                    {selectedAppendixItem ? (
                      <div>
                        <h4 className="text-lg font-black text-amber-950 mb-3 border-b border-amber-300 pb-1">
                          {selectedAppendixItem.num}. {selectedAppendixItem.title}
                        </h4>
                        <p className="text-sm text-amber-900/90 leading-relaxed whitespace-pre-line">
                          {selectedAppendixItem.description}
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
            <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 md:p-10 shadow-xl border border-amber-200 max-w-3xl mx-auto relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition"
              >
                ✕ 一覧に戻る
              </button>

              <div className="flex gap-2 mb-6 border-b border-amber-200 pb-3">
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                  地域
                </span>
                <span className="bg-amber-200/50 text-amber-800/50 px-4 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed">
                  人物 (準備中)
                </span>
                <span className="bg-amber-200/50 text-amber-800/50 px-4 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed">
                  モンスター (準備中)
                </span>
              </div>

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

      {/* フッター（権利表記・非公式アナウンス） */}
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