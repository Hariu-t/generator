/*
  # コンポーネントテンプレートにローマ字フィールドと一意のID追加

  1. 変更内容
    - `component_templates` テーブルに以下のカラムを追加:
      - `name_romanized` (text): コンポーネント名のローマ字表記
      - `category_romanized` (text): カテゴリ名のローマ字表記
      - `unique_id` (text): 一意のID（カテゴリ_コンポーネント）
      - `section_id` (text): HTMLセクションID

  2. セキュリティ
    - 既存のRLSポリシーが継続して適用されます

  3. 注意事項
    - `unique_id`はCSS競合を防ぐための一意の識別子です
    - `section_id`はHTML出力時のセクションID生成に使用されます
*/

-- Add new columns to component_templates table
ALTER TABLE component_templates
ADD COLUMN IF NOT EXISTS name_romanized text,
ADD COLUMN IF NOT EXISTS category_romanized text,
ADD COLUMN IF NOT EXISTS unique_id text,
ADD COLUMN IF NOT EXISTS section_id text;

-- Create index on unique_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_component_templates_unique_id ON component_templates(unique_id);

-- Add comment for documentation
COMMENT ON COLUMN component_templates.name_romanized IS 'Component name in romanized form (alphanumeric only)';
COMMENT ON COLUMN component_templates.category_romanized IS 'Category name in romanized form (alphanumeric only)';
COMMENT ON COLUMN component_templates.unique_id IS 'Unique identifier for CSS (format: category_componentname)';
COMMENT ON COLUMN component_templates.section_id IS 'HTML section ID for rendering (format: unique_idArea)';
