import { useState } from 'react';
import { AREAS } from './data/areas';
import type { WorldType, Area } from './data/areas';

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
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const currentAreas = AREAS.filter((area) => area.world === selectedTab);

  const resetToTop = () => {
    setSelectedTab('maple-world');
    setSelectedArea(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header onGoTop={resetToTop} />
      <NoticeBanner />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <WorldTabs
          selectedTab={selectedTab}
          onSelectTab={(tab) => {
            setSelectedTab(tab);
            setSelectedArea(null);
          }}
        />

        {selectedTab === 'appendix' ? (
          <AppendixView />
        ) : selectedArea ? (
          <AreaDetail area={selectedArea} onBack={() => setSelectedArea(null)} />
        ) : (
          <AreaGrid
            selectedTab={selectedTab as WorldType}
            areas={currentAreas}
            onSelectArea={(area) => setSelectedArea(area)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
