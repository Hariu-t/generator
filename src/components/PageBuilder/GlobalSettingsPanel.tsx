import React from 'react';
import { X, Globe, FileText, FolderOpen } from 'lucide-react';
import { usePageStore } from '../../store/usePageStore';

interface GlobalSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSettingsPanel: React.FC<GlobalSettingsPanelProps> = ({ isOpen, onClose }) => {
  const { pageData, updateGlobalSettings } = usePageStore();

  const handleSettingChange = (key: string, value: string | boolean) => {
    updateGlobalSettings({ [key]: value });
  };

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999, // より高いz-indexに変更
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '672px',
    margin: '16px',
    maxHeight: '90vh',
    overflow: 'hidden',
    zIndex: 10000, // モーダル自体にも高いz-indexを設定
    position: 'relative',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
  };

  const headerContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    marginLeft: '12px',
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 160px)',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    outline: 'none',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'none' as const,
  };

  const helpTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  };

  const footerStyle: React.CSSProperties = {
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
  };

  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <Globe size={24} color="#2563eb" />
            <h2 style={headerTitleStyle}>ページ設定</h2>
          </div>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FileText size={20} color="#4b5563" style={{ marginRight: '8px' }} />
              基本情報
            </h3>
            
            <div style={fieldStyle}>
              <label style={labelStyle}>ページタイトル</label>
              <input
                type="text"
                value={pageData.globalSettings.title}
                onChange={(e) => handleSettingChange('title', e.target.value)}
                placeholder="例: 素晴らしい商品 - 公式サイト"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={helpTextStyle}>
                ブラウザのタブに表示されるタイトルです（推奨: 60文字以内）
              </p>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>ページ説明（meta description）</label>
              <textarea
                value={pageData.globalSettings.description}
                onChange={(e) => handleSettingChange('description', e.target.value)}
                placeholder="例: 革新的な商品で、あなたの生活をより豊かにします。今すぐ詳細をご覧ください。"
                rows={3}
                style={textareaStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={helpTextStyle}>
                検索結果に表示される説明文です（推奨: 160文字以内）
              </p>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>キーワード（meta keywords）</label>
              <input
                type="text"
                value={pageData.globalSettings.keywords || ''}
                onChange={(e) => handleSettingChange('keywords', e.target.value)}
                placeholder="例: 商品名, サービス, 業界, 地域"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={helpTextStyle}>
                カンマ区切りでキーワードを入力してください
              </p>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>OGP画像URL（SNSシェア用）</label>
              <input
                type="url"
                value={pageData.globalSettings.ogImage || ''}
                onChange={(e) => handleSettingChange('ogImage', e.target.value)}
                placeholder="例: https://example.com/og-image.jpg"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={helpTextStyle}>
                SNSでシェアされた時に表示される画像です（推奨サイズ: 1200x630px）
              </p>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FolderOpen size={20} color="#4b5563" style={{ marginRight: '8px' }} />
              出力設定
            </h3>
            
            <div style={fieldStyle}>
              <label style={labelStyle}>ディレクトリ名</label>
              <input
                type="text"
                value={pageData.globalSettings.directory || ''}
                onChange={(e) => handleSettingChange('directory', e.target.value)}
                placeholder="例: my-landing-page（空の場合はルートディレクトリ）"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={helpTextStyle}>
                HTML出力時に作成されるフォルダ名です。空の場合はindex.htmlがルートに出力されます。
              </p>
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={cancelButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            style={saveButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsPanel;