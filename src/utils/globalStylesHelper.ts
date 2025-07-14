import { GlobalStyles } from '../types';

// 共通スタイルを適用するヘルパー関数
export const applyGlobalStyles = (
  globalStyles: GlobalStyles | undefined,
  className: string
): React.CSSProperties => {
  if (!globalStyles) {
    return {};
  }

  const styles: React.CSSProperties = {};

  switch (className) {
    case 'mainColor':
      styles.backgroundColor = globalStyles.mainColor;
      styles.color = '#ffffff'; // メインカラーは通常白文字
      break;
    case 'baseColor':
      styles.backgroundColor = globalStyles.baseColor;
      break;
    case 'base2Color':
      styles.backgroundColor = globalStyles.base2Color;
      break;
    case 'accentColor':
      styles.color = globalStyles.accentColor;
      break;
    case 'commonColor':
      styles.color = globalStyles.commonColor;
      break;
    default:
      break;
  }

  return styles;
};

// CSS変数として共通スタイルを生成（全コンポーネントに適用）
export const generateGlobalStylesCSS = (globalStyles: GlobalStyles | undefined): string => {
  if (!globalStyles) {
    return '';
  }

  return `
    :root {
      --main-color: ${globalStyles.mainColor};
      --main-color-sub: ${globalStyles.mainColorSub};
      --base-color: ${globalStyles.baseColor};
      --base-color-sub: ${globalStyles.baseColorSub};
      --base2-color: ${globalStyles.base2Color};
      --base2-color-sub: ${globalStyles.base2ColorSub};
      --accent-color: ${globalStyles.accentColor};
      --accent-color-sub: ${globalStyles.accentColorSub};
      --common-color: ${globalStyles.commonColor};
      --common-color-bg: ${globalStyles.commonColorBg};
    }
    
    /* 各色をテキスト色として適用するクラス */
    .mainColorText {
      color: var(--main-color) !important;
    }
    
    .mainColorSubText {
      color: var(--main-color-sub) !important;
    }
    
    .baseColorText {
      color: var(--base-color) !important;
    }
    
    .baseColorSubText {
      color: var(--base-color-sub) !important;
    }
    
    .base2ColorText {
      color: var(--base2-color) !important;
    }
    
    .base2ColorSubText {
      color: var(--base2-color-sub) !important;
    }
    
    .accentColorText {
      color: var(--accent-color) !important;
    }
    
    .accentColorSubText {
      color: var(--accent-color-sub) !important;
    }
    
    /* 各色を背景色として適用するクラス */
    .mainColorBg {
      background-color: var(--main-color) !important;
    }
    
    .mainColorSubBg {
      background-color: var(--main-color-sub) !important;
    }
    
    .baseColorBg {
      background-color: var(--base-color) !important;
    }
    
    .baseColorSubBg {
      background-color: var(--base-color-sub) !important;
    }
    
    .base2ColorBg {
      background-color: var(--base2-color) !important;
    }
    
    .base2ColorSubBg {
      background-color: var(--base2-color-sub) !important;
    }
    
    .accentColorBg {
      background-color: var(--accent-color) !important;
    }
    
    .accentColorSubBg {
      background-color: var(--accent-color-sub) !important;
    }
    
    /* 従来の組み合わせクラス（後方互換性のため） */
    .mainColor {
      background-color: var(--main-color) !important;
      color: var(--main-color-sub) !important;
    }
    
    .baseColor {
      background-color: var(--base-color) !important;
      color: var(--base-color-sub) !important;
    }
    
    .base2Color {
      background-color: var(--base2-color) !important;
      color: var(--base2-color-sub) !important;
    }
    
    .accentColor {
      background-color: var(--accent-color) !important;
      color: var(--accent-color-sub) !important;
    }
    
    .commonColor {
      color: var(--common-color) !important;
    }
    
    .commonColorBg {
      background-color: var(--common-color-bg) !important;
    }
    
    /* ボタンなどのホバー効果 */
    .mainColorBg:hover, .mainColor:hover {
      filter: brightness(0.9);
    }
    
    .mainColorSubBg:hover {
      filter: brightness(0.9);
    }
    
    .baseColorBg:hover, .baseColor:hover {
      filter: brightness(0.95);
    }
    
    .baseColorSubBg:hover {
      filter: brightness(0.95);
    }
    
    .base2ColorBg:hover, .base2Color:hover {
      filter: brightness(0.95);
    }
    
    .base2ColorSubBg:hover {
      filter: brightness(0.95);
    }
    
    .accentColorBg:hover, .accentColor:hover {
      filter: brightness(0.9);
    }
    
    .accentColorSubBg:hover {
      filter: brightness(0.9);
    }
    
    
    /* 全コンポーネントのスタイル適用 */
    [data-style-main-color] {
      background-color: var(--main-color) !important;
      color: #ffffff !important;
    }
    
    [data-style-base-color] {
      background-color: var(--base-color) !important;
    }
    
    [data-style-base2-color] {
      background-color: var(--base2-color) !important;
    }
    
    [data-style-accent-color] {
      color: var(--accent-color) !important;
    }
    
    [data-style-common-color] {
      color: var(--common-color) !important;
    }
    
    [data-style-common-color-bg] {
      background-color: var(--common-color-bg) !important;
    }
    
    /* 個別コンポーネントスタイルの適用 */
    [data-component-background] {
      background-color: var(--component-background-color, inherit);
    }
    
    [data-component-text] {
      color: var(--component-text-color, inherit);
    }
    
    [data-component-headline] {
      color: var(--component-headline-color, inherit);
    }
    
    [data-component-description] {
      color: var(--component-description-color, inherit);
    }
    
    [data-component-button-bg] {
      background-color: var(--component-button-bg-color, inherit);
    }
    
    [data-component-button-text] {
      color: var(--component-button-text-color, inherit);
    }
    
    [data-component-card-bg] {
      background-color: var(--component-card-bg-color, inherit);
    }
    
    [data-component-card-text] {
      color: var(--component-card-text-color, inherit);
    }
    
    [data-component-accent] {
      color: var(--component-accent-color, inherit);
    }
    
    /* 柔軟な色指定システム */
    /* mainColor系 */
    .main-bg { background-color: var(--main-color) !important; }
    .main-text { color: var(--main-color) !important; }
    .main-sub-bg { background-color: var(--main-color-sub) !important; }
    .main-sub-text { color: var(--main-color-sub) !important; }
    
    /* baseColor系 */
    .base-bg { background-color: var(--base-color) !important; }
    .base-text { color: var(--base-color) !important; }
    .base-sub-bg { background-color: var(--base-color-sub) !important; }
    .base-sub-text { color: var(--base-color-sub) !important; }
    
    /* base2Color系 */
    .base2-bg { background-color: var(--base2-color) !important; }
    .base2-text { color: var(--base2-color) !important; }
    .base2-sub-bg { background-color: var(--base2-color-sub) !important; }
    .base2-sub-text { color: var(--base2-color-sub) !important; }
    
    /* accentColor系 */
    .accent-bg { background-color: var(--accent-color) !important; }
    .accent-text { color: var(--accent-color) !important; }
    .accent-sub-bg { background-color: var(--accent-color-sub) !important; }
    .accent-sub-text { color: var(--accent-color-sub) !important; }
    
    /* 組み合わせパターン */
    .main-pattern-1 {
      background-color: var(--main-color) !important;
      color: var(--main-color-sub) !important;
    }
    
    .main-pattern-2 {
      background-color: var(--main-color-sub) !important;
      color: var(--main-color) !important;
    }
    
    .base-pattern-1 {
      background-color: var(--base-color) !important;
      color: var(--base-color-sub) !important;
    }
    
    .base-pattern-2 {
      background-color: var(--base-color-sub) !important;
      color: var(--base-color) !important;
    }
    
    .base2-pattern-1 {
      background-color: var(--base2-color) !important;
      color: var(--base2-color-sub) !important;
    }
    
    .base2-pattern-2 {
      background-color: var(--base2-color-sub) !important;
      color: var(--base2-color) !important;
    }
    
    .accent-pattern-1 {
      background-color: var(--accent-color) !important;
      color: var(--accent-color-sub) !important;
    }
    
    .accent-pattern-2 {
      background-color: var(--accent-color-sub) !important;
      color: var(--accent-color) !important;
    }
    
    /* ホバー効果 */
    .main-bg:hover, .main-pattern-1:hover { filter: brightness(0.9); }
    .main-sub-bg:hover, .main-pattern-2:hover { filter: brightness(0.9); }
    .base-bg:hover, .base-pattern-1:hover { filter: brightness(0.95); }
    .base-sub-bg:hover, .base-pattern-2:hover { filter: brightness(0.95); }
    .base2-bg:hover, .base2-pattern-1:hover { filter: brightness(0.95); }
    .base2-sub-bg:hover, .base2-pattern-2:hover { filter: brightness(0.95); }
    .accent-bg:hover, .accent-pattern-1:hover { filter: brightness(0.9); }
    .accent-sub-bg:hover, .accent-pattern-2:hover { filter: brightness(0.9); }
  `;
};

// 特定のコンポーネントで共通スタイルを取得
export const getGlobalStyleValue = (
  globalStyles: GlobalStyles | undefined,
  styleKey: keyof GlobalStyles
): string => {
  if (!globalStyles) {
    // デフォルト値を返す
    const defaults: GlobalStyles = {
      mainColor: '#C3000F',
      mainColorSub: '#ffffff',
      baseColor: '#f8fafc',
      baseColorSub: '#333333',
      base2Color: '#f1f5f9',
      base2ColorSub: '#333333',
      accentColor: '#E60012',
      accentColorSub: '#ffffff',
      commonColor: '#000000',
      commonColorBg: '#ffffff',
    };
    return defaults[styleKey];
  }
  
  return globalStyles[styleKey];
};

// コンポーネント個別スタイルのCSS変数を生成
export const generateComponentStyleCSS = (componentStyle: any): string => {
  if (!componentStyle) return '';
  
  const cssVars: string[] = [];
  
  if (componentStyle.backgroundColor) {
    cssVars.push(`--component-background-color: ${componentStyle.backgroundColor};`);
  }
  if (componentStyle.textColor) {
    cssVars.push(`--component-text-color: ${componentStyle.textColor};`);
  }
  if (componentStyle.headlineColor) {
    cssVars.push(`--component-headline-color: ${componentStyle.headlineColor};`);
  }
  if (componentStyle.descriptionColor) {
    cssVars.push(`--component-description-color: ${componentStyle.descriptionColor};`);
  }
  if (componentStyle.buttonBackgroundColor) {
    cssVars.push(`--component-button-bg-color: ${componentStyle.buttonBackgroundColor};`);
  }
  if (componentStyle.buttonTextColor) {
    cssVars.push(`--component-button-text-color: ${componentStyle.buttonTextColor};`);
  }
  if (componentStyle.cardBackgroundColor) {
    cssVars.push(`--component-card-bg-color: ${componentStyle.cardBackgroundColor};`);
  }
  if (componentStyle.cardTextColor) {
    cssVars.push(`--component-card-text-color: ${componentStyle.cardTextColor};`);
  }
  if (componentStyle.accentColor) {
    cssVars.push(`--component-accent-color: ${componentStyle.accentColor};`);
  }
  
  return cssVars.length > 0 ? `:root { ${cssVars.join(' ')} }` : '';
};