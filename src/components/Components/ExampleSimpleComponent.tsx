import React from 'react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface ExampleSimpleComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const ExampleSimpleComponent: React.FC<ExampleSimpleComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });

  const containerStyle: React.CSSProperties = {
    backgroundColor: style?.backgroundColor || globalStyles.base2Color,
    padding: '80px 20px',
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
    color: style?.headlineColor || globalStyles.commonColor,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '32px',
    textAlign: 'center',
    color: style?.descriptionColor || globalStyles.commonColor,
  };

  const imageContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
  };

  const imageStyle: React.CSSProperties = {
    maxWidth: '600px',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 32px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: style?.buttonBackgroundColor || globalStyles.accentColor,
    color: style?.buttonTextColor || globalStyles.accentColorSub,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <section ref={containerRef} style={containerStyle}>
      <div style={innerStyle}>
        <h2
          style={headlineStyle}
          data-prop="title"
          data-bind-type="text"
        >
          {props.title || 'セクションタイトル'}
        </h2>

        <p
          style={descriptionStyle}
          data-prop="description"
          data-bind-type="text"
        >
          {props.description || 'ここに説明文が入ります。data-prop属性を使うことで、propsの値が自動的に反映されます。'}
        </p>

        <div
          style={imageContainerStyle}
          data-prop="showImage"
          data-bind-type="show"
        >
          <img
            style={imageStyle}
            data-prop="imageUrl"
            data-bind-type="src"
            src={props.imageUrl || 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={props.imageAlt || '画像'}
          />
        </div>

        <div
          style={buttonContainerStyle}
          data-prop="showButtons"
          data-bind-type="show"
        >
          <a
            style={buttonStyle}
            data-prop="buttonUrl"
            data-bind-type="href"
            href={props.buttonUrl || '#'}
          >
            <span data-prop="buttonText">ボタンテキスト</span>
          </a>

          <a
            style={{ ...buttonStyle, backgroundColor: 'transparent', border: `2px solid ${globalStyles.accentColor}`, color: globalStyles.commonColor }}
            data-prop="secondaryButtonUrl"
            data-bind-type="href"
            href={props.secondaryButtonUrl || '#'}
            data-prop-show="showSecondaryButton"
          >
            <span data-prop="secondaryButtonText">セカンダリボタン</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExampleSimpleComponent;
