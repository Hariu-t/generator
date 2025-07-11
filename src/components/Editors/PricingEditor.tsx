import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface PricingEditorProps {
  component: ComponentData;
}

const PricingEditor: React.FC<PricingEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    updateComponent(component.id, {
      style: { ...component.style, [key]: value }
    });
  };

  // メインプランの管理
  const handleMainPlanChange = (field: string, value: any) => {
    updateComponent(component.id, {
      props: { 
        ...component.props, 
        mainPlan: { ...component.props.mainPlan, [field]: value }
      }
    });
  };

  // 追加プランの管理
  const handleAdditionalPlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...(component.props.additionalPlans || [])];
    newPlans[index] = { ...newPlans[index], [field]: value };
    handlePropChange('additionalPlans', newPlans);
  };

  const addAdditionalPlan = () => {
    const newPlans = [...(component.props.additionalPlans || [])];
    newPlans.push({
      description: '○○（番組・特集・アーティスト名など）が見られる、スーパー！ドラマTVなど5チャンネルがえらべる',
      name: 'スーパー！セレクト5',
      priceLabel: '視聴料',
      price: '1,100',
      unit: '円/月（税込）'
    });
    handlePropChange('additionalPlans', newPlans);
  };

  const removeAdditionalPlan = (index: number) => {
    const newPlans = [...(component.props.additionalPlans || [])];
    newPlans.splice(index, 1);
    handlePropChange('additionalPlans', newPlans);
  };

  // 注釈の管理
  const handleAnnotationChange = (index: number, value: string) => {
    const newAnnotations = [...(component.props.mainPlan?.annotations || [])];
    newAnnotations[index] = value;
    handleMainPlanChange('annotations', newAnnotations);
  };

  const addAnnotation = () => {
    const newAnnotations = [...(component.props.mainPlan?.annotations || [])];
    newAnnotations.push('新しい注釈');
    handleMainPlanChange('annotations', newAnnotations);
  };

  const removeAnnotation = (index: number) => {
    const newAnnotations = [...(component.props.mainPlan?.annotations || [])];
    newAnnotations.splice(index, 1);
    handleMainPlanChange('annotations', newAnnotations);
  };

  // 注意事項の管理
  const handleNoticeChange = (index: number, field: string, value: string) => {
    const newNotices = [...(component.props.notices || [])];
    newNotices[index] = { ...newNotices[index], [field]: value };
    handlePropChange('notices', newNotices);
  };

  const addNotice = () => {
    const newNotices = [...(component.props.notices || [])];
    newNotices.push({
      title: '新しい注意事項',
      content: '注意事項の内容がここに入ります。'
    });
    handlePropChange('notices', newNotices);
  };

  const removeNotice = (index: number) => {
    const newNotices = [...(component.props.notices || [])];
    newNotices.splice(index, 1);
    handlePropChange('notices', newNotices);
  };

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

  const colorInputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  };

  const colorInputStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    padding: '2px 4px',
  };

  const colorValueStyle: React.CSSProperties = {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    backgroundColor: '#f9fafb',
    color: '#374151',
  };

  const styleNoteStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '4px',
    fontStyle: 'italic',
  };

  const planCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#fafafa',
  };

  const planHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  };

  const planIndexStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
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

  const addButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  };

  const itemCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '12px',
    backgroundColor: '#f9fafb',
  };

  const itemHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  const itemIndexStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: '#4b5563',
  };

  const itemInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '12px',
    outline: 'none',
  };

  const itemTextareaStyle: React.CSSProperties = {
    ...itemInputStyle,
    resize: 'vertical' as const,
  };

  return (
    <div style={containerStyle}>

      {/* メインプラン */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>メインプラン</h3>
        
        <div style={planCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>説明文</label>
            <textarea
              value={component.props.mainPlan?.description || ''}
              onChange={(e) => handleMainPlanChange('description', e.target.value)}
              rows={1}
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

          <div style={fieldStyle}>
            <label style={labelStyle}>プラン名</label>
            <input
              type="text"
              value={component.props.mainPlan?.name || ''}
              onChange={(e) => handleMainPlanChange('name', e.target.value)}
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
            {/* プラン名の個別スタイル設定 */}
            <div style={colorInputContainerStyle}>
              <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
              <input
                type="color"
                value={component.style?.mainPlanBoxColor || '#3b82f6'}
                onChange={(e) => handleStyleChange('mainPlanBoxColor', e.target.value)}
                style={colorInputStyle}
              />
              <input
                type="text"
                value={component.style?.mainPlanBoxColor || '#3b82f6'}
                onChange={(e) => handleStyleChange('mainPlanBoxColor', e.target.value)}
                style={colorValueStyle}
                placeholder="#3b82f6"
              />
            </div>

            <div style={colorInputContainerStyle}>
              <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
              <input
                  type="color"
                  value={component.style?.mainPlanTextColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('mainPlanTextColor', e.target.value)}
                  style={colorInputStyle}
              />
              <input
                  type="text"
                  value={component.style?.mainPlanTextColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('mainPlanTextColor', e.target.value)}
                  style={colorValueStyle}
                  placeholder="#ffffff"
              />
            </div>

          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>価格</label>
            <input
              type="text"
              value={component.props.mainPlan?.price || ''}
              onChange={(e) => handleMainPlanChange('price', e.target.value)}
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
            {/* 価格の個別スタイル設定 */}
            <div style={colorInputContainerStyle}>
              <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
              <input
                type="color"
                value={component.style?.priceColor || '#3b82f6'}
                onChange={(e) => handleStyleChange('priceColor', e.target.value)}
                style={colorInputStyle}
              />
              <input
                type="text"
                value={component.style?.priceColor || '#3b82f6'}
                onChange={(e) => handleStyleChange('priceColor', e.target.value)}
                style={colorValueStyle}
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>注記</label>
            <input
              type="text"
              value={component.props.mainPlan?.note || ''}
              onChange={(e) => handleMainPlanChange('note', e.target.value)}
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
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!!component.props.showMustReadBox}
                onChange={(e) => handlePropChange('showMustReadBox', e.target.checked)}
                style={{ marginRight: '8px', height: '16px', width: '16px' }}
              />
              <span style={{ ...labelStyle, marginBottom: 0 }}>注意事項ボックスを表示する</span>
            </label>
          </div>

        </div>
      </div>

      {/* 追加プラン */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>追加プラン</h3>

        {(component.props.additionalPlans || []).map((plan: any, index: number) => (
          <div key={index} style={planCardStyle}>
            <div style={planHeaderStyle}>
              <span style={planIndexStyle}>追加プラン {index + 1}</span>
              <button
                onClick={() => removeAdditionalPlan(index)}
                style={deleteButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>説明文</label>
              <textarea
                value={plan.description || ''}
                onChange={(e) => handleAdditionalPlanChange(index, 'description', e.target.value)}
                rows={1}
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

            <div style={fieldStyle}>
              <label style={labelStyle}>プラン名（例：スーパー！セレクト5）</label>
              <input
                type="text"
                value={plan.name || ''}
                onChange={(e) => handleAdditionalPlanChange(index, 'name', e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FABE00';
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {/* 「スーパー！セレクト5」の個別スタイル設定 */}
              <div style={colorInputContainerStyle}>
                <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
                <input
                  type="color"
                  value={plan.backgroundColor || component.style?.accentColor || '#FABE00'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                  style={colorInputStyle}
                />
                <input
                  type="text"
                  value={plan.backgroundColor || component.style?.accentColor || '#FABE00'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                  style={colorValueStyle}
                  placeholder="#3b82f6"
                />
              </div>

              <div style={colorInputContainerStyle}>
                <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                <input
                    type="color"
                    value={plan.textColor || '#000000'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'textColor', e.target.value)}
                    style={colorInputStyle}
                />
                <input
                    type="text"
                    value={plan.textColor || '#000000'}
                    onChange={(e) => handleAdditionalPlanChange(index, 'textColor', e.target.value)}
                    style={colorValueStyle}
                    placeholder="#ffffff"
                />
              </div>

              <div style={styleNoteStyle}>
                このプランボックスの背景色と文字色を個別に設定できます。
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>価格</label>
              <input
                type="text"
                value={plan.price || ''}
                onChange={(e) => handleAdditionalPlanChange(index, 'price', e.target.value)}
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
              {/* 価格の個別スタイル設定 */}
              <div style={colorInputContainerStyle}>
                <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>文字色:</label>
                <input
                  type="color"
                  value={plan.priceColor || component.style?.accentColor || '#FABE00'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'priceColor', e.target.value)}
                  style={colorInputStyle}
                />
                <input
                  type="text"
                  value={plan.priceColor || component.style?.accentColor || '#FABE00'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'priceColor', e.target.value)}
                  style={colorValueStyle}
                  placeholder="#3b82f6"
                />
              </div>
              <div style={styleNoteStyle}>
                このプランの価格文字色を個別に設定できます。
              </div>
            </div>
          </div>
        ))}

        {/* プラン追加ボタンを追加プランエリアの下に配置 */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={addAdditionalPlan}
            style={addButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            <Plus size={16} style={{ marginRight: '8px' }} />
            プラン追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingEditor;