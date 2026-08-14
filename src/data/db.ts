// src/data/db.ts

export interface Entity {
    id: string;
    name: string;
    type: 'monster' | 'npc';
    image: string;
    description: string;
    link: string;
  }
  
  export const entityDatabase: Record<string, Entity> = {
    balrog: {
      id: 'balrog',
      name: '魔王バルログ',
      type: 'monster',
      image: 'https://placehold.co/120x120/1f2937/f97316?text=Balrog',
      description: 'スリーピーウッドの奥深くに封印されている巨大な悪魔。かつてビクトリアロードを恐怖に陥れた。',
      link: '#',
    },
    lucid: {
      id: 'lucid',
      name: 'ルシード',
      type: 'npc',
      image: 'https://placehold.co/120x120/1f2937/a855f7?text=Lucid',
      description: '夢の都市レヘルンを支配する夢の軍団長。蝶の翼を持ち、悪夢を操る能力を持つ。',
      link: '#',
    },
  };