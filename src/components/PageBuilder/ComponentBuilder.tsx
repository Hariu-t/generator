import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, Copy, Check, Code, Wand2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PropField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'array' | 'object';
  label: string;
  defaultValue: any;
  description?: string;
  position?: { start: number; end: number };
}

const ComponentBuilder: React.FC = () => {
  const [componentName, setComponentName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('content');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [propFields, setPropFields] = useState<PropField[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [showPropModal, setShowPropModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const [newPropName, setNewPropName] = useState('');
  const [newPropType, setNewPropType] = useState<PropField['type']>('text');
  const [step, setStep] = useState<'html' | 'props' | 'generate'>('html');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextSelection = () => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selected = htmlCode.substring(start, end);

    if (selected && selected.length > 0 && start !== end) {
      setSelectedText(selected);
      setSelectionRange({ start, end });
      setShowPropModal(true);

      const propName = selected
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase()
        .substring(0, 20);
      setNewPropName(propName || 'prop');
    }
  };

  const addPropertyFromSelection = () => {
    if (!selectedText || !selectionRange || !newPropName) return;

    const newField: PropField = {
      id: `prop_${Date.now()}`,
      name: newPropName,
      type: newPropType,
      label: newPropName.charAt(0).toUpperCase() + newPropName.slice(1),
      defaultValue: selectedText,
      description: '',
      position: selectionRange,
    };

    setPropFields([...propFields, newField]);

    const dataPropAttr = ` data-prop="${newPropName}" data-bind-type="${newPropType === 'image' ? 'src' : 'text'}"`;
    const beforeText = htmlCode.substring(0, selectionRange.start);
    const afterText = htmlCode.substring(selectionRange.end);

    const updatedHtml = beforeText + selectedText + afterText;

    const tagMatch = beforeText.match(/<[^>]*$/);
    if (tagMatch) {
      const insertPosition = selectionRange.start;
      const newHtml = htmlCode.substring(0, insertPosition) + dataPropAttr + '>' + selectedText + afterText;
      setHtmlCode(newHtml);
    } else {
      const parentTagEnd = beforeText.lastIndexOf('>');
      if (parentTagEnd !== -1) {
        const newHtml = htmlCode.substring(0, parentTagEnd) + dataPropAttr + htmlCode.substring(parentTagEnd);
        setHtmlCode(newHtml);
      }
    }

    setShowPropModal(false);
    setNewPropName('');
    setNewPropType('text');
    setSelectedText('');
    setSelectionRange(null);
  };

  const removePropField = (id: string) => {
    const field = propFields.find(f => f.id === id);
    if (field && field.position) {
      const dataPropRegex = new RegExp(`\\s*data-prop="${field.name}"[^>]*`, 'g');
      setHtmlCode(htmlCode.replace(dataPropRegex, ''));
    }
    setPropFields(propFields.filter(field => field.id !== id));
  };

  const updatePropField = (id: string, updates: Partial<PropField>) => {
    setPropFields(propFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const generateComponentCode = () => {
    const propNames = propFields.map(f => f.name).filter(Boolean).join(', ');
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
${htmlCode.split('\n').map(line => '        ' + line).join('\n')}
      </div>
    </section>
  );
};

export default ${componentName};`;

    setGeneratedCode(code);
    setStep('generate');
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
      if (field.name) {
        defaultProps[field.name] = field.defaultValue;
      }
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
          HTMLコードを貼り付けて、対話的にプロパティを定義できます
        </p>
      </div>

      <div style={styles.stepsContainer}>
        <div style={{ ...styles.step, ...(step === 'html' ? styles.stepActive : {}) }}>
          <div style={styles.stepNumber}>1</div>
          <span>HTMLコード</span>
        </div>
        <div style={styles.stepDivider}></div>
        <div style={{ ...styles.step, ...(step === 'props' ? styles.stepActive : {}) }}>
          <div style={styles.stepNumber}>2</div>
          <span>プロパティ定義</span>
        </div>
        <div style={styles.stepDivider}></div>
        <div style={{ ...styles.step, ...(step === 'generate' ? styles.stepActive : {}) }}>
          <div style={styles.stepNumber}>3</div>
          <span>コード生成</span>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>基本情報</h3>

          <div style={styles.fieldRow}>
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
          </div>
        </div>

        <div style={styles.formSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>
              <Code size={20} style={{ marginRight: '8px' }} />
              HTMLコード
            </h3>
            {htmlCode && (
              <button
                style={styles.nextButton}
                onClick={() => setStep('props')}
              >
                次へ：プロパティ定義
              </button>
            )}
          </div>

          <p style={styles.helpText}>
            既存のHTMLコードを貼り付けてください。その後、編集可能にしたいテキストを選択すると、プロパティとして定義できます。
          </p>

          <textarea
            ref={textareaRef}
            style={styles.codeTextarea}
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            onMouseUp={handleTextSelection}
            placeholder={`例：
<h2>タイトルをここに入力</h2>
<p>説明文をここに入力</p>
<img src="/path/to/image.jpg" alt="画像" />
`}
            rows={15}
          />
        </div>

        {htmlCode && (
          <div style={styles.formSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <Wand2 size={20} style={{ marginRight: '8px' }} />
                定義されたプロパティ ({propFields.length})
              </h3>
              <button
                style={styles.generateButton}
                onClick={generateComponentCode}
                disabled={!componentName || propFields.length === 0}
              >
                コード生成
              </button>
            </div>

            <p style={styles.helpText}>
              コード内のテキストを選択して、プロパティとして定義してください。
            </p>

            {propFields.length === 0 ? (
              <div style={styles.emptyState}>
                <p>プロパティが定義されていません</p>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>
                  上のHTMLコード内でテキストを選択してプロパティを追加してください
                </p>
              </div>
            ) : (
              <div style={styles.propsList}>
                {propFields.map((field) => (
                  <div key={field.id} style={styles.propCard}>
                    <div style={styles.propCardHeader}>
                      <div style={styles.propBadge}>{field.type}</div>
                      <span style={styles.propName}>data-prop="{field.name}"</span>
                      <button
                        style={styles.deleteButton}
                        onClick={() => removePropField(field.id)}
                        title="削除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div style={styles.propCardBody}>
                      <div style={styles.propFieldRow}>
                        <div style={styles.propFieldHalf}>
                          <label style={styles.propLabel}>プロパティ名</label>
                          <input
                            type="text"
                            style={styles.propInput}
                            value={field.name}
                            onChange={(e) => updatePropField(field.id, { name: e.target.value })}
                          />
                        </div>
                        <div style={styles.propFieldHalf}>
                          <label style={styles.propLabel}>表示ラベル</label>
                          <input
                            type="text"
                            style={styles.propInput}
                            value={field.label}
                            onChange={(e) => updatePropField(field.id, { label: e.target.value })}
                          />
                        </div>
                      </div>
                      <div style={styles.propField}>
                        <label style={styles.propLabel}>デフォルト値</label>
                        <input
                          type="text"
                          style={styles.propInput}
                          value={field.defaultValue}
                          onChange={(e) => updatePropField(field.id, { defaultValue: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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

      {showPropModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPropModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>プロパティを定義</h3>

            <div style={styles.modalContent}>
              <div style={styles.selectedTextPreview}>
                <label style={styles.modalLabel}>選択されたテキスト:</label>
                <div style={styles.selectedTextBox}>{selectedText}</div>
              </div>

              <div style={styles.modalField}>
                <label style={styles.modalLabel}>
                  プロパティ名 <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  style={styles.modalInput}
                  value={newPropName}
                  onChange={(e) => setNewPropName(e.target.value)}
                  placeholder="例: title, description"
                  autoFocus
                />
                <p style={styles.modalHint}>
                  HTMLには data-prop="{newPropName}" として追加されます
                </p>
              </div>

              <div style={styles.modalField}>
                <label style={styles.modalLabel}>タイプ</label>
                <select
                  style={styles.modalInput}
                  value={newPropType}
                  onChange={(e) => setNewPropType(e.target.value as PropField['type'])}
                >
                  <option value="text">テキスト</option>
                  <option value="textarea">テキストエリア</option>
                  <option value="number">数値</option>
                  <option value="boolean">真偽値</option>
                  <option value="image">画像URL</option>
                  <option value="array">配列</option>
                  <option value="object">オブジェクト</option>
                </select>
              </div>
            </div>

            <div style={styles.modalActions}>
              <button
                style={styles.modalCancelButton}
                onClick={() => setShowPropModal(false)}
              >
                キャンセル
              </button>
              <button
                style={styles.modalSaveButton}
                onClick={addPropertyFromSelection}
                disabled={!newPropName}
              >
                プロパティを追加
              </button>
            </div>
          </div>
        </div>
      )}
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
    marginBottom: '24px',
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
  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#9ca3af',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  stepActive: {
    color: '#2563eb',
    backgroundColor: '#dbeafe',
  } as React.CSSProperties,
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
  } as React.CSSProperties,
  stepDivider: {
    width: '60px',
    height: '2px',
    backgroundColor: '#e5e7eb',
    margin: '0 8px',
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
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
  } as React.CSSProperties,
  field: {
    marginBottom: '0',
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
  helpText: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px',
    lineHeight: '1.5',
  } as React.CSSProperties,
  codeTextarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    lineHeight: '1.6',
    outline: 'none',
    resize: 'vertical',
  } as React.CSSProperties,
  nextButton: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
  generateButton: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
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
    gap: '12px',
  } as React.CSSProperties,
  propCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f9fafb',
  } as React.CSSProperties,
  propCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  } as React.CSSProperties,
  propBadge: {
    padding: '4px 8px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
  propName: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#374151',
    fontWeight: '500',
  } as React.CSSProperties,
  deleteButton: {
    padding: '6px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
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
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  } as React.CSSProperties,
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px',
  } as React.CSSProperties,
  modalContent: {
    marginBottom: '20px',
  } as React.CSSProperties,
  selectedTextPreview: {
    marginBottom: '16px',
  } as React.CSSProperties,
  modalLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  } as React.CSSProperties,
  selectedTextBox: {
    padding: '12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1f2937',
    fontFamily: 'monospace',
    wordBreak: 'break-word' as const,
  } as React.CSSProperties,
  modalField: {
    marginBottom: '16px',
  } as React.CSSProperties,
  modalInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  } as React.CSSProperties,
  modalHint: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  } as React.CSSProperties,
  modalCancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
  modalSaveButton: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default ComponentBuilder;
