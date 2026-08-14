// ひらがなを全角カタカナに変換する関数
export const toKatakana = (str: string): string => {
    return str.replace(/[\u3041-\u3096]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    );
  };
  
  // 検索用に文字列を正規化（小文字化 ＋ カタカナ化）
  export const normalizeForSearch = (str: string): string => {
    return toKatakana(str.toLowerCase());
  };
  