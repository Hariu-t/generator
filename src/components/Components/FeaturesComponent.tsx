import React from 'react';
import * as Icons from 'lucide-react';
import { ComponentData } from '../../types';

interface FeaturesComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const FeaturesComponent: React.FC<FeaturesComponentProps> = ({ component }) => {
  const { title, description, features } = component.props;
  const { theme, colorScheme, backgroundColor, textColor, headlineColor, descriptionColor, cardBackgroundColor, cardTextColor, accentColor } = component.style || {};

  const getThemeClasses = () => {
    if (backgroundColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'bg-gray-900';
    }
    return 'bg-gray-50';
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

  const getIconColor = () => {
    if (accentColor) {
      return accentColor;
    }
    switch (colorScheme) {
      case 'green':
        return '#10b981';
      case 'purple':
        return '#8b5cf6';
      case 'orange':
        return '#f97316';
      default:
        return '#3b82f6';
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Star;
    return <IconComponent className="w-8 h-8" style={{ color: getIconColor() }} />;
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const descriptionTextStyle = descriptionColor ? { color: descriptionColor } : mainTextStyle;
  const cardStyle = {
    backgroundColor: cardBackgroundColor || undefined,
    color: cardTextColor || textColor || undefined,
  };

  // Handle both 3-column and 2-column layouts
  const isAlternatingLayout = features.some((f: any) => f.image);

  if (isAlternatingLayout) {
    return (
      <div 
        className={`py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()}`}
        style={containerStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={headlineStyle}>{title}</h2>
              {description && (
                <p className="text-xl max-w-3xl mx-auto" style={descriptionTextStyle}>
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="space-y-20">
            {features.map((feature: any, index: number) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse lg:space-x-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-bold" style={headlineStyle}>{feature.title}</h3>
                  <p 
                    className="text-lg leading-relaxed"
                    style={descriptionTextStyle}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()}`}
      style={containerStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={headlineStyle}>{title}</h2>
          {description && (
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={descriptionTextStyle}
            >
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature: any, index: number) => (
            <div key={index} className="text-center group">
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-200"
                style={{ backgroundColor: cardBackgroundColor || '#ffffff' }}
              >
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={cardTextColor ? { color: cardTextColor } : headlineStyle}>{feature.title}</h3>
              <p 
                className="leading-relaxed"
                style={cardTextColor ? { color: cardTextColor } : descriptionTextStyle}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesComponent;