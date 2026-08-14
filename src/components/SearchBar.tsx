import { useState, useRef, useEffect } from 'react';
import { AREAS } from '../data/areas';
import { APPENDIX_DATA } from '../data/appendix';
import { normalizeForSearch, stripTags } from '../utils/search';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'area' | 'npc' | 'monster' | 'appendix';
  hash: string;
  image?: string;
  matchPriority: number; // 1: 前方一致, 2: 部分一致, 3: 本文一致
  snippet?: string;
}

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 外側クリック判定 ＆ ⌨️ `/` キーボードショートカット
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 説明文からヒット箇所の前後を切り出す関数
  const extractSnippet = (text: string, rawQuery: string): string => {
    const cleanText = stripTags(text);
    const normText = normalizeForSearch(cleanText);
    const normQuery = normalizeForSearch(rawQuery);
    const index = normText.indexOf(normQuery);

    if (index === -1) return '';

    const start = Math.max(0, index - 15);
    const end = Math.min(cleanText.length, index + rawQuery.length + 15);

    let snippet = cleanText.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < cleanText.length) snippet = snippet + '...';

    return snippet;
  };

  // テキスト中の検索キーワードをハイライトする処理
  const highlightText = (text: string, rawQuery: string) => {
    if (!rawQuery.trim()) return text;

    const normQuery = normalizeForSearch(rawQuery);
    const normText = normalizeForSearch(text);

    const index = normText.indexOf(normQuery);
    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + rawQuery.length);
    const after = text.substring(index + rawQuery.length);

    return (
      <>
        {before}
        <mark className="bg-amber-200 text-amber-950 font-bold px-0.5 rounded">
          {match}
        </mark>
        {after}
      </>
    );
  };

  // 検索＆抽出処理
  const getResults = (): SearchResultItem[] => {
    if (!query.trim()) return [];

    const normQuery = normalizeForSearch(query.trim());
    const results: SearchResultItem[] = [];

    const getTitlePriority = (title: string): number => {
      const normTitle = normalizeForSearch(title);
      if (normTitle.startsWith(normQuery)) return 1;
      if (normTitle.includes(normQuery)) return 2;
      return 0;
    };

    AREAS.forEach((area) => {
      // 地域
      const areaPriority = getTitlePriority(area.name);
      const cleanAreaDesc = stripTags(area.description || '');
      const normAreaDesc = normalizeForSearch(cleanAreaDesc);

      if (areaPriority > 0) {
        results.push({
          id: `area-${area.id}`,
          title: area.name,
          subtitle: `地域 (${area.world === 'maple-world' ? 'メイプルワールド' : area.world === 'arcane-river' ? 'アーケインリバー' : 'グランディス'})`,
          type: 'area',
          hash: `#/${encodeURIComponent(area.id)}`,
          matchPriority: areaPriority,
        });
      } else if (normAreaDesc.includes(normQuery)) {
        results.push({
          id: `area-${area.id}`,
          title: area.name,
          subtitle: `地域 (${area.world === 'maple-world' ? 'メイプルワールド' : area.world === 'arcane-river' ? 'アーケインリバー' : 'グランディス'})`,
          type: 'area',
          hash: `#/${encodeURIComponent(area.id)}`,
          matchPriority: 3,
          snippet: extractSnippet(area.description || '', query),
        });
      }

      // NPC
      area.npcs?.forEach((npc) => {
        const npcPriority = getTitlePriority(npc.name);
        const cleanNpcDesc = stripTags(npc.description || '');
        const normNpcDesc = normalizeForSearch(cleanNpcDesc);

        if (npcPriority > 0) {
          results.push({
            id: `npc-${area.id}-${npc.name}`,
            title: npc.name,
            subtitle: `${area.name} - 人物`,
            type: 'npc',
            hash: `#/${encodeURIComponent(area.id)}/${encodeURIComponent(npc.name)}`,
            image: npc.image,
            matchPriority: npcPriority,
          });
        } else if (normNpcDesc.includes(normQuery)) {
          results.push({
            id: `npc-${area.id}-${npc.name}`,
            title: npc.name,
            subtitle: `${area.name} - 人物`,
            type: 'npc',
            hash: `#/${encodeURIComponent(area.id)}/${encodeURIComponent(npc.name)}`,
            image: npc.image,
            matchPriority: 3,
            snippet: extractSnippet(npc.description || '', query),
          });
        }
      });

      // モンスター
      area.monsters?.forEach((monster) => {
        const monsterPriority = getTitlePriority(monster.name);
        const cleanMonsterDesc = stripTags(monster.description || '');
        const normMonsterDesc = normalizeForSearch(cleanMonsterDesc);

        if (monsterPriority > 0) {
          results.push({
            id: `monster-${area.id}-${monster.name}`,
            title: monster.name,
            subtitle: `${area.name} - モンスター`,
            type: 'monster',
            hash: `#/${encodeURIComponent(area.id)}/${encodeURIComponent(monster.name)}`,
            image: monster.image,
            matchPriority: monsterPriority,
          });
        } else if (normMonsterDesc.includes(normQuery)) {
          results.push({
            id: `monster-${area.id}-${monster.name}`,
            title: monster.name,
            subtitle: `${area.name} - モンスター`,
            type: 'monster',
            hash: `#/${encodeURIComponent(area.id)}/${encodeURIComponent(monster.name)}`,
            image: monster.image,
            matchPriority: 3,
            snippet: extractSnippet(monster.description || '', query),
          });
        }
      });
    });

    // 付録
    APPENDIX_DATA.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        const cleanTitle = section.title.replace(/^\d+\.\s*/, '');
        const appPriority = getTitlePriority(cleanTitle);
        const cleanContent = stripTags(section.content || '');
        const normContent = normalizeForSearch(cleanContent);

        if (appPriority > 0) {
          results.push({
            id: `app-${section.id}`,
            title: cleanTitle,
            subtitle: `別冊付録 - ${chapter.title}`,
            type: 'appendix',
            hash: `#/appendix/${encodeURIComponent(chapter.title)}/${encodeURIComponent(cleanTitle)}`,
            matchPriority: appPriority,
          });
        } else if (normContent.includes(normQuery)) {
          results.push({
            id: `app-${section.id}`,
            title: cleanTitle,
            subtitle: `別冊付録 - ${chapter.title}`,
            type: 'appendix',
            hash: `#/appendix/${encodeURIComponent(chapter.title)}/${encodeURIComponent(cleanTitle)}`,
            matchPriority: 3,
            snippet: extractSnippet(section.content || '', query),
          });
        }
      });
    });

    return results.sort((a, b) => a.matchPriority - b.matchPriority);
  };

  const results = getResults();

  const handleSelect = (hash: string) => {
    window.location.hash = hash;
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto mb-6">
      {/* 検索入力欄 */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="名前や説明文で検索… ( / キーでフォーカス)"
          className="w-full px-4 py-2.5 pl-10 pr-12 bg-white border border-amber-200/80 rounded-2xl text-xs text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 shadow-sm transition"
        />
        <span className="absolute left-3 text-amber-800/40 text-sm">🔍</span>

        {/* 右端の表示（文字入力があればクリアボタン、なければ `/` バッジ） */}
        <div className="absolute right-3 flex items-center">
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="text-amber-800/40 hover:text-amber-800 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold bg-amber-100/80 text-amber-900/60 border border-amber-300/60 px-1.5 py-0.5 rounded shadow-xs">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* サジェストリスト */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-amber-50 border border-amber-300/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto font-serif">
          {results.length > 0 ? (
            <div className="p-2 space-y-1">
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.hash)}
                  className="w-full text-left p-2 rounded-xl hover:bg-amber-200/60 transition cursor-pointer flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-100/80 border border-amber-200/80 flex items-center justify-center p-0.5 shrink-0 overflow-hidden mt-0.5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-base">
                        {item.type === 'area'
                          ? '🗺️'
                          : item.type === 'npc'
                          ? '👤'
                          : item.type === 'monster'
                          ? '👾'
                          : '📜'}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-amber-950 text-xs truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-amber-800/70 truncate mt-0.5">
                      {item.subtitle}
                    </p>

                    {item.snippet && (
                      <p className="text-[10px] text-amber-900/80 mt-1 italic bg-amber-100/60 px-2 py-1 rounded border border-amber-200/60 leading-relaxed">
                        {highlightText(item.snippet, query)}
                      </p>
                    )}
                  </div>

                  <span className="text-amber-700/40 group-hover:text-amber-800 text-xs font-bold shrink-0 mt-1">
                    ➔
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-amber-900/60 font-bold">
              該当する記事が見つかりませんでした 🍃
            </div>
          )}
        </div>
      )}
    </div>
  );
};