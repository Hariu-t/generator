import React from 'react';
import { ComponentData } from '../../types';
import KVComponent from '../Components/KVComponent';
import FAQComponent from '../Components/FAQComponent';
import FooterComponent from '../Components/FooterComponent';
import PricingComponent from '../Components/PricingComponent';
import AppIntroComponent from '../Components/AppIntroComponent';
import HeadlineComponent from '../Components/HeadlineComponent';

interface ComponentRendererProps {
  component: ComponentData;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const commonProps = {
    component,
    isEditing: false,
  };

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
    default:
      return (
        <div className="p-8 bg-gray-100 text-center">
          <p className="text-gray-500">Unknown component type: {component.type}</p>
        </div>
      );
  }
};

export default ComponentRenderer;