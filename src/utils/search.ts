// ひらがなを全角カタカナに変換する関数
export const toKatakana = (str: string): string => {
    return str.replace(/[\u3041-\u3096]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    );
  };
  
  // 検索用に文字列を正規化（小文字化 ＋ カタカナ化）
  export const normalizeForSearch = (str: string): string => {
    if (!str) return '';
    return toKatakana(str.toLowerCase());
  };
  
  // 💡 本文中の [[npc:テオ]] のようなタグを検索前に除去する関数
  export const stripTags = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/\[\[(?:npc|monster|appendix):[^|]+\|([^\]]+)\]\]/g, '$1')
      .replace(/\[\[(?:npc|monster|appendix):([^\]]+)\]\]/g, '$1');
  };