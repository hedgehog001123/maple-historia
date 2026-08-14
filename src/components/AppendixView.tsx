import { useState } from 'react';

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

const APPENDIX_DATA: Chapter[] = [
  {
    id: 'history',
    number: 'Ⅰ',
    title: '歴史',
    sections: [
      {
        id: 'maple-world',
        title: '1. メイプルワールド',
        content: `メイプルワールドは、冒険者たちの旅が始まった、まるで故郷のような場所です。人間をはじめ、さまざまな種族が共に暮らしています。

小さな町から巨大な都市、密林、砂漠、さらには海の中まで多彩な自然環境の中で、いつでも新しい楽しみを見つけられる世界でもあります。

しかし今、メイプルワールドは堕落した光の超越者、暗黒の魔法使いの脅威にさらされています。これに対抗するため、メイプルワールドの人々は連合を結成し、立ち向かおうとしています。`,
        subSections: [
          {
            id: 'era-of-chaos',
            title: 'A. 混沌の時代',
            content: `はるか昔、メイプルワールドには戦争と略奪が絶えない混沌の時代がありました。白い魔法使いと呼ばれた偉大な魔法使いが現れ、乱世の中多くの人々を救いましたが、それでも戦いは終わる気配を見せませんでした。

絶望した白い魔法使いは、究極の光を求め研究に没頭し、ついに真理の果てへと辿り着き、光の超越者として覚醒します。しかしその瞬間、彼は無念にも暗黒の魔法使いへと堕ちてしまったのです。`,
          },
          {
            id: 'black-mage-history',
            title: 'B. 暗黒の魔法使い',
            content: `暗黒の魔法使いは軍団長たちを従え、メイプルワールドの征服を進めていきました。彼は時間の神殿で時間の女神ルインヌを捕らえ、彼女が持つ時間の力を奪い取ります。さらに、メイプルワールドの女王アリアも、彼の手下によって命を奪われてしまいました。

求心力を失ったメイプルワールドは、暗黒の魔法使いの攻撃に為す術なく蹂躙されていきます。ついにはオシリア大陸とビクトリアアイランドが分割され、焼き尽くされたリプレをはじめ多くの難民たちは、危険を避けるため、開拓の進んでいなかったビクトリアアイランドへと逃れるほかありませんでした。`,
          },
          {
            id: 'heroes',
            title: 'C. 英雄',
            content: `暗黒の魔法使いの魔の手がメイプルワールド全土を覆い尽くしたとき、世界を救うために立ち上がった者たちがいました。

それが、5人の英雄です。彼らは各地を巡り、人々を救い出し、軍団長たちを打ち倒しながら、ついに暗黒の魔法使いとの決戦へと挑みました。命を賭した激闘の末、英雄たちはついに暗黒の魔法使いを封印することに成功したのです。`,
          },
          {
            id: 'present',
            title: 'D. 現在',
            content: `暗黒の魔法使いは封印されたものの、彼が残した呪いは英雄たちに大きな代償をもたらしました。英雄たちは氷に閉ざされ、深い眠りへと落ちていったのです。ただひとり…ドラゴンマスター、フリードを除いて。オニックスドラゴンの王フリエルが、主であるフリードへの呪いを肩代わりしたのです。

仲間を失い、ひとり残されたフリードは、それでも絶望しませんでした。いつの日か再び英雄たちが目覚めるその時のために、そしてメイプルワールドを守るために、彼は着実にその備えを積み重ねていったのです。

長い時が流れ、現在。数々の出来事が起こりながらも、メイプルワールドは再び安定を取り戻し、長い間平和な時を過ごしていました。しかし、目に見えぬ場所で、闇は再び芽吹きつつあったのです。各地で軍団長、そして暗黒の魔法使いの力が再び胎動し始めていました。

もちろん、メイプルワールドにはその気配に気づいた者たちもいました。海賊たちは暗黒の魔法使いを阻止するためにビクトリアアイランドへ帰還し、冒険者たちを再び立ち上がらせました。そしてエレヴには、女王の血を継ぐ者が戻ってきます。神獣の力を受け入れ、正式な女王として生まれ変わったシグナスは、メイプルワールドを守るためにシグナス騎士団を創設しました。

一方その頃、暗黒の魔法使いの軍団長オルカはブラックウィングという組織を立ち上げ、エーデルシュタインを占領します。自由を奪われ苦しむエーデルシュタインの住民たちは、レジスタンスを結成し、静かに力を蓄えていきました。

そして、呪いにより氷に閉ざされていた英雄が再びその意識を覚醒し、異なる世界から訪れた者たちもメイプルワールドのために力を貸してくれました。こうして仲間たちが集い、メイプル連合は、暗黒の魔法使いとの決戦に向けて歩みを進めていったのです。`,
          },
        ],
      },
      {
        id: 'grandis',
        title: '2. グランディス',
        isLocked: true,
      },
      {
        id: 'masteria',
        title: '3. マステリア',
        isLocked: true,
      },
    ],
  },
  {
    id: 'races',
    number: 'Ⅱ',
    title: '種族',
    sections: [
      {
        id: 'transcendent',
        title: '1. 超越者',
        content: `メイプルワールドには、「超越者」と呼ばれる偉大な存在がいます。彼らはそれぞれ〈光〉〈時間〉〈生命〉の領域を司り、その領域において強大な権能を振るいます。

しかし、彼らの役割の中でそれ以上に重要だと言われているのは、存在そのものによって世界の均衡を保つことにあります。

世界の均衡とは、一体どのようなものなのでしょうか？`,
        subSections: [
          {
            id: 'black-mage-race',
            title: 'A. 暗黒の魔法使い',
            content: `メイプルワールドの〈光〉の超越者です。かつては「白い魔法使い」と呼ばれる存在でしたが、なんらかの理由により堕落し、暗黒の魔法使いへと変わり果てたと伝えられています。

英雄たちの封印が解けた今、暗黒の魔法使いが再び活動を始めている兆候が各地で確認されつつあります。`,
          },
          {
            id: 'rhinne',
            title: 'B. ルインヌ',
            content: `メイプルワールドの〈時間〉の超越者です。多くの者から「時間の女神」と呼ばれており、実際にリプレの空には、ルインヌを祀った時間の神殿が存在します。

しかし、女神である彼女は現在、封印された状態にあります。暗黒の魔法使いにその力を奪われてしまったためです。`,
          },
          {
            id: 'alicia',
            title: 'C. アリーシャ',
            content: `メイプルワールドの〈生命〉の超越者です。「世界樹」と呼ばれることもあります。かつて暗黒の魔法使いの侵攻から多くの生命を守るために、莫大な力を使い果たしてしまい、現在はスリーピーウッドの奥深くで眠りについているとされています。`,
          },
          {
            id: 'aiona',
            title: 'D. アイオナ',
            content: `かつてグランディスには、〈光〉の超越者となる資格を持つ二人の候補者が存在しました。その中から選ばれ、最終的に〈光〉の超越者となったのがアイオナです。

ですが、現在その行方は分かっていません。`,
          },
        ],
      },
      {
        id: 'goddess',
        title: '2. 女神',
        content: `エルダについてご存じでしょうか？エルダとは、世界を形作る最も根源的な力のことです。そして、この力を人々へとつなぐ存在こそが「メイプル女神」です。

彼女は姿を現さず、どこからともなくエルダの力を見守っていると言われています。しかし、ときには正体を隠したまま人々の前に姿を現すことがあるという噂もささやかれているのです。`,
      },
      {
        id: 'human',
        title: '3. 人間',
        content: `メイプルワールドでもっともよく見かける種族です。小さく丸い耳を持ち、寿命は比較的短いほうに分類されます。

そのあまりの個体数の多さから「人間は平凡なのが特徴だ」と言われることもありますが、実際には計り知れない潜在能力を秘めていることが知られています。

また、一部の魔法使いは魔法の力を駆使し、通常より長い寿命を得ることもあるようです。`,
      },
      {
        id: 'fairy',
        title: '4. 妖精',
        content: `メイプルワールドでは、人間についでよく見かける種族が「妖精」です。彼らは人間よりもはるかに長寿で、魔法への高い適性を持つことで知られています。

一般的にはまとめて「妖精」と呼ばれますが、実際には住む地域や外見・能力の違いによって、いくつかの種族に細かく分かれています。`,
      },
      {
        id: 'dragon',
        title: '5. ドラゴン',
        content: `ただし、メイプルワールドのドラゴンには、かつて「三王」と呼ばれる存在がいました。

しかしそのうち一体であるフリエンは行方不明となり、ナインスピリットはホンテイルの裏切りによって姿を消してしまっています。

そして今なお名を轟かせているのは、リプレの深部で悪名を馳せるホンテイルただ一体のみとなっています。`,
      },
    ],
  },
  {
    id: 'terms',
    number: 'Ⅲ',
    title: '集団、器物及びその他の用語',
    sections: [
      {
        id: 'dimension-gate',
        title: '1. ディメンションゲート',
        content: `ビクトリアアイランドの「リーフロード」に存在する、奇妙な通路です。これを利用することで、別の次元へ移動できると言われています。

実際に、異なる次元の勇者たちが、このディメンションゲートを通じて姿を現しているのです。`,
      },
      {
        id: 'maple-alliance',
        title: '2. メイプル連合',
        content: `暗黒の魔法使いからメイプルワールドを守るため、女王シグナスによって創設された組織です。

シグナス騎士団をはじめ、ブラックウィングからエーデルシュタインを取り戻すために戦うレジスタンス、メイプルワールドを愛する冒険者や英雄たち、さらには、さまざまな事情を抱えて異世界から訪れた勇者たちまで。

多くの人々がこの連合の名のもとに力を合わせ、活動しています。`,
      },
      {
        id: 'commander',
        title: '3. 軍団長',
        content: `暗黒の魔法使いの数多い配下の中でも、とりわけ危険な存在とされる者たちです。

彼らの多くは、軍団長となる前からすでに強大な力を持っていましたが、暗黒の魔法使いの力を授かることで、さらに人間の領域を超えた存在へと変貌したといわれています。

暗黒の魔法使いと並び、連合がもっとも警戒すべき「大敵」であることは疑いようがありません。`,
        subSections: [
          {
            id: 'black-wing',
            title: 'A. ブラックウィング',
            content: `暗黒の魔法使いの軍団長、オルカが組織した集団です。彼らはエーデルシュタインを占領し、人員や物資を容赦なく搾取しています。

構成員一人ひとりの力はそれほど高くありませんが、その数の多さに加え、エーデルシュタインから奪った資材で強力な兵装を整えているため、非常に危険な存在となっています。`,
          },
        ],
      },
      {
        id: 'sealing-stone',
        title: '4. 封印石',
        content: `五英雄の一人であるドラゴンマスター「フリード」が、暗黒の魔法使いに対抗するために作り上げたアーティファクトです。

暗黒の魔法使いを止められなかった場合に、各地域の時間を巻き戻してメイプルワールドを復元するために作られたと言われています。

さらにこのアーティファクトには、まだ明かされていない、より強大な力が秘められているとも……。`,
      },
      {
        id: 'reiriki',
        title: '5. 霊力',
        content: `世界を構成するエネルギーであり、世界の意志によって発現することのできる力です。

万物に宿り、あらゆる場所に存在する気や意志に近いものと言えます。異世界ニッポンにはこの霊力に意志を与え、望む形の力として具現化する陰陽術が存在、これを扱う陰陽師たちが古より活動してきました。

暁の陣とオダ軍勢がニッポンからジパングへと転移した際、多くの陰陽師も共に渡ってきました。代表的な陰陽師としてはカンナとその師匠であるツチミカドハルアキ、そしてかつて彼の弟子であったものの破門されたモリランマルがいます。

霊力は本来受動的なエネルギーですが、世界に滅亡の危機が訪れると、その運命を阻止するために意志を持って介入すると言われています。`,
      },
    ],
  },
];

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