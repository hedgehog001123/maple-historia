export type WorldType = 'maple-world' | 'arcane-river' | 'grandis';

export type Area = {
  id: string;
  name: string;
  world: WorldType;
  bookColor: 'blue' | 'red' | 'green' | 'purple' | 'brown';
  description: string;
  imageUrl?: string;
  count: string; // 👈 monster/npcの合計カウント
  npcs?: {
    name: string;
    description?: string;
    image?: string;
  }[];
  monsters?: {
    name: string;
    description?: string;
    image?: string;
  }[];
};

export const WORLD_DESCRIPTIONS: Record<WorldType, { name: string; desc: string }> = {
  'maple-world': {
    name: 'メイプルワールド',
    desc: '果てしなく広がる神秘の大地、メイプルワールド。そこは数多くの生命と魔法が共存する世界。雲海に浮かぶ天空の島、深海の都市、氷の山脈、そして荒れ盛る砂漠…。各地域にはそれぞれの歴史と伝説が息づいている。\n\n長きにわたり、メイプルワールドは光と闇、秩序と混沌が交錯する舞台だった。その舞台の上で、冒険者たちはそれぞれの物語を紡ぎ出し、今日もまた、新たな英雄の登場を待ちわびている。',
  },
  'arcane-river': {
    name: 'アーケインリバー',
    desc: '世界を構成する根源エネルギー、「エルダ」が一つに集まり流れる巨大な川。現実の境界が崩れたこの場所では、エルダの川筋に沿って、夢の都市と神秘の森、記憶の沼を抜け、太初的海へと流れ込んでいく。\n\nこの不可思議な川は暗黒の魔法使いへと至る最後の関門であり、同時に彼が用意した最後の舞台でもある。今、運命に立ち向かう対敵者だけがこの流れを遡り、終着の地にて、メイプルワールドの命運を懸けた最後の決戦に臨む。',
  },
  'grandis': {
    name: 'グランディス',
    desc: '(まだ調査が進行中の地域です。今後のアップデートをお待ちください。）',
  },
};

export const AREAS: Area[] = [
  // ==========================================
  // メイプルワールド (全62地域)
  // ==========================================
  {
    id: 'メイプルアイランド',
    name: 'メイプルアイランド',
    world: 'maple-world',
    bookColor: 'purple',
    description: 'メイプルワールドに初めて足を踏み入れたすべての冒険者の故郷であり、冒険が始まる場所。島の西側には伝説が語り継がれる巨大なモミジの木がそびえ、東側にはビクトリアアイランドへ繋がる小さな港がある。\n\n旅の始まりを温かく迎えてくれたヒナとセーラは、今は静かに暮らしている。お留守番をしていたセンは、今でもニナのキャンディーがお気に入りだが、最近は少し思春期を迎えたようだ。戦い方を教えてくれたトードやピーター、ロビン先生たちはビクトリアアイランドへと移住したが、他の住民たちは今も変わらぬ日常を楽しんでいる。',
    count: '0/12',
  },
  {
    id: 'ヘネシス',
    name: 'ヘネシス',
    world: 'maple-world',
    bookColor: 'red',
    description: 'ビクトリアアイランドの中央に位置する、穏やかで平和な町。巨大なキノコと青々とした草原に覆われたこの地は、弓矢を携えた弓使いたちが集い、訓練に励む場所として知られている。\n\n町全体に温かく活発な空気が満ちており、冒険へ旅立つ初心者たちが、その第一歩を記す重要な拠点となっている。',
    count: '0/50',
  },
  {
    id: 'リス港口',
    name: 'リス港口',
    world: 'maple-world',
    bookColor: 'purple',
    description: 'ビクトリアアイランドの最西端に位置する、海に面した港町。紺碧の波が打ち寄せるこの地は、冒険の旅を始めた者たちが、次なる大陸へと船出するために必ず通る旅立ちの場所である。\n\n一見、穏やかに見える町の至る所には、多くの船乗りや商人たちで賑わっている。彼らはまだ見ぬ新たな冒険の物語が語られるのを、今か今かと待ち望んでいるのだ。',
    count: '15/15',
    npcs: [
      {
        name: 'クン',
        image: '/images/npcs/Maple_260814_122654.png',
        description: `リス港口に佇む筋肉質の男。かつてはリス港口で随一の船乗りとして、その名を馳せた。現在は第一線を退き、航海からは身を引いたと公言している。だが、どうしても行きつきたい場所があるのなら、「ヤシのドリンク」を持参し、そっと頼んでみるといい。\n\nそのいかつい外見とは裏腹に、情に厚い人物でもある。メイプルアイランドの出身であり、時折傭兵を派遣するなど、故郷のために動いている。その人脈も侮れない。メイプルアイランドのルーカスやマイはもちろんのこと、どこかの角を持つ王子とも面識があるようだ。\n\n付言すれば、筆者もまたクンとは縁がある。まだ駆け出しの冒険者であった頃、彼から転職に関する助言を受け、親交を深めるに至ったのだ。\n\n- 調査員リト`,
      },
      {
        name: 'ゴールドリッチ',
        image: '/images/npcs/Maple_260814_122659.png',
        description: `メイプルワールドでも有数の富豪として知られる人物。複数の邸宅を所有しているが、海をこよなく愛するため、リス港口に滞在していることが多いという。\n\nかつては手広く事業を展開していたが、近頃はその規模をやや縮小したようだ。もしかすると、次なる新規事業への布石なのかもしれない。\n\n- 調査員リト`,
      },
      {
        name: 'テオ',
        image: '/images/npcs/Maple_260814_122701.png',
        description: `リス港口で最も独創的な髭を生やしている男。その風貌は山賊のようにも見えるが、実は心優しき善人である。彼もかつては冒険者をやっていて、未知の世界を求めて旅をしていたという。引退してリス港口の船員として定住した今でも、筆者のような冒険者が訪れると若き日の自分を見ているようだと喜んでくれる。冒険者の大先輩として、一度挨拶に伺ってみるのも良いだろう。\n\nそういえば以前、彼が関節炎の薬の材料として[[monster:マノ|マノ]]やデンデンのカラを探していたのを思い出した。果たして無事に入手できたのだろうか。\n\n- 調査員リト`,
      },
      {
        name: 'ゾーン',
        image: '/images/npcs/Maple_260814_122704.png',
        description: `リス港口にいる、青白い顔をした男。かつては船乗りであったが早々に引退し、現在は漁師として生計を立てている。船乗り時代の後遺症か、慢性的な関節炎にひどく苦しめられているようだ。\n\n彼の友人である[[npc:テオ|テオ]]は、近頃ゾーンが木箱を肌身離さず持ち歩き不可解な行動を繰り返していることを不審に思っているらしい。…だが、筆者はその真相を知っている。あの箱の中身は、ただの関節炎の薬に過ぎないということを。\n\n- 調査員リト`,
      },
      {
        name: 'モンロンジジ',
        image: '/images/npcs/Maple_260814_122707.png',
        description: `リス港口にいる、優しそうな印象の老人。見慣れぬ衣服を身にまとっていることから、遠方の地から来た人のようだ。\n\n彼は常々、多くの人々と出会い、友を作ることの重要性を説いている。「旅路の果てに真に残るものは、色褪せぬ思い出と、その思い出を分かち合える友だけなのだ」と。\n\n- 調査員リト`,
      },
      {
        name: 'バイキン',
        image: '/images/npcs/Maple_260814_122712.png',
        description: `リス港口の船員の一人。冒険を好み、航海の傍ら頻繁に宝箱を発見しては持ち帰っていたという。彼は長年「暴風の海」へ出ることを熱望していたが、ついにデイビィゾーンの巣窟で古地図の断片を集め、その悲願を叶えるようになった。\n\n危険を承知で、なお未知の海へ挑もうとするその姿。職業こそ違えど、その魂は我々と同じ冒険者そのものではないだろうか。\n\n- 調査員リト`,
      },
      {
        name: 'ジェーン',
        image: '/images/npcs/Maple_260814_122710.png',
        description: `リス港口にいる、うさ耳のカチューシャをつけた少女。その変わった装いは、ひときわ人目を引く。元々は冒険者になることを夢見ていたが、父親の反対により冒険に出られずにいるという。\n\nだが、彼女の真の才能は冒険者ではなく、錬金術にあったのかもしれない。書物を手本に独学で調合しただけで希少なポーションを生み出し、その才能を元に一冊の本まで書き上げたのだ。その本のタイトルが、「ジェーンのサルも真似できる初心者のための錬金術！」である。マガティアのアルカドノ協会長であるマッドさえも知るほどに有名な本だそうだ。\n\n一体どのような内容であれば、あれほどの権威の記憶にさえ刻まれるというのだろうか。いずれ筆者も、一度目を通してみたいものだ。\n\n- 調査員リト`,
      },
      {
        name: 'ゴールドマン',
        image: '/images/npcs/Maple_260814_122714.png',
        description: `リス港口で倉庫業を営む男。その服飾や口調は極めて独特で、おそらく他の地域から渡来した人物であろう。\n\nビクトリアアイランドを旅していると、時折彼と同じ名前で、生業も同じという人物に出会うことがある。その上、容姿までが酷似しているため、筆者もひどく混乱させられた経験がある。まさか、彼らは皆、このゴールドマンの兄弟だとでもいうのだろうか。\n\n- 調査員リト`,
      },
      {
        name: 'チェフ',
        image: '/images/npcs/Maple_260814_122717.png',
        description: `リス港口で出会える男。自らの容姿に並々ならぬ自信を持っているようだ。\n\nしかし、その尊大な態度のせいか人望はあまりない。今までバレンタインデーにチョコレートを貰ったことがないと嘆いているが、それは自業自得だろう。\n\n噂によれば、そんな彼を不憫に思った誰かが、チェフにチョコレートを贈るよう依頼したことがあるという。その返礼は、一杯のジャジャ麺であった。その味は意外にも美味であったが、なぜか涙が止まらなかったと伝えられている。\n\n- 調査員リト`,
      },
      {
        name: 'トゥルー',
        image: '/images/npcs/Maple_260814_122719.png',
        description: `リス港口の情報商人。噂によれば、その出身はリエンであるという。彼が取り扱う情報の量は多く、価格も手頃であるため重宝する者も多いと聞く。だが不思議なことに、筆者は彼と縁がなく、未だ一度も利用したことがない。\n\nただ、トゥルーと話した際、彼が武具の中でも特に鉾を好んでいるという印象を受けた。鉾と聞けば、自ずととある英雄の顔が思い浮かぶが…。まさか、あの英雄がこんな男と繋がりがあるはずもないか。\n\n- 調査員リト`,
      },
      {
        name: 'シルバー',
        image: '/images/npcs/Maple_260814_122723.png',
        description: `リス港口にある武器屋の商人。その片足は義足であり、常に松葉杖を手にしている。腕に刻まれた刺青を見るに、かつては船乗りであったと推察される。\n\n筆者がシルバーの店に足繁く通うのには理由がある。ただひたすらに走ることに夢中であった若き日、この店で手に入れたフルーツダガーを、筆者はことのほか愛用していたのだ。\n\n- 調査員リト`,
      },
      {
        name: 'ナターシャ',
        image: '/images/npcs/Maple_260814_122724.png',
        description: `リス港口にある防具屋の商人。その顔の半分は常に髪で覆われている。一説には古傷を隠しているという噂もあるが、リス港口の商人には元船乗りも多いため、仮に真実であったとしても何ら不思議ではないだろう。\n\n比較的穏やかな町であるためか、取り扱う防具に特筆すべきものはない。だが、青いウッドチェアだけは別だ。小さく可愛らしいその佇まいは、筆者が強く推奨する逸品である。\n\n- 調査員リト`,
      },
      {
        name: 'ミナ',
        image: '/images/npcs/Maple_260814_122725.png',
        description: `リス港口にある雑貨屋の商人。一見すると他の町の雑貨屋と何ら変わり映えしないように見受けられるが、この店は他では入手不可能なある貴重な逸品を取り扱っている。それこそが「ヤシのドリンク」だ。フロリナビーチとリス港口の近郊に自生するヤシの木。その果実から抽出された原液を冷やして飲む…その甘美な味わいは、まさに絶品である。\n\n- 調査員リト`,
      },
    ],
    monsters: [
      {
        name: 'スポア',
        image: '/images/monsters/Maple_260814_122729.png',
        description: `小型のキノコ型モンスターであり、主に草むらで目撃される。脆弱なモンスターにしては、比較的俊敏である。一見するとメイプルキノコに酷似しているが、体は遥かに小さく、その表情はより意地悪な印象を与える。\n\nキノコの胞子を撒き散らす習性があり、このスポアこそが、メイプルワールドにおけるキノコ型モンスターの個体数増加の主な原因である。\n\n- 調査員リト`,
      },
      {
        name: 'マノ',
        image: '/images/monsters/Maple_260814_122732.png',
        description: `メイプルワールドにおいて、最も長寿とされるデンデン。長きにわたる歳月を生きたその体は非常に大きく、顔には白い髭を蓄えている。夜明けの雫を好むため、早朝、草葉に宿るそれを求めて徘徊する習性がある。\n\nごく稀に、この[[monster:マノ|マノ]]から虹色デンデンの殻と呼ばれる特殊な殻を入手できることがある。それには願いを叶える力があるという、にわかには信じがたい噂も存在する。\n\nヘネシス在住のジェイの曾祖父にして、Mrs.ミンミンの祖父でもあるアロイ氏の著作「デンデン伝説」には、デンデンの言葉に関する記述がある。\n\n筆者が読解したところによれば、その概要は以下の通りだ。「来ないで下さい…。」「あぁ〜。」「急げば急ぐほど…あぁ…ダメだ…。」「綺麗な露が欲しかっただけなのに…。」\n\n- 調査員リト`,
      },
    ],
  },
  {
    id: 'カニングシティ',
    name: 'カニングシティ',
    world: 'maple-world',
    bookColor: 'blue',
    description: 'ビクトリアアイランドの闇に抱かれた、華やかなネオンの光と、陰鬱な裏通りが背中合わせに存在する都市。\n\n表向きの活気とは裏腹に、その地下では秘密の組織や盗賊たちが活動し、あらゆる噂と陰謀が渦を巻いている。\n\n真の闇の力を求める盗賊たちが、ここでその腕を磨いているという。',
    count: '0/39',
  },
  { id: 'カニングタワー', name: 'カニングタワー', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/27' },
  { id: 'ペリオン', name: 'ペリオン', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/27' },
  { id: '遺跡発掘地', name: '遺跡発掘地', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/10' },
  { id: '魔法使い協会', name: '魔法使い協会', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/6' },
  { id: 'エリニア', name: 'エリニア', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/25' },
  { id: 'エリネル', name: 'エリネル', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/19' },
  { id: 'エルディン', name: 'エルディン', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/15' },
  { id: 'エウレル', name: 'エウレル', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/16' },
  { id: 'ゴールドビーチ', name: 'ゴールドビーチ', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/17' },
  { id: 'ノーチラス', name: 'ノーチラス', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/29' },
  { id: 'パルテン', name: 'パルテン', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/23' },
  { id: 'ラムラム', name: 'ラムラム', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/18' },
  { id: 'キノコ城', name: 'キノコ城', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/19' },
  { id: 'リーフロード', name: 'リーフロード', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/4' },
  { id: 'スリーピーウッド', name: 'スリーピーウッド', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/16' },
  { id: '堕落した世界樹', name: '堕落した世界樹', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/17' },
  { id: 'ルートアビス', name: 'ルートアビス', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/9' },
  { id: '呪われた神殿', name: '呪われた神殿', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/16' },
  { id: 'リエン', name: 'リエン', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/15' },
  { id: 'リエナ海峡', name: 'リエナ海峡', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/19' },
  { id: 'オルビス', name: 'オルビス', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/27' },
  { id: 'オルビス塔', name: 'オルビス塔', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/9' },
  { id: '雲の公園', name: '雲の公園', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/18' },
  { id: 'エルナス', name: 'エルナス', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/27' },
  { id: '獅子王の城', name: '獅子王の城', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/15' },
  { id: '閉鉱', name: '閉鉱', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/23' },
  { id: 'アクアリウム', name: 'アクアリウム', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/35' },
  { id: 'ベリタス', name: 'ベリタス', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/5' },
  { id: 'ルディブリアム城', name: 'ルディブリアム城', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/21' },
  { id: 'ルディブリアム', name: 'ルディブリアム', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/25' },
  { id: '時計塔最下層', name: '時計塔最下層', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/24' },
  { id: 'エオス塔', name: 'エオス塔', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/30' },
  { id: 'ヘリオス塔', name: 'ヘリオス塔', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/2' },
  { id: 'ファンタスティックテーマパーク', name: 'ファンタスティックテーマパーク', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/16' },
  { id: '下町', name: '下町', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/30' },
  { id: 'エリン森', name: 'エリン森', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/19' },
  { id: '地球防衛本部', name: '地球防衛本部', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/21' },
  { id: 'リプレ', name: 'リプレ', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/54' },
  { id: 'コロッサス', name: 'コロッサス', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/20' },
  { id: 'クリティアス', name: 'クリティアス', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/36' },
  { id: '武陵', name: '武陵', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/35' },
  { id: '白草村', name: '白草村', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/19' },
  { id: '金箔寺', name: '金箔寺', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/21' },
  { id: 'アリアント', name: 'アリアント', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', count: '0/44' },
  { id: 'アスワン', name: 'アスワン', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/7' },
  { id: 'マガティア', name: 'マガティア', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/33' },
  { id: '時間の神殿', name: '時間の神殿', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/31' },
  { id: '未来の扉', name: '未来の扉', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', count: '0/62' },
  { id: 'エーデルシュタイン', name: 'エーデルシュタイン', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/56' },
  { id: 'レーベン鉱山', name: 'レーベン鉱山', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/28' },
  { id: '機械の墓', name: '機械の墓', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/44' },
  { id: 'エレヴ', name: 'エレヴ', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/22' },
  { id: '海底の塔', name: '海底の塔', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/17' },
  { id: '本能寺', name: '本能寺', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/17' },
  { id: 'キノコ神社', name: 'キノコ神社', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', count: '0/35' },
  { id: '楓城', name: '楓城', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/22' },
  { id: 'ショーワ町', name: 'ショーワ町', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', count: '0/39' },
  { id: '麗安高原', name: '麗安高原', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', count: '0/10' },

  // ==========================================
  // アーケインリバー (全12地域)
  // ==========================================
  { id: '消滅の旅路', name: '消滅の旅路', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', count: '0/21' },
  { id: 'リバースシティー', name: 'リバースシティー', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', count: '0/15' },
  { id: 'チューチューアイランド', name: 'チューチューアイランド', world: 'arcane-river', bookColor: 'blue', description: '（説明文準備中）', count: '0/25' },
  { id: 'ヤムヤムアイランド', name: 'ヤムヤムアイランド', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', count: '0/15' },
  { id: 'レヘルン', name: 'レヘルン', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', count: '0/37' },
  { id: 'アルカナ', name: 'アルカナ', world: 'arcane-river', bookColor: 'blue', description: '（説明文準備中）', count: '0/19' },
  { id: 'モラス', name: 'モラス', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', count: '0/29' },
  { id: 'エスフェラ', name: 'エスフェラ', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', count: '0/19' },
  { id: 'セラス', name: 'セラス', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', count: '0/10' },
  { id: 'ムーンブリッジ', name: 'ムーンブリッジ', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', count: '0/12' },
  { id: '苦痛の迷宮', name: '苦痛の迷宮', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', count: '0/19' },
  { id: 'リメン', name: 'リメン', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', count: '0/11' },
];