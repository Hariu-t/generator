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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  };

  const noteStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '4px',
    fontStyle: 'italic',
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
              placeholder="ブラックリストをマイリスト登録すれば便利！"
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
            <div style={noteStyle}>
              ※この部分のみ編集可能です。その他のテキストや画像は固定です。
            </div>

            {/* 吹き出しの個別スタイル設定 */}
            <div style={colorInputContainerStyle}>
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
            </div>
          </div>
        </div>
      </div>

      {/* 全体スタイル設定 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>全体スタイル設定</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>セクション背景色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.backgroundColor || '#f8fafc'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.backgroundColor || '#f8fafc'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#f8fafc"
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>カード背景色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.cardBackgroundColor || '#F6F6F6'}
              onChange={(e) => handleStyleChange('cardBackgroundColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.cardBackgroundColor || '#F6F6F6'}
              onChange={(e) => handleStyleChange('cardBackgroundColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#F6F6F6"
            />
          </div>
          <div style={styleNoteStyle}>
            中央のグレーボックス部分の背景色です。
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>基本文字色</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={component.style?.textColor || '#333333'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.textColor || '#333333'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#333333"
            />
          </div>
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: '#fef3c7',
          borderRadius: '6px',
          border: '1px solid #fbbf24',
          marginTop: '16px',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#92400e',
            margin: 0,
            lineHeight: '1.4',
          }}>
            💡 共通スタイル（mainColor、baseColor等）は「スタイル」タブで設定できます。
          </p>
        </div>
      </div>

      {/* 固定コンテンツ情報 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>固定コンテンツ</h3>
        <div style={{
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            lineHeight: '1.5',
          }}>
            以下のコンテンツは固定されており、編集できません：
            <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
              <li>セクションタイトル「スカパー！番組配信とは」</li>
              <li>説明文とアプリ紹介テキスト</li>
              <li>App Store・Google Playのダウンロードボタン</li>
              <li>point1・point2の内容</li>
              <li>注意事項テキスト</li>
              <li>「基本プランなら、50chのうち37chが番組配信も楽しめる！」</li>
              <li>チャンネル一覧画像</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntroEditor;