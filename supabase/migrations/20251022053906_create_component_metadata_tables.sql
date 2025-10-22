/*
  # コンポーネントメタデータテーブルの作成

  1. 新しいテーブル
    - `component_templates`
      - `id` (uuid, primary key)
      - `name` (text) - コンポーネント名（例：HeadlineComponent）
      - `display_name` (text) - 表示名（例：見出し）
      - `category` (text) - カテゴリ（例：header, content, footer）
      - `thumbnail_url` (text) - サムネイル画像URL
      - `description` (text) - 説明文
      - `code_template` (text) - TSXコードテンプレート
      - `default_props` (jsonb) - デフォルトprops
      - `prop_schema` (jsonb) - プロパティスキーマ定義
      - `style_schema` (jsonb) - スタイルスキーマ定義
      - `is_active` (boolean) - 有効/無効
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. セキュリティ
    - RLSを有効化
    - 誰でも読み取り可能
    - 認証ユーザーのみ作成・更新・削除可能
*/

CREATE TABLE IF NOT EXISTS component_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  category text NOT NULL DEFAULT 'content',
  thumbnail_url text,
  description text,
  code_template text NOT NULL,
  default_props jsonb DEFAULT '{}'::jsonb,
  prop_schema jsonb DEFAULT '[]'::jsonb,
  style_schema jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE component_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active component templates"
  ON component_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can create component templates"
  ON component_templates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update component templates"
  ON component_templates FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete component templates"
  ON component_templates FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_component_templates_category ON component_templates(category);
CREATE INDEX IF NOT EXISTS idx_component_templates_is_active ON component_templates(is_active);
