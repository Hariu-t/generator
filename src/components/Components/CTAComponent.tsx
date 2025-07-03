import React from 'react';
import { Check } from 'lucide-react';
import { ComponentData } from '../../types';

interface CTAComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const CTAComponent: React.FC<CTAComponentProps> = ({ component }) => {
  const { headline, description, ctaText, ctaUrl, features } = component.props;
  const { theme, colorScheme, backgroundColor, textColor, headlineColor, descriptionColor, buttonBackgroundColor, buttonTextColor } = component.style || {};

  const getBackgroundColor = () => {
    if (backgroundColor) {
      return { backgroundColor };
    }
    
    switch (colorScheme) {
      case 'green':
        return theme === 'dark' ? 'bg-green-900' : 'bg-green-600';
      case 'purple':
        return theme === 'dark' ? 'bg-purple-900' : 'bg-purple-600';
      case 'orange':
        return theme === 'dark' ? 'bg-orange-900' : 'bg-orange-600';
      default:
        return theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600';
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5';
    return `${baseClasses} bg-white text-gray-900 hover:bg-gray-50`;
  };

  const containerStyle = backgroundColor ? { backgroundColor } : {};
  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const descriptionStyle = descriptionColor ? { color: descriptionColor } : mainTextStyle;

  return (
    <div 
      className={`py-16 sm:py-24 text-white ${!backgroundColor ? getBackgroundColor() : ''}`}
      style={containerStyle}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          className="text-3xl sm:text-4xl font-bold mb-6"
          style={headlineStyle}
        >
          {headline}
        </h2>
        <p 
          className="text-xl leading-relaxed mb-8 opacity-90"
          style={descriptionStyle}
        >
          {description}
        </p>

        {features && features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            {features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center text-left">
                <Check className="w-5 h-5 mr-3 flex-shrink-0" style={mainTextStyle} />
                <span className="text-lg" style={mainTextStyle}>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a
            href={ctaUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 500,
              textDecoration: 'none',
              backgroundColor: buttonBackgroundColor || '#ffffff',
              color: buttonTextColor || '#111827',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#f3f4f6';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = buttonBackgroundColor || '#ffffff';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTAComponent;