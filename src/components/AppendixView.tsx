import { useState } from 'react';
import { APPENDIX_DATA } from '../data/appendix'; // 👈 読み込むだけ！

interface SubSection {
  id: string;
  title: string;
  content: string;
}

interface Section {
  id: string;
  title: string;
  content?: string;
  subSections?: SubSection[];
  isLocked?: boolean;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  sections: Section[];
}

export const AppendixView = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('history');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('maple-world');

  const currentChapter = APPENDIX_DATA.find((c) => c.id === selectedChapterId) || APPENDIX_DATA[0];
  const currentSection =
    currentChapter.sections.find((s) => s.id === selectedSectionId) || currentChapter.sections[0];

  const handleSelectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    const chapter = APPENDIX_DATA.find((c) => c.id === chapterId);
    if (chapter && chapter.sections.length > 0) {
      setSelectedSectionId(chapter.sections[0].id);
    }
  };

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-6 md:p-10 shadow-2xl max-w-4xl mx-auto font-serif">
      {/* 章切り替え（本家ブックマーク風タブ） */}
      <div className="flex gap-2 border-b border-amber-200 pb-3 mb-6 overflow-x-auto">
        {APPENDIX_DATA.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => handleSelectChapter(chapter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              selectedChapterId === chapter.id
                ? 'bg-amber-800 text-amber-50 shadow-md scale-105'
                : 'bg-amber-200/60 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <span className="font-mono text-amber-300 font-black">{chapter.number}.</span>
            {chapter.title}
          </button>
        ))}
      </div>

      {/* 2カラム表示 (左: 目次セクション / 右: 本文) */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* 左ナビゲーション */}
        <div className="space-y-1.5 bg-amber-100/40 p-3 rounded-xl border border-amber-200/80">
          <div className="text-[11px] font-sans font-bold text-amber-900/60 mb-2 px-1">
            {currentChapter.number}. {currentChapter.title} 目次
          </div>
          {currentChapter.sections.map((sec) => (
            <button
              key={sec.id}
              disabled={sec.isLocked}
              onClick={() => setSelectedSectionId(sec.id)}
              className={`w-full p-2.5 rounded-lg text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                sec.isLocked
                  ? 'opacity-40 bg-amber-100/30 text-slate-500 cursor-not-allowed'
                  : selectedSectionId === sec.id
                  ? 'bg-amber-800 text-amber-50 shadow'
                  : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900'
              }`}
            >
              <span>{sec.title}</span>
              {sec.isLocked && <span className="text-[10px] bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded">🔒 未実装</span>}
            </button>
          ))}
        </div>

        {/* 右本文エリア */}
        <div className="md:col-span-2 bg-amber-100/50 border border-amber-300/80 rounded-2xl p-6 min-h-[420px] shadow-inner">
          {currentSection.isLocked ? (
            <div className="text-center py-20 text-amber-800/60 text-xs">
              🔒 この項目はゲーム内でまだ実装されていません。<br />近日アップデート予定です。
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-amber-950 border-b border-amber-300 pb-2">
                {currentSection.title}
              </h2>

              {currentSection.content && (
                <p className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
                  {currentSection.content}
                </p>
              )}

              {/* サブセクション (A. B. C. D. など) */}
              {currentSection.subSections && (
                <div className="space-y-5 pt-2 border-t border-amber-200/80">
                  {currentSection.subSections.map((sub) => (
                    <div key={sub.id} className="bg-amber-50/80 rounded-xl p-4 border border-amber-200/80">
                      <h3 className="text-sm font-bold text-amber-950 mb-2">{sub.title}</h3>
                      <p className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};