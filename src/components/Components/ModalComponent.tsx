import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ComponentData } from '../../types';
import { useComponentData } from '../../hooks/useComponentData';
import { useDataPropBinding } from '../../hooks/useDataPropBinding';

interface ModalComponentProps {
  component: ComponentData;
  isEditing?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ component }) => {
  const { props, style, globalStyles } = useComponentData(component);
  const containerRef = useDataPropBinding({ props });
  const [isOpen, setIsOpen] = useState(false);

  const {
    buttonText,
    modalTitle,
    modalContent,
    buttonStyle
  } = props;
  const {
    theme,
    backgroundColor,
    textColor,
    accentColor,
    buttonBackgroundColor,
    buttonTextColor
  } = style || {};

  const getThemeClasses = () => {
    if (backgroundColor) {
      return '';
    }
    if (theme === 'dark') {
      return 'bg-gray-900';
    }
    return 'bg-white';
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

  const getButtonClasses = () => {
    if (buttonBackgroundColor) {
      return 'px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90';
    }
    if (theme === 'dark') {
      return 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all';
    }
    return 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all';
  };

  const getModalClasses = () => {
    if (theme === 'dark') {
      return 'bg-gray-800 text-white';
    }
    return 'bg-white text-gray-900';
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const buttonStyleObj = {
    backgroundColor: buttonBackgroundColor || undefined,
    color: buttonTextColor || undefined,
  };

  return (
    <div
      ref={containerRef}
      className={`baseColor py-16 sm:py-24 ${getThemeClasses()} ${getTextClasses()}`}
      style={containerStyle}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <button
          data-modal-open={component.id}
          className={getButtonClasses()}
          style={buttonStyleObj}
          onClick={() => setIsOpen(true)}
        >
          {buttonText || 'モーダルを開く'}
        </button>

        {isOpen && (
          <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              data-modal={component.id}
              className={`is-open modal-content relative max-w-2xl w-full rounded-lg shadow-xl p-6 sm:p-8 ${getModalClasses()}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`modal-title-${component.id}`}
            >
              <button
                data-modal-close
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="閉じる"
              >
                <X className="w-6 h-6" />
              </button>

              <h3
                id={`modal-title-${component.id}`}
                className="text-2xl font-bold mb-4 pr-10"
              >
                {modalTitle || 'モーダルタイトル'}
              </h3>

              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  {modalContent || 'モーダルのコンテンツがここに表示されます。'}
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  data-modal-close
                  className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
