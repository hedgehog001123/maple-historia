import { useState } from 'react';
import { APPENDIX_DATA } from '../data/appendix';
import type { AppendixCategory } from '../data/appendix';

export const AppendixView = () => {
  const [appendixCat, setAppendixCat] = useState<AppendixCategory | null>(null);
  const [appendixItem, setAppendixItem] = useState<{ num: number; title: string; description: string } | null>(null);

  return (
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
                className="w-full bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 rounded-xl p-4 text-left font-bold text-amber-950 shadow-sm transition flex justify-between items-center group cursor-pointer"
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
              className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
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
                  className={`w-full p-3 rounded-lg text-left text-sm font-bold transition border cursor-pointer ${
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
  );
};