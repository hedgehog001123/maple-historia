import { useState, useEffect, useRef } from "react";

const getSaved = (key: string, defaultVal: number) => {
  if (typeof window === "undefined") return defaultVal;
  const saved = localStorage.getItem(`maple_timer_${key}`);
  return saved !== null ? Number(saved) : defaultVal;
};

const getSavedBool = (key: string, defaultVal: boolean) => {
  if (typeof window === "undefined") return defaultVal;
  const saved = localStorage.getItem(`maple_timer_${key}`);
  return saved !== null ? saved === 'true' : defaultVal;
};

export const WEALTH_MAX = 7200;
export const EXP_MAX = 1800;

export function useHuntingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const [skillInterval, setSkillInterval] = useState<number | string>(getSaved('skillInterval', 60));
  const [dropRate, setDropRate] = useState<number | string>(getSaved('dropRate', 0));
  const [mesoRate, setMesoRate] = useState<number | string>(getSaved('mesoRate', 0));
  const [spawnCount, setSpawnCount] = useState<number | string>(getSaved('spawnCount', 39));
  const [mobLevel, setMobLevel] = useState<number | string>(getSaved('mobLevel', 280));
  const [hasFamilia, setHasFamilia] = useState<boolean>(getSavedBool('hasFamilia', false));
  
  const [collectionRate, setCollectionRate] = useState<number>(getSaved('collectionRate', 100));
  const [corePrice, setCorePrice] = useState<number | string>(getSaved('corePrice', 600000));
  const [nFamPrice, setNFamPrice] = useState<number | string>(getSaved('nFamPrice', 200000));
  const [rFamPrice, setRFamPrice] = useState<number | string>(getSaved('rFamPrice', 400000));

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    document.title = "狩りぷるタイマー";

    const soundFiles = ['cursor.mp3', 'levelup.mp3', 'yakubutsu.mp3', 'meso.mp3'];
    soundFiles.forEach((file) => {
      const audio = new Audio(`/sounds/${file}`);
      audio.preload = "auto";
      audio.load();
      audioRefs.current[file] = audio;
    });

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
    localStorage.setItem('maple_timer_spawnCount', String(spawnCount));
    localStorage.setItem('maple_timer_mobLevel', String(mobLevel));
    localStorage.setItem('maple_timer_hasFamilia', String(hasFamilia));
    localStorage.setItem('maple_timer_collectionRate', String(collectionRate));
    localStorage.setItem('maple_timer_corePrice', String(corePrice));
    localStorage.setItem('maple_timer_nFamPrice', String(nFamPrice));
    localStorage.setItem('maple_timer_rFamPrice', String(rFamPrice));
  }, [skillInterval, dropRate, mesoRate, spawnCount, mobLevel, hasFamilia, collectionRate, corePrice, nFamPrice, rFamPrice]);

  // Worker 制御
  useEffect(() => {
    if (isActive) {
      workerRef.current?.postMessage('start');
    } else {
      workerRef.current?.postMessage('stop');
    }
  }, [isActive]);

  const playSound = (fileName: string) => {
    const audio = audioRefs.current[fileName];
    if (!audio) return;
    
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch((e) => console.debug(`${fileName}再生待機:`, e));
  };

  useEffect(() => {
    if (elapsed === 0 || !isActive) return;

    const currentSkillMax = typeof skillInterval === "number" && skillInterval >= 5 ? skillInterval : Infinity;
    const remWealth = WEALTH_MAX - (elapsed % WEALTH_MAX);
    const remExp = EXP_MAX - (elapsed % EXP_MAX);
    const remSkill = currentSkillMax !== Infinity ? currentSkillMax - (elapsed % currentSkillMax) : Infinity;

    const isWarning = [remWealth, remExp, remSkill].some(rem => rem === 3 || rem === 2 || rem === 1);
    if (isWarning) playSound('cursor.mp3');

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
  const validSpawn = typeof spawnCount === "number" && spawnCount > 0 ? spawnCount : 1;
  const validMobLevel = typeof mobLevel === "number" && mobLevel > 0 ? mobLevel : 1;
  const collectionMult = collectionRate / 100;

  const baseMesoPerMob = validMobLevel * 7.5; 
  
  const pCore = typeof corePrice === "number" ? corePrice : 0;
  const pNFam = typeof nFamPrice === "number" ? nFamPrice : 0;
  const pRFam = typeof rFamPrice === "number" ? rFamPrice : 0;

  const multHalf = (124 + validDrop / 2) / 100;
  const multFull = (124 + validDrop) / 100;

  // リアルタイム効率 (7.5秒周期)
  const elapsedCycles = elapsed / 7.5;
  const totalKills = Math.floor(elapsedCycles * validSpawn);
  const expectedMeso = Math.floor(totalKills * baseMesoPerMob * (1 + validMeso / 100) * collectionMult);
  const rawCore = totalKills * (0.03 / 100) * multHalf * collectionMult;
  const rawSolErda = totalKills * (1000 / 15) * (0.0425 / 100) * multHalf * collectionMult;
  const rawSolFrag = totalKills * (0.0425 / 100) * multHalf * collectionMult;
  
  const rawNormalFam = hasFamilia ? totalKills * (0.3 / 100) * multFull * collectionMult : 0;
  const rawRareFam = hasFamilia ? totalKills * (0.05 / 100) * multFull * collectionMult : 0;
  
  const salesMeso = Math.floor(rawCore * pCore + rawNormalFam * pNFam + rawRareFam * pRFam);
  const totalRealtimeMeso = expectedMeso + salesMeso;

  // 時給効率 (1時間 = 480サイクル)
  const hourlyKills = 480 * validSpawn;
  const hourlyMeso = Math.floor(hourlyKills * baseMesoPerMob * (1 + validMeso / 100) * collectionMult);
  const hRawCore = hourlyKills * (0.03 / 100) * multHalf * collectionMult;
  const hRawSolErda = hourlyKills * (1000 / 15) * (0.0425 / 100) * multHalf * collectionMult;
  const hRawSolFrag = hourlyKills * (0.0425 / 100) * multHalf * collectionMult;
  
  const hRawNormalFam = hasFamilia ? hourlyKills * (0.3 / 100) * multFull * collectionMult : 0;
  const hRawRareFam = hasFamilia ? hourlyKills * (0.05 / 100) * multFull * collectionMult : 0;
  
  const hourlySales = Math.floor(hRawCore * pCore + hRawNormalFam * pNFam + hRawRareFam * pRFam);
  const totalHourlyMeso = hourlyMeso + hourlySales;

  // ⌨️ キーボードショートカット処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsActive((prev) => !prev);
      }

      if (e.shiftKey && (e.key === "R" || e.key === "r")) {
        e.preventDefault();
        setIsActive(false);
        setElapsed(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    state: {
      isActive, elapsed, volume, skillInterval, dropRate, mesoRate, spawnCount, mobLevel, hasFamilia,
      collectionRate, corePrice, nFamPrice, rFamPrice,
      remWealth, remExp, remSkill,
      realtime: { totalKills, expectedMeso, salesMeso, totalRealtimeMeso, rawCore, rawSolErda, rawSolFrag, rawNormalFam, rawRareFam },
      hourly: { hourlyKills, hourlyMeso, hourlySales, totalHourlyMeso, hRawCore, hRawSolErda, hRawSolFrag, hRawNormalFam, hRawRareFam },
    },
    actions: {
      setIsActive, setVolume, setSkillInterval, setDropRate, setMesoRate, setSpawnCount, setMobLevel, setHasFamilia,
      setCollectionRate, setCorePrice, setNFamPrice, setRFamPrice,
      handleReset, handleNumInput, playSound,
    }
  };
}