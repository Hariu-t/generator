import React, { useState } from 'react';
import { X, Settings, Edit, Palette } from 'lucide-react';
import { usePageStore } from '../../store/usePageStore';
import KVEditor from '../Editors/KVEditor';
import FeaturesEditor from '../Editors/FeaturesEditor';
import CTAEditor from '../Editors/CTAEditor';
import TestimonialsEditor from '../Editors/TestimonialsEditor';
import FAQEditor from '../Editors/FAQEditor';
import FooterEditor from '../Editors/FooterEditor';
import PricingEditor from '../Editors/PricingEditor';
import AppIntroEditor from '../Editors/AppIntroEditor';
import StyleEditor from '../Editors/StyleEditor';

const PropertiesPanel: React.FC = () => {
  const { selectedComponentId, pageData, selectComponent } = usePageStore();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const selectedComponent = pageData.components.find(c => c.id === selectedComponentId);

  const containerStyle: React.CSSProperties = {
    width: '320px',
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  };

  const headerContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    marginLeft: '8px',
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease-in-out',
  };

  const componentInfoStyle: React.CSSProperties = {
    marginTop: '8px',
    marginBottom: '16px',
  };

  const componentBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: '12px',
    borderRadius: '20px',
    fontWeight: 500,
    marginBottom: '8px',
  };

  const componentNameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '4px',
  };

  const componentIdStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#9ca3af',
    fontFamily: 'monospace',
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    padding: '4px',
  };

  const tabButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  };

  const getTabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    ...tabButtonStyle,
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    color: isActive ? '#111827' : '#6b7280',
    boxShadow: isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
  });

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
  };

  const emptyStateStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const emptyContentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#6b7280',
  };

  const emptyIconStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    color: '#d1d5db',
    margin: '0 auto 12px',
  };

  const emptyTextStyle: React.CSSProperties = {
    fontSize: '14px',
  };

  if (!selectedComponent) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <Settings size={20} color="#9ca3af" />
            <h2 style={titleStyle}>プロパティ</h2>
          </div>
        </div>
        <div style={emptyStateStyle}>
          <div style={emptyContentStyle}>
            <Settings style={emptyIconStyle} />
            <p style={emptyTextStyle}>コンポーネントを選択して<br />プロパティを編集</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContentEditor = () => {
    switch (selectedComponent.type) {
      case 'kv':
        return <KVEditor component={selectedComponent} />;
      case 'features':
        return <FeaturesEditor component={selectedComponent} />;
      case 'cta':
        return <CTAEditor component={selectedComponent} />;
      case 'testimonials':
        return <TestimonialsEditor component={selectedComponent} />;
      case 'faq':
        return <FAQEditor component={selectedComponent} />;
      case 'footer':
        return <FooterEditor component={selectedComponent} />;
      case 'pricing':
        return <PricingEditor component={selectedComponent} />;
      case 'app-intro':
        return <AppIntroEditor component={selectedComponent} />;
      default:
        return (
          <div style={{ padding: '16px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>このコンポーネントタイプのエディターはありません。</p>
          </div>
        );
    }
  };

  const getComponentDisplayName = (type: string) => {
    switch (type) {
      case 'kv':
        return 'KV';
      case 'features':
        return '特徴';
      case 'cta':
        return 'CTA';
      case 'testimonials':
        return 'お客様の声';
      case 'faq':
        return 'FAQ';
      case 'footer':
        return 'フッター';
      case 'pricing':
        return '料金';
      case 'app-intro':
        return 'アプリ紹介';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getComponentName = (component: ComponentData) => {
    // コンポーネントテンプレートの名前を取得
    const { pattern } = component.props;
    
    switch (component.type) {
      case 'kv':
        if (pattern === 'carousel') return 'KV カルーセル型';
        if (pattern === 'cinematic') return 'KV シネマティック型';
        if (pattern === 'card') return 'KV カード型';
        if (pattern === 'program-hero') return 'KV 番組ヒーロー型';
        return 'KV';
      case 'features':
        // 画像があるかどうかで判定
        const hasImages = component.props.features?.some((f: any) => f.image);
        return hasImages ? '2カラム特徴' : '3カラム特徴';
      case 'cta':
        // 特徴があるかどうかで判定
        const hasFeatures = component.props.features && component.props.features.length > 0;
        return hasFeatures ? 'CTA（特徴付き）' : 'シンプルCTA';
      case 'testimonials':
        return 'お客様の声';
      case 'faq':
        return 'よくある質問';
      case 'footer':
        return 'フッター';
      case 'pricing':
        return '料金表示';
      case 'app-intro':
        return '番組配信紹介';
      default:
        return `${getComponentDisplayName(component.type)}コンポーネント`;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <div style={titleContainerStyle}>
            <Settings size={20} color="#4b5563" />
            <h2 style={titleStyle}>プロパティ</h2>
          </div>
          <button
            onClick={() => selectComponent(null)}
            style={closeButtonStyle}
            title="プロパティパネルを閉じる"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={16} color="#6b7280" />
          </button>
        </div>
        
        <div style={componentInfoStyle}>
          <span style={componentBadgeStyle}>
            {getComponentDisplayName(selectedComponent.type)}
          </span>
          <div style={componentNameStyle}>
            {getComponentName(selectedComponent)}
          </div>
          <div style={componentIdStyle}>
            ID: {selectedComponent.id}
          </div>
        </div>

        {/* タブ切り替え */}
        <div style={tabsStyle}>
          <button
            style={getTabButtonStyle(activeTab === 'content')}
            onClick={() => setActiveTab('content')}
          >
            <Edit size={14} />
            コンテンツ
          </button>
          <button
            style={getTabButtonStyle(activeTab === 'style')}
            onClick={() => setActiveTab('style')}
          >
            <Palette size={14} />
            スタイル
          </button>
        </div>
      </div>
      
      <div style={contentStyle}>
        {activeTab === 'content' ? renderContentEditor() : <StyleEditor component={selectedComponent} />}
      </div>
    </div>
  );
};

export default PropertiesPanel;