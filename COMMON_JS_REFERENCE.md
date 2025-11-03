# common.js 機能実装ガイド

コンポーネント作成時に`common.js`の機能を使用するための、data属性とクラス名のリファレンスガイドです。

---

## 📋 目次

1. [アコーディオン機能](#1-アコーディオン機能)
2. [スライダー機能](#2-スライダー機能)
3. [タブ切替機能](#3-タブ切替機能)
4. [モーダル機能](#4-モーダル機能)
5. [展開・折りたたみ機能](#5-展開折りたたみ機能)
6. [スムーススクロール機能](#6-スムーススクロール機能)
7. [共通クラス名一覧](#7-共通クラス名一覧)

---

## 1. アコーディオン機能

質問と回答を折りたたみ表示する機能（FAQ用）

### 必要なdata属性

| 要素 | data属性 | 値 | 説明 |
|------|----------|-----|------|
| トリガーボタン | `data-accordion-trigger` | `"unique-id"` | 一意のID（同じIDをcontentにも使用） |
| コンテンツ | `data-accordion-content` | `"unique-id"` | トリガーと同じID |
| アイコン（任意） | `data-accordion-icon` | `"unique-id"` | トリガーと同じID（回転アニメーション用） |

### HTML例

```html
<!-- アコーディオン項目 -->
<div>
  <!-- トリガーボタン -->
  <button data-accordion-trigger="faq-1" aria-expanded="false">
    <span>質問タイトル</span>
    <span data-accordion-icon="faq-1">▼</span>
  </button>

  <!-- コンテンツ -->
  <div data-accordion-content="faq-1" aria-hidden="true">
    <p>回答の内容がここに表示されます。</p>
  </div>
</div>
```

### 使用されるクラス

- `.is-open` - 開いている状態のコンテンツに自動付与
- `.is-active` - アクティブなトリガーに自動付与
- `.is-rotated` - 回転するアイコンに自動付与

---

## 2. スライダー機能

画像や動画を自動スライド表示する機能

### 必要なdata属性

| 要素 | data属性 | 値 | 説明 |
|------|----------|-----|------|
| スライダーコンテナ | `data-slider` | `"slider-id"` | スライダーの一意のID |
| スライダーコンテナ | `data-slider-autoplay` | `"8000"` | 自動再生の間隔（ミリ秒） |
| スライドアイテム | `data-slider-item` | - | 各スライド要素 |
| 前へボタン | `data-slider-prev` | - | 前のスライドへ |
| 次へボタン | `data-slider-next` | - | 次のスライドへ |
| ドット | `data-slider-dot` | `"0"`, `"1"`, `"2"` | インデックス番号 |

### HTML例

```html
<!-- スライダーコンテナ -->
<div data-slider="my-slider" data-slider-autoplay="8000">

  <!-- スライドアイテム -->
  <div data-slider-item class="is-active">
    <img src="image1.jpg" alt="スライド1">
  </div>

  <div data-slider-item>
    <img src="image2.jpg" alt="スライド2">
  </div>

  <div data-slider-item>
    <img src="image3.jpg" alt="スライド3">
  </div>

  <!-- ナビゲーションボタン -->
  <button data-slider-prev>前へ</button>
  <button data-slider-next>次へ</button>

  <!-- ドットインジケーター -->
  <div>
    <button data-slider-dot="0" class="is-active" aria-current="true"></button>
    <button data-slider-dot="1" aria-current="false"></button>
    <button data-slider-dot="2" aria-current="false"></button>
  </div>
</div>
```

### 使用されるクラス

- `.is-active` - 現在表示中のスライドとドットに自動付与

### 動作

- 自動再生が有効
- ホバー時に自動再生が一時停止
- 手動操作後も自動再生が継続

---

## 3. タブ切替機能

コンテンツをタブで切り替える機能

### 必要なdata属性

| 要素 | data属性 | 値 | 説明 |
|------|----------|-----|------|
| タブグループ | `data-tab-group` | `"group-id"` | タブグループの一意のID |
| タブボタン | `data-tab-trigger` | `"tab-1"` | タブの一意のID |
| タブコンテンツ | `data-tab-content` | `"tab-1"` | トリガーと同じID |
| タブコンテンツ | `data-tab-group` | `"group-id"` | グループと同じID |

### HTML例

```html
<!-- タブグループ -->
<div data-tab-group="my-tabs">

  <!-- タブボタンリスト -->
  <div role="tablist">
    <button role="tab"
            data-tab-trigger="tab-1"
            aria-selected="true"
            class="is-active">
      タブ1
    </button>
    <button role="tab"
            data-tab-trigger="tab-2"
            aria-selected="false">
      タブ2
    </button>
    <button role="tab"
            data-tab-trigger="tab-3"
            aria-selected="false">
      タブ3
    </button>
  </div>

  <!-- タブコンテンツ -->
  <div data-tab-content="tab-1"
       data-tab-group="my-tabs"
       role="tabpanel"
       class="is-active">
    タブ1のコンテンツ
  </div>

  <div data-tab-content="tab-2"
       data-tab-group="my-tabs"
       role="tabpanel">
    タブ2のコンテンツ
  </div>

  <div data-tab-content="tab-3"
       data-tab-group="my-tabs"
       role="tabpanel">
    タブ3のコンテンツ
  </div>
</div>
```

### 使用されるクラス

- `.is-active` - アクティブなタブボタンとコンテンツに自動付与

### キーボード操作

- **矢印キー（左右・上下）**: タブ間移動
- **Homeキー**: 最初のタブへ移動
- **Endキー**: 最後のタブへ移動

---

## 4. モーダル機能

ダイアログをオーバーレイ表示する機能

### 必要なdata属性

| 要素 | data属性 | 値 | 説明 |
|------|----------|-----|------|
| 開くボタン | `data-modal-open` | `"modal-id"` | モーダルの一意のID |
| モーダル本体 | `data-modal` | `"modal-id"` | 開くボタンと同じID |
| 閉じるボタン | `data-modal-close` | - | モーダル内の閉じるボタン |

### HTML例

```html
<!-- モーダルを開くボタン -->
<button data-modal-open="my-modal">
  モーダルを開く
</button>

<!-- モーダル（オーバーレイ） -->
<div class="modal-overlay">
  <!-- モーダル本体 -->
  <div data-modal="my-modal" role="dialog" aria-modal="true">

    <!-- 閉じるボタン -->
    <button data-modal-close aria-label="閉じる">×</button>

    <!-- コンテンツ -->
    <h3>モーダルタイトル</h3>
    <p>モーダルのコンテンツ</p>

    <!-- フッターの閉じるボタン -->
    <button data-modal-close>閉じる</button>
  </div>
</div>
```

### 使用されるクラス

- `.is-open` - 開いているモーダルに自動付与
- `.modal-open` - モーダル表示中のbody要素に自動付与（スクロール防止）

### 動作

- **ESCキー**: モーダルを閉じる
- **オーバーレイクリック**: モーダルを閉じる
- **フォーカストラップ**: モーダル内でTabキーのフォーカスが循環
- **スクロールロック**: モーダル表示中は背景がスクロールしない

---

## 5. 展開・折りたたみ機能

「もっと見る」ボタンでコンテンツを展開する機能

### 必要なdata属性

| 要素 | data属性 | 値 | 説明 |
|------|----------|-----|------|
| トグルボタン | `data-toggle-expanded` | `"content-id"` | コンテンツの一意のID |
| トグルボタン | `data-show-more-text` | `"もっと見る"` | 閉じている時のテキスト |
| トグルボタン | `data-show-less-text` | `"閉じる"` | 開いている時のテキスト |
| コンテンツ | `data-expanded-content` | `"content-id"` | ボタンと同じID |

### HTML例

```html
<!-- 通常表示のコンテンツ -->
<p>基本的な説明文</p>

<!-- 展開可能なコンテンツ -->
<div data-expanded-content="more-info" aria-hidden="true">
  <p>追加の詳細情報がここに表示されます。</p>
</div>

<!-- トグルボタン -->
<button data-toggle-expanded="more-info"
        data-show-more-text="もっと見る"
        data-show-less-text="閉じる"
        aria-expanded="false">
  もっと見る
</button>
```

### 使用されるクラス

- `.is-expanded` - 展開されたコンテンツに自動付与

### 動作

- ボタンのテキストが自動的に切り替わる
- コンテンツの表示・非表示が切り替わる

---

## 6. スムーススクロール機能

アンカーリンクをスムーズにスクロールする機能

### 必要な設定

**特別な設定は不要！** `href="#id"`の形式のリンクに自動適用されます。

### HTML例

```html
<!-- アンカーリンク -->
<a href="#section1">セクション1へ移動</a>
<a href="#section2">セクション2へ移動</a>

<!-- ターゲット要素 -->
<section id="section1">
  <h2>セクション1</h2>
</section>

<section id="section2">
  <h2>セクション2</h2>
</section>
```

### 動作

- スムーズなスクロールアニメーション
- 固定ヘッダーを考慮したオフセット（80px）

---

## 7. 共通クラス名一覧

common.jsが自動的に付与・管理するクラス名

### 状態管理クラス

| クラス名 | 説明 | 使用機能 |
|---------|------|----------|
| `.is-active` | アクティブな状態 | タブ、スライダー、アコーディオン |
| `.is-open` | 開いている状態 | アコーディオン、モーダル |
| `.is-hidden` | 非表示状態 | 汎用 |
| `.is-disabled` | 無効状態 | 汎用 |
| `.is-animating` | アニメーション中 | 汎用 |
| `.is-rotated` | 回転状態（180度） | アコーディオンアイコン |
| `.is-expanded` | 展開状態 | 展開機能 |
| `.modal-open` | モーダル表示中 | body要素（スクロール防止） |

### スタイル用クラス

| クラス名 | 説明 |
|---------|------|
| `.modal-overlay` | モーダルのオーバーレイ背景 |
| `.transition-all` | 全プロパティのトランジション |
| `.transition-opacity` | 不透明度のトランジション |
| `.transition-transform` | 変形のトランジション |

---

## 💡 実装のポイント

### 1. 一意なIDを使用する

各機能で使用するIDは、ページ内で一意である必要があります。

```html
<!-- 良い例 -->
<button data-accordion-trigger="faq-1">質問1</button>
<button data-accordion-trigger="faq-2">質問2</button>

<!-- 悪い例 -->
<button data-accordion-trigger="faq">質問1</button>
<button data-accordion-trigger="faq">質問2</button>
```

### 2. ARIA属性を併用する

アクセシビリティのため、適切なARIA属性を設定してください。

```html
<button data-accordion-trigger="faq-1"
        aria-expanded="false"
        aria-controls="content-1">
  質問
</button>

<div data-accordion-content="faq-1"
     id="content-1"
     aria-hidden="true">
  回答
</div>
```

### 3. 初期状態を設定する

最初に表示したい要素には`.is-active`や`.is-open`を付与してください。

```html
<!-- 最初のタブをアクティブに -->
<button data-tab-trigger="tab-1" class="is-active">タブ1</button>
<div data-tab-content="tab-1" class="is-active">コンテンツ1</div>

<!-- 最初のスライドをアクティブに -->
<div data-slider-item class="is-active">
  <img src="image1.jpg">
</div>
```

### 4. CSSファイルを読み込む

各機能に対応するCSSファイルを読み込んでください。

```html
<link rel="stylesheet" href="/program/st/promo/generator_common/css/common.css">
<link rel="stylesheet" href="/program/st/promo/generator_common/css/tab.css">
<link rel="stylesheet" href="/program/st/promo/generator_common/css/modal.css">
<link rel="stylesheet" href="/program/st/promo/generator_common/css/slider.css">
```

### 5. common.jsを読み込む

HTMLの最後（`</body>`の直前）でcommon.jsを読み込んでください。

```html
<script src="/program/st/promo/generator_common/js/common.js"></script>
</body>
</html>
```

---

## 🔍 トラブルシューティング

### 機能が動作しない場合

1. **common.jsが読み込まれているか確認**
   - ブラウザの開発者ツールでコンソールエラーをチェック

2. **data属性のスペルミスを確認**
   - `data-accordion-trigger`など、正確に記述されているか

3. **IDの一致を確認**
   - トリガーとコンテンツで同じIDを使用しているか

4. **CSSファイルが読み込まれているか確認**
   - スタイルが適用されていない場合、CSSファイルのパスを確認

5. **JavaScriptのエラーを確認**
   - ブラウザのコンソールにエラーメッセージが表示されていないか

---

## 📚 関連ファイル

- **JavaScript**: `/public/program/st/promo/generator_common/js/common.js`
- **CSS**:
  - `/public/program/st/promo/generator_common/css/common.css`
  - `/public/program/st/promo/generator_common/css/tab.css`
  - `/public/program/st/promo/generator_common/css/modal.css`
  - `/public/program/st/promo/generator_common/css/slider.css`

---

## 📝 まとめ

| 機能 | 主なdata属性 | 主なクラス |
|------|-------------|-----------|
| アコーディオン | `data-accordion-trigger`, `data-accordion-content` | `.is-open`, `.is-active` |
| スライダー | `data-slider`, `data-slider-item` | `.is-active` |
| タブ | `data-tab-trigger`, `data-tab-content`, `data-tab-group` | `.is-active` |
| モーダル | `data-modal-open`, `data-modal`, `data-modal-close` | `.is-open`, `.modal-open` |
| 展開 | `data-toggle-expanded`, `data-expanded-content` | `.is-expanded` |
| スムーススクロール | `href="#id"` | なし |

各機能は独立して動作するため、必要な機能だけを実装できます。
