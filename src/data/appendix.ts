export type AppendixCategory = {
    id: string;
    title: string;
    items: {
      id: string;
      num: number;
      title: string;
      description: string;
    }[];
  };
  
  export const APPENDIX_DATA: AppendixCategory[] = [
    {
      id: 'history',
      title: 'I. 歴史',
      items: [
        { id: 'maple-world-history', num: 1, title: 'メイプルワールド', description: '（解説文準備中）' },
        { id: 'grandis-history', num: 2, title: 'グランディス', description: '（解説文準備中）' },
        { id: 'masteria-history', num: 3, title: 'マステリア', description: '（解説文準備中）' },
      ],
    },
    {
      id: 'races',
      title: 'II. 種族',
      items: [
        { id: 'transcendent', num: 1, title: '超越者', description: '（解説文準備中）' },
        { id: 'goddess', num: 2, title: '女神', description: '（解説文準備中）' },
        { id: 'human', num: 3, title: '人間', description: '（解説文準備中）' },
        { id: 'fairy', num: 4, title: '妖精', description: '（解説文準備中）' },
        { id: 'demon', num: 5, title: '魔族', description: '（解説文準備中）' },
        { id: 'spirit', num: 6, title: '精霊', description: '（解説文準備中）' },
        { id: 'dragon', num: 7, title: 'ドラゴン', description: '（解説文準備中）' },
      ],
    },
    {
      id: 'terms',
      title: 'III. 集団、器物及びその他の用語',
      items: [
        { id: 'dimension-gate', num: 1, title: 'ディメンションゲート', description: '（解説文準備中）' },
        { id: 'maple-alliance', num: 2, title: 'メイプル連合', description: '（解説文準備中）' },
        { id: 'commander', num: 3, title: '軍団長', description: '（解説文準備中）' },
        { id: 'seal-stone', num: 4, title: '封印石', description: '（解説文準備中）' },
        { id: 'spiritual-power', num: 5, title: '霊力', description: '（解説文準備中）' },
      ],
    },
  ];