import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface SliderComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title, description, slides, autoplay = true, autoplayDelay = 8000 } = props;
  const { theme, backgroundColor, textColor, headlineColor, descriptionColor } = style || {};

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;

    const timer = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, slides.length, currentIndex]);

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const mainTextStyle = textColor ? { color: textColor } : {};
  const headlineStyle = headlineColor ? { color: headlineColor } : mainTextStyle;
  const descriptionTextStyle = descriptionColor ? { color: descriptionColor } : mainTextStyle;

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

        <div
          data-slider={component.id}
          data-slider-autoplay={autoplayDelay}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-lg" style={{ minHeight: '400px' }}>
            {slides?.map((slide: any, index: number) => (
              <div
                key={index}
                data-slider-item
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'is-active opacity-100' : 'opacity-0'
                }`}
                aria-hidden={index !== currentIndex}
              >
                <img
                  src={slide.image || 'https://images.pexels.com/photos/6044265/pexels-photo-6044265.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                  alt={slide.caption || `スライド ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {slide.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
                    <p className="text-lg font-semibold">{slide.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {slides?.length > 1 && (
            <>
              <button
                data-slider-prev
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all shadow-lg"
                onClick={prevSlide}
                aria-label="前のスライド"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                data-slider-next
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full transition-all shadow-lg"
                onClick={nextSlide}
                aria-label="次のスライド"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_: any, index: number) => (
                  <button
                    key={index}
                    data-slider-dot={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'is-active bg-white w-8'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`スライド ${index + 1} に移動`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
