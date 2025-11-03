import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePageStore } from '../../store/usePageStore';
import SortableComponent from './SortableComponent';
import ComponentRenderer from './ComponentRenderer';
import AccessibilityChecker from './AccessibilityChecker';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { generateGlobalStylesCSS, generateComponentStyleCSS } from '../../utils/globalStylesHelper';

const Canvas: React.FC = () => {
  const { pageData, reorderComponents, viewMode, previewMode, selectedComponentId } = usePageStore();
  const [showAccessibilityChecker, setShowAccessibilityChecker] = useState(false);
  const [hasAccessibilityIssues, setHasAccessibilityIssues] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pageData.components.findIndex((item) => item.id === active.id);
      const newIndex = pageData.components.findIndex((item) => item.id === over.id);
      reorderComponents(oldIndex, newIndex);
    }
  };

  const getCanvasWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return { maxWidth: '384px' };
      case 'tablet':
        return { maxWidth: '768px' };
      default:
        return { maxWidth: 'none' };
    }
  };

  // 選択されたコンポーネントを取得
  const selectedComponent = selectedComponentId 
    ? pageData.components.find(c => c.id === selectedComponentId)
    : null;

  // アクセシビリティ問題をチェック
  useEffect(() => {
    if (!selectedComponent) {
      setHasAccessibilityIssues(false);
      setShowAccessibilityChecker(false);
      return;
    }

    const checkAccessibilityIssues = () => {
      const { style } = selectedComponent;
      
      if (!style?.backgroundColor || !style?.textColor) {
        setHasAccessibilityIssues(false);
        setShowAccessibilityChecker(false);
        return;
      }

      // コントラスト比を計算
      const calculateContrastRatio = (color1: string, color2: string): number => {
        const getLuminance = (color: string): number => {
          const hex = color.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16) / 255;
          const g = parseInt(hex.substr(2, 2), 16) / 255;
          const b = parseInt(hex.substr(4, 2), 16) / 255;

          const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          
          return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
        };

        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);

        return (brightest + 0.05) / (darkest + 0.05);
      };

      const contrastRatio = calculateContrastRatio(style.backgroundColor, style.textColor);
      const bgColor = style.backgroundColor.toLowerCase();
      const textColor = style.textColor.toLowerCase();
      
      // エラーまたは警告条件をチェック
      const hasIssues = 
        contrastRatio < 4.5 || // AA基準未満
        bgColor === textColor || // 同色
        ((bgColor.includes('red') || bgColor.includes('#ff') || bgColor.includes('#f00')) &&
         (textColor.includes('green') || textColor.includes('#0f') || textColor.includes('#00ff00'))) ||
        ((bgColor.includes('green') || bgColor.includes('#0f') || bgColor.includes('#00ff00')) &&
         (textColor.includes('red') || textColor.includes('#ff') || textColor.includes('#f00')));

      setHasAccessibilityIssues(hasIssues);
      
      // 問題がある場合は自動的に表示
      if (hasIssues) {
        setShowAccessibilityChecker(true);
      }
    };

    checkAccessibilityIssues();
  }, [selectedComponent?.style?.backgroundColor, selectedComponent?.style?.textColor, selectedComponent?.id]);

  // 動的スタイルの生成
  const dynamicStyles = `
    ${generateGlobalStylesCSS(pageData.globalStyles)}
    ${pageData.components.map(component => 
      component.style ? `
        [data-component-id="${component.id}"] {
          ${component.style.backgroundColor ? `--component-background-color: ${component.style.backgroundColor};` : ''}
          ${component.style.textColor ? `--component-text-color: ${component.style.textColor};` : ''}
          ${component.style.headlineColor ? `--component-headline-color: ${component.style.headlineColor};` : ''}
          ${component.style.descriptionColor ? `--component-description-color: ${component.style.descriptionColor};` : ''}
          ${component.style.buttonBackgroundColor ? `--component-button-bg-color: ${component.style.buttonBackgroundColor};` : ''}
          ${component.style.buttonTextColor ? `--component-button-text-color: ${component.style.buttonTextColor};` : ''}
          ${component.style.cardBackgroundColor ? `--component-card-bg-color: ${component.style.cardBackgroundColor};` : ''}
          ${component.style.cardTextColor ? `--component-card-text-color: ${component.style.cardTextColor};` : ''}
          ${component.style.accentColor ? `--component-accent-color: ${component.style.accentColor};` : ''}
        }
      ` : ''
    ).join('')}
  `;

  const canvasStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#f9fafb',
    overflowY: 'auto',
    height: '100%',
  };

  const canvasContentStyle: React.CSSProperties = {
    margin: '0 auto',
    backgroundColor: '#ffffff',
    position: 'relative',
    minHeight: '100%',
    ...getCanvasWidth(),
  };

  const emptyCanvasStyle: React.CSSProperties = {
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const emptyContentStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const emptyIconStyle: React.CSSProperties = {
    width: '96px',
    height: '96px',
    backgroundColor: '#e5e7eb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  };

  const emptyTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '8px',
  };

  const emptyDescStyle: React.CSSProperties = {
    color: '#6b7280',
    marginBottom: '16px',
  };

  const hintsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#9ca3af',
  };

  const hintItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const hintDotStyle: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '8px',
  };

  if (pageData.components.filter(c => c.type !== 'headline').length === 0) {
    return (
      <div style={canvasStyle}>
        <div style={canvasContentStyle}>
          <Header />
          {/* 必須ヘッドラインコンポーネント */}
          {pageData.components.find(c => c.type === 'headline') && (
            <ComponentRenderer 
              component={pageData.components.find(c => c.type === 'headline')!} 
            />
          )}
          <div style={emptyCanvasStyle}>
            <div style={emptyContentStyle}>
              <div style={emptyIconStyle}>
                <svg style={{ width: '48px', height: '48px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 style={emptyTitleStyle}>ページの構築を開始</h3>
              <p style={emptyDescStyle}>サイドバーからコンポーネントを選択してページに追加してください。</p>
              <div style={hintsStyle}>
                <div style={hintItemStyle}>
                  <div style={{ ...hintDotStyle, backgroundColor: '#3b82f6' }}></div>
                  クリックで追加
                </div>
                <div style={hintItemStyle}>
                  <div style={{ ...hintDotStyle, backgroundColor: '#10b981' }}></div>
                  ドラッグで並び替え
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <div style={canvasStyle}>
        <style>{dynamicStyles}</style>
        <div style={canvasContentStyle}>
          <Header />
          {/* 必須ヘッドラインコンポーネント */}
          {pageData.components.find(c => c.type === 'headline') && (
            <ComponentRenderer
              component={pageData.components.find(c => c.type === 'headline')!}
            />
          )}
          {pageData.components.filter(c => c.type !== 'headline').map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div style={canvasStyle}>
      {/* 動的スタイルの適用 */}
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      
      <div style={canvasContentStyle}>
        <Header />
        {/* 必須ヘッドラインコンポーネント */}
        {pageData.components.find(c => c.type === 'headline') && (
          <ComponentRenderer 
            component={pageData.components.find(c => c.type === 'headline')!} 
          />
        )}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={pageData.components.map(c => c.id)} strategy={verticalListSortingStrategy}>
            {pageData.components.filter(c => c.type !== 'headline').map((component) => (
              <div key={component.id} style={{ position: 'relative' }}>
                <SortableComponent 
                  component={component}
                  showAccessibilityToggle={selectedComponent?.id === component.id}
                  hasAccessibilityIssues={selectedComponent?.id === component.id && hasAccessibilityIssues}
                  onAccessibilityToggle={() => setShowAccessibilityChecker(!showAccessibilityChecker)}
                />
                
                {/* アクセシビリティチェッカー */}
                {selectedComponent && selectedComponent.id === component.id && (
                  <AccessibilityChecker 
                    component={selectedComponent} 
                    isVisible={showAccessibilityChecker}
                    onClose={() => setShowAccessibilityChecker(false)}
                  />
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
        <Footer />
      </div>
    </div>
  );
};

export default Canvas;