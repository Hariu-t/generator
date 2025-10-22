import React, { useState } from 'react';
import { Plus, Trash2, Download, Copy, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PropField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'array' | 'object';
  label: string;
  defaultValue: any;
  description?: string;
}

const ComponentBuilder: React.FC = () => {
  const [componentName, setComponentName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('content');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [propFields, setPropFields] = useState<PropField[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const addPropField = () => {
    const newField: PropField = {
      id: `prop_${Date.now()}`,
      name: '',
      type: 'text',
      label: '',
      defaultValue: '',
      description: '',
    };
    setPropFields([...propFields, newField]);
  };

  const updatePropField = (id: string, updates: Partial<PropField>) => {
    setPropFields(propFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removePropField = (id: string) => {
    setPropFields(propFields.filter(field => field.id !== id));
  };

  const generateComponentCode = () => {
    const propNames = propFields.map(f => f.name).join(', ');
    const propsDestructure = propFields.length > 0 ? `const { ${propNames} } = props;` : '';

    const code = `import React from 'react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface ${componentName}Props {
  component: ComponentData;
  isEditing?: boolean;
}

const ${componentName}: React.FC<${componentName}Props> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  ${propsDestructure}

  const containerStyle: React.CSSProperties = {
    backgroundColor: style?.backgroundColor || globalStyles.baseColor,
    padding: '60px 20px',
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <section ref={containerRef} style={containerStyle}>
      <div style={innerStyle}>
        {/* TODO: Add your HTML markup here */}
        <h2 data-prop="title">{props.title || 'タイトル'}</h2>
        <p data-prop="description">{props.description || '説明文'}</p>
      </div>
    </section>
  );
};

export default ${componentName};`;

    setGeneratedCode(code);
  };

  const saveToDatabase = async () => {
    if (!componentName || !displayName) {
      alert('コンポーネント名と表示名は必須です');
      return;
    }

    const defaultProps: Record<string, any> = {};
    const propSchema = propFields.map(field => ({
      name: field.name,
      type: field.type,
      label: field.label,
      defaultValue: field.defaultValue,
      description: field.description,
    }));

    propFields.forEach(field => {
      defaultProps[field.name] = field.defaultValue;
    });

    const { data, error } = await supabase
      .from('component_templates')
      .insert({
        name: componentName,
        display_name: displayName,
        category,
        description,
        thumbnail_url: thumbnailUrl,
        code_template: generatedCode,
        default_props: defaultProps,
        prop_schema: propSchema,
        is_active: true,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving component:', error);
      alert(`保存エラー: ${error.message}`);
      return;
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    alert('コンポーネントがデータベースに保存されました！');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCodeCopied(true);
      setTimeout(() => setIsCodeCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>コンポーネントビルダー</h2>
        <p style={styles.subtitle}>
          新しいコンポーネントを簡単に作成し、システムに登録できます
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>基本情報</h3>

          <div style={styles.field}>
            <label style={styles.label}>
              コンポーネント名 <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              style={styles.input}
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="例: MyCustomComponent"
            />
            <p style={styles.hint}>
              ファイル名になります（例: MyCustomComponent.tsx）
            </p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>
              表示名 <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              style={styles.input}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="例: カスタムセクション"
            />
            <p style={styles.hint}>コンポーネントライブラリに表示される名前</p>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>カテゴリ</label>
            <select
              style={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="header">ヘッダー</option>
              <option value="content">コンテンツ</option>
              <option value="footer">フッター</option>
              <option value="hero">ヒーロー</option>
              <option value="feature">機能</option>
              <option value="pricing">料金</option>
              <option value="faq">FAQ</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>説明</label>
            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="このコンポーネントの説明..."
              rows={3}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>サムネイルURL</label>
            <input
              type="text"
              style={styles.input}
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div style={styles.formSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>プロパティ定義</h3>
            <button style={styles.addButton} onClick={addPropField}>
              <Plus size={16} />
              プロパティを追加
            </button>
          </div>

          {propFields.length === 0 ? (
            <p style={styles.emptyState}>
              プロパティを追加してください。各プロパティは編集パネルで編集可能になります。
            </p>
          ) : (
            <div style={styles.propsList}>
              {propFields.map((field) => (
                <div key={field.id} style={styles.propCard}>
                  <div style={styles.propCardHeader}>
                    <input
                      type="text"
                      style={styles.propNameInput}
                      value={field.name}
                      onChange={(e) => updatePropField(field.id, { name: e.target.value })}
                      placeholder="プロパティ名（例: title）"
                    />
                    <button
                      style={styles.deleteButton}
                      onClick={() => removePropField(field.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={styles.propCardBody}>
                    <div style={styles.propFieldRow}>
                      <div style={styles.propFieldHalf}>
                        <label style={styles.propLabel}>表示ラベル</label>
                        <input
                          type="text"
                          style={styles.propInput}
                          value={field.label}
                          onChange={(e) => updatePropField(field.id, { label: e.target.value })}
                          placeholder="例: タイトル"
                        />
                      </div>
                      <div style={styles.propFieldHalf}>
                        <label style={styles.propLabel}>タイプ</label>
                        <select
                          style={styles.propInput}
                          value={field.type}
                          onChange={(e) => updatePropField(field.id, { type: e.target.value as any })}
                        >
                          <option value="text">テキスト</option>
                          <option value="textarea">テキストエリア</option>
                          <option value="number">数値</option>
                          <option value="boolean">真偽値</option>
                          <option value="image">画像</option>
                          <option value="array">配列</option>
                          <option value="object">オブジェクト</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.propField}>
                      <label style={styles.propLabel}>デフォルト値</label>
                      <input
                        type="text"
                        style={styles.propInput}
                        value={field.defaultValue}
                        onChange={(e) => updatePropField(field.id, { defaultValue: e.target.value })}
                        placeholder="デフォルト値"
                      />
                    </div>

                    <div style={styles.propField}>
                      <label style={styles.propLabel}>説明（オプション）</label>
                      <input
                        type="text"
                        style={styles.propInput}
                        value={field.description}
                        onChange={(e) => updatePropField(field.id, { description: e.target.value })}
                        placeholder="このプロパティの説明..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.actionsSection}>
          <button
            style={styles.generateButton}
            onClick={generateComponentCode}
            disabled={!componentName}
          >
            コード生成
          </button>
        </div>

        {generatedCode && (
          <div style={styles.codeSection}>
            <div style={styles.codeSectionHeader}>
              <h3 style={styles.sectionTitle}>生成されたコード</h3>
              <div style={styles.codeActions}>
                <button
                  style={styles.iconButton}
                  onClick={copyToClipboard}
                  title="コピー"
                >
                  {isCodeCopied ? <Check size={16} /> : <Copy size={16} />}
                  {isCodeCopied ? 'コピー完了' : 'コピー'}
                </button>
                <button
                  style={styles.iconButton}
                  onClick={downloadCode}
                  title="ダウンロード"
                >
                  <Download size={16} />
                  ダウンロード
                </button>
              </div>
            </div>
            <pre style={styles.codeBlock}>
              <code>{generatedCode}</code>
            </pre>

            <div style={styles.saveSection}>
              <button
                style={{ ...styles.saveButton, ...(isSaved ? styles.savedButton : {}) }}
                onClick={saveToDatabase}
                disabled={isSaved}
              >
                {isSaved ? (
                  <>
                    <Check size={16} />
                    保存完了
                  </>
                ) : (
                  'データベースに保存'
                )}
              </button>
              <p style={styles.saveHint}>
                保存後、コンポーネントライブラリに表示されます
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  } as React.CSSProperties,
  header: {
    marginBottom: '32px',
  } as React.CSSProperties,
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
  } as React.CSSProperties,
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  } as React.CSSProperties,
  field: {
    marginBottom: '20px',
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  } as React.CSSProperties,
  required: {
    color: '#ef4444',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  } as React.CSSProperties,
  textarea: {
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  hint: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  } as React.CSSProperties,
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px 20px',
    color: '#6b7280',
    fontSize: '14px',
  } as React.CSSProperties,
  propsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  } as React.CSSProperties,
  propCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f9fafb',
  } as React.CSSProperties,
  propCardHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
  } as React.CSSProperties,
  propNameInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    outline: 'none',
  } as React.CSSProperties,
  deleteButton: {
    padding: '8px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  } as React.CSSProperties,
  propCardBody: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  } as React.CSSProperties,
  propFieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  } as React.CSSProperties,
  propFieldHalf: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  propField: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  propLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
  } as React.CSSProperties,
  propInput: {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
  } as React.CSSProperties,
  actionsSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  } as React.CSSProperties,
  generateButton: {
    padding: '12px 32px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  codeSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  codeSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  } as React.CSSProperties,
  codeActions: {
    display: 'flex',
    gap: '8px',
  } as React.CSSProperties,
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
  codeBlock: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    overflow: 'auto',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: 'monospace',
    maxHeight: '400px',
  } as React.CSSProperties,
  saveSection: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 32px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  } as React.CSSProperties,
  savedButton: {
    backgroundColor: '#10b981',
  } as React.CSSProperties,
  saveHint: {
    fontSize: '13px',
    color: '#6b7280',
  } as React.CSSProperties,
};

export default ComponentBuilder;
