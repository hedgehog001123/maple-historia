import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* メイプルオレンジのヘッダー */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-wide drop-shadow-sm">
            メイプルヒストリア
          </h1>
          <span className="text-xs bg-orange-600/60 px-2.5 py-1 rounded-full border border-orange-300/40">
            Maple Historia
          </span>
        </div>
      </header>

      {/* メインコンテンツ（準備中メッセージ） */}
      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200/80 w-full">
          <div className="text-5xl mb-4">🍁</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            ただいまサイト制作中です！
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
            メイプルストーリーのストーリー＆データベース「メイプルヒストリア」は、現在オープンに向けて鋭意準備を進めております。
          </p>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-xs font-semibold border border-orange-200/60">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            公開をお楽しみに！
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-200/60">
        &copy; Maple Historia - Fan Site
      </footer>
    </div>
  );
}