import { ComponentTemplate } from '../types';
import { generateComponentMetadata } from '../utils/componentIdGenerator';

export const componentTemplates: ComponentTemplate[] = [
  {
    id: 'kv-1',
    type: 'kv',
    name: 'KV-1',
    nameRomanized: 'program-hero',
    description: '単番組ジェネレータ用スライダー付きKV',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_kv-1.jpg',
    category: 'KV',
    categoryRomanized: 'kv',
    uniqueId: 'kv_program_hero',
    defaultProps: {
      pattern: 'program-hero',
      title: 'ブラックリスト ファイナル・シーズン',
      description: '世界で最も危険な犯罪者たちのリストを持つ元政府エージェント、レイモンド・レディントンが、FBIと協力して凶悪犯を追い詰める。シリーズ最終章となる今シーズンでは、これまでの謎がついに明かされる。',
      expandedDescription: 'レイモンド・"レッド"・レディントンは、シーズン1冒頭に世界で暗躍する凶悪犯罪者たちのリスト"ブラックリスト"を持参してFBIに自首した。彼の目的は、このリストに載った犯罪者たちを一人ずつ捕まえることだった。しかし、彼には一つだけ条件があった。それは、新人FBI捜査官エリザベス・キーンとだけ話をするということだった。',
      showMoreText: 'もっと見る',
      showLessText: '閉じる',
      channelInfo: {
        number: 'CS310',
        name: 'スーパー！ドラマＴＶ　＃海外ドラマ☆エンタメ'
      },
      broadcastInfo: {
        schedule: '7/25(火) 22:00～22:55 スタート<br>【二カ国語版】毎週(火) 22:00～ほか',
        streamingBadgeText: '同時・見逃し',
        badges: [
          { text: 'ドラマ', color: '#3b82f6' }
        ]
      },
      mediaItems: [
        {
          type: 'image',
          url: '/program/st/promo/generator_common/img/program01.jpg',
          alt: 'ブラックリスト メインビジュアル'
        },
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/XVVXQsv7o8I?rel=0&enablejsapi=1',
          alt: 'ブラックリスト 予告編'
        },
        {
          type: 'image',
          url: '/program/st/promo/generator_common/img/program02.jpg',
          alt: 'ブラックリスト シーン3'
        }
      ],
    }
  },


  // 料金 Components
  {
    id: 'pricing-1',
    type: 'pricing',
    name: '料金表示',
    nameRomanized: 'price-table',
    description: '価格比較と詳細な料金プランを表示する料金表コンポーネント',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_pricing-1.jpg',
    category: '料金',
    categoryRomanized: 'pricing',
    uniqueId: 'pricing_price_table',
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
    nameRomanized: 'streaming-intro',
    description: 'スカパー！番組配信の紹介とアプリダウンロードを促進するコンポーネント',
    thumbnail: '/program/st/promo/generator_common/img/thumbnail_app-intro-1.jpg',
    category: '番組配信',
    categoryRomanized: 'streaming',
    uniqueId: 'streaming_streaming_intro',
    defaultProps: {
      balloonText: 'ブラックリスト'
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
  },

  // Tab Components
  {
    id: 'tab-1',
    type: 'tab',
    name: 'タブ切替',
    nameRomanized: 'tab-switcher',
    description: 'コンテンツをタブで切り替えて表示するコンポーネント',
    thumbnail: 'https://placehold.jp/400x267.png',
    category: 'UI要素',
    categoryRomanized: 'ui-elements',
    uniqueId: 'ui_elements_tab_switcher',
    defaultProps: {
      title: 'タブコンテンツ',
      description: 'タブを切り替えてコンテンツを表示できます',
      tabs: [
        {
          label: 'タブ1',
          content: 'タブ1のコンテンツがここに表示されます。詳細な説明やテキストを記述できます。'
        },
        {
          label: 'タブ2',
          content: 'タブ2のコンテンツがここに表示されます。異なる情報を整理して表示することができます。'
        },
        {
          label: 'タブ3',
          content: 'タブ3のコンテンツがここに表示されます。複数のセクションを効率的に管理できます。'
        }
      ]
    }
  },

  // Modal Components
  {
    id: 'modal-1',
    type: 'modal',
    name: 'モーダルダイアログ',
    nameRomanized: 'modal-dialog',
    description: 'ボタンをクリックするとモーダルを表示するコンポーネント',
    thumbnail: 'https://placehold.jp/400x267.png',
    category: 'UI要素',
    categoryRomanized: 'ui-elements',
    uniqueId: 'ui_elements_modal_dialog',
    defaultProps: {
      buttonText: '詳細を見る',
      modalTitle: 'モーダルタイトル',
      modalContent: 'ここにモーダルのコンテンツを記述します。詳細な情報や注意事項などを表示できます。',
      buttonStyle: 'primary'
    }
  },

  // Slider Components
  {
    id: 'slider-1',
    type: 'slider',
    name: '画像スライダー',
    nameRomanized: 'image-slider',
    description: '画像を自動でスライド表示するコンポーネント',
    thumbnail: 'https://placehold.jp/400x267.png',
    category: 'メディア',
    categoryRomanized: 'media',
    uniqueId: 'media_image_slider',
    defaultProps: {
      title: '画像ギャラリー',
      description: '番組の魅力をお届けします',
      autoplay: true,
      autoplayDelay: 8000,
      slides: [
        {
          image: 'https://images.pexels.com/photos/6044265/pexels-photo-6044265.jpeg?auto=compress&cs=tinysrgb&w=1200',
          caption: 'スライド1のキャプション'
        },
        {
          image: 'https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&w=1200',
          caption: 'スライド2のキャプション'
        },
        {
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
          caption: 'スライド3のキャプション'
        }
      ]
    }
  }
];