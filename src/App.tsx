import { useState, useEffect } from 'react';
import { AREAS } from './data/areas';
import type { WorldType } from './data/areas';

import { Header } from './components/Header';
import { NoticeBanner } from './components/NoticeBanner';
import { Footer } from './components/Footer';
import { WorldTabs } from './components/WorldTabs';
import { AppendixView } from './components/AppendixView';
import { AreaGrid } from './components/AreaGrid';
import { AreaDetail } from './components/AreaDetail';

type TabType = WorldType | 'appendix';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<TabType>('maple-world');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  // Appendix（付録）用ハッシュ状態
  const [appendixChapter, setAppendixChapter] = useState<string | null>(null);
  const [appendixSection, setAppendixSection] = useState<string | null>(null);

  // 💡 URLハッシュ解析＆同期ロジック (hashchange イベント対応)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash; // 例: "#/appendix/歴史/メイプルワールド" や "#/リス港口/クン"

      if (!hash || hash === '#/') {
        // ハッシュがない場合は初期状態
        setSelectedAreaId(null);
        setSelectedEntityId(null);
        setAppendixChapter(null);
        setAppendixSection(null);
        return;
      }

      // #/ を除去してスラッシュで分割
      const parts = hash.replace(/^#\//, '').split('/');
      const firstPart = decodeURIComponent(parts[0] || '');
      const secondPart = parts[1] ? decodeURIComponent(parts[1]) : null;
      const thirdPart = parts[2] ? decodeURIComponent(parts[2]) : null;

      // 1. 付録 (Appendix) のURL処理: #/appendix/章/節
      if (firstPart === 'appendix') {
        setSelectedTab('appendix');
        setSelectedAreaId(null);
        setSelectedEntityId(null);
        setAppendixChapter(secondPart);
        setAppendixSection(thirdPart);
        return;
      }

      // 2. エリア詳細のURL処理: #/エリア名/エンティティ名
      const matchedArea = AREAS.find((a) => a.id === firstPart || a.name === firstPart);

      if (matchedArea) {
        setSelectedTab(matchedArea.world);
        setSelectedAreaId(matchedArea.id);
        setSelectedEntityId(secondPart);
        setAppendixChapter(null);
        setAppendixSection(null);
      }
    };

    // 初回読み込み時とハッシュ変更時に実行
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentAreas = AREAS.filter((area) => area.world === selectedTab);
  const selectedArea = AREAS.find((a) => a.id === selectedAreaId) || null;

  // トップへ戻る
  const resetToTop = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header onGoTop={resetToTop} />
      <NoticeBanner />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <WorldTabs
          selectedTab={selectedTab}
          onSelectTab={(tab) => {
            if (tab === 'appendix') {
              window.location.hash = '#/appendix';
            } else {
              window.location.hash = '#/';
              setSelectedTab(tab);
              setSelectedAreaId(null);
            }
          }}
        />

        {selectedTab === 'appendix' ? (
          <AppendixView
            selectedChapterTitle={appendixChapter}
            selectedSectionTitle={appendixSection}
          />
        ) : selectedArea ? (
          <AreaDetail
            area={selectedArea}
            selectedEntityId={selectedEntityId}
            onBack={() => {
              window.location.hash = '#/';
            }}
          />
        ) : (
          <AreaGrid
            selectedTab={selectedTab as WorldType}
            areas={currentAreas}
            onSelectArea={(area) => {
              window.location.hash = `#/${encodeURIComponent(area.id)}`;
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}