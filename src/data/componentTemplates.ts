import { ComponentTemplate } from '../types';

export const componentTemplates: ComponentTemplate[] = [
  // KV Components
  // {
  //   id: 'kv-carousel',
  //   type: 'kv',
  //   name: 'KV カルーセル型',
  //   description: '複数コンテンツを効率的に紹介するカルーセル・プレゼンテーション型',
  //   thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
  //   category: 'KV',
  //   defaultProps: {
  //     pattern: 'carousel',
  //     headline: '注目のコンテンツ',
  //     description: '厳選された話題のコンテンツをお楽しみください',
  //     ctaText: '詳しくはこちら',
  //     ctaUrl: '#',
  //     carouselItems: [
  //       {
  //         image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920',
  //         title: 'メインタイトル',
  //         description: '説明文がここに入ります',
  //         category: 'ドラマ',
  //         status: '最新話配信中',
  //         tags: ['#感動', '#ヒューマンドラマ']
  //       },
  //       {
  //         image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
  //         title: 'サブタイトル 2',
  //         description: '2番目のコンテンツの説明',
  //         category: 'バラエティ',
  //         status: '毎週更新',
  //         tags: ['#エンタメ', '#笑い']
  //       }
  //     ]
  //   }
  // },
  // {
  //   id: 'kv-cinematic',
  //   type: 'kv',
  //   name: 'KV シネマティック型',
  //   description: '映画のような強烈な視覚的インパクトで世界観を伝える',
  //   thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
  //   category: 'KV',
  //   defaultProps: {
  //     pattern: 'cinematic',
  //     headline: 'ビジネスを変革する',
  //     description: 'デジタル時代に対応した革新的なソリューション',
  //     ctaText: '今すぐ視聴',
  //     ctaUrl: '#',
  //     backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920'
  //   }
  // },
  // {
  //   id: 'kv-card',
  //   type: 'kv',
  //   name: 'KV カード型',
  //   description: '情報を整理されたカードデザインで見やすく配置',
  //   thumbnail: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=400',
  //   category: 'KV',
  //   defaultProps: {
  //     pattern: 'card',
  //     headline: 'おすすめコンテンツ',
  //     description: '厳選されたコンテンツをカード形式で分かりやすく表示',
  //     ctaText: 'すべてのコンテンツを見る',
  //     ctaUrl: '#',
  //     cardItems: [
  //       {
  //         image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
  //         title: 'コンテンツタイトル 1',
  //         schedule: '毎週火曜 21:00-22:00',
  //         genre: 'ドラマ',
  //         rating: 4,
  //         reviewCount: 1234,
  //         cast: '田中太郎、山田花子 他',
  //         description: '現代社会を舞台にした感動的なヒューマンドラマ。家族の絆と愛をテーマに描かれた心温まる物語です...',
  //         isNew: true
  //       },
  //       {
  //         image: 'https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=600',
  //         title: 'コンテンツタイトル 2',
  //         schedule: '毎週水曜 22:00-23:00',
  //         genre: 'バラエティ',
  //         rating: 5,
  //         reviewCount: 2567,
  //         cast: '佐藤次郎、鈴木花子 他',
  //         description: '笑いあり涙ありの感動バラエティ番組。毎回ゲストを迎えて楽しいトークを繰り広げます...',
  //         isNew: false
  //       }
  //     ]
  //   }
  // },
  {
    id: 'kv-1',
    type: 'kv',
    name: 'KV-1',
    description: '単番組ジェネレータ用スライダー付きKV',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_kv-1.jpg',
    category: 'KV',
    defaultProps: {
      pattern: 'program-hero',
      title: 'ブラックリスト ファイナル・シーズン',
      description: '世界で最も危険な犯罪者たちのリストを持つ元政府エージェント、レイモンド・レディントンが、FBIと協力して凶悪犯を追い詰める。シリーズ最終章となる今シーズンでは、これまでの謎がついに明かされる。',
      expandedDescription: 'レイモンド・"レッド"・レディントンは、シーズン1冒頭に世界で暗躍する凶悪犯罪者たちのリスト"ブラックリスト"を持参してFBIに自首した。彼の目的は、このリストに載った犯罪者たちを一人ずつ捕まえることだった。しかし、彼には一つだけ条件があった。それは、新人FBI捜査官エリザベス・キーンとだけ話をするということだった。',
      showMoreText: 'もっと見る',
      showLessText: '閉じる',
      cast: 'ジェームズ・スペイダー、メーガン・ブーン、ディエゴ・クラテンホフ、ライアン・エッゴールド',
      broadcastInfo: {
        schedule: '毎週金曜 21:00-22:00',
        duration: '60分',
        badges: [
          { text: '最新話配信中', color: '#dc2626' },
          { text: 'ドラマ', color: '#3b82f6' }
        ]
      },
      mediaItems: [
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'ブラックリスト メインビジュアル'
        },
        {
          type: 'video',
          alt: 'ブラックリスト 予告編'
        },
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'ブラックリスト シーン3'
        }
      ],
      ctaButtons: [
        {
          text: '今すぐ視聴',
          url: '#',
          type: 'primary'
        },
        {
          text: '予告編を見る',
          url: '#',
          type: 'secondary'
        }
      ],
      additionalInfo: [
        {
          label: '制作年',
          value: '2023年'
        },
        {
          label: 'ジャンル',
          value: 'クライム・サスペンス'
        },
        {
          label: '話数',
          value: '全22話'
        }
      ]
    }
  },

  // 料金 Components
  {
    id: 'pricing-1',
    type: 'pricing',
    name: '料金表示',
    description: '価格比較と詳細な料金プランを表示する料金表コンポーネント',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_pricing-1.jpg',
    category: '料金',
    defaultProps: {
      showMustReadBox: true,
      mainPlan: {
        description: 'ブラックリスト',
        name: 'スカパー！基本プラン',
        price: '1,980',
        note: '※翌月以降は3,960円/月（税込）',
        hasDetails: true,
        detailsLabel: '初回視聴料1,980円(税込)の注意事項'
      },
      additionalPlans: [
        {
          description: '○○（番組・特集・アーティスト名など）が見られる、スーパー！ドラマTVなど5チャンネルがえらべる',
          name: 'スーパー！セレクト5',
          price: '1,100',
        },
        {
          description: '○○（番組・特集・アーティスト名など）が見られる、スーパー！ドラマTVなど5チャンネルがえらべる',
          name: 'スーパー！セレクト5',
          price: '1,100',
        }
      ]
    }
  },

  // 番組配信 Components
  {
    id: 'app-intro-1',
    type: 'app-intro',
    name: '番組配信とは',
    description: 'スカパー！番組配信の紹介とアプリダウンロードを促進するコンポーネント',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_app-intro-1.jpg',
    category: '番組配信',
    defaultProps: {
      balloonText: 'ブラックリストをマイリスト登録すれば便利！'
    }
  },

  // FAQ Components
  {
    id: 'faq-1',
    type: 'test',
    name: 'テスト',
    description: 'テストコンポーネント',
    thumbnail: 'https://placehold.jp/400x267.png',
    category: 'テスト',
    defaultProps: {
      title: 'テスト',
      description: 'テストコンポーネント',
      faqs: [
        {
          question: '質問1',
          answer: '回答1'
        },
        {
          question: '質問2',
          answer: '回答2'
        },
        {
          question: '質問3',
          answer: '回答3'
        },
        {
          question: '質問4',
          answer: '回答4'
        }
      ]
    }
  }
];