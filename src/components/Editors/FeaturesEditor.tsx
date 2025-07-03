import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface FeaturesEditorProps {
  component: ComponentData;
}

const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...(component.props.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    handlePropChange('features', newFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...(component.props.features || [])];
    const isAlternatingLayout = newFeatures.some((f: any) => f.image);
    
    const newFeature = isAlternatingLayout ? {
      title: '新しい特徴',
      description: '特徴の説明',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600'
    } : {
      icon: 'Star',
      title: '新しい特徴',
      description: '特徴の説明'
    };
    
    newFeatures.push(newFeature);
    handlePropChange('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(component.props.features || [])];
    newFeatures.splice(index, 1);
    handlePropChange('features', newFeatures);
  };

  const features = component.props.features || [];
  const isAlternatingLayout = features.some((f: any) => f.image);

  const containerStyle: React.CSSProperties = {
    padding: '16px',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    marginBottom: '12px',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '4px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical' as const,
  };

  const featureHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  };

  const addButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 12px',
    fontSize: '12px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const featureCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
  };

  const featureHeaderItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '12px',
  };

  const featureIndexStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: '#4b5563',
  };

  const deleteButtonStyle: React.CSSProperties = {
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.15s ease-in-out',
  };

  const featureFieldStyle: React.CSSProperties = {
    marginBottom: '12px',
  };

  const featureInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '12px',
    outline: 'none',
  };

  const featureTextareaStyle: React.CSSProperties = {
    ...featureInputStyle,
    resize: 'vertical' as const,
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>コンテンツ</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>セクションタイトル</label>
          <input
            type="text"
            value={component.props.title || ''}
            onChange={(e) => handlePropChange('title', e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>説明文</label>
          <textarea
            value={component.props.description || ''}
            onChange={(e) => handlePropChange('description', e.target.value)}
            rows={2}
            style={textareaStyle}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={featureHeaderStyle}>
          <h3 style={sectionTitleStyle}>特徴</h3>
          <button
            onClick={addFeature}
            style={addButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            <Plus size={12} style={{ marginRight: '4px' }} />
            追加
          </button>
        </div>

        <div>
          {features.map((feature: any, index: number) => (
            <div key={index} style={featureCardStyle}>
              <div style={featureHeaderItemStyle}>
                <span style={featureIndexStyle}>特徴 {index + 1}</span>
                <button
                  onClick={() => removeFeature(index)}
                  style={deleteButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fef2f2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>

              <div>
                {!isAlternatingLayout && (
                  <div style={featureFieldStyle}>
                    <label style={labelStyle}>アイコン (Lucide React名)</label>
                    <input
                      type="text"
                      value={feature.icon || ''}
                      onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      placeholder="例: Star, Zap, Shield"
                      style={featureInputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                      }}
                    />
                  </div>
                )}

                {isAlternatingLayout && (
                  <div style={featureFieldStyle}>
                    <label style={labelStyle}>画像URL</label>
                    <input
                      type="url"
                      value={feature.image || ''}
                      onChange={(e) => handleFeatureChange(index, 'image', e.target.value)}
                      style={featureInputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                      }}
                    />
                  </div>
                )}

                <div style={featureFieldStyle}>
                  <label style={labelStyle}>タイトル</label>
                  <input
                    type="text"
                    value={feature.title || ''}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    style={featureInputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  />
                </div>

                <div style={featureFieldStyle}>
                  <label style={labelStyle}>説明文</label>
                  <textarea
                    value={feature.description || ''}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    rows={2}
                    style={featureTextareaStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesEditor;