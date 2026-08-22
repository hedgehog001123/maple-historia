import { useState, useEffect, useRef } from "react";

// 💾 ローカルストレージからデータを読み込むお助け関数（リロードしても保存される！）
const getSaved = (key: string, defaultVal: number) => {
  if (typeof window === "undefined") return defaultVal;
  const saved = localStorage.getItem(`maple_timer_${key}`);
  return saved !== null ? Number(saved) : defaultVal;
};

export default function HuntingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // 📊 シミュレーター用の入力ステート（初期値にローカルストレージの値をセット）
  const [skillInterval, setSkillInterval] = useState<number | string>(getSaved('skillInterval', 60));
  const [dropRate, setDropRate] = useState<number | string>(getSaved('dropRate', 304));
  const [mesoRate, setMesoRate] = useState<number | string>(getSaved('mesoRate', 68));
  const [collectionRate, setCollectionRate] = useState<number>(getSaved('collectionRate', 100));
  const [corePrice, setCorePrice] = useState<number | string>(getSaved('corePrice', 1000000));
  const [nFamPrice, setNFamPrice] = useState<number | string>(getSaved('nFamPrice', 250000));
  const [rFamPrice, setRFamPrice] = useState<number | string>(getSaved('rFamPrice', 500000));

  const WEALTH_MAX = 7200;
  const EXP_MAX = 1800;

  // 🎵 音声データ保存用のRef
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // ⚙️ ページ読み込み時の初期設定
  useEffect(() => {
    document.title = "狩りぷるタイマー";

    audioRefs.current = {
      'cursor.mp3': new Audio('/sounds/cursor.mp3'),
      'levelup.mp3': new Audio('/sounds/levelup.mp3'),
      'yakubutsu.mp3': new Audio('/sounds/yakubutsu.mp3'),
      'meso.mp3': new Audio('/sounds/meso.mp3'),
    };
  }, []);

  // 💾 入力値が変わるたびに、自動でブラウザに保存（セーブ）する
  useEffect(() => {
    localStorage.setItem('maple_timer_skillInterval', String(skillInterval));
    localStorage.setItem('maple_timer_dropRate', String(dropRate));
    localStorage.setItem('maple_timer_mesoRate', String(mesoRate));
    localStorage.setItem('maple_timer_collectionRate', String(collectionRate));
    localStorage.setItem('maple_timer_corePrice', String(corePrice));
    localStorage.setItem('maple_timer_nFamPrice', String(nFamPrice));
    localStorage.setItem('maple_timer_rFamPrice', String(rFamPrice));
  }, [skillInterval, dropRate, mesoRate, collectionRate, corePrice, nFamPrice, rFamPrice]);

  // 🔊 音を鳴らす関数（isWarmup = true の時は極小音量でサボり防止！）
  const playSound = (fileName: string, isWarmup = false) => {
    const baseAudio = audioRefs.current[fileName];
    if (!baseAudio) return;
    
    const playAudio = baseAudio.cloneNode() as HTMLAudioElement;
    // 💡 完全に0にするとブラウザがサボるので、聞こえない「0.001」を指定する
    playAudio.volume = isWarmup ? 0.001 : volume;
    playAudio.play().catch((e) => console.debug(`${fileName}再生待機:`, e));
  };

  useEffect(() => {
    let intervalId: number;
    if (isActive) {
      intervalId = window.setInterval(() => setElapsed((prev) => prev + 1), 1000);
    }
    return () => window.clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    if (elapsed === 0 || !isActive) return;

    const currentSkillMax = typeof skillInterval === "number" && skillInterval >= 5 ? skillInterval : Infinity;
    const remWealth = WEALTH_MAX - (elapsed % WEALTH_MAX);
    const remExp = EXP_MAX - (elapsed % EXP_MAX);
    const remSkill = currentSkillMax !== Infinity ? currentSkillMax - (elapsed % currentSkillMax) : Infinity;

    // --- 🤫 5秒前 と 4秒前 に「極小音量」で再生してエンジンを強制稼働させる！ ---
    const isWarmup = [remWealth, remExp, remSkill].some(rem => rem === 5 || rem === 4);
    if (isWarmup) {
      playSound('cursor.mp3', true);
    }
    if (remWealth === 5 || remWealth === 4) playSound('levelup.mp3', true);
    if (remExp === 5 || remExp === 4) playSound('yakubutsu.mp3', true);
    if (remSkill === 5 || remSkill === 4) playSound('meso.mp3', true);

    // --- 🎵 本番の再生 ---
    const isWarning = [remWealth, remExp, remSkill].some(rem => rem === 3 || rem === 2 || rem === 1);
    if (isWarning) playSound('cursor.mp3', false);

    if (elapsed % WEALTH_MAX === 0) playSound('levelup.mp3', false);
    if (elapsed % EXP_MAX === 0) playSound('yakubutsu.mp3', false);
    if (currentSkillMax !== Infinity && elapsed % currentSkillMax === 0) playSound('meso.mp3', false);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, isActive]);

  const handleReset = () => {
    setIsActive(false);
    setElapsed(0);
  };

  const currentSkillMax = typeof skillInterval === "number" && skillInterval >= 5 ? skillInterval : 5;
  const remWealth = WEALTH_MAX - (elapsed % WEALTH_MAX);
  const remExp = EXP_MAX - (elapsed % EXP_MAX);
  const remSkill = currentSkillMax - (elapsed % currentSkillMax);

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

  // --- 📊 シミュレーター計算 ---
  const validDrop = typeof dropRate === "number" ? dropRate : 0;
  const validMeso = typeof mesoRate === "number" ? mesoRate : 0;
  const collectionMult = collectionRate / 100;
  
  const pCore = typeof corePrice === "number" ? corePrice : 0;
  const pNFam = typeof nFamPrice === "number" ? nFamPrice : 0;
  const pRFam = typeof rFamPrice === "number" ? rFamPrice : 0;

  const FIXED_SPAWN = 37;
  const BASE_MESO_PER_MOB = 2017.5;
  
  const x = validDrop;
  const multHalf = (124 + x / 2) / 100;
  const multFull = (124 + x) / 100;

  const elapsedCycles = elapsed / 7.5; 
  const totalKills = Math.floor(elapsedCycles * FIXED_SPAWN);
  
  const expectedMeso = Math.floor(totalKills * BASE_MESO_PER_MOB * (1 + validMeso / 100) * collectionMult);
  
  const rawCore = totalKills * (0.03 / 100) * multHalf * collectionMult;
  const rawSolErda = totalKills * (1000 / 15) * (0.0425 / 100) * multHalf * collectionMult;
  const rawSolFrag = totalKills * (0.0425 / 100) * multHalf * collectionMult;
  const rawNormalFam = totalKills * (0.3 / 100) * multFull * collectionMult;
  const rawRareFam = totalKills * (0.05 / 100) * multFull * collectionMult;

  const salesMeso = Math.floor(rawCore * pCore + rawNormalFam * pNFam + rawRareFam * pRFam);
  const totalRealtimeMeso = expectedMeso + salesMeso;

  const HOURLY_SPAWNS = 480;
  const hourlyKills = HOURLY_SPAWNS * FIXED_SPAWN;
  
  const hourlyMeso = Math.floor(hourlyKills * BASE_MESO_PER_MOB * (1 + validMeso / 100) * collectionMult);
  
  const hRawCore = hourlyKills * (0.03 / 100) * multHalf * collectionMult;
  const hRawSolErda = hourlyKills * (1000 / 15) * (0.0425 / 100) * multHalf * collectionMult;
  const hRawSolFrag = hourlyKills * (0.0425 / 100) * multHalf * collectionMult;
  const hRawNormalFam = hourlyKills * (0.3 / 100) * multFull * collectionMult;
  const hRawRareFam = hourlyKills * (0.05 / 100) * multFull * collectionMult;

  const hourlySales = Math.floor(hRawCore * pCore + hRawNormalFam * pNFam + hRawRareFam * pRFam);
  const totalHourlyMeso = hourlyMeso + hourlySales;

  const handleNumInput = (val: string, setter: React.Dispatch<React.SetStateAction<number | string>>, min: number = 0) => {
    if (val === "") { setter(""); return; }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= min) setter(parsed);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 py-6 lg:py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-white items-start">
        
        {/* ========================================== */}
        {/* ⏱️ 左カラム：タイマー＆コントロールエリア */}
        {/* ========================================== */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-5 lg:p-6 flex flex-col border border-slate-700">
          <h1 className="text-xl lg:text-2xl font-bold mb-4 text-center text-slate-100">狩りぷるタイマー</h1>

          {/* ボリューム調整 */}
          <div className="mb-4 p-3 bg-slate-700 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">マスター音量: {Math.round(volume * 100)}%</span>
              <button 
                onClick={() => playSound('cursor.mp3', false)} 
                className="text-sm bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded transition-colors"
              >
                🔊 試聴
              </button>
            </div>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* タイマーリスト */}
          <div className="space-y-3 mb-5">
            <TimerBox label="財物獲得の秘薬" rem={remWealth} onPreview={() => playSound('levelup.mp3', false)} />
            <TimerBox label="経験値バフ" rem={remExp} onPreview={() => playSound('yakubutsu.mp3', false)} />
            <TimerBox 
              label={
                <div className="flex items-center gap-2">
                  <span>設置スキル:</span>
                  <input
                    type="number" min="5" step="1" value={skillInterval}
                    onChange={(e) => handleNumInput(e.target.value, setSkillInterval, 5)}
                    onBlur={() => { if (typeof skillInterval !== "number" || skillInterval < 5) setSkillInterval(5); }}
                    className="w-16 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
                    disabled={isActive} title="停止中のみ変更可能"
                  />
                  <span>秒</span>
                </div>
              } 
              rem={remSkill} onPreview={() => playSound('meso.mp3', false)} 
            />
          </div>

          {/* 🕒 現在の狩り時間 */}
          <div className="text-center mb-4 bg-slate-900 py-3 rounded-xl shadow-inner border border-slate-700">
            <div className="text-slate-400 text-xs mb-1 font-bold">現在の狩り時間</div>
            <div className="text-4xl lg:text-5xl font-mono font-bold text-blue-400 tracking-wider">
              {formatTime(elapsed)}
            </div>
          </div>

          {/* 🎮 操作ボタン群 */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex-1 py-3 rounded-lg font-bold text-xl transition-colors shadow-md ${
                isActive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isActive ? "一時停止" : elapsed === 0 ? "狩り開始！" : "再開"}
            </button>
            <button
              onClick={handleReset}
              disabled={elapsed === 0}
              className={`w-28 py-3 rounded-lg font-bold transition-colors shadow-md ${
                elapsed === 0 ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-500 text-white"
              }`}
            >
              リセット
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* 📊 右カラム：シミュレーターエリア */}
        {/* ========================================== */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-5 lg:p-6 flex flex-col border border-slate-700">
          
          {/* 入力設定（ドロ率・メル率） */}
          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-bold">ドロ率 (%)</label>
              <input 
                type="number" value={dropRate} onChange={(e) => handleNumInput(e.target.value, setDropRate)}
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-slate-400 text-xs font-bold">メル率 (%)</label>
              <input 
                type="number" value={mesoRate} onChange={(e) => handleNumInput(e.target.value, setMesoRate)}
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 回収率スライダー */}
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-bold">ドロップ品回収率</label>
              <span className="text-sm font-mono text-blue-400 font-bold">{collectionRate}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="1" 
              value={collectionRate} onChange={(e) => setCollectionRate(parseInt(e.target.value, 10))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* アイテム相場 入力 */}
          <div className="mb-4 p-3 bg-slate-900 border border-slate-700 rounded-lg">
            <h3 className="text-[11px] font-bold text-slate-400 mb-2">💰 オークション相場設定 (メル)</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-300">コアジェム</span>
                <input 
                  type="number" value={corePrice} onChange={(e) => handleNumInput(e.target.value, setCorePrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Nファミリア</span>
                <input 
                  type="number" value={nFamPrice} onChange={(e) => handleNumInput(e.target.value, setNFamPrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-cyan-300">Rファミリア</span>
                <input 
                  type="number" value={rFamPrice} onChange={(e) => handleNumInput(e.target.value, setRFamPrice)}
                  className="w-28 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 結果表示エリア（横並び） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1">
            
            {/* リアルタイム結果 */}
            <div>
              <h2 className="text-sm font-bold text-slate-300 mb-1 flex items-center gap-1">
                📊 リアルタイム狩り効率 <span className="text-[10px] font-normal text-slate-500">(列車6)</span>
              </h2>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs md:text-sm border border-slate-700">
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">総討伐数:</span><span className="font-bold">{totalKills.toLocaleString()} 体</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">純メル:</span><span className="text-yellow-500 font-bold">{expectedMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">売却益:</span><span className="text-green-400 font-bold">+{salesMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 bg-slate-800/50 -mx-3 px-3"><span className="text-slate-300 font-bold">総獲得メル:</span><span className="text-yellow-400 font-bold">{totalRealtimeMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 mt-1"><span className="text-slate-400">コアジェム:</span><span className="text-blue-300 font-bold">{rawCore.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">ソルエルダ:</span><span className="text-purple-300 font-bold">{formatSolErda(rawSolErda)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">欠片:</span><span className="text-indigo-300 font-bold">{rawSolFrag.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">Nファミ:</span><span className="text-gray-300 font-bold">{rawNormalFam.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Rファミ:</span><span className="text-cyan-300 font-bold">{rawRareFam.toFixed(1)}</span></div>
              </div>
            </div>

            {/* 時給結果 */}
            <div>
              <h2 className="text-sm font-bold text-slate-300 mb-1 flex items-center gap-1">
                ⏳ 時給 <span className="text-[10px] font-normal text-slate-500">(列車6)</span>
              </h2>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs md:text-sm border border-slate-700">
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">時給討伐数:</span><span className="font-bold">{hourlyKills.toLocaleString()} 体</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">純メル:</span><span className="text-yellow-500 font-bold">{hourlyMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">売却益:</span><span className="text-green-400 font-bold">+{hourlySales.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 bg-slate-800/50 -mx-3 px-3"><span className="text-slate-300 font-bold">総時給メル:</span><span className="text-yellow-400 font-bold">{totalHourlyMeso.toLocaleString()}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800 mt-1"><span className="text-slate-400">コアジェム:</span><span className="text-blue-300 font-bold">{hRawCore.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">ソルエルダ:</span><span className="text-purple-300 font-bold">{formatSolErda(hRawSolErda)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">欠片:</span><span className="text-indigo-300 font-bold">{hRawSolFrag.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5 border-b border-slate-800"><span className="text-slate-400">Nファミ:</span><span className="text-gray-300 font-bold">{hRawNormalFam.toFixed(1)}</span></div>
                <div className="flex justify-between py-0.5"><span className="text-slate-400">Rファミ:</span><span className="text-cyan-300 font-bold">{hRawRareFam.toFixed(1)}</span></div>
              </div>
            </div>

          </div>
        </div>

      </div>
      
      {/* 🛑 免責事項 */}
      <div className="w-full max-w-6xl mt-4 text-center text-[10px] md:text-[11px] text-slate-500 font-sans tracking-wide">
        ※エリートモンスター・エリートボス・黄昏の露・トナカイの乳・呪文の痕跡などは計算外
      </div>
    </div>
  );
}

// ⏳ サブコンポーネント
const TimerBox = ({ label, rem, onPreview }: { label: React.ReactNode; rem: number; onPreview: () => void }) => (
  <div className={`p-3 rounded-lg flex justify-between items-center transition-all duration-300 ${
    rem <= 3 
      ? "bg-slate-900 ring-2 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse text-red-400 font-bold" 
      : "bg-slate-900 border border-transparent"
  }`}>
    <div className="flex items-center gap-3">
      <div className="font-medium">{label}</div>
      <button onClick={onPreview} className="text-lg hover:scale-110 transition-transform text-slate-400 hover:text-white" title="試聴">🔊</button>
    </div>
    <span className="text-xl font-mono tracking-wider text-white">
      {Math.floor(rem / 60)}:{String(rem % 60).padStart(2, '0')}
    </span>
  </div>
);