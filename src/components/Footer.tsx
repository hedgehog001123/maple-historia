export const Footer = () => {
    return (
      <footer className="bg-white border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500 space-y-2 mt-auto">
        <p className="font-semibold text-slate-600">
          メイプルヒストリア - MapleStory Fan Site
        </p>
        <p className="text-[11px] leading-relaxed max-w-2xl mx-auto text-slate-400">
          当サイトは『メイプルストーリー』の個人ファンサイトであり、株式会社ネクソン様および関連会社様とは一切関係ありません。<br />
          非営利・無広告で運営されています。使用しているゲーム画像・テキスト等の著作権および商標権は、NEXON Korea Corporation 及び NEXON Co., Ltd. に帰属します。<br />
          権利者様からの削除・修正要請があった場合は、速やかに対応いたします。
        </p>
        <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 max-w-xs mx-auto">
          &copy; NEXON Korea Corp. & NEXON Co., Ltd. All Rights Reserved.
        </p>
      </footer>
    );
  };