export type WorldType = 'maple-world' | 'arcane-river' | 'grandis';

export type Area = {
  id: string;
  name: string;
  world: WorldType;
  bookColor: 'blue' | 'red' | 'green' | 'purple' | 'brown';
  description: string;
  imageUrl?: string;
  monsterCount: string;
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
  // メイプルワールド (全62地域) - 分子ALL 0
  // ==========================================
  {
    id: 'maple-island',
    name: 'メイプルアイランド',
    world: 'maple-world',
    bookColor: 'purple',
    description: 'メイプルワールドに初めて足を踏み入れたすべての冒険者の故郷であり、冒険が始まる場所。島の西側には伝説が語り継がれる巨大なモミジの木がそびえ、東側にはビクトリアアイランドへ繋がる小さな港がある。\n\n旅の始まりを温かく迎えてくれたヒナとセーラは、今は静かに暮らしている。お留守番をしていたセンは、今でもニナのキャンディーがお気に入りだが、最近は少し思春期を迎えたようだ。戦い方を教えてくれたトードやピーター、ロビン先生たちはビクトリアアイランドへと移住したが、他の住民たちは今も変わらぬ日常を楽しんでいる。',
    monsterCount: '0/12',
  },
  {
    id: 'henesys',
    name: 'ヘネシス',
    world: 'maple-world',
    bookColor: 'red',
    description: 'ビクトリアアイランドの中央に位置する、穏やかで平和な町。巨大なキノコと青々とした草原に覆われたこの地は、弓矢を携えた弓使いたちが集い、訓練に励む場所として知られている。\n\n町全体に温かく活発な空気が満ちており、冒険へ旅立つ初心者たちが、その第一歩を記す重要な拠点となっている。',
    monsterCount: '0/50',
  },
  {
    id: 'lith-harbor',
    name: 'リス港口',
    world: 'maple-world',
    bookColor: 'purple',
    description: 'ビクトリアアイランドの最西端に位置する、海に面した港町。紺碧の波が打ち寄せるこの地は、冒険の旅を始めた者たちが、次なる大陸へと船出するために必ず通る旅立ちの場所である。\n\n一見、穏やかに見える町の至る所には、多くの船乗りや商人たちで賑わっている。彼らはまだ見ぬ新たな冒険の物語が語られるのを、今か今かと待ち望んでいるのだ。',
    monsterCount: '15/15', // 👈 15/15 コンプリート！
  },
  {
    id: 'kerning-city',
    name: 'カニングシティ',
    world: 'maple-world',
    bookColor: 'blue',
    description: 'ビクトリアアイランドの闇に抱かれた、華やかなネオンの光と、陰鬱な裏通りが背中合わせに存在する都市。\n\n表向きの活気とは裏腹に、その地下では秘密の組織や盗賊たちが活動し、あらゆる噂と陰謀が渦を巻いている。\n\n真の闇の力を求める盗賊たちが、ここでその腕を磨いているという。',
    monsterCount: '0/39',
  },
  { id: 'kerning-tower', name: 'カニングタワー', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/27' },
  { id: 'perion', name: 'ペリオン', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/27' },
  { id: 'excavation-site', name: '遺跡発掘地', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/10' },
  { id: 'magician-association', name: '魔法使い協会', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/6' },
  { id: 'ellinia', name: 'エリニア', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/25' },
  { id: 'ellinel', name: 'エリネル', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'ellodin', name: 'エルディン', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/15' },
  { id: 'euelel', name: 'エウレル', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/16' },
  { id: 'gold-beach', name: 'ゴールドビーチ', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/17' },
  { id: 'nautilus', name: 'ノーチラス', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/29' },
  { id: 'parthen', name: 'パルテン', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/23' },
  { id: 'ramram', name: 'ラムラム', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/18' },
  { id: 'mushroom-castle', name: 'キノコ城', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'rief-road', name: 'リーフロード', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/4' },
  { id: 'sleepywood', name: 'スリーピーウッド', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/16' },
  { id: 'fallen-world-tree', name: '堕落した世界樹', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/17' },
  { id: 'root-abyss', name: 'ルートアビス', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/9' },
  { id: 'cursed-temple', name: '呪われた神殿', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/16' },
  { id: 'rien', name: 'リエン', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/15' },
  { id: 'riena-strait', name: 'リエナ海峡', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'orbis', name: 'オルビス', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/27' },
  { id: 'orbis-tower', name: 'オルビス塔', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/9' },
  { id: 'cloud-park', name: '雲の公園', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/18' },
  { id: 'elnath', name: 'エルナス', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/27' },
  { id: 'lion-king-castle', name: '獅子王の城', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/15' },
  { id: 'dead-mine', name: '閉鉱', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/23' },
  { id: 'aquarium', name: 'アクアリウム', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/35' },
  { id: 'veritas', name: 'ベリタス', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/5' },
  { id: 'ludibrium-castle', name: 'ルディブリアム城', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/21' },
  { id: 'ludibrium', name: 'ルディブリアム', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/25' },
  { id: 'clocktower-lowest', name: '時計塔最下層', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/24' },
  { id: 'eos-tower', name: 'エオス塔', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/30' },
  { id: 'helios-tower', name: 'ヘリオス塔', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/2' },
  { id: 'fantastic-theme-park', name: 'ファンタスティックテーマパーク', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/16' },
  { id: 'korean-folk-town', name: '下町', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/30' },
  { id: 'ellin-forest', name: 'エリン森', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'earth-defense-hq', name: '地球防衛本部', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/21' },
  { id: 'riffle', name: 'リプレ', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/54' },
  { id: 'colossus', name: 'コロッサス', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/20' },
  { id: 'critias', name: 'クリティアス', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/36' },
  { id: 'mu-lung', name: '武陵', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/35' },
  { id: 'herb-town', name: '白草村', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'golden-temple', name: '金箔寺', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/21' },
  { id: 'ariant', name: 'アリアント', world: 'maple-world', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/44' },
  { id: 'aswan', name: 'アスワン', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/7' },
  { id: 'magatia', name: 'マガティア', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/33' },
  { id: 'temple-of-time', name: '時間の神殿', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/31' },
  { id: 'gate-to-future', name: '未来の扉', world: 'maple-world', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/62' },
  { id: 'edelstein', name: 'エーデルシュタイン', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/56' },
  { id: 'leben-mine', name: 'レーベン鉱山', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/28' },
  { id: 'mechanical-grave', name: '機械の墓', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/44' },
  { id: 'erev', name: 'エレヴ', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/22' },
  { id: 'tower-of-oz', name: '海底の塔', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/17' },
  { id: 'honnoji', name: '本能寺', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/17' },
  { id: 'mushroom-shrine', name: 'キノコ神社', world: 'maple-world', bookColor: 'brown', description: '（説明文準備中）', monsterCount: '0/35' },
  { id: 'kaede-castle', name: '楓城', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/22' },
  { id: 'showa-town', name: 'ショーワ町', world: 'maple-world', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/39' },
  { id: 'rean-plateau', name: '麗安高原', world: 'maple-world', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/10' },

  // ==========================================
  // アーケインリバー (全12地域) - 分子ALL 0
  // ==========================================
  { id: 'road-of-vanishing', name: '消滅の旅路', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/21' },
  { id: 'reverse-city', name: 'リバースシティー', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/15' },
  { id: 'chew-chew-island', name: 'チューチューアイランド', world: 'arcane-river', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/25' },
  { id: 'yum-yum-island', name: 'ヤムヤムアイランド', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/15' },
  { id: 'lachelein', name: 'レヘルン', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/37' },
  { id: 'arcana', name: 'アルカナ', world: 'arcane-river', bookColor: 'blue', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'morass', name: 'モラス', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/29' },
  { id: 'esfera', name: 'エスフェラ', world: 'arcane-river', bookColor: 'purple', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'sellas', name: 'セラス', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/10' },
  { id: 'moonbridge', name: 'ムーンブリッジ', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/12' },
  { id: 'labyrinth-of-suffering', name: '苦痛の迷宮', world: 'arcane-river', bookColor: 'red', description: '（説明文準備中）', monsterCount: '0/19' },
  { id: 'limen', name: 'リメン', world: 'arcane-river', bookColor: 'green', description: '（説明文準備中）', monsterCount: '0/11' },
];