/*
  # コンポーネントテンプレートのバージョン管理機能追加

  1. 変更内容
    - `component_templates` テーブルに以下のカラムを追加:
      - `version` (integer): バージョン番号（デフォルト: 1）
      - `is_draft` (boolean): ドラフト版かどうか（デフォルト: true）
      - `parent_id` (uuid): 親バージョンのID（バージョン履歴を追跡）
      - `css_files` (jsonb): CSSファイルリスト
      - `js_files` (jsonb): JSファイルリスト

  2. セキュリティ
    - 既存のRLSポリシーが継続して適用されます
    - ドラフト版は作成者のみ閲覧可能にする（将来的な拡張）

  3. インデックス
    - `parent_id`にインデックスを追加（履歴検索用）
    - `unique_id`と`version`の複合インデックスを追加
*/

-- Add versioning columns
ALTER TABLE component_templates
ADD COLUMN IF NOT EXISTS version integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_draft boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES component_templates(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS css_files jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS js_files jsonb DEFAULT '[]'::jsonb;

-- Create indexes for versioning
CREATE INDEX IF NOT EXISTS idx_component_templates_parent_id ON component_templates(parent_id);
CREATE INDEX IF NOT EXISTS idx_component_templates_unique_id_version ON component_templates(unique_id, version);
CREATE INDEX IF NOT EXISTS idx_component_templates_is_draft ON component_templates(is_draft);

-- Add comments
COMMENT ON COLUMN component_templates.version IS 'Version number of the component template';
COMMENT ON COLUMN component_templates.is_draft IS 'Whether this is a draft version (true) or released version (false)';
COMMENT ON COLUMN component_templates.parent_id IS 'Parent version ID for version history tracking';
COMMENT ON COLUMN component_templates.css_files IS 'Array of CSS file paths required by this component';
COMMENT ON COLUMN component_templates.js_files IS 'Array of JS file paths required by this component';

-- Function to get the latest version of a component
CREATE OR REPLACE FUNCTION get_latest_component_version(p_unique_id text, p_include_draft boolean DEFAULT false)
RETURNS TABLE (
  id uuid,
  name text,
  display_name text,
  category text,
  version integer,
  is_draft boolean,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ct.id,
    ct.name,
    ct.display_name,
    ct.category,
    ct.version,
    ct.is_draft,
    ct.created_at
  FROM component_templates ct
  WHERE ct.unique_id = p_unique_id
    AND (p_include_draft = true OR ct.is_draft = false)
  ORDER BY ct.version DESC, ct.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get version history
CREATE OR REPLACE FUNCTION get_component_version_history(p_unique_id text)
RETURNS TABLE (
  id uuid,
  version integer,
  is_draft boolean,
  created_at timestamptz,
  updated_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ct.id,
    ct.version,
    ct.is_draft,
    ct.created_at,
    ct.updated_at
  FROM component_templates ct
  WHERE ct.unique_id = p_unique_id
  ORDER BY ct.version DESC, ct.created_at DESC;
END;
$$ LANGUAGE plpgsql;

