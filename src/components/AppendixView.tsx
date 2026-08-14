import { useState, useEffect } from 'react';
import { APPENDIX_DATA } from '../data/appendix';

interface AppendixViewProps {
  selectedChapterTitle?: string | null;
  selectedSectionTitle?: string | null;
}

export const AppendixView = ({
  selectedChapterTitle,
  selectedSectionTitle,
}: AppendixViewProps) => {
  // 初期値はデータの一番最初の章・セクション
  const [activeChapterId, setActiveChapterId] = useState<string>(APPENDIX_DATA[0].id);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    APPENDIX_DATA[0].sections[0].id
  );

  // 💡 URLハッシュ（/#/appendix/歴史/メイプルワールド など）の変化を感知して自動切り替え
  useEffect(() => {
    if (selectedChapterTitle) {
      const decodedChapter = decodeURIComponent(selectedChapterTitle);
      // タイトル（「歴史」「種族」など）または ID で章を検索
      const chapter = APPENDIX_DATA.find(
        (c) => c.title === decodedChapter || c.id === decodedChapter
      );

      if (chapter) {
        setActiveChapterId(chapter.id);

        if (selectedSectionTitle) {
          const decodedSection = decodeURIComponent(selectedSectionTitle);
          // セクションタイトル（「1. メイプルワールド」や「メイプルワールド」など）で検索
          const section = chapter.sections.find(
            (s) =>
              s.title === decodedSection ||
              s.title.includes(decodedSection) ||
              s.id === decodedSection
          );
          if (section) {
            setActiveSectionId(section.id);
          }
        } else {
          // セクション未指定ならその章の最初の未ロックセクションを開く
          const firstUnlocked = chapter.sections.find((s) => !s.isLocked);
          if (firstUnlocked) setActiveSectionId(firstUnlocked.id);
        }
      }
    }
  }, [selectedChapterTitle, selectedSectionTitle]);

  const currentChapter =
    APPENDIX_DATA.find((c) => c.id === activeChapterId) || APPENDIX_DATA[0];
  const currentSection =
    currentChapter.sections.find((s) => s.id === activeSectionId) ||
    currentChapter.sections[0];

  // 章切り替え時の処理（URLハッシュも更新）
  const handleChapterChange = (chapter: (typeof APPENDIX_DATA)[0]) => {
    setActiveChapterId(chapter.id);
    const firstUnlocked = chapter.sections.find((s) => !s.isLocked) || chapter.sections[0];
    setActiveSectionId(firstUnlocked.id);

    // 例: #/appendix/歴史/1. メイプルワールド
    const cleanSectionTitle = firstUnlocked.title.replace(/^\d+\.\s*/, ''); // 数字プレフィックスを除去してもOK
    window.location.hash = `#/appendix/${encodeURIComponent(chapter.title)}/${encodeURIComponent(cleanSectionTitle)}`;
  };

  // セクション切り替え時の処理（URLハッシュも更新）
  const handleSectionChange = (section: (typeof APPENDIX_DATA)[0]['sections'][0]) => {
    if (section.isLocked) return;
    setActiveSectionId(section.id);

    // タイトルから「1. 」などの数字を取り除いた読みやすい日本語名でハッシュ化
    const cleanSectionTitle = section.title.replace(/^\d+\.\s*/, '');
    window.location.hash = `#/appendix/${encodeURIComponent(currentChapter.title)}/${encodeURIComponent(cleanSectionTitle)}`;
  };

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto font-serif space-y-6">
      {/* 1. 大章タブ (Ⅰ. 歴史 / Ⅱ. 種族 / Ⅲ. 用語) */}
      <div className="flex flex-wrap items-center gap-3 border-b border-amber-200/80 pb-4">
        {APPENDIX_DATA.map((chapter) => {
          const isActive = chapter.id === currentChapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => handleChapterChange(chapter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-800 text-amber-50 shadow-md'
                  : 'bg-amber-200/60 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <span className="opacity-70">{chapter.number}.</span>
              <span>{chapter.title}</span>
            </button>
          );
        })}
      </div>

      {/* 2. メインレイアウト (左: 目次リスト / 右: 本文) */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* 左: 目次リスト */}
        <div className="space-y-2 bg-amber-100/40 p-3 rounded-xl border border-amber-200/80">
          <h3 className="text-xs font-bold text-amber-900/60 px-2 pb-1 border-b border-amber-200/60">
            {currentChapter.number}. {currentChapter.title} 目次
          </h3>
          <div className="space-y-1">
            {currentChapter.sections.map((section) => {
              const isActive = section.id === currentSection.id;
              return (
                <button
                  key={section.id}
                  disabled={section.isLocked}
                  onClick={() => handleSectionChange(section)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    section.isLocked
                      ? 'opacity-40 cursor-not-allowed bg-amber-100/30 text-amber-800'
                      : isActive
                      ? 'bg-amber-800 text-amber-50 shadow-sm'
                      : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/70'
                  }`}
                >
                  <span className="truncate">{section.title}</span>
                  {section.isLocked && (
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded shrink-0">
                      未実装
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右: 本文表示エリア */}
        <div className="md:col-span-2 bg-amber-100/50 border border-amber-300/80 rounded-2xl p-6 min-h-[460px] shadow-inner space-y-6">
          {/* タイトル */}
          <div className="border-b border-amber-300/60 pb-3">
            <h2 className="text-2xl font-black text-amber-950">
              {currentSection.title}
            </h2>
          </div>

          {/* メイン説明文 */}
          {currentSection.content && (
            <p className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
              {currentSection.content}
            </p>
          )}

          {/* サブセクション (A. 混沌の時代 など) */}
          {currentSection.subSections && currentSection.subSections.length > 0 && (
            <div className="space-y-4 pt-2">
              {currentSection.subSections.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 space-y-2"
                >
                  <h3 className="font-bold text-amber-950 text-sm">{sub.title}</h3>
                  <p className="text-xs text-amber-900/90 leading-relaxed whitespace-pre-line">
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};