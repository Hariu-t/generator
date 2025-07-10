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
      --base-color: ${globalStyles.baseColor};
      --base2-color: ${globalStyles.base2Color};
      --accent-color: ${globalStyles.accentColor};
    }
    
    /* 全コンポーネントに適用される共通スタイル */
    .mainColor {
      background-color: var(--main-color) !important;
      color: #ffffff !important;
    }
    
    .baseColor {
      background-color: var(--base-color) !important;
    }
    
    .base2Color {
      background-color: var(--base2-color) !important;
    }
    
    .accentColor {
      color: var(--accent-color) !important;
    }
    
    /* ボタンなどのホバー効果 */
    .mainColor:hover {
      filter: brightness(0.9);
    }
    
    .baseColor:hover {
      filter: brightness(0.95);
    }
    
    .base2Color:hover {
      filter: brightness(0.95);
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
      mainColor: '#dc2626',
      baseColor: '#f8fafc',
      base2Color: '#f1f5f9',
      accentColor: '#3b82f6',
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