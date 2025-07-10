import React from 'react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import { getGlobalStyleValue } from '../../utils/globalStylesHelper';

interface HeadlineComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const HeadlineComponent: React.FC<HeadlineComponentProps> = ({ component }) => {
  const { pageData } = usePageStore();
  const { text, usePageTitle } = component.props;
  const { 
    backgroundColor, 
    textColor, 
    headlineColor
  } = component.style || {};

  // 共通スタイルの取得
  const mainColor = getGlobalStyleValue(pageData.globalStyles, 'mainColor');

  // ページタイトル連動機能
  const getDisplayText = () => {
    if (usePageTitle && pageData.globalSettings.title) {
      // ページタイトルから「｜スカパー！: スポーツ＆音楽ライブ、アイドル、アニメ、ドラマ、映画など」を除去
      const titleWithoutSuffix = pageData.globalSettings.title.replace(/｜スカパー！:.*$/, '').trim();
      return titleWithoutSuffix || text;
    }
    return text;
  };
  const containerStyle = {
    backgroundColor: backgroundColor || mainColor,
    color: textColor || '#ffffff',
    padding: '20px 0',
  };

  const innerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const headlineStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '1.4',
    margin: 0,
    color: headlineColor || textColor || '#ffffff',
  };

  return (
    <div style={containerStyle} className="mainColor" data-component-background data-component-text>
      <div style={innerStyle}>
        <h1 style={headlineStyle} data-component-headline>
          {getDisplayText() || 'タイトルを挿入'}
        </h1>
      </div>
    </div>
  );
};

export default HeadlineComponent;