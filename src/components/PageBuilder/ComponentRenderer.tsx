import React, { useEffect, useRef } from 'react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import KVComponent from '../Components/KVComponent';
import FAQComponent from '../Components/FAQComponent';
import FooterComponent from '../Components/FooterComponent';
import PricingComponent from '../Components/PricingComponent';
import AppIntroComponent from '../Components/AppIntroComponent';
import HeadlineComponent from '../Components/HeadlineComponent';
import TabComponent from '../Components/TabComponent';
import ModalComponent from '../Components/ModalComponent';
import SliderComponent from '../Components/SliderComponent';
import TelComponent from '../Components/tel';

interface ComponentRendererProps {
  component: ComponentData;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const { showClassNames } = usePageStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const commonProps = {
    component,
    isEditing: false,
  };

  useEffect(() => {
    if (!showClassNames || !containerRef.current) return;

    const container = containerRef.current;
    const overlays: HTMLDivElement[] = [];

    const classPatterns = [
      { pattern: /mainColor/i, label: 'mainColor', color: '#dc2626' },
      { pattern: /baseColor/i, label: 'baseColor', color: '#3b82f6' },
      { pattern: /base2Color/i, label: 'base2Color', color: '#8b5cf6' },
      { pattern: /accentColor/i, label: 'accentColor', color: '#f59e0b' },
      { pattern: /commonColor/i, label: 'commonColor', color: '#10b981' },
    ];

    const elements = container.querySelectorAll('*');

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const classList = Array.from(htmlElement.classList);

      classPatterns.forEach(({ pattern, label, color }) => {
        const matchingClasses = classList.filter(cls => pattern.test(cls));

        if (matchingClasses.length > 0) {
          const rect = htmlElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const overlay = document.createElement('div');
          overlay.style.position = 'absolute';
          overlay.style.top = `${rect.top - containerRect.top}px`;
          overlay.style.left = `${rect.left - containerRect.left}px`;
          overlay.style.width = `${rect.width}px`;
          overlay.style.height = `${rect.height}px`;
          overlay.style.border = `2px dashed ${color}`;
          overlay.style.backgroundColor = `${color}15`;
          overlay.style.pointerEvents = 'none';
          overlay.style.zIndex = '1000';
          overlay.style.borderRadius = '4px';

          const labelDiv = document.createElement('div');
          labelDiv.textContent = matchingClasses.join(', ');
          labelDiv.style.position = 'absolute';
          labelDiv.style.top = '-24px';
          labelDiv.style.left = '0';
          labelDiv.style.backgroundColor = color;
          labelDiv.style.color = '#ffffff';
          labelDiv.style.padding = '2px 8px';
          labelDiv.style.fontSize = '11px';
          labelDiv.style.fontWeight = '600';
          labelDiv.style.borderRadius = '4px';
          labelDiv.style.whiteSpace = 'nowrap';
          labelDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

          overlay.appendChild(labelDiv);
          container.appendChild(overlay);
          overlays.push(overlay);
        }
      });
    });

    return () => {
      overlays.forEach(overlay => overlay.remove());
    };
  }, [showClassNames]);

  const renderComponent = () => {
    switch (component.type) {
      case 'kv':
        return <KVComponent {...commonProps} />;
      case 'headline':
        return <HeadlineComponent {...commonProps} />;
      case 'test':
        return <FAQComponent {...commonProps} />;
      case 'footer':
        return <FooterComponent {...commonProps} />;
      case 'pricing':
        return <PricingComponent {...commonProps} />;
      case 'app-intro':
        return <AppIntroComponent {...commonProps} />;
      case 'tab':
        return <TabComponent {...commonProps} />;
      case 'modal':
        return <ModalComponent {...commonProps} />;
      case 'slider':
        return <SliderComponent {...commonProps} />;
      case 'tel':
        return <TelComponent {...commonProps} />;
      default:
        return (
          <div className="p-8 bg-gray-100 text-center">
            <p className="text-gray-500">Unknown component type: {component.type}</p>
            <p className="text-xs text-gray-400 mt-2">
              Component type &quot;{component.type}&quot; is not registered in ComponentRenderer.
              Please add it to the switch statement.
            </p>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {renderComponent()}
    </div>
  );
};

export default ComponentRenderer;