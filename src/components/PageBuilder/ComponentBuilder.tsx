import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, Copy, Check, Code, Wand2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PropField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'link' | 'image' | 'color' | 'backgroundColor' | 'colorBoth' | 'array' | 'visibility';
  label: string;
  defaultValue: any;
  description?: string;
  position?: { start: number; end: number };
  elementPath?: string;
}

const ComponentBuilder: React.FC = () => {
  const [componentName, setComponentName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('content');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [cssFiles, setCssFiles] = useState<string[]>([]);
  const [jsFiles, setJsFiles] = useState<string[]>([]);
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
  const [parsedTags, setParsedTags] = useState<Array<{ tag: string; fullElement: string; position: { start: number; end: number }; tagName: string }>>([]);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [newCssFile, setNewCssFile] = useState('');
  const [newJsFile, setNewJsFile] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const parseHtmlTags = (html: string) => {
    const tags: Array<{ tag: string; fullElement: string; position: { start: number; end: number }; tagName: string }> = [];
    const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^>]*)?)>/g;
    let match;

    const findMatchingCloseTag = (html: string, startPos: number, tagName: string): number => {
      let depth = 1;
      let pos = startPos;
      const openRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'g');
      const closeRegex = new RegExp(`</${tagName}>`, 'g');

      openRegex.lastIndex = startPos;
      closeRegex.lastIndex = startPos;

      while (depth > 0 && pos < html.length) {
        const nextOpen = openRegex.exec(html);
        const nextClose = closeRegex.exec(html);

        if (!nextClose) {
          return -1;
        }

        if (nextOpen && nextOpen.index < nextClose.index) {
          depth++;
          pos = openRegex.lastIndex;
          closeRegex.lastIndex = pos;
        } else {
          depth--;
          if (depth === 0) {
            return nextClose.index + nextClose[0].length;
          }
          pos = closeRegex.lastIndex;
          openRegex.lastIndex = pos;
        }
      }

      return -1;
    };

    while ((match = tagRegex.exec(html)) !== null) {
      const tagName = match[1];
      const openTag = match[0];
      const startPos = match.index;
      const openTagEnd = startPos + openTag.length;

      const selfClosingMatch = openTag.match(/\/\s*>$/);
      if (selfClosingMatch) {
        tags.push({
          tag: openTag,
          fullElement: openTag,
          position: { start: startPos, end: openTagEnd },
          tagName
        });
        continue;
      }

      const endPos = findMatchingCloseTag(html, openTagEnd, tagName);

      if (endPos !== -1) {
        const fullElement = html.substring(startPos, endPos);

        tags.push({
          tag: openTag,
          fullElement,
          position: { start: startPos, end: endPos },
          tagName
        });
      }
    }

    const filteredTags = tags.filter((tag, index) => {
      for (let i = 0; i < tags.length; i++) {
        if (i !== index) {
          const other = tags[i];
          if (
            tag.position.start > other.position.start &&
            tag.position.end <= other.position.end
          ) {
            return false;
          }
        }
      }
      return true;
    });

    return filteredTags;
  };

  React.useEffect(() => {
    if (htmlCode) {
      setParsedTags(parseHtmlTags(htmlCode));
    } else {
      setParsedTags([]);
    }
  }, [htmlCode]);

  React.useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('component_templates')
        .select('category')
        .order('category');

      if (error) {
        console.error('Error loading categories:', error);
        return;
      }

      if (data) {
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
        setExistingCategories(uniqueCategories);
      }
    };

    loadCategories();
  }, []);

  const generatePropertyName = (tagName: string, propType: PropField['type']): string => {
    const typeSuffix: Record<PropField['type'], string> = {
      text: 'text',
      textarea: 'textarea',
      link: 'link',
      image: 'image',
      color: 'color',
      backgroundColor: 'bg_color',
      colorBoth: 'color_both',
      array: 'array',
      visibility: 'visible',
    };

    const existingTagProps = propFields.filter(f => {
      const match = f.name.match(new RegExp(`^${tagName}_(\\d+)_`));
      return match !== null;
    });

    const nextNumber = existingTagProps.length + 1;

    return `${tagName}_${nextNumber}_${typeSuffix[propType]}`;
  };

  const handleTagClick = (index: number) => {
    const tag = parsedTags[index];
    setSelectedTagIndex(index);
    setSelectedText(tag.fullElement);
    setSelectionRange(tag.position);
    setShowPropModal(true);

    if (tag.tagName === 'a') {
      setNewPropType('link');
    } else if (tag.tagName === 'img') {
      setNewPropType('image');
    } else if (tag.tagName === 'ul' || tag.tagName === 'ol') {
      setNewPropType('array');
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'].includes(tag.tagName)) {
      setNewPropType('text');
    } else {
      setNewPropType('text');
    }
  };

  const renderInteractiveHTML = () => {
    if (!htmlCode) return null;

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    parsedTags.forEach((tag, index) => {
      if (tag.position.start > lastIndex) {
        const textBefore = htmlCode.substring(lastIndex, tag.position.start);
        parts.push(
          <span key={`text-${lastIndex}`} style={{ color: '#6b7280' }}>
            {textBefore}
          </span>
        );
      }

      const isSelected = selectedTagIndex === index;
      const hasProperty = propFields.some(f =>
        f.position && f.position.start === tag.position.start
      );

      parts.push(
        <span
          key={`tag-${index}`}
          onClick={() => handleTagClick(index)}
          style={{
            color: hasProperty ? '#10b981' : '#3b82f6',
            cursor: 'pointer',
            backgroundColor: isSelected ? '#dbeafe' : hasProperty ? '#d1fae5' : 'transparent',
            padding: '2px 4px',
            borderRadius: '3px',
            fontWeight: hasProperty ? 'bold' : 'normal',
            transition: 'all 0.2s',
            display: 'inline-block',
            border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = hasProperty ? '#d1fae5' : 'transparent';
            }
          }}
        >
          {tag.fullElement}
        </span>
      );

      lastIndex = tag.position.end;
    });

    if (lastIndex < htmlCode.length) {
      const textAfter = htmlCode.substring(lastIndex);
      parts.push(
        <span key={`text-${lastIndex}`} style={{ color: '#6b7280' }}>
          {textAfter}
        </span>
      );
    }

    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{parts}</div>;
  };

  const addPropertyFromSelection = () => {
    if (!selectedText || !selectionRange) return;

    const tag = parsedTags[selectedTagIndex!];
    const autoGeneratedName = generatePropertyName(tag.tagName, newPropType);
    setNewPropName(autoGeneratedName);

    const beforeText = htmlCode.substring(0, selectionRange.start);
    const afterText = htmlCode.substring(selectionRange.end);

    const findElementTag = (beforeText: string) => {
      const tagMatch = beforeText.match(/<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?>(?:(?!<\1).)*$/s);
      if (tagMatch) {
        const fullTagMatch = beforeText.match(/<([a-zA-Z][a-zA-Z0-9]*)([^>]*)>(?:(?!<\1).)*$/);
        return fullTagMatch ? fullTagMatch[0] : null;
      }
      return null;
    };

    const elementTag = findElementTag(beforeText);
    const elementPath = elementTag || `element-${Date.now()}`;

    const getDefaultValue = (type: PropField['type'], text: string) => {
      switch (type) {
        case 'colorBoth':
          return { color: '#000000', backgroundColor: '#ffffff' };
        case 'color':
        case 'backgroundColor':
          return text.startsWith('#') ? text : '#000000';
        case 'visibility':
          return true;
        case 'array': {
          const itemMatches = selectedText.match(/<li[^>]*>([^<]+)<\/li>/gi);
          if (itemMatches) {
            return itemMatches.map(match => {
              const textMatch = match.match(/>([^<]+)</);
              return textMatch ? textMatch[1].trim() : '';
            }).filter(Boolean);
          }
          return ['項目1', '項目2', '項目3'];
        }
        case 'link': {
          const fullElement = selectedText.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/i);
          if (fullElement) {
            return { url: fullElement[1] || '', text: fullElement[2] || '' };
          }
          return { url: text.match(/^https?:\/\//) ? text : '', text: text.match(/^https?:\/\//) ? '' : text };
        }
        case 'image': {
          const fullElement = selectedText.match(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']+)["'][^>]*>/i);
          if (fullElement) {
            return { src: fullElement[1] || '', alt: fullElement[2] || '' };
          }
          return { src: text, alt: '' };
        }
        default:
          return text;
      }
    };

    const generateLabel = (name: string) => {
      const parts = name.split('_');
      if (parts.length >= 3) {
        const tagName = parts[0].toUpperCase();
        const number = parts[1];
        const type = parts.slice(2).join(' ');
        return `${tagName} ${number} (${type})`;
      }
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const newField: PropField = {
      id: `prop_${Date.now()}`,
      name: autoGeneratedName,
      type: newPropType,
      label: generateLabel(autoGeneratedName),
      defaultValue: getDefaultValue(newPropType, selectedText),
      description: '',
      position: selectionRange,
      elementPath: elementPath,
    };

    setPropFields([...propFields, newField]);

    const getBindType = (type: PropField['type']) => {
      switch (type) {
        case 'image': return 'image-full';
        case 'link': return 'link-full';
        case 'color': return 'color';
        case 'backgroundColor': return 'background-color';
        case 'colorBoth': return 'color-both';
        case 'visibility': return 'visibility';
        case 'array': return 'array';
        default: return 'text';
      }
    };

    const dataPropAttr = ` data-prop="${autoGeneratedName}" data-bind-type="${getBindType(newPropType)}"`;

    const openingTagMatch = selectedText.match(/^<([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*)?)>/);
    if (openingTagMatch) {
      const tagName = openingTagMatch[1];
      const existingAttrs = openingTagMatch[2];
      const restOfElement = selectedText.slice(openingTagMatch[0].length);

      const newOpeningTag = `<${tagName}${existingAttrs}${dataPropAttr}>`;
      const updatedElement = newOpeningTag + restOfElement;
      const newHtml = beforeText + updatedElement + afterText;

      setHtmlCode(newHtml);
    }

    setShowPropModal(false);
    setNewPropName('');
    setNewPropType('text');
    setSelectedText('');
    setSelectionRange(null);
    setSelectedTagIndex(null);
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

    const cssFilesComment = cssFiles.length > 0
      ? `/**
 * Required CSS Files:
${cssFiles.map(file => ` * - /generator_common/css/${file}`).join('\n')}
 */

`
      : '';

    const jsFilesComment = jsFiles.length > 0
      ? `/**
 * Required JS Files:
${jsFiles.map(file => ` * - /generator_common/js/${file}`).join('\n')}
 */

`
      : '';

    const code = `${cssFilesComment}${jsFilesComment}import React from 'react';
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

    if (isNewCategory && !newCategoryName.trim()) {
      alert('新しいカテゴリ名を入力してください');
      return;
    }

    const finalCategory = isNewCategory ? newCategoryName.trim() : category;

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
        category: finalCategory,
        description,
        thumbnail_url: thumbnailUrl,
        code_template: generatedCode,
        default_props: defaultProps,
        prop_schema: propSchema,
        css_files: cssFiles,
        js_files: jsFiles,
        is_active: true,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving component:', error);
      alert(`保存エラー: ${error.message}`);
      return;
    }

    if (isNewCategory && newCategoryName.trim()) {
      if (!existingCategories.includes(finalCategory)) {
        setExistingCategories([...existingCategories, finalCategory].sort());
      }
      setCategory(finalCategory);
      setIsNewCategory(false);
      setNewCategoryName('');
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
                value={isNewCategory ? '__new__' : category}
                onChange={(e) => {
                  if (e.target.value === '__new__') {
                    setIsNewCategory(true);
                    setNewCategoryName('');
                  } else {
                    setIsNewCategory(false);
                    setCategory(e.target.value);
                  }
                }}
              >
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__new__">+ 新しいカテゴリを追加</option>
              </select>
            </div>
          </div>

          {isNewCategory && (
            <div style={{ marginTop: '16px' }}>
              <label style={styles.label}>
                新しいカテゴリ名 <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                style={styles.input}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="例: navigation, cta, testimonials"
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                英数字とハイフンのみを使用してください
              </p>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>
              読み込むCSSファイル
            </h4>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
              public/generator_common/css/ 配下のファイルを指定してください（複数可）
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                style={{ ...styles.input, flex: 1 }}
                value={newCssFile}
                onChange={(e) => setNewCssFile(e.target.value)}
                placeholder="例: style.css"
              />
              <button
                style={styles.addButton}
                onClick={() => {
                  if (newCssFile.trim()) {
                    setCssFiles([...cssFiles, newCssFile.trim()]);
                    setNewCssFile('');
                  }
                }}
              >
                <Plus size={16} />
              </button>
            </div>
            {cssFiles.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cssFiles.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  >
                    <span>{file}</span>
                    <button
                      onClick={() => setCssFiles(cssFiles.filter((_, i) => i !== index))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#ef4444',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>
              読み込むJSファイル
            </h4>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
              public/generator_common/js/ 配下のファイルを指定してください（複数可）
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                style={{ ...styles.input, flex: 1 }}
                value={newJsFile}
                onChange={(e) => setNewJsFile(e.target.value)}
                placeholder="例: script.js"
              />
              <button
                style={styles.addButton}
                onClick={() => {
                  if (newJsFile.trim()) {
                    setJsFiles([...jsFiles, newJsFile.trim()]);
                    setNewJsFile('');
                  }
                }}
              >
                <Plus size={16} />
              </button>
            </div>
            {jsFiles.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {jsFiles.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  >
                    <span>{file}</span>
                    <button
                      onClick={() => setJsFiles(jsFiles.filter((_, i) => i !== index))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#ef4444',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            HTMLコードを入力してください。コード内のタグをクリックするとプロパティを定義できます。
          </p>

          <div style={{
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bae6fd',
            marginBottom: '12px',
          }}>
            <p style={{ fontSize: '13px', color: '#0369a1', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              💡 使い方
            </p>
            <ol style={{ fontSize: '12px', color: '#0369a1', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>HTMLコードを入力または貼り付け</li>
              <li>表示されたコード内の<strong>タグ（&lt;h2&gt;, &lt;p&gt;など）</strong>を直接クリック</li>
              <li>プロパティタイプを選択して追加</li>
            </ol>
          </div>

          <textarea
            ref={textareaRef}
            style={styles.codeTextarea}
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            placeholder={`例：
<h2>タイトルをここに入力</h2>
<p>説明文をここに入力</p>
<img src="/path/to/image.jpg" alt="画像" />
<ul>
  <li>項目1</li>
  <li>項目2</li>
</ul>
`}
            rows={8}
          />

          {parsedTags.length > 0 && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#374151',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Wand2 size={16} />
                  タグをクリックしてプロパティを定義
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
                  <span style={{ color: '#3b82f6' }}>● クリック可能</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>● プロパティ定義済み</span>
                </div>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: '1.8',
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                maxHeight: '400px',
                overflowY: 'auto',
              }}>
                {renderInteractiveHTML()}
              </div>
            </div>
          )}
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
              コード内のテキストを選択して、プロパティとして定義してください。同じ要素に複数のプロパティを定義できます（例：テキスト + カラー）。
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
                {propFields.map((field) => {
                  const sameElementProps = propFields.filter(
                    p => p.elementPath === field.elementPath && p.id !== field.id
                  );

                  return (
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
                      {sameElementProps.length > 0 && (
                        <div style={{
                          padding: '8px',
                          backgroundColor: '#e0f2fe',
                          borderRadius: '4px',
                          marginBottom: '12px',
                          fontSize: '11px',
                          color: '#0369a1',
                        }}>
                          <strong>同じ要素:</strong> {sameElementProps.map(p => p.name).join(', ')}
                        </div>
                      )}
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
                        {field.type === 'colorBoth' ? (
                          <div style={{ fontSize: '12px', color: '#6b7280', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                            テキストカラー: {(field.defaultValue as any).color || '#000000'}<br />
                            背景カラー: {(field.defaultValue as any).backgroundColor || '#ffffff'}
                          </div>
                        ) : field.type === 'link' ? (
                          <div style={{ fontSize: '12px', color: '#6b7280', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                            URL: {(field.defaultValue as any).url || ''}<br />
                            テキスト: {(field.defaultValue as any).text || ''}
                          </div>
                        ) : field.type === 'image' ? (
                          <div style={{ fontSize: '12px', color: '#6b7280', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                            画像パス: {(field.defaultValue as any).src || ''}<br />
                            ALT: {(field.defaultValue as any).alt || ''}
                          </div>
                        ) : field.type === 'array' ? (
                          <div style={{ fontSize: '12px', color: '#6b7280', padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                            配列 ({Array.isArray(field.defaultValue) ? field.defaultValue.length : 0}個の要素)
                          </div>
                        ) : (
                          <input
                            type="text"
                            style={styles.propInput}
                            value={typeof field.defaultValue === 'object' ? JSON.stringify(field.defaultValue) : field.defaultValue}
                            onChange={(e) => updatePropField(field.id, { defaultValue: e.target.value })}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })}
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
                <label style={styles.modalLabel}>選択されたタグ:</label>
                <div style={styles.selectedTextBox}>
                  {selectedTagIndex !== null && parsedTags[selectedTagIndex] && (
                    <span style={{ fontFamily: 'monospace', color: '#3b82f6', fontWeight: 'bold' }}>
                      &lt;{parsedTags[selectedTagIndex].tagName}&gt;
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px', marginBottom: 0 }}>
                  このタグの要素全体にプロパティが適用されます
                </p>
              </div>

              <div style={styles.modalField}>
                <label style={styles.modalLabel}>プロパティタイプを選択</label>
                <select
                  style={styles.modalInput}
                  value={newPropType}
                  onChange={(e) => setNewPropType(e.target.value as PropField['type'])}
                  autoFocus
                >
                  <option value="text">① テキスト編集</option>
                  <option value="textarea">① テキスト編集（複数行）</option>
                  <option value="link">② リンク編集</option>
                  <option value="image">③ 画像編集（D&amp;D対応）</option>
                  <option value="color">④ テキストカラーのみ</option>
                  <option value="backgroundColor">④ 背景カラーのみ</option>
                  <option value="colorBoth">④ テキスト＆背景カラー両方</option>
                  <option value="array">⑤ 配列（li要素など）</option>
                  <option value="visibility">⑥ 表示/非表示</option>
                </select>
                <p style={styles.modalHint}>
                  {selectedTagIndex !== null && parsedTags[selectedTagIndex] && (
                    <>
                      <strong>推奨:</strong>
                      {parsedTags[selectedTagIndex].tagName === 'a' && ' ② リンク編集'}
                      {parsedTags[selectedTagIndex].tagName === 'img' && ' ③ 画像編集'}
                      {parsedTags[selectedTagIndex].tagName === 'ul' && ' ⑤ 配列'}
                      {parsedTags[selectedTagIndex].tagName === 'ol' && ' ⑤ 配列'}
                      {!['a', 'img', 'ul', 'ol'].includes(parsedTags[selectedTagIndex].tagName) &&
                        ' ① テキスト編集 または ④ カラー編集'}
                    </>
                  )}
                </p>
              </div>

              {selectedTagIndex !== null && parsedTags[selectedTagIndex] && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '6px',
                  border: '1px solid #bbf7d0',
                  marginTop: '12px',
                }}>
                  <p style={{ fontSize: '12px', color: '#15803d', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                    ✓ 自動生成されるプロパティ名
                  </p>
                  <p style={{ fontSize: '13px', color: '#166534', margin: 0, fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {generatePropertyName(parsedTags[selectedTagIndex].tagName, newPropType)}
                  </p>
                </div>
              )}
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
  addButton: {
    padding: '10px 12px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
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
