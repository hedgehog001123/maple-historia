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
import { Breadcrumb } from './components/Breadcrumb'; // 👈 追加
import { SearchBar } from './components/SearchBar'; // 👈 インポート

type TabType = WorldType | 'appendix';

export default function App() {
  const [selectedTab, setSelectedTab] = useState<TabType>('maple-world');
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  // Appendix（付録）用ハッシュ状態
  const [appendixChapter, setAppendixChapter] = useState<string | null>(null);
  const [appendixSection, setAppendixSection] = useState<string | null>(null);

  // 💡 URLハッシュ解析＆同期ロジック
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (!hash || hash === '#/') {
        setSelectedAreaId(null);
        setSelectedEntityId(null);
        setAppendixChapter(null);
        setAppendixSection(null);
        return;
      }

      const parts = hash.replace(/^#\//, '').split('/');
      const firstPart = decodeURIComponent(parts[0] || '');
      const secondPart = parts[1] ? decodeURIComponent(parts[1]) : null;
      const thirdPart = parts[2] ? decodeURIComponent(parts[2]) : null;

      // 1. 付録 (Appendix) のURL処理
      if (firstPart === 'appendix') {
        setSelectedTab('appendix');
        setSelectedAreaId(null);
        setSelectedEntityId(null);
        setAppendixChapter(secondPart);
        setAppendixSection(thirdPart);
        return;
      }

      // 2. エリア詳細のURL処理
      const matchedArea = AREAS.find((a) => a.id === firstPart || a.name === firstPart);

      if (matchedArea) {
        setSelectedTab(matchedArea.world);
        setSelectedAreaId(matchedArea.id);
        setSelectedEntityId(secondPart);
        setAppendixChapter(null);
        setAppendixSection(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentAreas = AREAS.filter((area) => area.world === selectedTab);
  const selectedArea = AREAS.find((a) => a.id === selectedAreaId) || null;

  // 💡 動的パンくずリストのデータ生成
  const getBreadcrumbItems = () => {
    const items = [];

    if (selectedTab === 'appendix') {
      items.push({
        label: '別冊付録',
        onClick: () => {
          window.location.hash = '#/appendix';
        },
      });

      if (appendixChapter) {
        items.push({
          label: appendixChapter,
          onClick: () => {
            window.location.hash = `#/appendix/${encodeURIComponent(appendixChapter)}`;
          },
        });
      }

      if (appendixSection) {
        items.push({
          label: appendixSection,
        });
      }
    } else {
      const worldNames: Record<WorldType, string> = {
        'maple-world': 'メイプルワールド',
        'arcane-river': 'アーケインリバー',
        grandis: 'グランディス',
      };

      items.push({
        label: worldNames[selectedTab as WorldType],
        onClick: () => {
          setSelectedAreaId(null);
          window.location.hash = '#/';
        },
      });

      if (selectedArea) {
        items.push({
          label: selectedArea.name,
          onClick: () => {
            window.location.hash = `#/${encodeURIComponent(selectedArea.id)}`;
          },
        });

        if (selectedEntityId) {
          items.push({
            label: selectedEntityId,
          });
        }
      }
    }

    return items;
  };

  const resetToTop = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header onGoTop={resetToTop} />
      <NoticeBanner />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <SearchBar />

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

        {/* 🍞 パンくずリスト表示エリア */}
        <Breadcrumb items={getBreadcrumbItems()} />

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