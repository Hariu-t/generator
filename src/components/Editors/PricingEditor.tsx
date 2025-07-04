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
      {/* 基本設定 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>基本設定</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>タイトル</label>
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
          <label style={labelStyle}>サブタイトル（赤いバナー）</label>
          <input
            type="text"
            value={component.props.subtitle || ''}
            onChange={(e) => handlePropChange('subtitle', e.target.value)}
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
          {/* サブタイトルの個別スタイル設定 */}
          <div style={colorInputContainerStyle}>
            <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
            <input
              type="color"
              value={component.style?.mainPlanBackgroundColor || '#dc2626'}
              onChange={(e) => handleStyleChange('mainPlanBackgroundColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={component.style?.mainPlanBackgroundColor || '#dc2626'}
              onChange={(e) => handleStyleChange('mainPlanBackgroundColor', e.target.value)}
              style={colorValueStyle}
              placeholder="#dc2626"
            />
          </div>
          <div style={styleNoteStyle}>
            サブタイトルバナーの背景色を個別に設定できます。
          </div>
        </div>
      </div>

      {/* メインプラン */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>メインプラン</h3>
        
        <div style={planCardStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>説明文</label>
            <textarea
              value={component.props.mainPlan?.description || ''}
              onChange={(e) => handleMainPlanChange('description', e.target.value)}
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
            <div style={styleNoteStyle}>
              メインプランボックスの背景色を個別に設定できます。
            </div>
          </div>

          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>価格ラベル</label>
              <input
                type="text"
                value={component.props.mainPlan?.priceLabel || ''}
                onChange={(e) => handleMainPlanChange('priceLabel', e.target.value)}
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
            <div>
              <label style={labelStyle}>単位（固定）</label>
              <input
                type="text"
                value={component.props.mainPlan?.unit || '円（税込）'}
                readOnly
                style={{
                  ...inputStyle,
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  cursor: 'not-allowed'
                }}
              />
              <div style={styleNoteStyle}>
                単位は固定のため変更できません。
              </div>
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
            <div style={styleNoteStyle}>
              価格数字の文字色を個別に設定できます。
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

          {/* 注釈管理 */}
          <div style={fieldStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={labelStyle}>注釈</label>
              <button
                onClick={addAnnotation}
                style={{
                  ...addButtonStyle,
                  fontSize: '12px',
                  padding: '4px 8px',
                }}
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
            {(component.props.mainPlan?.annotations || []).map((annotation: string, index: number) => (
              <div key={index} style={itemCardStyle}>
                <div style={itemHeaderStyle}>
                  <span style={itemIndexStyle}>注釈 {index + 1}</span>
                  <button
                    onClick={() => removeAnnotation(index)}
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
                <input
                  type="text"
                  value={annotation}
                  onChange={(e) => handleAnnotationChange(index, e.target.value)}
                  style={itemInputStyle}
                  placeholder="注釈を入力..."
                />
              </div>
            ))}
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

            <div style={fieldStyle}>
              <label style={labelStyle}>プラン名（例：スーパー！セレクト5）</label>
              <input
                type="text"
                value={plan.name || ''}
                onChange={(e) => handleAdditionalPlanChange(index, 'name', e.target.value)}
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
              {/* 「スーパー！セレクト5」の個別スタイル設定 */}
              <div style={colorInputContainerStyle}>
                <label style={{ ...labelStyle, fontSize: '11px', marginBottom: 0, minWidth: '60px' }}>背景色:</label>
                <input
                  type="color"
                  value={plan.backgroundColor || component.style?.accentColor || '#3b82f6'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                  style={colorInputStyle}
                />
                <input
                  type="text"
                  value={plan.backgroundColor || component.style?.accentColor || '#3b82f6'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'backgroundColor', e.target.value)}
                  style={colorValueStyle}
                  placeholder="#3b82f6"
                />
              </div>
              <div style={styleNoteStyle}>
                このプランボックスの背景色を個別に設定できます。
              </div>
            </div>

            <div style={gridStyle}>
              <div>
                <label style={labelStyle}>価格ラベル</label>
                <input
                  type="text"
                  value={plan.priceLabel || ''}
                  onChange={(e) => handleAdditionalPlanChange(index, 'priceLabel', e.target.value)}
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
              <div>
                <label style={labelStyle}>単位（固定）</label>
                <input
                  type="text"
                  value={plan.unit || '円/月（税込）'}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    cursor: 'not-allowed'
                  }}
                />
                <div style={styleNoteStyle}>
                  単位は固定のため変更できません。
                </div>
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
                  value={plan.priceColor || component.style?.accentColor || '#3b82f6'}
                  onChange={(e) => handleAdditionalPlanChange(index, 'priceColor', e.target.value)}
                  style={colorInputStyle}
                />
                <input
                  type="text"
                  value={plan.priceColor || component.style?.accentColor || '#3b82f6'}
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

      {/* 注意事項（アコーディオン形式） */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={sectionTitleStyle}>注意事項（アコーディオン形式）</h3>
          <button
            onClick={addNotice}
            style={addButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            <Plus size={16} style={{ marginRight: '8px' }} />
            注意事項追加
          </button>
        </div>

        {(component.props.notices || []).map((notice: any, index: number) => (
          <div key={index} style={itemCardStyle}>
            <div style={itemHeaderStyle}>
              <span style={itemIndexStyle}>注意事項 {index + 1}</span>
              <button
                onClick={() => removeNotice(index)}
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

            <div style={{ marginBottom: '8px' }}>
              <label style={{ ...labelStyle, fontSize: '11px' }}>タイトル</label>
              <input
                type="text"
                value={notice.title || ''}
                onChange={(e) => handleNoticeChange(index, 'title', e.target.value)}
                style={itemInputStyle}
                placeholder="注意事項のタイトル"
              />
            </div>

            <div>
              <label style={{ ...labelStyle, fontSize: '11px' }}>内容</label>
              <textarea
                value={notice.content || ''}
                onChange={(e) => handleNoticeChange(index, 'content', e.target.value)}
                rows={3}
                style={itemTextareaStyle}
                placeholder="注意事項の詳細内容"
              />
            </div>
          </div>
        ))}

        {(component.props.notices || []).length === 0 && (
          <div style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            注意事項が設定されていません。「注意事項追加」ボタンで追加してください。
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingEditor;