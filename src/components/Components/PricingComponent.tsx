import React from 'react';
import { ArrowRight, Check, Info } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import { getGlobalStyleValue } from '../../utils/globalStylesHelper';

interface PricingComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const PricingComponent: React.FC<PricingComponentProps> = ({ component }) => {
  const { pageData } = usePageStore();
  const { 
    title, 
    subtitle, 
    mainPlan, 
    additionalPlans
  } = component.props;
  
  const { 
    theme, 
    backgroundColor, 
    textColor, 
    headlineColor, 
    descriptionColor, 
    accentColor,
    cardBackgroundColor,
    cardTextColor,
    mainPlanBackgroundColor,
    mainPlanBoxColor,
    priceColor
  } = component.style || {};

  // 共通スタイルの取得
  const mainColor = getGlobalStyleValue(pageData.globalStyles, 'mainColor');
  const baseColor = getGlobalStyleValue(pageData.globalStyles, 'baseColor');
  const base2Color = getGlobalStyleValue(pageData.globalStyles, 'base2Color');
  const globalAccentColor = getGlobalStyleValue(pageData.globalStyles, 'accentColor');

  const getThemeClasses = () => {
    if (backgroundColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'bg-gray-900';
    }
    return 'bg-gray-100';
  };

  const getTextClasses = () => {
    if (textColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'text-white';
    }
    return 'text-gray-900';
  };

  const containerStyle = {
    backgroundColor: backgroundColor || baseColor,
    color: textColor || undefined,
  };

  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const descriptionTextStyle = descriptionColor ? { color: descriptionColor } : mainTextStyle;

  // 価格ボックスのスタイル（共通スタイル適用）
  const priceBoxStyle = {
    backgroundColor: mainPlanBackgroundColor || mainColor,
  };

  const priceBoxHeaderStyle = {
    backgroundColor: mainPlanBackgroundColor || mainColor,
    filter: 'brightness(1.1)',
  };

  // メインプランのスタイル（個別設定適用）
  const mainPlanStyle = {
    backgroundColor: mainPlanBoxColor || globalAccentColor,
  };

  // 固定の価格比較ボックスデータ
  const fixedPriceBoxes = [
    {
      period: 'ご加入月',
      items: [
        {
          label: '視聴料',
          price: '0',
          unit: '円（税込）'
        },
        {
          label: '基本料',
          price: '0',
          unit: '円（税込）'
        }
      ]
    },
    {
      period: '翌月以降',
      items: [
        {
          label: '視聴料',
          description: '選んだチャンネル、プラン・セット料金'
        },
        {
          label: '基本料',
          price: '429',
          unit: '円（税込）'
        }
      ]
    }
  ];

  // 固定のアクションボタン
  const fixedButtons = [
    {
      text: 'ご加入はこちら',
      url: '#',
      type: 'primary'
    },
    {
      text: 'ご契約追加はこちら',
      url: '#',
      type: 'secondary'
    }
  ];

  return (
    <div 
      className={`py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()} baseColor`}
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タイトル */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={headlineStyle}>
            {title}
          </h2>
          
          {/* サブタイトル（赤いバナー） */}
          <div 
            className="text-white py-6 px-8 text-xl sm:text-2xl font-bold mb-12 rounded-lg"
            style={priceBoxStyle}
          >
            {subtitle}
          </div>
        </div>

        {/* 価格比較テーブル（固定） */}
        <div className="relative mb-16">
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-12 mb-8">
            {fixedPriceBoxes.map((box, index) => (
              <div 
                key={index}
                className="flex-1 max-w-sm mx-auto lg:mx-0"
                style={priceBoxStyle}
              >
                {/* ヘッダー */}
                <div 
                  className="text-white py-4 px-6 text-center font-medium text-lg"
                  style={priceBoxHeaderStyle}
                >
                  {box.period}
                </div>
                
                {/* 料金項目 */}
                <div className="text-white">
                  {box.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className={`flex justify-between items-center py-6 px-6 ${
                        itemIndex === 0 ? 'border-b border-white border-opacity-30' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <span 
                          className="px-3 py-1 text-sm font-bold rounded"
                          style={{ 
                            backgroundColor: '#ffffff',
                            color: mainPlanBackgroundColor || mainColor 
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="text-right">
                        {item.price ? (
                          <div className="flex items-baseline">
                            <span className="text-4xl sm:text-5xl font-bold font-mono">
                              {item.price}
                            </span>
                            <span className="text-lg ml-1">{item.unit}</span>
                          </div>
                        ) : (
                          <div className="text-lg font-bold leading-tight">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 矢印（デスクトップのみ） */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <ArrowRight size={24} color="#666" />
            </div>
          </div>
        </div>

        {/* メインプラン */}
        {mainPlan && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <p className="text-lg sm:text-xl" style={descriptionTextStyle}>
                {mainPlan.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
              <div 
                className="text-white px-8 py-4 rounded-lg text-xl sm:text-2xl font-bold min-w-80 text-center"
                style={mainPlanStyle}
              >
                {mainPlan.name}
              </div>
              
              <div className="text-center">
                <div className="text-lg" style={mainTextStyle}>
                  {mainPlan.priceLabel}
                </div>
                <div className="flex items-baseline justify-center">
                  <span 
                    className="text-4xl sm:text-5xl font-bold font-mono"
                    style={{ color: priceColor || globalAccentColor }}
                  >
                    {mainPlan.price}
                  </span>
                  <span className="text-lg ml-1" style={mainTextStyle}>
                    {mainPlan.unit}
                  </span>
                </div>
              </div>
            </div>
            
            {mainPlan.note && (
              <p className="text-center text-sm" style={descriptionTextStyle}>
                {mainPlan.note}
              </p>
            )}

            {/* 注意事項の展開ボタン */}
            {mainPlan.hasDetails && (
              <div className="text-center mt-4">
                <button className="inline-flex items-center hover:opacity-80 text-sm" style={{ color: globalAccentColor }}>
                  <Info size={16} className="mr-1" />
                  {mainPlan.detailsLabel}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 追加プラン */}
        {additionalPlans && additionalPlans.length > 0 && (
          <div className="space-y-8 mb-12">
            {additionalPlans.map((plan, index) => (
              <div key={index} className="text-center">
                <p className="text-lg mb-4" style={descriptionTextStyle}>
                  {plan.description}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <div 
                    className="text-white px-8 py-4 rounded-lg text-xl font-bold min-w-80 text-center"
                    style={{ backgroundColor: plan.backgroundColor || accentColor || globalAccentColor }}
                  >
                    {plan.name}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg" style={mainTextStyle}>
                      {plan.priceLabel}
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span 
                        className="text-4xl sm:text-5xl font-bold font-mono"
                        style={{ color: plan.priceColor || accentColor || globalAccentColor }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-lg ml-1" style={mainTextStyle}>
                        {plan.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* アクションボタン（固定） */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {fixedButtons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 min-w-80 text-center ${
                button.type === 'primary' 
                  ? 'text-white shadow-lg hover:shadow-xl' 
                  : 'bg-white border-2 hover:bg-gray-50'
              }`}
              style={
                button.type === 'primary' 
                  ? { backgroundColor: mainColor }
                  : { color: globalAccentColor, borderColor: globalAccentColor }
              }
            >
              {button.text}
              {button.type === 'secondary' && <ArrowRight size={20} className="ml-2" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;