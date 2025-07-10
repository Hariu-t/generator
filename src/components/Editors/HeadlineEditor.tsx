import React from 'react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface HeadlineEditorProps {
  component: ComponentData;
}

const HeadlineEditor: React.FC<HeadlineEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

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

  const containerStyle: React.CSSProperties = {
    padding: '16px',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '12px',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '4px',
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    resize: 'vertical' as const,
  };

  const checkboxStyle: React.CSSProperties = {
    marginRight: '8px',
  };

  const checkboxLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
  };

  const colorInputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  };

  const colorInputStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
  };

  const colorValueStyle: React.CSSProperties = {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    backgroundColor: '#f9fafb',
    color: '#374151',
  };

  const styleNoteStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '4px',
    fontStyle: 'italic',
  };

  const noteStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '4px',
    fontStyle: 'italic',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>コンテンツ</h3>
        
        <div style={fieldStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={component.props.usePageTitle || false}
              onChange={(e) => handlePropChange('usePageTitle', e.target.checked)}
              style={checkboxStyle}
            />
            ページタイトルと連動する
          </label>
          <div style={noteStyle}>
            チェックすると、ページ設定のタイトルが自動的に反映されます。
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>ヘッドラインテキスト</label>
          <textarea
            value={component.props.text || ''}
            onChange={(e) => handlePropChange('text', e.target.value)}
            rows={3}
            style={textareaStyle}
            placeholder="ヘッドラインテキストを入力してください"
            disabled={component.props.usePageTitle}
            onFocus={(e) => {
              if (!component.props.usePageTitle) {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <div style={noteStyle}>
            {component.props.usePageTitle 
              ? 'ページタイトル連動が有効です。ページ設定でタイトルを変更してください。'
              : 'ページの最上部に表示される重要なヘッドラインです。'
            }
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>スタイル設定</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>背景色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.backgroundColor || '#dc2626'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.backgroundColor || '#dc2626'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#dc2626"
            />
          </div>
          <div style={styleNoteStyle}>
            デフォルトでは共通スタイルのmainColorが適用されます。
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>文字色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.textColor || '#ffffff'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.textColor || '#ffffff'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>ヘッドライン文字色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.headlineColor || '#ffffff'}
              onChange={(e) => handleStyleChange('headlineColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.headlineColor || '#ffffff'}
              onChange={(e) => handleStyleChange('headlineColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#ffffff"
            />
          </div>
          <div style={styleNoteStyle}>
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
        <p style={{
          fontSize: '12px',
          color: '#0369a1',
          margin: 0,
          lineHeight: '1.4',
        }}>
          💡 このコンポーネントは必須コンポーネントとして、ヘッダーの直下に自動的に配置されます。
        </p>
      </div>
    </div>
  );
};

export default HeadlineEditor;