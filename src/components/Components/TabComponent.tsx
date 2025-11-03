import React, { useState } from 'react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface TabComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const TabComponent: React.FC<TabComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });
  const [activeTab, setActiveTab] = useState(0);

  const { title, description, tabs } = props;
  const { theme, backgroundColor, textColor, headlineColor, descriptionColor, accentColor } = style || {};

  const getThemeClasses = () => {
    if (backgroundColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'bg-gray-900';
    }
    return 'bg-white';
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

  const getTabButtonClasses = (isActive: boolean) => {
    const baseClasses = 'px-6 py-3 font-medium transition-all border-b-2';
    if (isActive) {
      return `${baseClasses} ${accentColor ? '' : (theme === 'dark' ? 'border-blue-500 text-blue-500' : 'border-blue-600 text-blue-600')}`;
    }
    return `${baseClasses} border-transparent ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`;
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const descriptionTextStyle = descriptionColor ? { color: descriptionColor } : mainTextStyle;
  const activeTabStyle = accentColor ? { borderColor: accentColor, color: accentColor } : {};

  return (
    <div
      ref={containerRef}
      className={`baseColor py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()}`}
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 commonColor" style={headlineStyle}>
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl max-w-3xl mx-auto commonColor" style={descriptionTextStyle}>
                {description}
              </p>
            )}
          </div>
        )}

        <div data-tab-group={component.id}>
          <div className="border-b border-gray-200" role="tablist">
            <div className="flex space-x-8">
              {tabs?.map((tab: any, index: number) => (
                <button
                  key={index}
                  role="tab"
                  data-tab-trigger={`${component.id}-tab-${index}`}
                  aria-selected={activeTab === index}
                  aria-controls={`${component.id}-panel-${index}`}
                  className={getTabButtonClasses(activeTab === index)}
                  style={activeTab === index ? activeTabStyle : {}}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {tabs?.map((tab: any, index: number) => (
              <div
                key={index}
                id={`${component.id}-panel-${index}`}
                role="tabpanel"
                data-tab-content={`${component.id}-tab-${index}`}
                data-tab-group={component.id}
                aria-labelledby={`${component.id}-tab-${index}`}
                className={activeTab === index ? 'is-active' : 'hidden'}
              >
                <div className="prose max-w-none">
                  <p className="text-lg" style={mainTextStyle}>
                    {tab.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
