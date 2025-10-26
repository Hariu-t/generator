import React, { useState, useEffect } from 'react';
import { Plus, Search, RefreshCw, Lock } from 'lucide-react';
import { ComponentTemplate } from '../../types';
import { componentTemplates } from '../../data/componentTemplates';
import { usePageStore } from '../../store/usePageStore';
import { supabase } from '../../lib/supabase';
import ComponentBuilder from './ComponentBuilder';

const ComponentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customTemplates, setCustomTemplates] = useState<ComponentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComponentBuilder, setShowComponentBuilder] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { addComponent, pageData } = usePageStore();

  const allTemplates = [...componentTemplates, ...customTemplates];
  const categories = ['All', ...Array.from(new Set(allTemplates.map(t => t.category)))];

  useEffect(() => {
    loadCustomTemplates();
  }, []);

  const loadCustomTemplates = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('component_templates')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      if (data) {
        const templates: ComponentTemplate[] = data.map(item => ({
          id: item.id,
          name: item.display_name,
          description: item.description || '',
          category: item.category,
          type: item.name.replace('Component', '').toLowerCase(),
          thumbnail: item.thumbnail_url || '',
          defaultProps: item.default_props || {},
        }));
        setCustomTemplates(templates);
      }
    } catch (error) {
      console.error('Error loading custom templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const ADMIN_PASSWORD = 'admin2024';

  const checkAdminAuth = () => {
    const authTime = localStorage.getItem('admin_auth_time');
    if (!authTime) return false;

    const now = Date.now();
    const authTimestamp = parseInt(authTime, 10);
    const hourInMs = 60 * 60 * 1000;

    return (now - authTimestamp) < hourInMs;
  };

  const handleComponentBuilderClick = () => {
    if (checkAdminAuth()) {
      setShowComponentBuilder(true);
    } else {
      setShowPasswordModal(true);
      setPasswordInput('');
      setPasswordError('');
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth_time', Date.now().toString());
      setShowPasswordModal(false);
      setShowComponentBuilder(true);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('パスワードが正しくありません');
    }
  };

  // 使用済みコンポーネントIDを取得
  const usedComponentIds = pageData.components.map(component => {
    // コンポーネントIDから元のテンプレートIDを推定
    const componentType = component.type;
    const matchingTemplate = allTemplates.find(template =>
      template.type === componentType &&
      JSON.stringify(template.defaultProps) === JSON.stringify(component.props)
    );
    return matchingTemplate?.id || null;
  }).filter(Boolean);

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddComponent = (template: ComponentTemplate) => {
    // 既に使用されているコンポーネントIDの場合は追加しない
    if (isComponentUsed(template.id)) {
      return;
    }

    const newComponent = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      props: { ...template.defaultProps },
      style: { theme: 'light', colorScheme: 'blue' as const },
    };
    addComponent(newComponent);
  };

  const isComponentUsed = (templateId: string) => {
    return usedComponentIds.includes(templateId);
  };

  const containerStyle: React.CSSProperties = {
    width: '320px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '16px',
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '16px',
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
  };

  const categoriesStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const categoryButtonStyle: React.CSSProperties = {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
  };

  const getCategoryButtonStyle = (isSelected: boolean): React.CSSProperties => ({
    ...categoryButtonStyle,
    backgroundColor: isSelected ? '#dbeafe' : '#f3f4f6',
    color: isSelected ? '#1d4ed8' : '#4b5563',
  });

  const listStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  };

  const componentCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease-in-out',
    marginBottom: '12px',
    position: 'relative',
  };

  const getComponentCardStyle = (isUsed: boolean): React.CSSProperties => ({
    ...componentCardStyle,
    cursor: isUsed ? 'not-allowed' : 'pointer',
    opacity: isUsed ? 0.6 : 1,
  });

  const thumbnailStyle: React.CSSProperties = {
    aspectRatio: '16/9',
    backgroundColor: '#f3f4f6',
    position: 'relative',
    overflow: 'hidden',
  };

  const thumbnailImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.2s ease-in-out',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease-in-out',
  };

  const plusIconContainerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    padding: '8px',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const usedOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  };

  const usedTextStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '8px 16px',
    borderRadius: '8px',
    backdropFilter: 'blur(4px)',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '12px',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontWeight: 500,
    color: '#111827',
    fontSize: '14px',
    marginBottom: '4px',
  };

  const cardDescriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280',
    lineHeight: '1.4',
    marginBottom: '8px',
  };

  const categoryTagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    fontSize: '10px',
    borderRadius: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ ...titleStyle, marginBottom: 0 }}>コンポーネント</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleComponentBuilderClick}
              style={{
                padding: '6px 12px',
                backgroundColor: '#10b981',
                border: '1px solid #059669',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: '#ffffff',
                fontWeight: 500,
              }}
              title="コンポーネント作成（管理者のみ）"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#10b981';
              }}
            >
              <Plus size={14} />
              作成
            </button>
            <button
              onClick={loadCustomTemplates}
              disabled={isLoading}
              style={{
                padding: '6px 12px',
                backgroundColor: isLoading ? '#e5e7eb' : '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
              }}
              title="カスタムコンポーネントを更新"
            >
              <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
              {isLoading ? '読込中...' : '更新'}
            </button>
          </div>
        </div>

        <div style={searchContainerStyle}>
          <Search style={searchIconStyle} size={16} />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={categoriesStyle}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={getCategoryButtonStyle(selectedCategory === category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div style={listStyle}>
        {filteredTemplates.map((template) => {
          const isUsed = isComponentUsed(template.id);
          
          return (
            <div
              key={template.id}
              style={getComponentCardStyle(isUsed)}
              onClick={() => handleAddComponent(template)}
              onMouseEnter={(e) => {
                if (!isUsed) {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                  const plusIcon = e.currentTarget.querySelector('.plus-icon') as HTMLElement;
                  const image = e.currentTarget.querySelector('.thumbnail-image') as HTMLElement;
                  if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  if (plusIcon) plusIcon.style.opacity = '1';
                  if (image) image.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isUsed) {
                  e.currentTarget.style.boxShadow = 'none';
                  const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                  const plusIcon = e.currentTarget.querySelector('.plus-icon') as HTMLElement;
                  const image = e.currentTarget.querySelector('.thumbnail-image') as HTMLElement;
                  if (overlay) overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                  if (plusIcon) plusIcon.style.opacity = '0';
                  if (image) image.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={thumbnailStyle}>
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  style={thumbnailImageStyle}
                  className="thumbnail-image"
                />
                
                {/* 使用中オーバーレイ */}
                {isUsed && (
                  <div style={usedOverlayStyle}>
                    <div style={usedTextStyle}>使用中</div>
                  </div>
                )}
                
                {/* 通常のホバーオーバーレイ（未使用の場合のみ） */}
                {!isUsed && (
                  <div style={overlayStyle} className="overlay">
                    <div style={plusIconContainerStyle} className="plus-icon">
                      <Plus size={16} color="#4b5563" />
                    </div>
                  </div>
                )}
              </div>
              
              <div style={cardContentStyle}>
                <h3 style={cardTitleStyle}>{template.name}</h3>
                <p style={cardDescriptionStyle}>{template.description}</p>
                <span style={categoryTagStyle}>{template.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showPasswordModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Lock size={24} color="#f59e0b" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px' }}>
                管理者認証
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                コンポーネント作成にはパスワードが必要です
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px',
                }}
              >
                パスワード
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
                placeholder="パスワードを入力"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: passwordError ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                autoFocus
              />
              {passwordError && (
                <p style={{ fontSize: '12px', color: '#ef4444', margin: '6px 0 0' }}>
                  {passwordError}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowPasswordModal(false)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#374151',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                キャンセル
              </button>
              <button
                onClick={handlePasswordSubmit}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                認証
              </button>
            </div>
          </div>
        </div>
      )}

      {showComponentBuilder && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            setShowComponentBuilder(false);
            loadCustomTemplates();
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              maxWidth: '1400px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                コンポーネントビルダー
              </h2>
              <button
                onClick={() => {
                  setShowComponentBuilder(false);
                  loadCustomTemplates();
                }}
                style={{
                  padding: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                }}
              >
                ×
              </button>
            </div>
            <ComponentBuilder />
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;