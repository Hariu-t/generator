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

// CSS変数として共通スタイルを生成
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