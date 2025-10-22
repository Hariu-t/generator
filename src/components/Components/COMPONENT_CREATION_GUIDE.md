# コンポーネント作成ガイド

このガイドでは、新しいコンポーネントを効率的に作成する方法を説明します。

## 概要

新しいコンポーネントを作成する際は、以下の3つの仕組みを活用することで、大幅に開発工数を削減できます：

1. **カスタムフック** - 共通ロジックの自動処理
2. **data-prop属性** - propsの自動バインディング
3. **TemplateComponent** - ボイラープレートの提供

---

## クイックスタート

### 1. TemplateComponent.tsxをコピー

```bash
cp src/components/Components/TemplateComponent.tsx src/components/Components/YourNewComponent.tsx
```

### 2. コンポーネント名を変更

```typescript
// Before
const TemplateComponent: React.FC<TemplateComponentProps> = ({ component }) => {

// After
const YourNewComponent: React.FC<YourNewComponentProps> = ({ component }) => {
```

### 3. HTMLマークアップを編集

`data-prop`属性を使って、propsを自動的にバインドします。

---

## カスタムフックの使い方

### useComponentData

コンポーネントのprops、style、グローバルスタイルを一括取得します。

```typescript
import { useComponentData } from '../../hooks/useComponentData';

const { props, style, globalStyles, pageData } = useComponentData(component);
```

**取得できるデータ:**
- `props`: コンポーネント固有のprops
- `style`: コンポーネントのスタイル設定
- `globalStyles`: 共通スタイル（mainColor, baseColor, accentColorなど）
- `pageData`: ページ全体のデータ

**例:**
```typescript
const containerStyle = {
  backgroundColor: style?.backgroundColor || globalStyles.baseColor,
  color: style?.textColor || globalStyles.commonColor,
};
```

---

## data-prop属性システム

### 基本的な使い方

HTML要素に`data-prop`属性を追加するだけで、propsの値が自動的に反映されます。

```typescript
// フック呼び出し
const containerRef = useDataPropBinding({ props });

// JSX内で使用
<div ref={containerRef}>
  <h2 data-prop="title">デフォルトタイトル</h2>
  <p data-prop="description">デフォルト説明</p>
</div>
```

### data-bind-type の種類

`data-bind-type`属性で、バインディング方法を指定できます：

#### 1. text（デフォルト）
テキストコンテンツとしてバインド

```html
<h1 data-prop="title" data-bind-type="text">
  デフォルトタイトル
</h1>
```

#### 2. html
HTMLとしてバインド（注意：XSSリスクあり）

```html
<div data-prop="content" data-bind-type="html">
  <p>デフォルトコンテンツ</p>
</div>
```

#### 3. src
画像やiframeのsrc属性にバインド

```html
<img
  data-prop="imageUrl"
  data-bind-type="src"
  src="/default-image.jpg"
  alt="画像"
/>
```

#### 4. href
リンクのhref属性にバインド

```html
<a
  data-prop="linkUrl"
  data-bind-type="href"
  href="#"
>
  リンク
</a>
```

#### 5. style
インラインスタイルにバインド

```html
<div
  data-prop="backgroundColor"
  data-bind-type="style"
  data-style-prop="backgroundColor"
>
  内容
</div>
```

#### 6. show / hide
条件付き表示/非表示

```html
<!-- propがtrueの時に表示 -->
<div data-prop="isVisible" data-bind-type="show">
  表示される内容
</div>

<!-- propがtrueの時に非表示 -->
<div data-prop="isHidden" data-bind-type="hide">
  非表示になる内容
</div>
```

#### 7. class
クラス名を追加

```html
<div data-prop="customClass" data-bind-type="class">
  内容
</div>
```

#### 8. attr
任意の属性にバインド

```html
<button
  data-prop="buttonId"
  data-bind-type="attr"
  data-attr-name="id"
>
  ボタン
</button>
```

---

## 実装例

### 例1: シンプルなセクション

```typescript
import React from 'react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface SimpleSectionProps {
  component: ComponentData;
}

const SimpleSection: React.FC<SimpleSectionProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: style?.backgroundColor || globalStyles.baseColor,
        padding: '60px 20px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* propsのtitleが自動的に反映される */}
        <h2 data-prop="title">デフォルトタイトル</h2>

        {/* propsのdescriptionが自動的に反映される */}
        <p data-prop="description">デフォルト説明</p>

        {/* propsのimageUrlがsrcに自動的に反映される */}
        <img
          data-prop="imageUrl"
          data-bind-type="src"
          src="/default.jpg"
          alt="画像"
        />
      </div>
    </section>
  );
};

export default SimpleSection;
```

### 例2: 条件付き表示を含むコンポーネント

```typescript
const ConditionalComponent: React.FC<Props> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  return (
    <section ref={containerRef}>
      {/* showButtonがtrueの時だけ表示 */}
      <button data-prop="showButton" data-bind-type="show">
        <span data-prop="buttonText">ボタン</span>
      </button>

      {/* showWarningがfalseの時だけ表示 */}
      <div data-prop="showWarning" data-bind-type="hide">
        <p data-prop="warningMessage">警告メッセージ</p>
      </div>
    </section>
  );
};
```

### 例3: リスト表示

```typescript
const ListComponent: React.FC<Props> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  // 複雑なデータ構造は従来通りJSXで処理
  const items = props.items || [];

  return (
    <section ref={containerRef}>
      <h2 data-prop="title">リスト</h2>

      <ul>
        {items.map((item: any, index: number) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </section>
  );
};
```

---

## ベストプラクティス

### 1. シンプルな値にはdata-propを使う

✅ 良い例:
```html
<h1 data-prop="title">デフォルト</h1>
<img data-prop="imageUrl" data-bind-type="src" src="/default.jpg" />
```

❌ 悪い例（複雑なロジックには使わない）:
```html
<!-- 配列やオブジェクトの処理には向いていない -->
<div data-prop="complexData">...</div>
```

### 2. デフォルト値を必ず設定

```html
<!-- propsが空の時にも表示される -->
<h1 data-prop="title">デフォルトタイトル</h1>
```

### 3. 複雑なロジックは従来通りJSXで

```typescript
// 配列のマッピング、条件分岐、計算などは従来通り
{props.items?.map((item, index) => (
  <div key={index}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
))}
```

### 4. スタイルは共通スタイルを優先

```typescript
const containerStyle = {
  // 個別設定 || 共通スタイル の順で指定
  backgroundColor: style?.backgroundColor || globalStyles.baseColor,
  color: style?.textColor || globalStyles.commonColor,
};
```

---

## コンポーネント作成チェックリスト

- [ ] TemplateComponent.tsxをコピー
- [ ] コンポーネント名を変更（インターフェース名も含む）
- [ ] useComponentDataで共通データを取得
- [ ] useDataPropBindingでcontainerRefを取得
- [ ] HTML構造を記述（data-prop属性を活用）
- [ ] デフォルト値を設定
- [ ] スタイルを設定（共通スタイル優先）
- [ ] 複雑なロジックは従来通りJSXで実装
- [ ] export defaultを確認

---

## よくある質問

### Q1: data-propが動作しない

**A:** 以下を確認してください：
1. containerRefがルート要素に設定されているか
2. data-prop属性の値がpropsのキー名と一致しているか
3. useDataPropBindingが正しく呼び出されているか

### Q2: 配列やオブジェクトをバインドしたい

**A:** data-propは単純な値（文字列、数値、真偽値）向けです。配列やオブジェクトは従来通りJSXで処理してください。

```typescript
// ❌ data-propでは不可
<div data-prop="items"></div>

// ✅ JSXで処理
{props.items?.map(item => (...))}
```

### Q3: スタイルの優先順位は？

**A:** 以下の順序で適用されます：
1. コンポーネント固有のstyle
2. グローバルスタイル（globalStyles）
3. ハードコードされたデフォルト値

```typescript
backgroundColor: style?.backgroundColor || globalStyles.baseColor || '#ffffff'
```

### Q4: 既存コンポーネントを移行すべき？

**A:** 既存の動作しているコンポーネントを無理に移行する必要はありません。新規作成時にこのシステムを使用してください。

---

## まとめ

このシステムを使うことで：

✅ コンポーネント作成時間が大幅に短縮
✅ propsのバインディングが自動化
✅ 共通ロジックの重複がなくなる
✅ コードの可読性が向上
✅ メンテナンスが容易に

新しいコンポーネントを作成する際は、ぜひこのガイドを参考にしてください！
