import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import ImageDropZone from '../UI/ImageDropZone';
import { ImageUploadResult } from '../../utils/imageHandler';

interface KVEditorProps {
  component: ComponentData;
}

const KVEditor: React.FC<KVEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  // 画像アップロード処理
  const handleImageUpload = (field: string, result: ImageUploadResult) => {
    handlePropChange(field, result.url);
  };

  // カルーセルアイテムの画像アップロード
  const handleCarouselImageUpload = (index: number, result: ImageUploadResult) => {
    const newItems = [...(component.props.carouselItems || [])];
    newItems[index] = { ...newItems[index], image: result.url };
    handlePropChange('carouselItems', newItems);
  };

  // カードアイテムの画像アップロード
  const handleCardImageUpload = (index: number, result: ImageUploadResult) => {
    const newItems = [...(component.props.cardItems || [])];
    newItems[index] = { ...newItems[index], image: result.url };
    handlePropChange('cardItems', newItems);
  };

  // メディアアイテムの画像/動画アップロード
  const handleMediaImageUpload = (index: number, field: string, result: ImageUploadResult) => {
    const newItems = [...(component.props.mediaItems || [])];
    newItems[index] = { ...newItems[index], [field]: result.url };
    handlePropChange('mediaItems', newItems);
  };

  // カルーセルアイテムの管理
  const handleCarouselItemChange = (index: number, field: string, value: string) => {
    const newItems = [...(component.props.carouselItems || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    handlePropChange('carouselItems', newItems);
  };

  const addCarouselItem = () => {
    const newItems = [...(component.props.carouselItems || [])];
    newItems.push({
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: '新しいコンテンツ',
      description: 'コンテンツの説明',
      category: 'カテゴリ',
      status: 'ステータス',
      tags: ['#タグ1', '#タグ2']
    });
    handlePropChange('carouselItems', newItems);
  };

  const removeCarouselItem = (index: number) => {
    const newItems = [...(component.props.carouselItems || [])];
    newItems.splice(index, 1);
    handlePropChange('carouselItems', newItems);
  };

  const handleCarouselTagChange = (itemIndex: number, tagIndex: number, value: string) => {
    const newItems = [...(component.props.carouselItems || [])];
    const newTags = [...newItems[itemIndex].tags];
    newTags[tagIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], tags: newTags };
    handlePropChange('carouselItems', newItems);
  };

  const addCarouselTag = (itemIndex: number) => {
    const newItems = [...(component.props.carouselItems || [])];
    const newTags = [...newItems[itemIndex].tags, '#新しいタグ'];
    newItems[itemIndex] = { ...newItems[itemIndex], tags: newTags };
    handlePropChange('carouselItems', newItems);
  };

  const removeCarouselTag = (itemIndex: number, tagIndex: number) => {
    const newItems = [...(component.props.carouselItems || [])];
    const newTags = [...newItems[itemIndex].tags];
    newTags.splice(tagIndex, 1);
    newItems[itemIndex] = { ...newItems[itemIndex], tags: newTags };
    handlePropChange('carouselItems', newItems);
  };

  // カードアイテムの管理
  const handleCardItemChange = (index: number, field: string, value: any) => {
    const newItems = [...(component.props.cardItems || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    handlePropChange('cardItems', newItems);
  };

  const addCardItem = () => {
    const newItems = [...(component.props.cardItems || [])];
    newItems.push({
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: '新しいコンテンツ',
      schedule: '毎週火曜 21:00-22:00',
      genre: 'ドラマ',
      rating: 4,
      reviewCount: 1234,
      cast: '田中太郎、山田花子 他',
      description: '現代社会を舞台にした感動的なヒューマンドラマ。家族の絆と愛をテーマに描かれた心温まる物語です...',
      isNew: true
    });
    handlePropChange('cardItems', newItems);
  };

  const removeCardItem = (index: number) => {
    const newItems = [...(component.props.cardItems || [])];
    newItems.splice(index, 1);
    handlePropChange('cardItems', newItems);
  };

  // メディアアイテムの管理（番組ヒーロー用）
  const handleMediaItemChange = (index: number, field: string, value: string) => {
    const newItems = [...(component.props.mediaItems || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    handlePropChange('mediaItems', newItems);
  };

  const addMediaItem = () => {
    const newItems = [...(component.props.mediaItems || [])];
    newItems.push({
      type: 'image',
      url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: '番組画像'
    });
    handlePropChange('mediaItems', newItems);
  };

  const removeMediaItem = (index: number) => {
    const newItems = [...(component.props.mediaItems || [])];
    newItems.splice(index, 1);
    handlePropChange('mediaItems', newItems);
  };

  // CTAボタンの管理（番組ヒーロー用）
  const handleCTAButtonChange = (index: number, field: string, value: any) => {
    const newButtons = [...(component.props.ctaButtons || [])];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handlePropChange('ctaButtons', newButtons);
  };

  const addCTAButton = () => {
    const newButtons = [...(component.props.ctaButtons || [])];
    newButtons.push({ text: '視聴する', url: '#', type: 'primary' });
    handlePropChange('ctaButtons', newButtons);
  };

  const removeCTAButton = (index: number) => {
    const newButtons = [...(component.props.ctaButtons || [])];
    newButtons.splice(index, 1);
    handlePropChange('ctaButtons', newButtons);
  };

  // 追加情報の管理（番組ヒーロー用）
  const handleAdditionalInfoChange = (index: number, field: string, value: string) => {
    const newInfo = [...(component.props.additionalInfo || [])];
    newInfo[index] = { ...newInfo[index], [field]: value };
    handlePropChange('additionalInfo', newInfo);
  };

  const addAdditionalInfo = () => {
    const newInfo = [...(component.props.additionalInfo || [])];
    newInfo.push({ label: 'ラベル', value: '値' });
    handlePropChange('additionalInfo', newInfo);
  };

  const removeAdditionalInfo = (index: number) => {
    const newInfo = [...(component.props.additionalInfo || [])];
    newInfo.splice(index, 1);
    handlePropChange('additionalInfo', newInfo);
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

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  };

  const itemHeaderStyle: React.CSSProperties = {
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

  const itemCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
  };

  const itemHeaderItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '12px',
  };

  const itemIndexStyle: React.CSSProperties = {
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

  const itemFieldStyle: React.CSSProperties = {
    marginBottom: '12px',
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

  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginBottom: '8px',
  };

  const tagInputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '80px',
    padding: '4px 6px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '11px',
    outline: 'none',
  };

  const tagDeleteButtonStyle: React.CSSProperties = {
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '2px',
    fontSize: '10px',
  };

  const checkboxStyle: React.CSSProperties = {
    marginRight: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>基本設定</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>パターン</label>
          <select
            value={component.props.pattern || 'carousel'}
            onChange={(e) => handlePropChange('pattern', e.target.value)}
            style={selectStyle}
          >
            <option value="carousel">カルーセル・プレゼンテーション（情報整理型）</option>
            <option value="cinematic">シネマティック・インパクト型</option>
            <option value="card">カード型情報整理型</option>
            <option value="program-hero">番組ヒーロー型（画像・動画スライダー）</option>
          </select>
        </div>

        {/* 番組ヒーロー型以外では表示 */}
        {component.props.pattern !== 'program-hero' && (
          <>
            {/* カルーセル型では表示しない */}
            {component.props.pattern !== 'carousel' && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>メインタイトル</label>
                  <input
                    type="text"
                    value={component.props.headline || ''}
                    onChange={(e) => handlePropChange('headline', e.target.value)}
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
                  <label style={labelStyle}>サブタイトル・説明文</label>
                  <textarea
                    value={component.props.description || ''}
                    onChange={(e) => handlePropChange('description', e.target.value)}
                    rows={3}
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
              </>
            )}

            <div style={fieldStyle}>
              <label style={labelStyle}>CTAボタンテキスト</label>
              <input
                type="text"
                value={component.props.ctaText || ''}
                onChange={(e) => handlePropChange('ctaText', e.target.value)}
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
              <label style={labelStyle}>CTAボタンリンク先URL</label>
              <input
                type="url"
                value={component.props.ctaUrl || ''}
                onChange={(e) => handlePropChange('ctaUrl', e.target.value)}
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

            {component.props.pattern === 'cinematic' && (
              <div style={fieldStyle}>
                <label style={labelStyle}>背景画像</label>
                <ImageDropZone
                  onImageUpload={(result) => handleImageUpload('backgroundImage', result)}
                  currentImageUrl={component.props.backgroundImage}
                  placeholder="背景画像をドラッグ&ドロップまたはクリックして選択"
                />
              </div>
            )}
          </>
        )}

        {/* 番組ヒーロー型の基本情報 */}
        {component.props.pattern === 'program-hero' && (
          <>
            <div style={fieldStyle}>
              <label style={labelStyle}>番組タイトル</label>
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
              <label style={labelStyle}>番組説明</label>
              <textarea
                value={component.props.description || ''}
                onChange={(e) => handlePropChange('description', e.target.value)}
                rows={3}
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
              <label style={labelStyle}>出演者</label>
              <input
                type="text"
                value={component.props.cast || ''}
                onChange={(e) => handlePropChange('cast', e.target.value)}
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

            {/* 放送情報 */}
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>放送情報</h3>
              
              <div style={itemFieldStyle}>
                <label style={labelStyle}>放送スケジュール</label>
                <input
                  type="text"
                  value={component.props.broadcastInfo?.schedule || ''}
                  onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, schedule: e.target.value })}
                  placeholder="例: 毎週金曜 21:00-22:00"
                  style={itemInputStyle}
                />
              </div>
              <div style={itemFieldStyle}>
                <label style={labelStyle}>放送時間</label>
                <input
                  type="text"
                  value={component.props.broadcastInfo?.duration || ''}
                  onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, duration: e.target.value })}
                  placeholder="例: 60分"
                  style={itemInputStyle}
                />
              </div>
              <div style={itemFieldStyle}>
                <label style={labelStyle}>ステータス</label>
                <input
                  type="text"
                  value={component.props.broadcastInfo?.status || ''}
                  onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, status: e.target.value })}
                  placeholder="例: 最新話配信中"
                  style={itemInputStyle}
                />
              </div>
              <div style={itemFieldStyle}>
                <label style={labelStyle}>カテゴリ</label>
                <input
                  type="text"
                  value={component.props.broadcastInfo?.category || ''}
                  onChange={(e) => handlePropChange('broadcastInfo', { ...component.props.broadcastInfo, category: e.target.value })}
                  placeholder="例: ドラマ"
                  style={itemInputStyle}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* カルーセルアイテム編集 */}
      {component.props.pattern === 'carousel' && (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>カルーセルアイテム</h3>

          <div>
            {(component.props.carouselItems || []).map((item: any, index: number) => (
              <div key={index} style={itemCardStyle}>
                <div style={itemHeaderItemStyle}>
                  <span style={itemIndexStyle}>アイテム {index + 1}</span>
                  <button
                    onClick={() => removeCarouselItem(index)}
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

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>画像</label>
                  <ImageDropZone
                    onImageUpload={(result) => handleCarouselImageUpload(index, result)}
                    currentImageUrl={item.image}
                    placeholder="画像をドラッグ&ドロップまたはクリックして選択"
                    showPreview={true}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>タイトル</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleCarouselItemChange(index, 'title', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>説明文</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => handleCarouselItemChange(index, 'description', e.target.value)}
                    rows={2}
                    style={itemTextareaStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>カテゴリ</label>
                  <input
                    type="text"
                    value={item.category || ''}
                    onChange={(e) => handleCarouselItemChange(index, 'category', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>ステータス</label>
                  <input
                    type="text"
                    value={item.status || ''}
                    onChange={(e) => handleCarouselItemChange(index, 'status', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <div style={itemHeaderStyle}>
                    <label style={labelStyle}>タグ</label>
                    <button
                      onClick={() => addCarouselTag(index)}
                      style={{
                        ...addButtonStyle,
                        fontSize: '10px',
                        padding: '2px 6px',
                      }}
                    >
                      <Plus size={10} style={{ marginRight: '2px' }} />
                      タグ追加
                    </button>
                  </div>
                  <div style={tagContainerStyle}>
                    {(item.tags || []).map((tag: string, tagIndex: number) => (
                      <div key={tagIndex} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleCarouselTagChange(index, tagIndex, e.target.value)}
                          style={tagInputStyle}
                        />
                        <button
                          onClick={() => removeCarouselTag(index, tagIndex)}
                          style={tagDeleteButtonStyle}
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 追加ボタンを下部に移動 */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={addCarouselItem}
              style={addButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              カルーセルアイテムを追加
            </button>
          </div>
        </div>
      )}

      {/* カードアイテム編集 */}
      {component.props.pattern === 'card' && (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>カードアイテム</h3>

          <div>
            {(component.props.cardItems || []).map((item: any, index: number) => (
              <div key={index} style={itemCardStyle}>
                <div style={itemHeaderItemStyle}>
                  <span style={itemIndexStyle}>カード {index + 1}</span>
                  <button
                    onClick={() => removeCardItem(index)}
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

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>画像</label>
                  <ImageDropZone
                    onImageUpload={(result) => handleCardImageUpload(index, result)}
                    currentImageUrl={item.image}
                    placeholder="画像をドラッグ&ドロップまたはクリックして選択"
                    showPreview={true}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>タイトル</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleCardItemChange(index, 'title', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>放送スケジュール</label>
                  <input
                    type="text"
                    value={item.schedule || ''}
                    onChange={(e) => handleCardItemChange(index, 'schedule', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>ジャンル</label>
                  <input
                    type="text"
                    value={item.genre || ''}
                    onChange={(e) => handleCardItemChange(index, 'genre', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>評価（1-5）</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={item.rating || 4}
                    onChange={(e) => handleCardItemChange(index, 'rating', parseInt(e.target.value))}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>レビュー数</label>
                  <input
                    type="number"
                    value={item.reviewCount || 1234}
                    onChange={(e) => handleCardItemChange(index, 'reviewCount', parseInt(e.target.value))}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>出演者</label>
                  <input
                    type="text"
                    value={item.cast || ''}
                    onChange={(e) => handleCardItemChange(index, 'cast', e.target.value)}
                    style={itemInputStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={labelStyle}>説明文</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => handleCardItemChange(index, 'description', e.target.value)}
                    rows={3}
                    style={itemTextareaStyle}
                  />
                </div>

                <div style={itemFieldStyle}>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={item.isNew || false}
                      onChange={(e) => handleCardItemChange(index, 'isNew', e.target.checked)}
                      style={checkboxStyle}
                    />
                    新着バッジを表示
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* 追加ボタンを下部に移動 */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={addCardItem}
              style={addButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              <Plus size={12} style={{ marginRight: '4px' }} />
              カードアイテムを追加
            </button>
          </div>
        </div>
      )}

      {/* メディアアイテム編集（番組ヒーロー用） */}
      {component.props.pattern === 'program-hero' && (
        <>
          <div style={sectionStyle}>
            <div style={itemHeaderStyle}>
              <h3 style={sectionTitleStyle}>メディアアイテム（画像・動画）</h3>
              <button
                onClick={addMediaItem}
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
              {(component.props.mediaItems || []).map((item: any, index: number) => (
                <div key={index} style={itemCardStyle}>
                  <div style={itemHeaderItemStyle}>
                    <span style={itemIndexStyle}>メディア {index + 1}</span>
                    <button
                      onClick={() => removeMediaItem(index)}
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

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>メディアタイプ</label>
                    <select
                      value={item.type || 'image'}
                      onChange={(e) => handleMediaItemChange(index, 'type', e.target.value)}
                      style={itemInputStyle}
                    >
                      <option value="image">画像</option>
                      <option value="video">動画</option>
                    </select>
                  </div>

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>{item.type === 'video' ? '動画' : '画像'}</label>
                    <ImageDropZone
                      onImageUpload={(result) => handleMediaImageUpload(index, 'url', result)}
                      currentImageUrl={item.url}
                      placeholder={`${item.type === 'video' ? '動画' : '画像'}をドラッグ&ドロップまたはクリックして選択`}
                      showPreview={true}
                    />
                  </div>

                  {item.type === 'video' && (
                    <div style={itemFieldStyle}>
                      <label style={labelStyle}>ポスター画像（動画のサムネイル）</label>
                      <ImageDropZone
                        onImageUpload={(result) => handleMediaImageUpload(index, 'poster', result)}
                        currentImageUrl={item.poster}
                        placeholder="ポスター画像をドラッグ&ドロップまたはクリックして選択"
                        showPreview={true}
                      />
                    </div>
                  )}

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>代替テキスト</label>
                    <input
                      type="text"
                      value={item.alt || ''}
                      onChange={(e) => handleMediaItemChange(index, 'alt', e.target.value)}
                      style={itemInputStyle}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAボタン編集 */}
          <div style={sectionStyle}>
            <div style={itemHeaderStyle}>
              <h3 style={sectionTitleStyle}>CTAボタン</h3>
              <button
                onClick={addCTAButton}
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
              {(component.props.ctaButtons || []).map((button: any, index: number) => (
                <div key={index} style={itemCardStyle}>
                  <div style={itemHeaderItemStyle}>
                    <span style={itemIndexStyle}>ボタン {index + 1}</span>
                    <button
                      onClick={() => removeCTAButton(index)}
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

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>ボタンテキスト</label>
                    <input
                      type="text"
                      value={button.text || ''}
                      onChange={(e) => handleCTAButtonChange(index, 'text', e.target.value)}
                      style={itemInputStyle}
                    />
                  </div>

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>リンクURL</label>
                    <input
                      type="url"
                      value={button.url || ''}
                      onChange={(e) => handleCTAButtonChange(index, 'url', e.target.value)}
                      style={itemInputStyle}
                    />
                  </div>

                  <div style={itemFieldStyle}>
                    <label style={labelStyle}>ボタンタイプ</label>
                    <select
                      value={button.type || 'primary'}
                      onChange={(e) => handleCTAButtonChange(index, 'type', e.target.value)}
                      style={itemInputStyle}
                    >
                      <option value="primary">プライマリ</option>
                      <option value="secondary">セカンダリ</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 追加情報編集 */}
          <div style={sectionStyle}>
            <div style={itemHeaderStyle}>
              <h3 style={sectionTitleStyle}>追加情報</h3>
              <button
                onClick={addAdditionalInfo}
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
              {(component.props.additionalInfo || []).map((info: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={info.label || ''}
                    onChange={(e) => handleAdditionalInfoChange(index, 'label', e.target.value)}
                    placeholder="ラベル"
                    style={{ ...itemInputStyle, flex: 1 }}
                  />
                  <input
                    type="text"
                    value={info.value || ''}
                    onChange={(e) => handleAdditionalInfoChange(index, 'value', e.target.value)}
                    placeholder="値"
                    style={{ ...itemInputStyle, flex: 1 }}
                  />
                  <button
                    onClick={() => removeAdditionalInfo(index)}
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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KVEditor;