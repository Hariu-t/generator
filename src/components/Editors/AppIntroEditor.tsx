import React from 'react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface AppIntroEditorProps {
  component: ComponentData;
}

const AppIntroEditor: React.FC<AppIntroEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  };
  const balloonCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fafafa',
  };

  return (
    <div style={containerStyle}>
      {/* 編集可能コンテンツ */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>編集可能コンテンツ</h3>
        
        <div style={balloonCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>吹き出しテキスト</label>
            <input
              type="text"
              value={component.props.balloonText || ''}
              onChange={(e) => handlePropChange('balloonText', e.target.value)}
              placeholder="ブラックリスト"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />

            {/* 吹き出しの個別スタイル設定 */}
            {/* <div style={colorInputContainerStyle}>
              <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>吹き出し色:</label>
              <input
                type="color"
                value={component.style?.accentColor || '#0099FF'}
                onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                style={colorInputStyle}
              />
              <input
                type="text"
                value={component.style?.accentColor || '#0099FF'}
                onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                style={colorValueStyle}
                placeholder="#0099FF"
              />
            </div>
            <div style={styleNoteStyle}>
              吹き出しの枠線色と文字色、ポイントのアクセント色に適用されます。
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntroEditor;