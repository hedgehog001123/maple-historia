import { useHuntingTimer } from "../hooks/useHuntingTimer";
import { TimerBox } from "./TimerBox";

export default function HuntingTimer() {
  const { state, actions } = useHuntingTimer();

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatSolErda = (val: number) => {
    const pieces = Math.floor(val / 1000);
    const energy = Math.floor(val % 1000);
    return `${pieces}個${energy}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 py-6 lg:py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-white items-start">
        
        {/* ⏱️ 左カラム：タイマー＆コントロール */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-5 lg:p-6 flex flex-col border border-slate-700">
          <h1 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-100">狩りぷるタイマー</h1>

          {/* 音量調整 */}
          <div className="mb-4 p-3 bg-slate-700 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">マスター音量: {Math.round(state.volume * 100)}%</span>
              <button 
                onClick={() => actions.playSound('cursor.mp3')} 
                className="text-sm bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded transition-colors"
              >
                🔊 試聴
              </button>
            </div>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={state.volume} onChange={(e) => actions.setVolume(parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* バフタイマー一覧 */}
          <div className="space-y-3 mb-5">
            <TimerBox label="財物獲得の秘薬" rem={state.remWealth} onPreview={() => actions.playSound('levelup.mp3')} />
            <TimerBox label="経験値バフ" rem={state.remExp} onPreview={() => actions.playSound('yakubutsu.mp3')} />
            <TimerBox 
              label={
                <div className="flex items-center gap-2">
                  <span>設置スキル:</span>
                  <input
                    type="number" min="5" step="1" value={state.skillInterval}
                    onChange={(e) => actions.handleNumInput(e.target.value, actions.setSkillInterval, 5)}
                    onBlur={() => { if (typeof state.skillInterval !== "number" || state.skillInterval < 5) actions.setSkillInterval(5); }}
                    className="w-16 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
                    disabled={state.isActive} title="停止中のみ変更可能"
                  />
                  <span>秒</span>
                </div>
              } 
              rem={state.remSkill} onPreview={() => actions.playSound('meso.mp3')} 
            />
          </div>

          {/* 狩り時間表示 */}
          <div className="text-center mb-4 bg-slate-900 py-3 rounded-xl shadow-inner border border-slate-700">
            <div className="text-slate-400 text-xs mb-1 font-bold">現在の狩り時間</div>
            <div className="text-4xl lg:text-5xl font-mono font-bold text-blue-400 tracking-wider">
              {formatTime(state.elapsed)}
            </div>
          </div>

          {/* 操作ボタン */}
{/* 🎮 操作ボタン群 */}
<div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <button
                onClick={() => actions.setIsActive(!state.isActive)}
                className={`flex-1 py-3 rounded-lg font-bold text-xl transition-colors shadow-md ${
                  state.isActive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {state.isActive ? "一時停止" : state.elapsed === 0 ? "狩り開始！" : "再開"}
              </button>
              <button
                onClick={actions.handleReset}
                disabled={state.elapsed === 0}
                className={`w-28 py-3 rounded-lg font-bold transition-colors shadow-md ${
                  state.elapsed === 0 ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-500 text-white"
                }`}
              >
                リセット
              </button>
            </div>
            
            {/* ⌨️ ショートカットキーのヒント表示 */}
            <div className="flex justify-between items-center px-1 text-[10px] text-slate-500 font-mono">
              <span>[Space] 開始/停止</span>
              <span>[Shift + R] リセット</span>
            </div>
          </div>
        </div>

        {/* 📊 右カラム：シミュレーター */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-5 lg:p-6 flex flex-col border border-slate-700">
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-bold">ドロ率 (%)</label>
              <input 
                type="number" value={state.dropRate} onChange={(e) => actions.handleNumInput(e.target.value, actions.setDropRate)}
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-bold">メル率 (%)</label>
              <input 
                type="number" value={state.mesoRate} onChange={(e) => actions.handleNumInput(e.target.value, actions.setMesoRate)}
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-bold">ドロップ品回収率</label>
              <span className="text-sm font-mono text-blue-400 font-bold">{state.collectionRate}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="1" 
              value={state.collectionRate} onChange={(e) => actions.setCollectionRate(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="mb-4 p-3 bg-slate-900 border border-slate-700 rounded-lg">
            <h3 className="text-[11px] font-bold text-slate-400 mb-2">💰 オークション相場設定 (メル)</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-300">コアジェム</span>
                <input 
                  type="number" value={state.corePrice} onChange={(e) => actions.handleNumInput(e.target.value, actions.setCorePrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Nファミリア</span>
                <input 
                  type="number" value={state.nFamPrice} onChange={(e) => actions.handleNumInput(e.target.value, actions.setNFamPrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-cyan-300">Rファミリア</span>
                <input 
                  type="number" value={state.rFamPrice} onChange={(e) => actions.handleNumInput(e.target.value, actions.setRFamPrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1">
            {/* リアルタイム結果 */}
            <div>
              <h2 className="text-sm font-bold text-slate-300 mb-1 flex items-center gap-1">
                📊 リアルタイム狩り効率 <span className="text-[10px] font-normal text-slate-500">(列車6)</span>
              </h2>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs md:text-sm border border-slate-700">
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">総討伐数:</span><span className="font-bold">{state.realtime.totalKills.toLocaleString()} 体</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">純メル:</span><span className="text-yellow-500 font-bold">{state.realtime.expectedMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">売却益:</span><span className="text-green-400 font-bold">+{state.realtime.salesMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 bg-slate-800/50 -mx-3 px-3"><span className="text-slate-300 font-bold">総獲得メル:</span><span className="text-yellow-400 font-bold">{state.realtime.totalRealtimeMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 mt-1"><span className="text-slate-400">コアジェム:</span><span className="text-blue-300 font-bold">{state.realtime.rawCore.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">ソルエルダ:</span><span className="text-purple-300 font-bold">{formatSolErda(state.realtime.rawSolErda)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">欠片:</span><span className="text-indigo-300 font-bold">{state.realtime.rawSolFrag.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">Nファミ:</span><span className="text-gray-300 font-bold">{state.realtime.rawNormalFam.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Rファミ:</span><span className="text-cyan-300 font-bold">{state.realtime.rawRareFam.toFixed(1)}</span></div>
              </div>
            </div>

            {/* 時給結果 */}
            <div>
              <h2 className="text-sm font-bold text-slate-300 mb-1 flex items-center gap-1">
                ⏳ 時給 <span className="text-[10px] font-normal text-slate-500">(列車6)</span>
              </h2>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs md:text-sm border border-slate-700">
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">時給討伐数:</span><span className="font-bold">{state.hourly.hourlyKills.toLocaleString()} 体</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">純メル:</span><span className="text-yellow-500 font-bold">{state.hourly.hourlyMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">売却益:</span><span className="text-green-400 font-bold">+{state.hourly.hourlySales.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 bg-slate-800/50 -mx-3 px-3"><span className="text-slate-300 font-bold">総時給メル:</span><span className="text-yellow-400 font-bold">{state.hourly.totalHourlyMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 mt-1"><span className="text-slate-400">コアジェム:</span><span className="text-blue-300 font-bold">{state.hourly.hRawCore.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">ソルエルダ:</span><span className="text-purple-300 font-bold">{formatSolErda(state.hourly.hRawSolErda)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">欠片:</span><span className="text-indigo-300 font-bold">{state.hourly.hRawSolFrag.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">Nファミ:</span><span className="text-gray-300 font-bold">{state.hourly.hRawNormalFam.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Rファミ:</span><span className="text-cyan-300 font-bold">{state.hourly.hRawRareFam.toFixed(1)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-6xl mt-4 text-center text-[10px] md:text-[11px] text-slate-500 font-sans tracking-wide">
        ※エリートモンスター・エリートボス・黄昏の露・トナカイの乳・呪文の痕跡などは計算外
      </div>
    </div>
  );
}