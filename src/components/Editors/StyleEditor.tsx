import React from 'react';
import { Palette, Eye, Moon, Sun } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import { designPatterns } from '../../data/designPatterns';

interface StyleEditorProps {
  component: ComponentData;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handleStyleChange = (key: string, value: any) => {
    updateComponent(component.id, {
      style: { ...component.style, [key]: value }
    });
  };

  const toggleDarkMode = () => {
    const patterns = designPatterns[component.type] || [];
    const isDarkMode = component.style?.isDarkMode || false;
    
    if (!isDarkMode) {
      // ダークモードをONにする
      const darkPattern = patterns.find(p => p.id.includes('dark'));
      if (darkPattern) {
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
            ...darkPattern.style,
            isDarkMode: true,
            designPattern: darkPattern.id
          }
        });
      }
    } else {
      // ダークモードをOFFにする（バックアップから復元）
      const backup = component.style?.lightModeBackup || {};
      const lightPattern = patterns.find(p => p.id.includes('light'));
      
      // バックアップが存在する場合は復元、存在しない場合はライトモードのデフォルトを使用
      const restoreStyle = {
        backgroundColor: backup.backgroundColor || lightPattern?.style.backgroundColor,
        textColor: backup.textColor || lightPattern?.style.textColor,
        headlineColor: backup.headlineColor || lightPattern?.style.headlineColor,
        descriptionColor: backup.descriptionColor || lightPattern?.style.descriptionColor,
        buttonBackgroundColor: backup.buttonBackgroundColor || lightPattern?.style.buttonBackgroundColor,
        buttonTextColor: backup.buttonTextColor || lightPattern?.style.buttonTextColor,
        cardBackgroundColor: backup.cardBackgroundColor || lightPattern?.style.cardBackgroundColor,
        cardTextColor: backup.cardTextColor || lightPattern?.style.cardTextColor,
        accentColor: backup.accentColor || lightPattern?.style.accentColor,
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
          lightModeBackup: undefined, // バックアップをクリア
          designPattern: lightPattern?.id
        }
      });
    }
  };

  // 要素の説明を取得する関数
  const getElementDescription = (elementKey: string) => {
    const descriptions: Record<string, { name: string; description: string; example: string }> = {
      backgroundColor: {
        name: 'セクション背景色',
        description: 'コンポーネント全体の背景色',
        example: 'セクション全体の背景として表示されます'
      },
      textColor: {
        name: 'メインテキスト色',
        description: '基本的なテキストの色',
        example: '本文や一般的なテキストに適用されます'
      },
      headlineColor: {
        name: '見出し色',
        description: 'タイトルや見出しの色',
        example: 'メインタイトルやセクション見出しに適用されます'
      },
      descriptionColor: {
        name: '説明文色',
        description: 'サブテキストや説明文の色',
        example: 'サブタイトルや詳細説明に適用されます'
      },
      buttonBackgroundColor: {
        name: 'ボタン背景色',
        description: 'CTAボタンの背景色',
        example: 'アクションボタンの背景として表示されます'
      },
      buttonTextColor: {
        name: 'ボタンテキスト色',
        description: 'CTAボタンの文字色',
        example: 'ボタン内のテキストに適用されます'
      },
      cardBackgroundColor: {
        name: 'カード背景色',
        description: 'カード要素の背景色',
        example: '特徴カードやお客様の声カードの背景に適用されます'
      },
      cardTextColor: {
        name: 'カードテキスト色',
        description: 'カード内のテキスト色',
        example: 'カード内の文字に適用されます'
      },
      accentColor: {
        name: 'アクセント色',
        description: '装飾やアイコンの色',
        example: 'アイコンや装飾要素に適用されます'
      }
    };

    return descriptions[elementKey] || {
      name: elementKey,
      description: 'カスタム要素',
      example: 'この要素に適用されます'
    };
  };

  // コンポーネントタイプに応じて利用可能な要素を取得
  const getAvailableElements = () => {
    const baseElements = ['backgroundColor', 'textColor', 'headlineColor', 'descriptionColor', 'accentColor'];
    
    switch (component.type) {
      case 'kv':
      case 'cta':
        return [...baseElements, 'buttonBackgroundColor', 'buttonTextColor'];
      case 'features':
      case 'testimonials':
      case 'faq':
        return [...baseElements, 'cardBackgroundColor', 'cardTextColor'];
      default:
        return baseElements;
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

  const elementInfoStyle: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '8px',
    marginBottom: '8px',
  };

  const elementNameStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const elementDescStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#64748b',
    marginBottom: '2px',
  };

  const elementExampleStyle: React.CSSProperties = {
    fontSize: '9px',
    color: '#94a3b8',
    fontStyle: 'italic',
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

  const availableElements = getAvailableElements();
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

      {/* 詳細カラー設定 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>
          <Palette size={16} color="#4b5563" />
          詳細カラー設定
        </h3>
        
        {availableElements.map((elementKey) => {
          const elementInfo = getElementDescription(elementKey);
          const currentValue = component.style?.[elementKey] || '#ffffff';
          
          return (
            <div key={elementKey} style={fieldStyle}>
              <label style={labelStyle}>{elementInfo.name}</label>
              
              {/* 要素の説明 */}
              <div style={elementInfoStyle}>
                <div style={elementNameStyle}>
                  <Eye size={10} color="#3b82f6" />
                  {elementInfo.description}
                </div>
                <div style={elementDescStyle}>{elementInfo.example}</div>
              </div>
              
              {/* カラー入力 */}
              <div style={colorInputContainerStyle}>
                <input
                  type="color"
                  value={currentValue}
                  onChange={(e) => handleStyleChange(elementKey, e.target.value)}
                  style={colorInputStyle}
                />
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => handleStyleChange(elementKey, e.target.value)}
                  style={colorValueStyle}
                  placeholder="#ffffff"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StyleEditor;