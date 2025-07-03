import React from 'react';
import { Star } from 'lucide-react';
import { ComponentData } from '../../types';

interface TestimonialsComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const TestimonialsComponent: React.FC<TestimonialsComponentProps> = ({ component }) => {
  const { title, testimonials } = component.props;
  const { theme, backgroundColor, textColor, headlineColor, descriptionColor, cardBackgroundColor, cardTextColor } = component.style || {};

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

  const getCardClasses = () => {
    if (cardBackgroundColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'bg-gray-800';
    }
    return 'bg-gray-50';
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const cardStyle = {
    backgroundColor: cardBackgroundColor || undefined,
    color: cardTextColor || textColor || undefined,
  };

  return (
    <div 
      className={`py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()}`}
      style={containerStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold" style={headlineStyle}>{title}</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 ${getCardClasses()}`}
              style={cardStyle}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg leading-relaxed mb-6" style={cardTextColor ? { color: cardTextColor } : mainTextStyle}>
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold" style={cardTextColor ? { color: cardTextColor } : mainTextStyle}>{testimonial.name}</div>
                  <div 
                    className="text-sm"
                    style={{ color: cardTextColor ? `${cardTextColor}CC` : (textColor ? `${textColor}80` : undefined) }}
                  >
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;