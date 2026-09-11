import { useState, useEffect, useRef } from "react";

const getSaved = (key: string, defaultVal: number) => {
  if (typeof window === "undefined") return defaultVal;
  const saved = localStorage.getItem(`maple_timer_${key}`);
  return saved !== null ? Number(saved) : defaultVal;
};

export const WEALTH_MAX = 7200;
export const EXP_MAX = 1800;
export const FIXED_SPAWN = 37;
export const BASE_MESO_PER_MOB = 2017.5;

export function useHuntingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const [skillInterval, setSkillInterval] = useState<number | string>(getSaved('skillInterval', 60));
  const [dropRate, setDropRate] = useState<number | string>(getSaved('dropRate', 304));
  const [mesoRate, setMesoRate] = useState<number | string>(getSaved('mesoRate', 68));
  const [collectionRate, setCollectionRate] = useState<number>(getSaved('collectionRate', 100));
  const [corePrice, setCorePrice] = useState<number | string>(getSaved('corePrice', 1000000));
  const [nFamPrice, setNFamPrice] = useState<number | string>(getSaved('nFamPrice', 250000));
  const [rFamPrice, setRFamPrice] = useState<number | string>(getSaved('rFamPrice', 500000));

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const workerRef = useRef<Worker | null>(null);

  // 初期化 (タイトル & 音声ファイル & Web Worker)
  useEffect(() => {
    document.title = "狩りぷるタイマー";

    audioRefs.current = {
      'cursor.mp3': new Audio('/sounds/cursor.mp3'),
      'levelup.mp3': new Audio('/sounds/levelup.mp3'),
      'yakubutsu.mp3': new Audio('/sounds/yakubutsu.mp3'),
      'meso.mp3': new Audio('/sounds/meso.mp3'),
    };

    const workerCode = `
      let timerId = null;
      self.onmessage = function(e) {
        if (e.data === 'start') {
          if (!timerId) {
            timerId = setInterval(() => { self.postMessage('tick'); }, 1000);
          }
        } else if (e.data === 'stop') {
          if (timerId) {
            clearInterval(timerId);
            timerId = null;
          }
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    workerRef.current.onmessage = (e) => {
      if (e.data === 'tick') {
        setElapsed((prev) => prev + 1);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // localStorage への永続化
  useEffect(() => {
    localStorage.setItem('maple_timer_skillInterval', String(skillInterval));
    localStorage.setItem('maple_timer_dropRate', String(dropRate));
    localStorage.setItem('maple_timer_mesoRate', String(mesoRate));
    localStorage.setItem('maple_timer_collectionRate', String(collectionRate));
    localStorage.setItem('maple_timer_corePrice', String(corePrice));
    localStorage.setItem('maple_timer_nFamPrice', String(nFamPrice));
    localStorage.setItem('maple_timer_rFamPrice', String(rFamPrice));
  }, [skillInterval, dropRate, mesoRate, collectionRate, corePrice, nFamPrice, rFamPrice]);

  // Worker 制御
  useEffect(() => {
    if (isActive) {
      workerRef.current?.postMessage('start');
    } else {
      workerRef.current?.postMessage('stop');
    }
  }, [isActive]);

// 🔊 音声を再生する関数（クローンして重ね再生可能に）
const playSound = (fileName: string) => {
    const baseAudio = audioRefs.current[fileName];
    if (!baseAudio) return;
    
    const playAudio = baseAudio.cloneNode() as HTMLAudioElement;
    playAudio.volume = volume;
    playAudio.play().catch((e) => console.debug(`${fileName}再生待機:`, e));
  };

  // 🎵 アラート判定（無音ウォームアップを削除し、本番の音声のみ再生）
  useEffect(() => {
    if (elapsed === 0 || !isActive) return;

    const currentSkillMax = typeof skillInterval === "number" && skillInterval >= 5 ? skillInterval : Infinity;
    const remWealth = WEALTH_MAX - (elapsed % WEALTH_MAX);
    const remExp = EXP_MAX - (elapsed % EXP_MAX);
    const remSkill = currentSkillMax !== Infinity ? currentSkillMax - (elapsed % currentSkillMax) : Infinity;

    // 3・2・1秒前のカウントダウン音（cursor.mp3）
    const isWarning = [remWealth, remExp, remSkill].some(rem => rem === 3 || rem === 2 || rem === 1);
    if (isWarning) playSound('cursor.mp3');

    // バフ終了時の効果音
    if (elapsed % WEALTH_MAX === 0) playSound('levelup.mp3');
    if (elapsed % EXP_MAX === 0) playSound('yakubutsu.mp3');
    if (currentSkillMax !== Infinity && elapsed % currentSkillMax === 0) playSound('meso.mp3');
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, isActive]);

  const handleReset = () => {
    setIsActive(false);
    setElapsed(0);
  };

  const handleNumInput = (val: string, setter: React.Dispatch<React.SetStateAction<number | string>>, min: number = 0) => {
    if (val === "") { setter(""); return; }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= min) setter(parsed);
  };

  // タイマー残り計算
  const currentSkillMax = typeof skillInterval === "number" && skillInterval >= 5 ? skillInterval : 5;
  const remWealth = WEALTH_MAX - (elapsed % WEALTH_MAX);
  const remExp = EXP_MAX - (elapsed % EXP_MAX);
  const remSkill = currentSkillMax - (elapsed % currentSkillMax);

  // 狩りシミュレータ計算
  const validDrop = typeof dropRate === "number" ? dropRate : 0;
  const validMeso = typeof mesoRate === "number" ? mesoRate : 0;
  const collectionMult = collectionRate / 100;
  
  const pCore = typeof corePrice === "number" ? corePrice : 0;
  const pNFam = typeof nFamPrice === "number" ? nFamPrice : 0;
  const pRFam = typeof rFamPrice === "number" ? rFamPrice : 0;

  const multHalf = (124 + validDrop / 2) / 100;
  const multFull = (124 + validDrop) / 100;

  // リアルタイム効率
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

  // 時給効率
  const hourlyKills = 480 * FIXED_SPAWN;
  const hourlyMeso = Math.floor(hourlyKills * BASE_MESO_PER_MOB * (1 + validMeso / 100) * collectionMult);
  const hRawCore = hourlyKills * (0.03 / 100) * multHalf * collectionMult;
  const hRawSolErda = hourlyKills * (1000 / 15) * (0.0425 / 100) * multHalf * collectionMult;
  const hRawSolFrag = hourlyKills * (0.0425 / 100) * multHalf * collectionMult;
  const hRawNormalFam = hourlyKills * (0.3 / 100) * multFull * collectionMult;
  const hRawRareFam = hourlyKills * (0.05 / 100) * multFull * collectionMult;
  const hourlySales = Math.floor(hRawCore * pCore + hRawNormalFam * pNFam + hRawRareFam * pRFam);
  const totalHourlyMeso = hourlyMeso + hourlySales;

  return {
    state: {
      isActive, elapsed, volume, skillInterval, dropRate, mesoRate,
      collectionRate, corePrice, nFamPrice, rFamPrice,
      remWealth, remExp, remSkill,
      realtime: { totalKills, expectedMeso, salesMeso, totalRealtimeMeso, rawCore, rawSolErda, rawSolFrag, rawNormalFam, rawRareFam },
      hourly: { hourlyKills, hourlyMeso, hourlySales, totalHourlyMeso, hRawCore, hRawSolErda, hRawSolFrag, hRawNormalFam, hRawRareFam },
    },
    actions: {
      setIsActive, setVolume, setSkillInterval, setDropRate, setMesoRate,
      setCollectionRate, setCorePrice, setNFamPrice, setRFamPrice,
      handleReset, handleNumInput, playSound,
    }
  };
}
