import React, { useRef, useEffect } from 'react';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface ComponentPreviewProps {
  htmlCode: string;
  props: Record<string, any>;
  cssFiles?: string[];
  globalStyles?: {
    mainColor?: string;
    baseColor?: string;
    baseColorSub?: string;
    base2Color?: string;
    accentColor?: string;
    commonColor?: string;
    commonColorBg?: string;
  };
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  htmlCode,
  props,
  cssFiles = [],
  globalStyles = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useDataPropBinding({ props, containerRef });

  useEffect(() => {
    if (!containerRef.current) return;

    // CSSファイルを動的に読み込む
    const existingLinks = containerRef.current.querySelectorAll('link[data-preview-css]');
    existingLinks.forEach(link => link.remove());

    cssFiles.forEach((cssFile) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/program/st/promo/generator_common/css/${cssFile}`;
      link.setAttribute('data-preview-css', 'true');
      document.head.appendChild(link);
    });

    return () => {
      // クリーンアップ（必要に応じて）
    };
  }, [cssFiles]);

  // グローバルスタイルをCSS変数として注入
  const containerStyle: React.CSSProperties & Record<string, string> = {
    padding: '20px',
    backgroundColor: '#ffffff',
    minHeight: '200px',
    position: 'relative',
    ...(Object.keys(globalStyles).length > 0 && {
      '--main-color': globalStyles.mainColor || '#dc2626',
      '--base-color': globalStyles.baseColor || '#3b82f6',
      '--base-color-sub': globalStyles.baseColorSub || '#93c5fd',
      '--base2-color': globalStyles.base2Color || '#8b5cf6',
      '--accent-color': globalStyles.accentColor || '#f59e0b',
      '--common-color': globalStyles.commonColor || '#10b981',
      '--common-color-bg': globalStyles.commonColorBg || '#d1fae5',
    }),
  };

  return (
    <div style={containerStyle}>
      <div
        ref={previewRef as React.RefObject<HTMLDivElement>}
        dangerouslySetInnerHTML={{ __html: htmlCode }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default ComponentPreview;

