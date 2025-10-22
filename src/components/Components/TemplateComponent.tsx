import React from 'react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface TemplateComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const TemplateComponent: React.FC<TemplateComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);

  const containerRef = useDataPropBinding({ props });

  const containerStyle: React.CSSProperties = {
    backgroundColor: style?.backgroundColor || globalStyles.baseColor,
    color: style?.textColor || globalStyles.commonColor,
    padding: '60px 20px',
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: style?.headlineColor || globalStyles.commonColor,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: style?.descriptionColor || globalStyles.commonColor,
  };

  return (
    <section ref={containerRef} style={containerStyle}>
      <div style={innerStyle}>
        <h2
          style={headlineStyle}
          data-prop="title"
          data-bind-type="text"
        >
          {props.title || 'タイトルを入力してください'}
        </h2>

        <p
          style={descriptionStyle}
          data-prop="description"
          data-bind-type="text"
        >
          {props.description || '説明文を入力してください'}
        </p>

      </div>
    </section>
  );
};

export default TemplateComponent;
