import React, { useState } from 'react';
import { Image as ImageIcon, Check } from 'lucide-react';
import { getCommonImagesList, getCommonImagePath, COMMON_IMAGES } from '../../utils/commonImages';

interface CommonImageSelectorProps {
  onImageSelect: (imagePath: string) => void;
  currentImagePath?: string;
  className?: string;
}

const CommonImageSelector: React.FC<CommonImageSelectorProps> = ({
  onImageSelect,
  currentImagePath,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const commonImages = getCommonImagesList();

  const handleImageSelect = (imagePath: string) => {
    onImageSelect(imagePath);
    setIsOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#374151',
    transition: 'border-color 0.15s ease-in-out',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '4px',
  };

  const imageItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#374151',
    transition: 'background-color 0.15s ease-in-out',
  };

  const imagePreviewStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
  };

  const getCurrentImageName = () => {
    if (!currentImagePath) return '画像を選択';
    
    const imageEntry = Object.entries(COMMON_IMAGES).find(([_, filename]) => 
      currentImagePath.includes(filename)
    );
    
    return imageEntry ? imageEntry[1] : '画像を選択';
  };

  return (
    <div style={containerStyle} className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
      >
        <ImageIcon size={16} />
        <span>{getCurrentImageName()}</span>
      </button>

      {isOpen && (
        <div style={dropdownStyle}>
          {commonImages.map((image) => (
            <div
              key={image.key}
              onClick={() => handleImageSelect(image.path)}
              style={imageItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={image.path}
                  alt={image.name}
                  style={imagePreviewStyle}
                  onError={(e) => {
                    // 画像が読み込めない場合はプレースホルダーを表示
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>{image.name}</span>
              </div>
              {currentImagePath === image.path && (
                <Check size={14} color="#2563eb" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonImageSelector;