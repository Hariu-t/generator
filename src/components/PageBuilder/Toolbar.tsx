import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo, 
  Redo, 
  Download,
  RefreshCw,
  Settings,
  Globe,
  PanelLeft,
  PanelRight,
  PanelLeftClose,
  PanelRightClose,
  FolderOpen
} from 'lucide-react';
import { usePageStore } from '../../store/usePageStore';
import { prepareImagesForExport } from '../../utils/imageHandler';
import { generateGlobalStylesCSS } from '../../utils/globalStylesHelper';
import GlobalSettingsPanel from './GlobalSettingsPanel';
import ProjectManager from './ProjectManager';

const Toolbar: React.FC = () => {
  const { 
    viewMode, 
    previewMode, 
    setViewMode, 
    setPreviewMode, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    pageData,
    resetPage,
    showComponentLibrary,
    showPropertiesPanel,
    toggleComponentLibrary,
    togglePropertiesPanel,
    getCurrentProjectName
  } = usePageStore();

  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);

  const exportHTML = () => {
    // 現在の状態を保存（プレビューモード、選択されたコンポーネントなど）
    const currentPreviewMode = previewMode;
    const currentViewMode = viewMode;
    const currentShowComponentLibrary = showComponentLibrary;
    const currentShowPropertiesPanel = showPropertiesPanel;

    // Get all components HTML
    const componentsHTML = pageData.components.map(component => {
      // This would render each component to HTML string
      // For now, we'll create a simple structure
      return `<div data-component="${component.type}" data-id="${component.id}">
        <!-- ${component.type} component would be rendered here -->
      </div>`;
    }).join('\n');

    const { globalSettings } = pageData;
    
    // 画像ファイルの準備
    const exportImages = prepareImagesForExport();
    
    // 共通スタイルのCSS生成
    const globalStylesCSS = generateGlobalStylesCSS(pageData.globalStyles);
    
    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${globalSettings.title}</title>
    <meta name="description" content="${globalSettings.description}">
    ${globalSettings.keywords ? `<meta name="keywords" content="${globalSettings.keywords}">` : ''}
    
    <!-- OGP Tags -->
    <meta property="og:title" content="${globalSettings.title}">
    <meta property="og:description" content="${globalSettings.description}">
    <meta property="og:type" content="website">
    ${globalSettings.ogImage ? `<meta property="og:image" content="${globalSettings.ogImage}">` : ''}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${globalSettings.title}">
    <meta name="twitter:description" content="${globalSettings.description}">
    ${globalSettings.ogImage ? `<meta name="twitter:image" content="${globalSettings.ogImage}">` : ''}
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
    <link rel="stylesheet" href="../assets/common.css">
    
    <!-- 共通スタイル -->
    <style>
      ${globalStylesCSS}
    </style>
</head>
<body>
    <!-- Header -->
    <header style="background-color: #ffffff; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 50;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; height: 64px;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #ffffff; font-weight: bold; font-size: 14px;">LP</span>
                    </div>
                    <div style="margin-left: 12px;">
                        <h1 style="font-size: 18px; font-weight: 600; color: #111827;">Your Company</h1>
                    </div>
                </div>
                <nav style="display: none; gap: 32px;">
                    <a href="#" style="color: #374151; text-decoration: none; padding: 8px 12px; font-size: 14px; font-weight: 500;">ホーム</a>
                    <a href="#" style="color: #374151; text-decoration: none; padding: 8px 12px; font-size: 14px; font-weight: 500;">機能</a>
                    <a href="#" style="color: #374151; text-decoration: none; padding: 8px 12px; font-size: 14px; font-weight: 500;">料金</a>
                    <a href="#" style="color: #374151; text-decoration: none; padding: 8px 12px; font-size: 14px; font-weight: 500;">お問い合わせ</a>
                </nav>
                <div style="display: none; align-items: center; gap: 16px;">
                    <a href="#" class="mainColor" style="padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none;">無料で始める</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    ${componentsHTML}

    <!-- Footer -->
    <footer style="background-color: #111827; color: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 48px 16px;">
            <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">
                <div style="grid-column: span 1;">
                    <div style="display: flex; align-items: center; margin-bottom: 16px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                            <span style="color: #ffffff; font-weight: bold; font-size: 14px;">LP</span>
                        </div>
                        <h3 style="font-size: 20px; font-weight: 700;">Your Company</h3>
                    </div>
                    <p style="color: #d1d5db; margin-bottom: 24px; max-width: 400px;">モダンなビジネスのための素晴らしいデジタル体験を構築しています。</p>
                </div>
            </div>
            <div style="border-top: 1px solid #1f2937; margin-top: 32px; padding-top: 32px; text-align: center; color: #9ca3af;">
                <p>© 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../assets/common.js"></script>
</body>
</html>`;

    const { directory } = globalSettings;
    
    if (directory) {
      // ディレクトリが指定されている場合、画像ファイルも含めてZIPファイルを作成
      createZipWithDirectoryAndImages(htmlContent, directory, exportImages);
    } else {
      // ディレクトリが指定されていない場合、単純にindex.htmlをダウンロード
      downloadFile(htmlContent, 'index.html', 'text/html');
      
      // 画像がある場合は警告を表示
      if (Object.keys(exportImages).length > 0) {
        setTimeout(() => {
          alert(`注意: ${Object.keys(exportImages).length}個の画像ファイルが使用されていますが、ディレクトリが設定されていないため画像ファイルは出力されませんでした。\n\nページ設定でディレクトリを設定すると、画像ファイルも一緒に出力されます。`);
        }, 500);
      }
    }

    // エクスポート後に状態を復元（プレビューエリアをリセットしない）
    // 状態は変更されないため、特に復元処理は不要
    // ただし、念のため現在の状態を確認して必要に応じて復元
    setTimeout(() => {
      // 状態が変更されている場合のみ復元
      if (previewMode !== currentPreviewMode) {
        setPreviewMode(currentPreviewMode);
      }
      if (viewMode !== currentViewMode) {
        setViewMode(currentViewMode);
      }
      if (showComponentLibrary !== currentShowComponentLibrary) {
        toggleComponentLibrary();
      }
      if (showPropertiesPanel !== currentShowPropertiesPanel) {
        togglePropertiesPanel();
      }
    }, 100);
  };

  // ZIPファイルを作成してディレクトリ構造と画像を含める関数
  const createZipWithDirectoryAndImages = (htmlContent: string, directoryName: string, images: { [filename: string]: string }) => {
    // HTMLファイルは常にindex.html
    downloadFile(htmlContent, 'index.html', 'text/html');
    
    // 画像ファイルがある場合は個別にダウンロード
    if (Object.keys(images).length > 0) {
      // 少し遅延してから画像ファイルをダウンロード
      setTimeout(() => {
        Object.entries(images).forEach(([filename, base64Data], index) => {
          setTimeout(() => {
            // Base64データをBlobに変換
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            
            // ファイルをダウンロード
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, index * 200); // 200ms間隔でダウンロード
        });
      }, 500);
    }
    
    // ディレクトリ構造の説明を表示
    const instructions = `
HTMLファイルと${Object.keys(images).length}個の画像ファイルが出力されました。

【ディレクトリ構造の設定方法】
以下のフォルダ構造を作成してください：

├── assets/
│   ├── common.css (スタイルファイル)
│   └── common.js (JavaScriptファイル)
└── ${directoryName}/
    ├── index.html (ダウンロードしたHTMLファイル)
    └── img/ (画像ファイル用フォルダ)
        ${Object.keys(images).map(filename => `├── ${filename}`).join('\n        ')}

【設定手順】
1. プロジェクトのルートディレクトリに「assets」フォルダを作成
2. 「${directoryName}」フォルダを作成
3. ダウンロードした「index.html」ファイルを「${directoryName}」フォルダ内に配置
4. 「${directoryName}/img」フォルダを作成
5. ダウンロードした画像ファイルを「${directoryName}/img」フォルダ内に配置

この構造により、HTMLファイルから「../assets/」の相対パスでCSSとJavaScriptファイルに、「./img/」の相対パスで画像ファイルにアクセスできます。

【共通スタイル機能】
HTMLファイルには、ページ設定で設定した共通スタイル（mainColor、baseColor、base2Color、accentColor）が自動的に適用されます。
    `.trim();
    
    // 遅延してアラートを表示（ダウンロードが完了してから）
    setTimeout(() => {
      alert(instructions);
    }, 1000 + Object.keys(images).length * 200);
  };

  // ファイルをダウンロードする関数
  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getViewModeIcon = (mode: string) => {
    switch (mode) {
      case 'tablet':
        return <Tablet size={16} />;
      case 'mobile':
        return <Smartphone size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const toolbarStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const logoSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const logoIconStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
  };

  const projectNameStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    fontStyle: 'italic',
  };

  const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '24px',
    backgroundColor: '#d1d5db',
  };

  const undoRedoSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const iconButtonStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease-in-out',
  };

  const getIconButtonStyle = (enabled: boolean): React.CSSProperties => ({
    ...iconButtonStyle,
    color: enabled ? '#374151' : '#d1d5db',
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  const getPanelButtonStyle = (isActive: boolean): React.CSSProperties => ({
    ...iconButtonStyle,
    backgroundColor: isActive ? '#dbeafe' : 'transparent',
    color: isActive ? '#2563eb' : '#6b7280',
  });

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const viewModeSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    padding: '4px',
  };

  const viewModeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    gap: '8px',
  };

  const getViewModeButtonStyle = (isActive: boolean): React.CSSProperties => ({
    ...viewModeButtonStyle,
    backgroundColor: isActive ? '#ffffff' : 'transparent',
    color: isActive ? '#111827' : '#4b5563',
    boxShadow: isActive ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
  });

  const actionButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    gap: '8px',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: '#2563eb',
    color: '#ffffff',
  };

  const successButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    backgroundColor: '#059669',
    color: '#ffffff',
  };

  const getPreviewButtonStyle = (): React.CSSProperties => ({
    ...actionButtonStyle,
    backgroundColor: previewMode ? '#2563eb' : '#f3f4f6',
    color: previewMode ? '#ffffff' : '#374151',
  });

  return (
    <>
      <div style={toolbarStyle}>
        <div style={leftSectionStyle}>
          <div style={logoSectionStyle}>
            <div style={logoIconStyle}>
              <Settings size={16} color="#ffffff" />
            </div>
            <div>
              <h1 style={logoTextStyle}>LP Builder</h1>
              {getCurrentProjectName() && (
                <div style={projectNameStyle}>
                  {getCurrentProjectName()}
                </div>
              )}
            </div>
          </div>
          
          <div style={dividerStyle}></div>
          
          {/* パネル表示切り替えボタン */}
          <div style={undoRedoSectionStyle}>
            <button
              onClick={toggleComponentLibrary}
              style={getPanelButtonStyle(showComponentLibrary)}
              title={showComponentLibrary ? 'コンポーネントライブラリを非表示' : 'コンポーネントライブラリを表示'}
              onMouseEnter={(e) => {
                if (!showComponentLibrary) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!showComponentLibrary) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {showComponentLibrary ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
            </button>
            <button
              onClick={togglePropertiesPanel}
              style={getPanelButtonStyle(showPropertiesPanel)}
              title={showPropertiesPanel ? 'プロパティパネルを非表示' : 'プロパティパネルを表示'}
              onMouseEnter={(e) => {
                if (!showPropertiesPanel) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!showPropertiesPanel) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {showPropertiesPanel ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
            </button>
          </div>
          
          <div style={dividerStyle}></div>
          
          <div style={undoRedoSectionStyle}>
            <button
              onClick={undo}
              disabled={!canUndo()}
              style={getIconButtonStyle(canUndo())}
              title="元に戻す"
              onMouseEnter={(e) => {
                if (canUndo()) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Undo size={16} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              style={getIconButtonStyle(canRedo())}
              title="やり直し"
              onMouseEnter={(e) => {
                if (canRedo()) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Redo size={16} />
            </button>
          </div>
        </div>

        <div style={rightSectionStyle}>
          <div style={viewModeSectionStyle}>
            {['desktop', 'tablet', 'mobile'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                style={getViewModeButtonStyle(viewMode === mode)}
                title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
              >
                {getViewModeIcon(mode)}
                <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </span>
              </button>
            ))}
          </div>

          <div style={dividerStyle}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowProjectManager(true)}
              style={secondaryButtonStyle}
              title="プロジェクト管理"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              <FolderOpen size={16} />
              プロジェクト
            </button>

            <button
              onClick={() => setShowGlobalSettings(true)}
              style={secondaryButtonStyle}
              title="ページ設定・共通スタイル"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              <Globe size={16} />
              ページ設定
            </button>

            <button
              onClick={() => setPreviewMode(!previewMode)}
              style={getPreviewButtonStyle()}
              onMouseEnter={(e) => {
                if (previewMode) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                } else {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (previewMode) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                } else {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
              {previewMode ? 'プレビュー終了' : 'プレビュー'}
            </button>

            <button
              onClick={resetPage}
              style={secondaryButtonStyle}
              title="ページをリセット"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              <RefreshCw size={16} />
              リセット
            </button>

            <button
              onClick={exportHTML}
              style={successButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#047857';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
            >
              <Download size={16} />
              HTML出力
            </button>
          </div>
        </div>
      </div>

      <GlobalSettingsPanel 
        isOpen={showGlobalSettings}
        onClose={() => setShowGlobalSettings(false)}
      />

      <ProjectManager 
        isOpen={showProjectManager}
        onClose={() => setShowProjectManager(false)}
      />
    </>
  );
};

export default Toolbar;