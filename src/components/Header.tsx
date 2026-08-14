interface HeaderProps {
    onGoTop: () => void;
  }
  
  export const Header = ({ onGoTop }: HeaderProps) => {
    return (
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onGoTop}
            className="text-xl font-extrabold tracking-wide drop-shadow-sm hover:opacity-90 transition cursor-pointer text-left"
          >
            メイプルヒストリア
          </button>
  
          <button
            onClick={onGoTop}
            className="text-xs bg-orange-600/60 hover:bg-orange-600/80 px-2.5 py-1 rounded-full border border-orange-300/40 transition cursor-pointer"
          >
            ワールドアーカイブ
          </button>
        </div>
      </header>
    );
  };