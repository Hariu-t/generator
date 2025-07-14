import React from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface StyleEditorProps {
  component: ComponentData;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ component }) => {
  const { pageData, updateComponent, updateGlobalStyles } = usePageStore();

  const handleGlobalStyleChange = (key: string, value: string) => {
    updateGlobalStyles({ [key]: value });
  };

  const toggleDarkMode = () => {
    const isDarkMode = component.style?.isDarkMode || false;
    
    if (!isDarkMode) {
      // ダークモードをONにする
      updateComponent(component.id, {
        style: { 
          ...component.style,
          // 現在のスタイルをバックアップ
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
          // ダークモードのスタイルを適用
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
      // ダークモードをOFFにする（バックアップから復元）
      const backup = component.style?.lightModeBackup || {};
      
      // バックアップが存在する場合は復元、存在しない場合はライトモードのデフォルトを使用
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

      // undefinedの値を除去
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '4px',
  };

  const colorInputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const colorInputStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    outline: 'none',
  };

  const colorValueStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: 'monospace',
    backgroundColor: '#f9fafb',
    color: '#374151',
  };

  const colorDescriptionStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '4px',
    lineHeight: '1.4',
  };

  const darkModeToggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '16px',
  };

  const toggleLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'relative',
    width: '48px',
    height: '24px',
    backgroundColor: component.style?.isDarkMode ? '#2563eb' : '#d1d5db',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };

  const toggleKnobStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: component.style?.isDarkMode ? '26px' : '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: 'left 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const toggleTextStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280',
  };

  const infoBoxStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
    marginTop: '16px',
  };

  const infoTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#0369a1',
    margin: 0,
    lineHeight: '1.4',
  };

  const styleNoteStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
    lineHeight: '1.4',
  };

  const isDarkMode = component.style?.isDarkMode || false;

  return (
    <div style={containerStyle}>
      {/* ダークモード切り替え */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <Moon size={16} color="#4b5563" />
          表示モード
        </h3>
        
        <div style={darkModeToggleStyle}>
          <div style={toggleLabelStyle}>
            {isDarkMode ? <Moon size={16} color="#2563eb" /> : <Sun size={16} color="#f59e0b" />}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                ダークモード{isDarkMode ? 'ON' : 'OFF'}
              </div>
              <div style={toggleTextStyle}>
                {isDarkMode ? 'ダークテーマで表示中' : 'ライトテーマで表示中'}
              </div>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            style={toggleButtonStyle}
          >
            <div style={toggleKnobStyle}>
              {isDarkMode ? <Moon size={12} color="#2563eb" /> : <Sun size={12} color="#f59e0b" />}
            </div>
          </button>
        </div>
      </div>

      {/* 共通スタイル設定 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <Palette size={16} color="#4b5563" />
          共通スタイル設定
        </h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>mainColor（メインカラー）</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={pageData.globalStyles?.mainColor || '#dc2626'}
              onChange={(e) => handleGlobalStyleChange('mainColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.mainColor || '#dc2626'}
              onChange={(e) => handleGlobalStyleChange('mainColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#dc2626"
            />
          </div>
          <div style={colorInputContainerStyle}>
            <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>サブ色:</label>
            <input
              type="color"
              value={pageData.globalStyles?.mainColorSub || '#ffffff'}
              onChange={(e) => handleGlobalStyleChange('mainColorSub', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.mainColorSub || '#ffffff'}
              onChange={(e) => handleGlobalStyleChange('mainColorSub', e.target.value)}
              style={colorValueStyle}
              placeholder="#ffffff"
            />
          </div>
          <p style={colorDescriptionStyle}>
            主要なアクション要素に使用される色です。各コンポーネントでテキスト色・背景色を選択できます。
          </p>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>baseColor（ベースカラー）</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={pageData.globalStyles?.baseColor || '#f8fafc'}
              onChange={(e) => handleGlobalStyleChange('baseColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.baseColor || '#f8fafc'}
              onChange={(e) => handleGlobalStyleChange('baseColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#f8fafc"
            />
          </div>
          <div style={colorInputContainerStyle}>
            <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>サブ色:</label>
            <input
              type="color"
              value={pageData.globalStyles?.baseColorSub || '#333333'}
              onChange={(e) => handleGlobalStyleChange('baseColorSub', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.baseColorSub || '#333333'}
              onChange={(e) => handleGlobalStyleChange('baseColorSub', e.target.value)}
              style={colorValueStyle}
              placeholder="#333333"
            />
          </div>
          <p style={colorDescriptionStyle}>
            セクションで使用される基本色です。各コンポーネントでテキスト色・背景色を選択できます。
          </p>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>base2Color（セカンダリベースカラー）</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={pageData.globalStyles?.base2Color || '#f1f5f9'}
              onChange={(e) => handleGlobalStyleChange('base2Color', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.base2Color || '#f1f5f9'}
              onChange={(e) => handleGlobalStyleChange('base2Color', e.target.value)}
              style={colorValueStyle}
              placeholder="#f1f5f9"
            />
          </div>
          <div style={colorInputContainerStyle}>
            <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>サブ色:</label>
            <input
              type="color"
              value={pageData.globalStyles?.base2ColorSub || '#333333'}
              onChange={(e) => handleGlobalStyleChange('base2ColorSub', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.base2ColorSub || '#333333'}
              onChange={(e) => handleGlobalStyleChange('base2ColorSub', e.target.value)}
              style={colorValueStyle}
              placeholder="#333333"
            />
          </div>
          <p style={colorDescriptionStyle}>
            カードやパネルで使用される補助的な基本色です。各コンポーネントでテキスト色・背景色を選択できます。
          </p>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>accentColor（アクセントカラー）</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={pageData.globalStyles?.accentColor || '#E60012'}
              onChange={(e) => handleGlobalStyleChange('accentColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.accentColor || '#E60012'}
              onChange={(e) => handleGlobalStyleChange('accentColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#E60012"
            />
          </div>
          <div style={colorInputContainerStyle}>
            <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '80px' }}>サブ色:</label>
            <input
              type="color"
              value={pageData.globalStyles?.accentColorSub || '#ffffff'}
              onChange={(e) => handleGlobalStyleChange('accentColorSub', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={pageData.globalStyles?.accentColorSub || '#ffffff'}
              onChange={(e) => handleGlobalStyleChange('accentColorSub', e.target.value)}
              style={colorValueStyle}
              placeholder="#ffffff"
            />
          </div>
          <p style={colorDescriptionStyle}>
            強調表示や装飾要素に使用されるアクセント色です。各コンポーネントでテキスト色・背景色を選択できます。
          </p>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>commonColor（共通テキストカラー）</label>
          <div style={colorInputContainerStyle}>
            <div
              style={{
                ...colorInputStyle,
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
                transition: 'border-color 0.15s ease-in-out',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              <option value="#000000">黒</option>
              <option value="#ffffff">白</option>
            </select>
          </div>
          <div style={styleNoteStyle}>
            ページ全体で使用される基本的なテキスト色です。背景色に応じて選択してください。
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>commonColorBg（共通背景カラー）</label>
          <div style={colorInputContainerStyle}>
            <div
              style={{
                ...colorInputStyle,
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
                transition: 'border-color 0.15s ease-in-out',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              <option value="#ffffff">白</option>
              <option value="#000000">黒</option>
            </select>
          </div>
          <div style={styleNoteStyle}>
            ページ全体で使用される基本的な背景色です。コンテンツの可読性に応じて選択してください。
          </div>
        </div>

        <div style={infoBoxStyle}>
          <p style={infoTextStyle}>
            💡 これらの色は全コンポーネントで共通して使用されます。変更すると、ページ全体のデザインが統一されます。
          </p>
        </div>
      </div>

      {/* 個別スタイル設定の案内 */}
      <div style={{
        padding: '12px',
        backgroundColor: '#fef3c7',
        borderRadius: '8px',
        border: '1px solid #fbbf24',
        marginTop: '16px',
      }}>
        <p style={{
          fontSize: '12px',
          color: '#92400e',
          margin: 0,
          lineHeight: '1.4',
        }}>
          📝 個別の色設定（背景色、文字色など）は「コンテンツ」タブで設定できます。
        </p>
      </div>
    </div>
  );
};

export default StyleEditor;