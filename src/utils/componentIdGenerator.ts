// Component unique ID generation utilities

/**
 * カテゴリ名とコンポーネント名から一意のIDを生成
 * 形式: {categoryRomanized}_{componentNameRomanized}
 */
export const generateUniqueComponentId = (
  categoryRomanized: string,
  componentNameRomanized: string
): string => {
  const sanitizeId = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  };

  const category = sanitizeId(categoryRomanized);
  const component = sanitizeId(componentNameRomanized);

  return `${category}_${component}`;
};

/**
 * 既存のカテゴリ名に対するデフォルトのローマ字マッピング
 */
export const DEFAULT_CATEGORY_ROMANIZED: Record<string, string> = {
  'KV': 'kv',
  '料金': 'pricing',
  '番組配信': 'streaming',
  'FAQ': 'faq',
  'footer': 'footer',
  '特集': 'special',
  'イベント': 'event',
  'キャンペーン': 'campaign',
  'ニュース': 'news',
  'お知らせ': 'information',
};

/**
 * カテゴリ名からローマ字表記を取得（既存マッピングまたは自動変換）
 */
export const getCategoryRomanized = (category: string): string => {
  // 既存のマッピングがあればそれを使用
  if (DEFAULT_CATEGORY_ROMANIZED[category]) {
    return DEFAULT_CATEGORY_ROMANIZED[category];
  }

  // なければカテゴリ名をそのまま使用（既にローマ字の場合）
  if (/^[a-zA-Z0-9\s-]+$/.test(category)) {
    return category.toLowerCase().replace(/\s+/g, '_');
  }

  // それ以外は「other」として扱う
  return 'other';
};

/**
 * コンポーネント名のバリデーション（ローマ字のみ）
 */
export const validateComponentNameRomanized = (name: string): {
  valid: boolean;
  error?: string;
} => {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'コンポーネント名（ローマ字）は必須です' };
  }

  if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
    return { valid: false, error: 'ローマ字（半角英数字、スペース、ハイフン）のみ使用できます' };
  }

  if (name.length > 50) {
    return { valid: false, error: 'コンポーネント名は50文字以内にしてください' };
  }

  return { valid: true };
};

/**
 * カテゴリ名のバリデーション（ローマ字）
 */
export const validateCategoryRomanized = (name: string): {
  valid: boolean;
  error?: string;
} => {
  if (!name || name.trim() === '') {
    return { valid: true }; // オプショナル
  }

  if (!/^[a-zA-Z0-9\s-]+$/.test(name)) {
    return { valid: false, error: 'ローマ字（半角英数字、スペース、ハイフン）のみ使用できます' };
  }

  if (name.length > 30) {
    return { valid: false, error: 'カテゴリ名は30文字以内にしてください' };
  }

  return { valid: true };
};

/**
 * HTMLのセクションIDを生成
 * 形式: {uniqueId}Area
 */
export const generateSectionId = (uniqueId: string): string => {
  return `${uniqueId}Area`;
};

/**
 * CSSファイル名を生成
 * 形式: {categoryRomanized}.css
 */
export const generateCSSFileName = (categoryRomanized: string): string => {
  return `${categoryRomanized.toLowerCase().replace(/\s+/g, '_')}.css`;
};

/**
 * コンポーネントの完全なメタデータを生成
 */
export interface ComponentMetadata {
  uniqueId: string;
  sectionId: string;
  cssFileName: string;
  categoryRomanized: string;
  componentNameRomanized: string;
}

export const generateComponentMetadata = (
  category: string,
  categoryRomanized: string | undefined,
  componentNameRomanized: string
): ComponentMetadata => {
  const finalCategoryRomanized = categoryRomanized || getCategoryRomanized(category);
  const uniqueId = generateUniqueComponentId(finalCategoryRomanized, componentNameRomanized);
  const sectionId = generateSectionId(uniqueId);
  const cssFileName = generateCSSFileName(finalCategoryRomanized);

  return {
    uniqueId,
    sectionId,
    cssFileName,
    categoryRomanized: finalCategoryRomanized,
    componentNameRomanized
  };
};
