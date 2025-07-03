import { ComponentTemplate } from '../types';

export const componentTemplates: ComponentTemplate[] = [
  // KV Components - 3つのパターン
  {
    id: 'kv-carousel',
    type: 'kv',
    name: 'KV カルーセル型',
    description: '複数コンテンツを効率的に紹介するカルーセル・プレゼンテーション型',
    thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'KV',
    defaultProps: {
      pattern: 'carousel',
      headline: '注目のコンテンツ',
      description: '厳選された話題のコンテンツをお楽しみください',
      ctaText: '詳しくはこちら',
      ctaUrl: '#',
      carouselItems: [
        {
          image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920',
          title: 'メインタイトル',
          description: '説明文がここに入ります',
          category: 'ドラマ',
          status: '最新話配信中',
          tags: ['#感動', '#ヒューマンドラマ']
        },
        {
          image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
          title: 'サブタイトル 2',
          description: '2番目のコンテンツの説明',
          category: 'バラエティ',
          status: '毎週更新',
          tags: ['#エンタメ', '#笑い']
        }
      ]
    },
  },
  {
    id: 'kv-cinematic',
    type: 'kv',
    name: 'KV シネマティック型',
    description: '映画のような強烈な視覚的インパクトで世界観を伝える',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'KV',
    defaultProps: {
      pattern: 'cinematic',
      headline: 'ビジネスを変革する',
      description: 'デジタル時代に対応した革新的なソリューション',
      ctaText: '今すぐ視聴',
      ctaUrl: '#',
      backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
  },
  {
    id: 'kv-card',
    type: 'kv',
    name: 'KV カード型',
    description: '情報を整理されたカードデザインで見やすく配置',
    thumbnail: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'KV',
    defaultProps: {
      pattern: 'card',
      headline: 'おすすめコンテンツ',
      description: '厳選されたコンテンツをカード形式で分かりやすく表示',
      ctaText: 'すべてのコンテンツを見る',
      ctaUrl: '#',
      cardItems: [
        {
          image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'コンテンツタイトル 1',
          schedule: '毎週火曜 21:00-22:00',
          genre: 'ドラマ',
          rating: 4,
          reviewCount: 1234,
          cast: '田中太郎、山田花子 他',
          description: '現代社会を舞台にした感動的なヒューマンドラマ。家族の絆と愛をテーマに描かれた心温まる物語です...',
          isNew: true
        },
        {
          image: 'https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=600',
          title: 'コンテンツタイトル 2',
          schedule: '毎週水曜 22:00-23:00',
          genre: 'バラエティ',
          rating: 5,
          reviewCount: 2567,
          cast: '佐藤次郎、鈴木花子 他',
          description: '笑いあり涙ありの感動バラエティ番組。毎回ゲストを迎えて楽しいトークを繰り広げます...',
          isNew: false
        }
      ]
    },
  },

  // Features Components
  {
    id: 'features-1',
    type: 'features',
    name: '3カラム特徴',
    description: 'アイコンと説明文を3カラムで配置した特徴セクション',
    thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '特徴',
    defaultProps: {
      title: '選ばれる理由',
      description: '競合他社との差別化を図る主要な特徴をご紹介します。',
      features: [
        {
          icon: 'Zap',
          title: '高速パフォーマンス',
          description: '最適化されたコードとモダンな技術により、高速で安定したパフォーマンスを実現。',
        },
        {
          icon: 'Shield',
          title: 'セキュア＆信頼性',
          description: 'エンタープライズグレードのセキュリティと99.9%の稼働率保証で安心。',
        },
        {
          icon: 'Users',
          title: 'チーム連携',
          description: '強力なコラボレーションツールとリアルタイム同期でチームワークを向上。',
        },
      ],
    },
  },
  {
    id: 'features-2',
    type: 'features',
    name: '2カラム特徴',
    description: '画像とテキストを交互に配置した2カラムの特徴セクション',
    thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '特徴',
    defaultProps: {
      title: '強力な機能',
      features: [
        {
          title: '高度な分析機能',
          description: '包括的な分析とレポートツールで、パフォーマンスの詳細な洞察を得られます。',
          image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
          title: 'スマート自動化',
          description: '繰り返し作業やワークフローを自動化して、時間を節約し生産性を向上させます。',
          image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      ],
    },
  },

  // CTA Components
  {
    id: 'cta-1',
    type: 'cta',
    name: 'シンプルCTA',
    description: 'センタリングされたコンテンツのクリーンなCTAセクション',
    thumbnail: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'CTA',
    defaultProps: {
      headline: '始める準備はできましたか？',
      description: '私たちのソリューションでビジネスを変革した数千の満足したお客様に参加しませんか。',
      ctaText: '無料トライアルを開始',
      ctaUrl: '#',
      backgroundColor: '#3B82F6',
    },
  },
  {
    id: 'cta-2',
    type: 'cta',
    name: 'CTA（特徴付き）',
    description: '主要機能のポイントを含むCTAセクション',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'CTA',
    defaultProps: {
      headline: '必要なものがすべて揃っています',
      description: '包括的なプランで、すべてのプレミアム機能にアクセスできます。',
      features: ['24時間サポート', '高度な分析', 'チーム連携', 'カスタム統合'],
      ctaText: 'プランを選択',
      ctaUrl: '#',
      backgroundColor: '#10B981',
    },
  },

  // Testimonials
  {
    id: 'testimonials-1',
    type: 'testimonials',
    name: 'お客様の声',
    description: '写真付きのお客様の声をグリッド表示',
    thumbnail: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '実績・評価',
    defaultProps: {
      title: 'お客様の声',
      testimonials: [
        {
          name: '田中 美咲',
          role: 'マーケティング部長',
          company: 'テックコーポレーション',
          content: 'このプラットフォームは、ランディングページの作成方法を革命的に変えました。使いやすさが素晴らしいです！',
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          name: '佐藤 健太',
          role: 'スタートアップ創業者',
          company: 'イノベートラボ',
          content: 'わずか数時間で商品ページを立ち上げることができました。テンプレートはプロフェッショナルでモダンです。',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        {
          name: '山田 恵美',
          role: '個人事業主',
          company: 'クリエイティブスタジオ',
          content: '高額な開発者は不要になりました。自分で美しいページを作成し、いつでも更新できます。',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
      ],
    },
  },

  // FAQ
  {
    id: 'faq-1',
    type: 'faq',
    name: 'よくある質問',
    description: '折りたたみ式のよくある質問セクション',
    thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'サポート',
    defaultProps: {
      title: 'よくある質問',
      description: 'プラットフォームとサービスに関するよくある質問の回答をご覧ください。',
      faqs: [
        {
          question: '使い方は簡単ですか？',
          answer: '私たちのプラットフォームは非技術者向けに設計されています。シンプルなドラッグ&ドロップ機能で、プロフェッショナルなランディングページを作成できます。',
        },
        {
          question: 'ページをエクスポートできますか？',
          answer: 'はい！完成したページをクリーンなHTMLファイルとしてエクスポートでき、どこでもホスティングできます。',
        },
        {
          question: 'コーディング知識は必要ですか？',
          answer: '全く必要ありません！ビジュアルエディターがすべての技術的な詳細を処理するので、コンテンツとデザインに集中できます。',
        },
        {
          question: 'モバイル対応していますか？',
          answer: 'もちろんです。すべてのテンプレートは完全にレスポンシブで、モバイルデバイスに最適化されています。',
        },
      ],
    },
  },
];