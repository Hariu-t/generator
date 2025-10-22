import React from 'react';
import { Plus, Trash2, Palette, Moon, Sun } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import ImageDropZone from '../UI/ImageDropZone';
import { ImageUploadResult } from '../../utils/imageHandler';

interface UnifiedEditorProps {
  component: ComponentData;
  mode: 'content' | 'style';
}

const UnifiedEditor: React.FC<UnifiedEditorProps> = ({ component, mode }) => {
  const { pageData, updateComponent, updateGlobalStyles } = usePageStore();

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    updateComponent(component.id, {
      style: { ...component.style, [key]: value }
    });
  };

  const handleGlobalStyleChange = (key: string, value: string) => {
    updateGlobalStyles({ [key]: value });
  };

  const styles = {
    container: {
      padding: '16px',
    } as React.CSSProperties,
    section: {
      marginBottom: '24px',
    } as React.CSSProperties,
    sectionTitle: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#111827',
      marginBottom: '12px',
    } as React.CSSProperties,
    field: {
      marginBottom: '16px',
    } as React.CSSProperties,
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '4px',
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    } as React.CSSProperties,
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      resize: 'vertical' as const,
    } as React.CSSProperties,
    colorInputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px',
    } as React.CSSProperties,
    colorInput: {
      width: '32px',
      height: '32px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
      outline: 'none',
    } as React.CSSProperties,
    colorValue: {
      flex: 1,
      padding: '6px 8px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      backgroundColor: '#f9fafb',
      color: '#374151',
    } as React.CSSProperties,
    itemCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px',
    } as React.CSSProperties,
    itemHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '12px',
    } as React.CSSProperties,
    itemIndex: {
      fontSize: '12px',
      fontWeight: 500,
      color: '#4b5563',
    } as React.CSSProperties,
    deleteButton: {
      color: '#dc2626',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.15s ease-in-out',
    } as React.CSSProperties,
    addButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 12px',
      fontSize: '12px',
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out',
    } as React.CSSProperties,
    note: {
      fontSize: '11px',
      color: '#6b7280',
      marginTop: '4px',
      fontStyle: 'italic',
    } as React.CSSProperties,
    checkbox: {
      marginRight: '8px',
    } as React.CSSProperties,
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 500,
      color: '#374151',
      cursor: 'pointer',
    } as React.CSSProperties,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#2563eb';
    e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  const renderStyleEditor = () => {
    const toggleDarkMode = () => {
      const isDarkMode = component.style?.isDarkMode || false;

      if (!isDarkMode) {
        updateComponent(component.id, {
          style: {
            ...component.style,
            lightModeBackup: {
              backgroundColor: component.style?.backgroundColor,
              textColor: component.style?.textColor,
              headlineColor: component.style?.headlineColor,
              descriptionColor: component.style?.descriptionColor,
              buttonBackgroundColor: component.style?.buttonBackgroundColor,
              buttonTextColor: component.style?.buttonTextColor,
              cardBackgroundColor: component.style?.cardBackgroundColor,
              cardTextColor: component.style?.cardTextColor,
              accentColor: component.style?.accentColor,
            },
            backgroundColor: '#0f172a',
            textColor: '#f1f5f9',
            headlineColor: '#ffffff',
            descriptionColor: '#cbd5e1',
            buttonBackgroundColor: '#3b82f6',
            buttonTextColor: '#ffffff',
            cardBackgroundColor: '#1e293b',
            cardTextColor: '#f1f5f9',
            accentColor: '#06b6d4',
            isDarkMode: true,
          }
        });
      } else {
        const backup = component.style?.lightModeBackup || {};

        const restoreStyle = {
          backgroundColor: backup.backgroundColor || '#ffffff',
          textColor: backup.textColor || '#374151',
          headlineColor: backup.headlineColor || '#111827',
          descriptionColor: backup.descriptionColor || '#6b7280',
          buttonBackgroundColor: backup.buttonBackgroundColor || '#2563eb',
          buttonTextColor: backup.buttonTextColor || '#ffffff',
          cardBackgroundColor: backup.cardBackgroundColor || '#f9fafb',
          cardTextColor: backup.cardTextColor || '#374151',
          accentColor: backup.accentColor || '#E60012',
        };

        const cleanedStyle = Object.fromEntries(
          Object.entries(restoreStyle).filter(([_, value]) => value !== undefined)
        );

        updateComponent(component.id, {
          style: {
            ...component.style,
            ...cleanedStyle,
            isDarkMode: false,
            lightModeBackup: undefined,
          }
        });
      }
    };

    const isDarkMode = component.style?.isDarkMode || false;

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={{...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Moon size={16} color="#4b5563" />
            表示モード
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isDarkMode ? <Moon size={16} color="#2563eb" /> : <Sun size={16} color="#f59e0b" />}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                  ダークモード{isDarkMode ? 'ON' : 'OFF'}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>
                  {isDarkMode ? 'ダークテーマで表示中' : 'ライトテーマで表示中'}
                </div>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              style={{
                position: 'relative',
                width: '48px',
                height: '24px',
                backgroundColor: isDarkMode ? '#2563eb' : '#d1d5db',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2px',
                left: isDarkMode ? '26px' : '2px',
                width: '20px',
                height: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                transition: 'left 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {isDarkMode ? <Moon size={12} color="#2563eb" /> : <Sun size={12} color="#f59e0b" />}
              </div>
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={{...styles.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Palette size={16} color="#4b5563" />
            共通スタイル設定
          </h3>

          {['mainColor', 'baseColor', 'base2Color', 'accentColor'].map((colorKey) => {
            const labels: Record<string, string> = {
              mainColor: 'mainColor（メインカラー）',
              baseColor: 'baseColor（ベースカラー）',
              base2Color: 'base2Color（セカンダリベースカラー）',
              accentColor: 'accentColor（アクセントカラー）',
            };

            const descriptions: Record<string, string> = {
              mainColor: '主要なアクション要素に使用される色です。各コンポーネントでテキスト色・背景色を選択できます。',
              baseColor: 'セクションで使用される基本色です。各コンポーネントでテキスト色・背景色を選択できます。',
              base2Color: 'カードやパネルで使用される補助的な基本色です。各コンポーネントでテキスト色・背景色を選択できます。',
              accentColor: '強調表示や装飾要素に使用されるアクセント色です。各コンポーネントでテキスト色・背景色を選択できます。',
            };

            const defaults: Record<string, string> = {
              mainColor: '#dc2626',
              baseColor: '#f8fafc',
              base2Color: '#f1f5f9',
              accentColor: '#E60012',
            };

            const subDefaults: Record<string, string> = {
              mainColor: '#ffffff',
              baseColor: '#333333',
              base2Color: '#333333',
              accentColor: '#ffffff',
            };

            return (
              <div key={colorKey} style={styles.field}>
                <label style={styles.label}>{labels[colorKey]}</label>
                <div style={styles.colorInputContainer}>
                  <input
                    type="color"
                    value={(pageData.globalStyles as any)?.[colorKey] || defaults[colorKey]}
                    onChange={(e) => handleGlobalStyleChange(colorKey, e.target.value)}
                    style={styles.colorInput}
                  />
                  <input
                    type="text"
                    value={(pageData.globalStyles as any)?.[colorKey] || defaults[colorKey]}
                    onChange={(e) => handleGlobalStyleChange(colorKey, e.target.value)}
                    style={styles.colorValue}
                    placeholder={defaults[colorKey]}
                  />
                </div>
                <div style={styles.colorInputContainer}>
                  <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>サブ色:</label>
                  <input
                    type="color"
                    value={(pageData.globalStyles as any)?.[`${colorKey}Sub`] || subDefaults[colorKey]}
                    onChange={(e) => handleGlobalStyleChange(`${colorKey}Sub`, e.target.value)}
                    style={styles.colorInput}
                  />
                  <input
                    type="text"
                    value={(pageData.globalStyles as any)?.[`${colorKey}Sub`] || subDefaults[colorKey]}
                    onChange={(e) => handleGlobalStyleChange(`${colorKey}Sub`, e.target.value)}
                    style={styles.colorValue}
                    placeholder={subDefaults[colorKey]}
                  />
                </div>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
                  {descriptions[colorKey]}
                </p>
              </div>
            );
          })}

          <div style={styles.field}>
            <label style={styles.label}>commonColor（共通テキストカラー）</label>
            <div style={styles.colorInputContainer}>
              <div
                style={{
                  ...styles.colorInput,
                  backgroundColor: pageData.globalStyles?.commonColor || '#000000',
                  cursor: 'default',
                }}
              />
              <select
                value={pageData.globalStyles?.commonColor || '#000000'}
                onChange={(e) => handleGlobalStyleChange('commonColor', e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="#000000">黒</option>
                <option value="#ffffff">白</option>
              </select>
            </div>
            <div style={styles.note}>
              ページ全体で使用される基本的なテキスト色です。背景色に応じて選択してください。
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>commonColorBg（共通背景カラー）</label>
            <div style={styles.colorInputContainer}>
              <div
                style={{
                  ...styles.colorInput,
                  backgroundColor: pageData.globalStyles?.commonColorBg || '#ffffff',
                  cursor: 'default',
                }}
              />
              <select
                value={pageData.globalStyles?.commonColorBg || '#ffffff'}
                onChange={(e) => handleGlobalStyleChange('commonColorBg', e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="#ffffff">白</option>
                <option value="#000000">黒</option>
              </select>
            </div>
            <div style={styles.note}>
              ページ全体で使用される基本的な背景色です。コンテンツの可読性に応じて選択してください。
            </div>
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            border: '1px solid #bae6fd',
            marginTop: '16px',
          }}>
            <p style={{ fontSize: '12px', color: '#0369a1', margin: 0, lineHeight: '1.4' }}>
              💡 これらの色は全コンポーネントで共通して使用されます。変更すると、ページ全体のデザインが統一されます。
            </p>
          </div>
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #fbbf24',
          marginTop: '16px',
        }}>
          <p style={{ fontSize: '12px', color: '#92400e', margin: 0, lineHeight: '1.4' }}>
            📝 個別の色設定（背景色、文字色など）は「コンテンツ」タブで設定できます。
          </p>
        </div>
      </div>
    );
  };

  const renderGenericEditor = () => {
    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>コンテンツ</h3>

          {Object.entries(component.props).map(([key, value]) => {
            if (key === 'id') return null;

            return (
              <div key={key} style={styles.field}>
                <label style={styles.label}>{key}</label>
                {renderFieldByType(key, value)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFieldByType = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handlePropChange(key, e.target.checked)}
            style={styles.checkbox}
          />
          有効にする
        </label>
      );
    }

    if (typeof value === 'object' && value !== null && 'url' in value && 'text' in value) {
      return (
        <div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ ...styles.label, fontSize: '11px' }}>リンクURL</label>
            <input
              type="text"
              value={value.url}
              onChange={(e) => handlePropChange(key, { ...value, url: e.target.value })}
              style={styles.input}
              placeholder="https://example.com"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label style={{ ...styles.label, fontSize: '11px' }}>リンクテキスト</label>
            <input
              type="text"
              value={value.text}
              onChange={(e) => handlePropChange(key, { ...value, text: e.target.value })}
              style={styles.input}
              placeholder="クリックしてください"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null && 'src' in value && 'alt' in value) {
      return (
        <div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ ...styles.label, fontSize: '11px' }}>画像パス</label>
            <input
              type="text"
              value={value.src}
              onChange={(e) => handlePropChange(key, { ...value, src: e.target.value })}
              style={styles.input}
              placeholder="/path/to/image.jpg"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <ImageDropZone
              currentImage={value.src}
              onImageUpload={(result: ImageUploadResult) => {
                handlePropChange(key, { ...value, src: result.fullPath });
              }}
              fieldLabel="画像"
            />
          </div>
          <div>
            <label style={{ ...styles.label, fontSize: '11px' }}>ALTテキスト</label>
            <input
              type="text"
              value={value.alt}
              onChange={(e) => handlePropChange(key, { ...value, alt: e.target.value })}
              style={styles.input}
              placeholder="画像の説明"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      );
    }

    if (typeof value === 'string' && value.match(/^https?:\/\//)) {
      return (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            style={styles.input}
            placeholder="https://..."
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {key.toLowerCase().includes('image') && (
            <ImageDropZone
              currentImage={value}
              onImageUpload={(result: ImageUploadResult) => {
                handlePropChange(key, result.fullPath);
              }}
              fieldLabel={key}
            />
          )}
        </>
      );
    }

    if (typeof value === 'object' && value !== null && ('color' in value || 'backgroundColor' in value)) {
      return (
        <div>
          {value.color !== undefined && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ ...styles.label, fontSize: '11px' }}>テキストカラー</label>
              <div style={styles.colorInputContainer}>
                <input
                  type="color"
                  value={value.color}
                  onChange={(e) => handlePropChange(key, { ...value, color: e.target.value })}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  value={value.color}
                  onChange={(e) => handlePropChange(key, { ...value, color: e.target.value })}
                  style={styles.colorValue}
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
          {value.backgroundColor !== undefined && (
            <div>
              <label style={{ ...styles.label, fontSize: '11px' }}>背景カラー</label>
              <div style={styles.colorInputContainer}>
                <input
                  type="color"
                  value={value.backgroundColor}
                  onChange={(e) => handlePropChange(key, { ...value, backgroundColor: e.target.value })}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  value={value.backgroundColor}
                  onChange={(e) => handlePropChange(key, { ...value, backgroundColor: e.target.value })}
                  style={styles.colorValue}
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'string' && value.startsWith('#')) {
      return (
        <div style={styles.colorInputContainer}>
          <input
            type="color"
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            style={styles.colorInput}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropChange(key, e.target.value)}
            style={styles.colorValue}
            placeholder="#000000"
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div>
          {value.map((item, index) => (
            <div key={index} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <span style={styles.itemIndex}>項目 {index + 1}</span>
                {value.length > 1 && (
                  <button
                    onClick={() => {
                      const newArray = value.filter((_, i) => i !== index);
                      handlePropChange(key, newArray);
                    }}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              {typeof item === 'object' ? (
                Object.entries(item).map(([itemKey, itemValue]) => (
                  <div key={itemKey} style={{ ...styles.field, marginBottom: '8px' }}>
                    <label style={{ ...styles.label, fontSize: '11px' }}>{itemKey}</label>
                    <input
                      type="text"
                      value={itemValue as string}
                      onChange={(e) => {
                        const newArray = [...value];
                        newArray[index] = { ...newArray[index], [itemKey]: e.target.value };
                        handlePropChange(key, newArray);
                      }}
                      style={styles.input}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                ))
              ) : (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...value];
                    newArray[index] = e.target.value;
                    handlePropChange(key, newArray);
                  }}
                  style={styles.input}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const newItem = typeof value[0] === 'object' ? {} : '';
              handlePropChange(key, [...value, newItem]);
            }}
            style={styles.addButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            <Plus size={14} style={{ marginRight: '4px' }} />
            追加
          </button>
        </div>
      );
    }

    if (typeof value === 'string' && value.length > 50) {
      return (
        <textarea
          value={value}
          onChange={(e) => handlePropChange(key, e.target.value)}
          rows={4}
          style={styles.textarea}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handlePropChange(key, e.target.value)}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  };

  const renderContentEditor = () => {
    switch (component.type) {
      case 'headline':
        return renderHeadlineEditor();
      case 'kv':
        return renderKVEditor();
      case 'test':
        return renderFAQEditor();
      case 'footer':
        return renderFooterEditor();
      case 'pricing':
        return renderPricingEditor();
      case 'app-intro':
        return renderAppIntroEditor();
      default:
        return renderGenericEditor();
    }
  };

  const renderHeadlineEditor = () => {
    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>コンテンツ</h3>

          <div style={styles.field}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={component.props.usePageTitle || false}
                onChange={(e) => handlePropChange('usePageTitle', e.target.checked)}
                style={styles.checkbox}
              />
              ページタイトルと連動する
            </label>
            <div style={styles.note}>
              チェックすると、ページ設定のタイトルが自動的に反映されます。
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>ヘッドラインテキスト</label>
            <textarea
              value={component.props.text || ''}
              onChange={(e) => handlePropChange('text', e.target.value)}
              rows={3}
              style={styles.textarea}
              placeholder="ヘッドラインテキストを入力してください"
              disabled={component.props.usePageTitle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div style={styles.note}>
              {component.props.usePageTitle
                ? 'ページタイトル連動が有効です。ページ設定でタイトルを変更してください。'
                : 'ページの最上部に表示される重要なヘッドラインです。'
              }
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>スタイル設定</h3>

          <div style={styles.field}>
            <label style={styles.label}>背景色</label>
            <div style={styles.colorInputContainer}>
              <input
                type="color"
                value={component.style?.backgroundColor || '#dc2626'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                style={styles.colorInput}
              />
              <input
                type="text"
                value={component.style?.backgroundColor || '#dc2626'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                style={styles.colorValue}
                placeholder="#dc2626"
              />
            </div>
            <div style={styles.note}>
              デフォルトでは共通スタイルのmainColorが適用されます。
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>文字色</label>
            <div style={styles.colorInputContainer}>
              <input
                type="color"
                value={component.style?.textColor || '#ffffff'}
                onChange={(e) => handleStyleChange('textColor', e.target.value)}
                style={styles.colorInput}
              />
              <input
                type="text"
                value={component.style?.textColor || '#ffffff'}
                onChange={(e) => handleStyleChange('textColor', e.target.value)}
                style={styles.colorValue}
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>ヘッドライン文字色</label>
            <div style={styles.colorInputContainer}>
              <input
                type="color"
                value={component.style?.headlineColor || '#ffffff'}
                onChange={(e) => handleStyleChange('headlineColor', e.target.value)}
                style={styles.colorInput}
              />
              <input
                type="text"
                value={component.style?.headlineColor || '#ffffff'}
                onChange={(e) => handleStyleChange('headlineColor', e.target.value)}
                style={styles.colorValue}
                placeholder="#ffffff"
              />
            </div>
            <div style={styles.note}>
              ヘッドライン専用の文字色を設定できます。
            </div>
          </div>
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: '#f0f9ff',
          borderRadius: '6px',
          border: '1px solid #bae6fd',
          marginTop: '16px',
        }}>
          <p style={{ fontSize: '12px', color: '#0369a1', margin: 0, lineHeight: '1.4' }}>
            💡 このコンポーネントは必須コンポーネントとして、ヘッダーの直下に自動的に配置されます。
          </p>
        </div>
      </div>
    );
  };

  const renderKVEditor = () => {
    const handleChannelInfoChange = (field: 'number' | 'name', value: string) => {
      const newChannelInfo = { ...component.props.channelInfo, [field]: value };
      handlePropChange('channelInfo', newChannelInfo);
    };

    const handleImageUpload = (field: string, result: ImageUploadResult) => {
      handlePropChange(field, result.url);
    };

    const handleMediaItemChange = (index: number, field: string, value: string) => {
      const newItems = [...(component.props.mediaItems || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      handlePropChange('mediaItems', newItems);
    };

    const handleMediaImageUpload = (index: number, field: string, result: ImageUploadResult) => {
      const newItems = [...(component.props.mediaItems || [])];
      newItems[index] = { ...newItems[index], [field]: result.url };
      handlePropChange('mediaItems', newItems);
    };

    const addMediaItem = () => {
      const newItems = [...(component.props.mediaItems || [])];
      newItems.push({
        type: 'image',
        url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: '番組画像'
      });
      handlePropChange('mediaItems', newItems);
    };

    const removeMediaItem = (index: number) => {
      const newItems = [...(component.props.mediaItems || [])];
      newItems.splice(index, 1);
      handlePropChange('mediaItems', newItems);
    };

    const convertToEmbedUrl = (url: string): string => {
      if (!url) return '';

      if (url.includes('youtube.com/embed/')) {
        return url;
      }

      const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      if (videoIdMatch) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }

      return url;
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>基本情報</h3>

          <div style={styles.field}>
            <label style={styles.label}>番組タイトル</label>
            <input
              type="text"
              value={component.props.title || ''}
              onChange={(e) => handlePropChange('title', e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>番組説明（基本）</label>
            <textarea
              value={component.props.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              rows={3}
              style={styles.textarea}
              placeholder="デフォルトで表示される番組説明を入力してください"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>番組説明（展開時）</label>
            <textarea
              value={component.props.expandedDescription || ''}
              onChange={(e) => handlePropChange('expandedDescription', e.target.value)}
              rows={4}
              style={styles.textarea}
              placeholder="「もっと見る」をクリックした時に表示される詳細説明を入力してください（空の場合は「もっと見る」ボタンは表示されません）"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div style={styles.note}>
              このフィールドが空の場合、「もっと見る」ボタンは表示されません。
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>放送情報</h3>
            <div style={styles.field}>
              <label style={styles.label}>配信バッジ種別</label>
              <select
                value={component.props.broadcastInfo?.streamingBadgeText || '同時・見逃し'}
                onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, streamingBadgeText: e.target.value })}
                style={styles.input}
              >
                <option value="同時・見逃し">同時・見逃し</option>
                <option value="見逃し配信">見逃し配信</option>
                <option value="同時配信">同時配信</option>
                <option value="テスト">テスト</option>
              </select>
            </div>

            <div style={styles.field}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={styles.label}>放送情報バッジ</label>
              </div>

              {(component.props.broadcastInfo?.badges || []).map((badge: any, badgeIndex: number) => (
                <div key={badgeIndex} style={styles.itemCard}>
                  <div style={styles.itemHeader}>
                    <span style={styles.itemIndex}>バッジ {badgeIndex + 1}</span>
                    <button
                      onClick={() => {
                        const currentBadges = [...(component.props.broadcastInfo?.badges || [])];
                        currentBadges.splice(badgeIndex, 1);
                        handlePropChange('broadcastInfo', {
                          ...component.props.broadcastInfo,
                          badges: currentBadges
                        });
                      }}
                      style={styles.deleteButton}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>バッジテキスト</label>
                    <input
                      type="text"
                      value={badge.text || ''}
                      onChange={(e) => {
                        const currentBadges = [...(component.props.broadcastInfo?.badges || [])];
                        currentBadges[badgeIndex] = { ...currentBadges[badgeIndex], text: e.target.value };
                        handlePropChange('broadcastInfo', {
                          ...component.props.broadcastInfo,
                          badges: currentBadges
                        });
                      }}
                      placeholder="例: 最新話配信中"
                      style={styles.input}
                    />
                  </div>
                </div>
              ))}

              {(!component.props.broadcastInfo?.badges || component.props.broadcastInfo.badges.length === 0) && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '12px'
                }}>
                  放送情報バッジが設定されていません。「バッジ追加」ボタンで追加してください。
                </div>
              )}

              {(component.props.broadcastInfo?.badges || []).length < 10 && (
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button
                    onClick={() => {
                      const currentBadges = component.props.broadcastInfo?.badges || [];
                      handlePropChange('broadcastInfo', {
                        ...component.props.broadcastInfo,
                        badges: [...currentBadges, { text: '新しいバッジ', color: '#dc2626' }]
                      });
                    }}
                    style={styles.addButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    <Plus size={12} style={{ marginRight: '4px' }} />
                    バッジ追加
                  </button>
                </div>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>放送スケジュール</label>
              <input
                type="text"
                value={component.props.broadcastInfo?.schedule || ''}
                onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, schedule: e.target.value })}
                placeholder="例: 毎週金曜 21:00-22:00"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>チャンネル番号</label>
              <input
                type="text"
                value={component.props.channelInfo?.number || ''}
                onChange={(e) => handleChannelInfoChange('number', e.target.value)}
                placeholder="例: CS310"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>チャンネル名</label>
              <input
                type="text"
                value={component.props.channelInfo?.name || ''}
                onChange={(e) => handleChannelInfoChange('name', e.target.value)}
                placeholder="例: スーパー！ドラマＴＶ"
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={styles.sectionTitle}>カルーセルアイテム（画像・動画）</h3>
          </div>

          <div>
            {(component.props.mediaItems || []).map((item: any, index: number) => (
              <div key={index} style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <span style={styles.itemIndex}>メディア {index + 1}</span>
                  <button
                    onClick={() => removeMediaItem(index)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>メディアタイプ</label>
                  <select
                    value={item.type || 'image'}
                    onChange={(e) => {
                      handleMediaItemChange(index, 'type', e.target.value);
                      if (e.target.value === 'video') {
                        handleMediaItemChange(index, 'url', 'https://www.youtube.com/embed/XVVXQsv7o8I');
                      }
                    }}
                    style={styles.input}
                  >
                    <option value="image">画像</option>
                    <option value="video">動画（YouTube埋め込み）</option>
                  </select>
                </div>

                {item.type === 'video' ? (
                  <div style={styles.field}>
                    <label style={styles.label}>YouTube埋め込みURL</label>
                    <input
                      type="url"
                      value={convertToEmbedUrl(item.url) || ''}
                      onChange={(e) => handleMediaItemChange(index, 'url', e.target.value)}
                      placeholder="例: https://www.youtube.com/embed/VIDEO_ID"
                      style={styles.input}
                    />
                    <div style={styles.note}>
                      YouTube動画の埋め込みURLを入力してください。通常のYouTube URLは自動的に埋め込み形式に変換されます。
                    </div>
                  </div>
                ) : (
                  <div style={styles.field}>
                    <label style={styles.label}>画像</label>
                    <ImageDropZone
                      onImageUpload={(result) => handleMediaImageUpload(index, 'url', result)}
                      currentImageUrl={item.url}
                      placeholder="画像をドラッグ&ドロップまたはクリックして選択"
                      showPreview={true}
                    />
                  </div>
                )}

                <div style={styles.field}>
                  <label style={styles.label}>代替テキスト</label>
                  <input
                    type="text"
                    value={item.alt || ''}
                    onChange={(e) => handleMediaItemChange(index, 'alt', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <button
              onClick={addMediaItem}
              style={styles.addButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              カルーセルアイテムを追加
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFAQEditor = () => {
    const handleFAQChange = (index: number, field: string, value: string) => {
      const newFAQs = [...(component.props.faqs || [])];
      newFAQs[index] = { ...newFAQs[index], [field]: value };
      handlePropChange('faqs', newFAQs);
    };

    const addFAQ = () => {
      const newFAQs = [...(component.props.faqs || [])];
      newFAQs.push({
        question: '新しい質問？',
        answer: '質問に対する回答がここに入ります。'
      });
      handlePropChange('faqs', newFAQs);
    };

    const removeFAQ = (index: number) => {
      const newFAQs = [...(component.props.faqs || [])];
      newFAQs.splice(index, 1);
      handlePropChange('faqs', newFAQs);
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>コンテンツ</h3>

          <div style={styles.field}>
            <label style={styles.label}>セクションタイトル</label>
            <input
              type="text"
              value={component.props.title || ''}
              onChange={(e) => handlePropChange('title', e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>説明文</label>
            <textarea
              value={component.props.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              rows={2}
              style={styles.textarea}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={styles.sectionTitle}>FAQ項目</h3>
            <button
              onClick={addFAQ}
              style={styles.addButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              追加
            </button>
          </div>

          <div>
            {(component.props.faqs || []).map((faq: any, index: number) => (
              <div key={index} style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <span style={styles.itemIndex}>FAQ {index + 1}</span>
                  <button
                    onClick={() => removeFAQ(index)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>質問</label>
                  <input
                    type="text"
                    value={faq.question || ''}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>回答</label>
                  <textarea
                    value={faq.answer || ''}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    rows={3}
                    style={styles.textarea}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFooterEditor = () => {
    const handleLinkChange = (index: number, field: string, value: string) => {
      const newLinks = [...(component.props.links || [])];
      newLinks[index] = { ...newLinks[index], [field]: value };
      handlePropChange('links', newLinks);
    };

    const handleSocialLinkChange = (index: number, field: string, value: string) => {
      const newSocialLinks = [...(component.props.socialLinks || [])];
      newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
      handlePropChange('socialLinks', newSocialLinks);
    };

    const addLink = () => {
      const newLinks = [...(component.props.links || [])];
      newLinks.push({ label: 'New Link', url: '#' });
      handlePropChange('links', newLinks);
    };

    const removeLink = (index: number) => {
      const newLinks = [...(component.props.links || [])];
      newLinks.splice(index, 1);
      handlePropChange('links', newLinks);
    };

    const addSocialLink = () => {
      const newSocialLinks = [...(component.props.socialLinks || [])];
      newSocialLinks.push({ platform: 'Twitter', url: '#' });
      handlePropChange('socialLinks', newSocialLinks);
    };

    const removeSocialLink = (index: number) => {
      const newSocialLinks = [...(component.props.socialLinks || [])];
      newSocialLinks.splice(index, 1);
      handlePropChange('socialLinks', newSocialLinks);
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Company Info</h3>

          <div style={styles.field}>
            <label style={styles.label}>Company Name</label>
            <input
              type="text"
              value={component.props.companyName || ''}
              onChange={(e) => handlePropChange('companyName', e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={component.props.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              rows={3}
              style={styles.textarea}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Copyright Text</label>
            <input
              type="text"
              value={component.props.copyright || ''}
              onChange={(e) => handlePropChange('copyright', e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <button
              onClick={addLink}
              style={styles.addButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              Add
            </button>
          </div>

          <div>
            {(component.props.links || []).map((link: any, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={link.label || ''}
                  onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  placeholder="Link text"
                  style={{ ...styles.input, flex: 1 }}
                />
                <input
                  type="url"
                  value={link.url || ''}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  placeholder="URL"
                  style={{ ...styles.input, flex: 1 }}
                />
                <button
                  onClick={() => removeLink(index)}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={styles.sectionTitle}>Social Links</h3>
            <button
              onClick={addSocialLink}
              style={styles.addButton}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              Add
            </button>
          </div>

          <div>
            {(component.props.socialLinks || []).map((social: any, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <select
                  value={social.platform || ''}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                >
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                </select>
                <input
                  type="url"
                  value={social.url || ''}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  placeholder="URL"
                  style={{ ...styles.input, flex: 1 }}
                />
                <button
                  onClick={() => removeSocialLink(index)}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Style</h3>

          <div style={styles.field}>
            <label style={styles.label}>Theme</label>
            <select
              value={component.style?.theme || 'dark'}
              onChange={(e) => handleStyleChange('theme', e.target.value)}
              style={styles.input}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderPricingEditor = () => {
    const handleMainPlanChange = (field: string, value: any) => {
      updateComponent(component.id, {
        props: {
          ...component.props,
          mainPlan: { ...component.props.mainPlan, [field]: value }
        }
      });
    };

    const handleAdditionalPlanChange = (index: number, field: string, value: any) => {
      const newPlans = [...(component.props.additionalPlans || [])];
      newPlans[index] = { ...newPlans[index], [field]: value };
      handlePropChange('additionalPlans', newPlans);
    };

    const addAdditionalPlan = () => {
      const newPlans = [...(component.props.additionalPlans || [])];
      newPlans.push({
        description: '○○（番組・特集・アーティスト名など）が見られる、スーパー！ドラマTVなど5チャンネルがえらべる',
        name: 'スーパー！セレクト5',
        priceLabel: '視聴料',
        price: '1,100',
        unit: '円/月（税込）'
      });
      handlePropChange('additionalPlans', newPlans);
    };

    const removeAdditionalPlan = (index: number) => {
      const newPlans = [...(component.props.additionalPlans || [])];
      newPlans.splice(index, 1);
      handlePropChange('additionalPlans', newPlans);
    };

    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>メインプラン</h3>

          <div style={{ ...styles.itemCard, backgroundColor: '#fafafa' }}>
            <div style={styles.field}>
              <label style={styles.label}>説明文</label>
              <textarea
                value={component.props.mainPlan?.description || ''}
                onChange={(e) => handleMainPlanChange('description', e.target.value)}
                rows={1}
                style={styles.textarea}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>プラン名</label>
              <input
                type="text"
                value={component.props.mainPlan?.name || ''}
                onChange={(e) => handleMainPlanChange('name', e.target.value)}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div style={styles.colorInputContainer}>
                <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
                <input
                  type="color"
                  value={component.style?.mainPlanBoxColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('mainPlanBoxColor', e.target.value)}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  value={component.style?.mainPlanBoxColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('mainPlanBoxColor', e.target.value)}
                  style={styles.colorValue}
                  placeholder="#3b82f6"
                />
              </div>

              <div style={styles.colorInputContainer}>
                <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                <input
                  type="color"
                  value={component.style?.mainPlanTextColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('mainPlanTextColor', e.target.value)}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  value={component.style?.mainPlanTextColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('mainPlanTextColor', e.target.value)}
                  style={styles.colorValue}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>価格</label>
              <input
                type="text"
                value={component.props.mainPlan?.price || ''}
                onChange={(e) => handleMainPlanChange('price', e.target.value)}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div style={styles.colorInputContainer}>
                <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                <input
                  type="color"
                  value={component.style?.priceColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('priceColor', e.target.value)}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  value={component.style?.priceColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange('priceColor', e.target.value)}
                  style={styles.colorValue}
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>注記</label>
              <input
                type="text"
                value={component.props.mainPlan?.note || ''}
                onChange={(e) => handleMainPlanChange('note', e.target.value)}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div style={styles.field}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!component.props.showMustReadBox}
                  onChange={(e) => handlePropChange('showMustReadBox', e.target.checked)}
                  style={{ marginRight: '8px', height: '16px', width: '16px' }}
                />
                <span style={{ ...styles.label, marginBottom: 0 }}>注意事項ボックスを表示する</span>
              </label>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>追加プラン</h3>

          {(component.props.additionalPlans || []).map((plan: any, index: number) => (
            <div key={index} style={{ ...styles.itemCard, backgroundColor: '#fafafa' }}>
              <div style={{ ...styles.itemHeader, marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>追加プラン {index + 1}</span>
                <button
                  onClick={() => removeAdditionalPlan(index)}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>説明文</label>
                <textarea
                  value={plan.description || ''}
                  onChange={(e) => handleAdditionalPlanChange(index, 'description', e.target.value)}
                  rows={1}
                  style={styles.textarea}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>プラン名（例：スーパー！セレクト5）</label>
                <input
                  type="text"
                  value={plan.name || ''}
                  onChange={(e) => handleAdditionalPlanChange(index, 'name', e.target.value)}
                  style={styles.input}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div style={styles.colorInputContainer}>
                  <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
                  <input
                    type="color"
                    value={plan.backgroundColor || component.style?.accentColor || '#FABE00'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                    style={styles.colorInput}
                  />
                  <input
                    type="text"
                    value={plan.backgroundColor || component.style?.accentColor || '#FABE00'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                    style={styles.colorValue}
                    placeholder="#FABE00"
                  />
                </div>

                <div style={styles.colorInputContainer}>
                  <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                  <input
                    type="color"
                    value={plan.textColor || '#000000'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'textColor', e.target.value)}
                    style={styles.colorInput}
                  />
                  <input
                    type="text"
                    value={plan.textColor || '#000000'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'textColor', e.target.value)}
                    style={styles.colorValue}
                    placeholder="#000000"
                  />
                </div>

                <div style={styles.note}>
                  このプランボックスの背景色と文字色を個別に設定できます。
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>価格</label>
                <input
                  type="text"
                  value={plan.price || ''}
                  onChange={(e) => handleAdditionalPlanChange(index, 'price', e.target.value)}
                  style={styles.input}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div style={styles.colorInputContainer}>
                  <label style={{ ...styles.label, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                  <input
                    type="color"
                    value={plan.priceColor || component.style?.accentColor || '#FABE00'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'priceColor', e.target.value)}
                    style={styles.colorInput}
                  />
                  <input
                    type="text"
                    value={plan.priceColor || component.style?.accentColor || '#FABE00'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'priceColor', e.target.value)}
                    style={styles.colorValue}
                    placeholder="#FABE00"
                  />
                </div>
                <div style={styles.note}>
                  このプランの価格文字色を個別に設定できます。
                </div>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={addAdditionalPlan}
              style={{ ...styles.addButton, padding: '8px 16px', fontSize: '14px' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <Plus size={16} style={{ marginRight: '8px' }} />
              プラン追加
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAppIntroEditor = () => {
    return (
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>編集可能コンテンツ</h3>

          <div style={{ ...styles.itemCard, backgroundColor: '#fafafa' }}>
            <div style={styles.field}>
              <label style={styles.label}>吹き出しテキスト</label>
              <input
                type="text"
                value={component.props.balloonText || ''}
                onChange={(e) => handlePropChange('balloonText', e.target.value)}
                placeholder="ブラックリスト"
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (mode === 'style') {
    return renderStyleEditor();
  }

  return renderContentEditor();
};

export default UnifiedEditor;
