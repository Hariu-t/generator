export interface PropField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'link' | 'image' | 'color' | 'backgroundColor' | 'colorBoth' | 'array' | 'visibility';
  label: string;
  defaultValue: any;
  description?: string;
  position?: { start: number; end: number };
  elementPath?: string;
  // 配列項目のフィールドとして統合する場合の情報
  arrayFieldName?: string; // 配列項目内でのフィールド名（例: 'name', 'price'）
  arrayParentId?: string; // 親となる配列プロパティのID
}

export interface ValidationError {
  fieldId: string;
  fieldName: string;
  type: 'duplicate' | 'type_mismatch' | 'invalid_format' | 'missing_required';
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * プロパティ名の重複をチェック
 */
const checkDuplicateNames = (propFields: PropField[]): ValidationError[] => {
  const errors: ValidationError[] = [];
  const nameCounts = new Map<string, PropField[]>();

  propFields.forEach((field) => {
    // 配列に統合されたフィールドプロパティは重複チェックから除外
    // （配列プロパティに統合されているため、独立したプロパティとして扱わない）
    if (field.arrayParentId) {
      return;
    }

    if (!field.name || field.name.trim() === '') {
      errors.push({
        fieldId: field.id,
        fieldName: field.name || '(無名)',
        type: 'missing_required',
        message: 'プロパティ名が空です',
      });
      return;
    }

    const normalizedName = field.name.trim().toLowerCase();
    if (!nameCounts.has(normalizedName)) {
      nameCounts.set(normalizedName, []);
    }
    nameCounts.get(normalizedName)!.push(field);
  });

  nameCounts.forEach((fields) => {
    if (fields.length > 1) {
      fields.forEach((field) => {
        errors.push({
          fieldId: field.id,
          fieldName: field.name,
          type: 'duplicate',
          message: `プロパティ名 "${field.name}" が重複しています（${fields.length}件）`,
        });
      });
    }
  });

  return errors;
};

/**
 * プロパティの型整合性をチェック
 */
const checkTypeConsistency = (propFields: PropField[]): ValidationError[] => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  propFields.forEach((field) => {
    const { type, defaultValue, name } = field;

    // 配列に統合されたフィールドプロパティは型整合性チェックから除外
    // （配列プロパティに統合されているため、独立したプロパティとして扱わない）
    if (field.arrayParentId) {
      return;
    }

    // デフォルト値が未設定の場合は警告
    if (defaultValue === undefined || defaultValue === null) {
      warnings.push({
        fieldId: field.id,
        fieldName: name,
        type: 'missing_required',
        message: `プロパティ "${name}" のデフォルト値が設定されていません`,
      });
    }

    switch (type) {
      case 'text':
      case 'textarea':
        if (defaultValue !== undefined && typeof defaultValue !== 'string') {
          errors.push({
            fieldId: field.id,
            fieldName: name,
            type: 'type_mismatch',
            message: `プロパティ "${name}" は文字列型である必要がありますが、${typeof defaultValue}型が設定されています`,
          });
        }
        break;

      case 'link':
        if (defaultValue !== undefined) {
          if (
            typeof defaultValue !== 'object' ||
            defaultValue === null ||
            defaultValue.url === undefined
          ) {
            errors.push({
              fieldId: field.id,
              fieldName: name,
              type: 'type_mismatch',
              message: `プロパティ "${name}" は {url: string, text?: string} 形式である必要があります`,
            });
          } else if (typeof defaultValue.url !== 'string') {
            errors.push({
              fieldId: field.id,
              fieldName: name,
              type: 'type_mismatch',
              message: `プロパティ "${name}" のurlフィールドは文字列である必要があります`,
            });
          }
        }
        break;

      case 'image':
        if (defaultValue !== undefined) {
          if (typeof defaultValue !== 'object' || !defaultValue.src) {
            errors.push({
              fieldId: field.id,
              fieldName: name,
              type: 'type_mismatch',
              message: `プロパティ "${name}" は {src: string, alt?: string} 形式である必要があります`,
            });
          } else if (typeof defaultValue.src !== 'string') {
            errors.push({
              fieldId: field.id,
              fieldName: name,
              type: 'type_mismatch',
              message: `プロパティ "${name}" のsrcフィールドは文字列である必要があります`,
            });
          }
        }
        break;

      case 'color':
      case 'backgroundColor':
        if (defaultValue !== undefined && typeof defaultValue !== 'string') {
          errors.push({
            fieldId: field.id,
            fieldName: name,
            type: 'type_mismatch',
            message: `プロパティ "${name}" はカラーコード（文字列）である必要があります`,
          });
        } else if (typeof defaultValue === 'string' && !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(defaultValue)) {
          warnings.push({
            fieldId: field.id,
            fieldName: name,
            type: 'invalid_format',
            message: `プロパティ "${name}" のカラーコード形式が不正です（例: #ff0000）`,
          });
        }
        break;

      case 'colorBoth':
        if (defaultValue !== undefined) {
          if (typeof defaultValue !== 'object' || !defaultValue.color || !defaultValue.backgroundColor) {
            errors.push({
              fieldId: field.id,
              fieldName: name,
              type: 'type_mismatch',
              message: `プロパティ "${name}" は {color: string, backgroundColor: string} 形式である必要があります`,
            });
          } else {
            const colorValid = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(defaultValue.color);
            const bgValid = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(defaultValue.backgroundColor);
            if (!colorValid || !bgValid) {
              warnings.push({
                fieldId: field.id,
                fieldName: name,
                type: 'invalid_format',
                message: `プロパティ "${name}" のカラーコード形式が不正です`,
              });
            }
          }
        }
        break;

      case 'array':
        if (defaultValue !== undefined && !Array.isArray(defaultValue)) {
          errors.push({
            fieldId: field.id,
            fieldName: name,
            type: 'type_mismatch',
            message: `プロパティ "${name}" は配列型である必要があります`,
          });
        } else if (Array.isArray(defaultValue)) {
          // 配列の要素型をチェック
          defaultValue.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // オブジェクト項目の場合、各フィールドの型をチェック
              Object.keys(item).forEach((key) => {
                const fieldValue = item[key];
                // 基本的な型チェック（詳細なチェックは各フィールドプロパティで行う）
                if (fieldValue === null || fieldValue === undefined) {
                  warnings.push({
                    fieldId: field.id,
                    fieldName: name,
                    type: 'missing_required',
                    message: `プロパティ "${name}" の配列項目[${index}]のフィールド "${key}" が空です`,
                  });
                }
              });
            } else if (typeof item !== 'string' && item !== null) {
              warnings.push({
                fieldId: field.id,
                fieldName: name,
                type: 'type_mismatch',
                message: `プロパティ "${name}" の配列項目[${index}]が文字列またはオブジェクトではありません`,
              });
            }
          });
        }
        break;

      case 'visibility':
        if (defaultValue !== undefined && typeof defaultValue !== 'boolean') {
          errors.push({
            fieldId: field.id,
            fieldName: name,
            type: 'type_mismatch',
            message: `プロパティ "${name}" は真偽値型である必要があります`,
          });
        }
        break;
    }
  });

  return [...errors, ...warnings];
};

/**
 * プロパティ名の形式をチェック（英数字、アンダースコア、ハイフンのみ）
 */
const checkNameFormat = (propFields: PropField[]): ValidationError[] => {
  const errors: ValidationError[] = [];
  const namePattern = /^[a-zA-Z0-9_-]+$/;

  propFields.forEach((field) => {
    // 配列に統合されたフィールドプロパティは名前形式チェックから除外
    // （配列プロパティに統合されているため、独立したプロパティとして扱わない）
    if (field.arrayParentId) {
      return;
    }

    if (!field.name) return;

    if (!namePattern.test(field.name)) {
      errors.push({
        fieldId: field.id,
        fieldName: field.name,
        type: 'invalid_format',
        message: `プロパティ名 "${field.name}" は英数字、アンダースコア(_)、ハイフン(-)のみ使用可能です`,
      });
    }
  });

  return errors;
};

/**
 * プロパティフィールドのバリデーションを実行
 */
export const validatePropFields = (propFields: PropField[]): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 重複チェック
  errors.push(...checkDuplicateNames(propFields));

  // 名前形式チェック
  errors.push(...checkNameFormat(propFields));

  // 型整合性チェック（エラーと警告を分離）
  const typeCheckResults = checkTypeConsistency(propFields);
  typeCheckResults.forEach((result) => {
    if (result.type === 'type_mismatch' || result.type === 'missing_required') {
      errors.push(result);
    } else {
      warnings.push(result);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * バリデーション結果を人間が読みやすい形式で表示
 */
export const formatValidationMessages = (result: ValidationResult): string[] => {
  const messages: string[] = [];

  if (result.errors.length > 0) {
    messages.push(`❌ エラー: ${result.errors.length}件`);
    result.errors.forEach((error) => {
      messages.push(`  • ${error.fieldName}: ${error.message}`);
    });
  }

  if (result.warnings.length > 0) {
    messages.push(`⚠️ 警告: ${result.warnings.length}件`);
    result.warnings.forEach((warning) => {
      messages.push(`  • ${warning.fieldName}: ${warning.message}`);
    });
  }

  if (messages.length === 0) {
    messages.push('✅ すべてのプロパティが正常です');
  }

  return messages;
};

