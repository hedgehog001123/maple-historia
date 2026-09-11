import React, { useEffect, useState, useRef } from 'react';

// 12体のボスリスト (10分 = 600秒ごとに切り替え)
const BOSSES = [
  { name: "ジャクム", image: "/images/bosses/jkm.png", color: "from-amber-600 to-red-600" },
  { name: "ベルルム", image: "/images/bosses/beru.jpg", color: "from-emerald-600 to-teal-600" },
  { name: "スウ", image: "/images/bosses/Suu.png", color: "from-pink-500 to-rose-600" },
  { name: "デミアン", image: "/images/bosses/demi.jpg", color: "from-cyan-500 to-blue-600" },
  { name: "ルシード", image: "/images/bosses/rusi.jpg", color: "from-purple-600 to-indigo-700" },
  { name: "デュンケル", image: "/images/bosses/dyu.jpg", color: "from-fuchsia-500 to-pink-600" },
  { name: "真・ヒルラ", image: "/images/bosses/hiru.jpg", color: "from-red-700 to-rose-900" },
  { name: "暗黒の魔法使い", image: "/images/bosses/anko.jpg", color: "from-slate-600 to-slate-800" },
  { name: "選ばれし者セレン", image: "/images/bosses/sere.jpg", color: "from-amber-400 to-yellow-600" },
  { name: "監視者カロス", image: "/images/bosses/karosu.jpg", color: "from-purple-900 via-indigo-900 to-black" },
  { name: "最初の対敵者", image: "/images/bosses/taiteki.png", color: "from-indigo-800 to-slate-900" },
  { name: "カリーン", image: "/images/bosses/kari.jpg", color: "from-teal-400 to-cyan-700" },
];

const BOSS_INTERVAL = 600; // 10分 = 600秒
const TOTAL_CYCLE = BOSS_INTERVAL * BOSSES.length; // 120分 = 7200秒

export const BossGauge: React.FC<{ elapsed: number; isActive: boolean }> = ({ elapsed, isActive }) => {
  // 表示用の内部アニメーション時間（秒）
  const [displayElapsed, setDisplayElapsed] = useState(elapsed);
  const lastTimeRef = useRef<number | null>(null);

  // タイマー停止・リセット時に親の elapsed と同期する
  useEffect(() => {
    setDisplayElapsed(elapsed);
  }, [elapsed]);

  // タイマー動作中、1秒未満のミリ秒までリアルタイム補間して数値を滑らかにする
  useEffect(() => {
    let animId: number;

    const updateSmoothTime = (now: number) => {
      if (lastTimeRef.current !== null && isActive) {
        const delta = (now - lastTimeRef.current) / 1000;
        setDisplayElapsed((prev) => prev + delta);
      }
      lastTimeRef.current = now;
      if (isActive) {
        animId = requestAnimationFrame(updateSmoothTime);
      }
    };

    if (isActive) {
      lastTimeRef.current = performance.now();
      animId = requestAnimationFrame(updateSmoothTime);
    } else {
      lastTimeRef.current = null;
    }

    return () => cancelAnimationFrame(animId);
  }, [isActive]);

  // 120分で1周するようにループ計算
  const currentCycleTime = displayElapsed % TOTAL_CYCLE;
  const currentBossIndex = Math.floor(currentCycleTime / BOSS_INTERVAL);
  const currentBoss = BOSSES[currentBossIndex];

  const timeInCurrentBoss = currentCycleTime % BOSS_INTERVAL;
  const rawHpPercent = Math.max(0, 100 - (timeInCurrentBoss / BOSS_INTERVAL) * 100);
  
  // 0.1%刻みにきれいに整形
  const hpPercent = (Math.round(rawHpPercent * 10) / 10).toFixed(1);

  return (
    <div className="w-full bg-slate-900 border-2 border-amber-500/50 rounded-xl p-4 shadow-2xl mb-4 relative overflow-hidden backdrop-blur-sm">
      {/* ボス情報＆画像表示エリア */}
      <div className="flex items-center gap-3 mb-2">
        {/* 🖼️ ボス画像枠 */}
        <div className="relative w-12 h-12 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center p-0.5 shrink-0 shadow-inner overflow-hidden">
          <img 
            src={currentBoss.image} 
            alt={currentBoss.name}
            className="w-full h-full object-cover rounded"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerText = '😈';
                target.parentElement.className += ' text-2xl flex items-center justify-center';
              }
            }}
          />
        </div>

        {/* ボス名 & ステージ & HP数値 */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1 font-bold">
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                STAGE {currentBossIndex + 1}/12
              </span>
              <span className="text-base text-slate-100 font-bold tracking-wide drop-shadow">
                {currentBoss.name}
              </span>
            </div>
            <div className="text-sm font-mono text-amber-400 font-extrabold tracking-wider">
              HP {hpPercent}%
            </div>
          </div>

          {/* 🩸 メイプル風 HPゲージ */}
        <div className="w-full h-4 bg-slate-950 rounded-full p-0.5 border border-slate-700 shadow-inner relative overflow-hidden">
        <div
            className={`h-full rounded-full bg-gradient-to-r ${currentBoss.color} transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(245,158,11,0.5)]`}
            style={{ width: `${hpPercent}%` }}
        />
        </div>
        </div>
      </div>

      {/* 撃破状況ドット一覧 */}
      <div className="grid grid-cols-12 gap-1 mt-3 text-[9px] font-mono text-center">
        {BOSSES.map((b, i) => {
          const isCleared = i < currentBossIndex;
          const isCurrent = i === currentBossIndex;
          return (
            <div 
              key={b.name} 
              title={b.name}
              className={`py-1 rounded transition-all flex flex-col items-center justify-center gap-0.5 ${
                isCleared 
                  ? "bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40" 
                  : isCurrent 
                    ? "bg-blue-600/40 text-blue-300 border border-blue-400 animate-pulse font-bold scale-105" 
                    : "bg-slate-800/80 text-slate-600 border border-slate-800"
              }`}
            >
              <span>{isCleared ? "✓" : i + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};