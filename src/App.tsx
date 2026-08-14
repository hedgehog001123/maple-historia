// src/App.tsx
import { MaplestoryTooltip } from './components/MaplestoryTooltip';

function App() {
  return (
    <div className="min-h-screen bg-amber-50/50 text-gray-800 flex flex-col items-center">
      {/* 公式風メイプルオレンジのヘッダーバー */}
      <header className="w-full bg-orange-500 border-b-4 border-orange-600 shadow-md py-4 px-8 mb-8 text-white flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-wider drop-shadow">
            メイプルヒストリア
          </h1>
          <p className="text-xs text-orange-100 font-medium">
            Maple Historia - Story & Database
          </p>
        </div>
      </header>

      {/* メインコンテンツ（公式風の白い掲示板風カード） */}
      <main className="max-w-2xl w-full bg-white border border-amber-200 rounded-2xl p-8 shadow-sm mx-4">
        <article className="space-y-4 text-gray-700 leading-relaxed text-base">
          <p>
            かつてビクトリアロードの深部には、恐ろしい
            <MaplestoryTooltip id="balrog">魔王バルログ</MaplestoryTooltip>
            が封印されていた。冒険者たちは幾度となくその脅威に立ち向かうこととなる。
          </p>

          <p>
            一方、アーケインリバーの「夢の都市レヘルン」では、軍団長の一人である
            <MaplestoryTooltip id="lucid">ルシード</MaplestoryTooltip>
            が美しい夢の中に人々を囚えていた……。
          </p>
        </article>
      </main>
    </div>
  );
}

export default App;