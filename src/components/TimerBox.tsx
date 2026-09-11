interface TimerBoxProps {
    label: React.ReactNode;
    rem: number;
    onPreview: () => void;
  }
  
  export const TimerBox = ({ label, rem, onPreview }: TimerBoxProps) => (
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