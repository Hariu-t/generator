import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface FAQEditorProps {
  component: ComponentData;
}

const FAQEditor: React.FC<FAQEditorProps> = ({ component }) => {
  const updateComponent = usePageStore((state) => state.updateComponent);

  const handlePropChange = (key: string, value: any) => {
    updateComponent(component.id, {
      props: { ...component.props, [key]: value }
    });
  };

  const handleFAQChange = (index: number, field: string, value: string) => {
    const newFAQs = [...(component.props.faqs || [])];
    newFAQs[index] = { ...newFAQs[index], [field]: value };
    handlePropChange('faqs', newFAQs);
  };

  const addFAQ = () => {
    const newFAQs = [...(component.props.faqs || [])];
    newFAQs.push({
      question: '新しい質問？',
      answer: '質問に対する回答がここに入ります。'
    });
    handlePropChange('faqs', newFAQs);
  };

  const removeFAQ = (index: number) => {
    const newFAQs = [...(component.props.faqs || [])];
    newFAQs.splice(index, 1);
    handlePropChange('faqs', newFAQs);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">コンテンツ</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              セクションタイトル
            </label>
            <input
              type="text"
              value={component.props.title || ''}
              onChange={(e) => handlePropChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              説明文
            </label>
            <textarea
              value={component.props.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">FAQ項目</h3>
          <button
            onClick={addFAQ}
            className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            追加
          </button>
        </div>

        <div className="space-y-4">
          {(component.props.faqs || []).map((faq: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-600">FAQ {index + 1}</span>
                <button
                  onClick={() => removeFAQ(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    質問
                  </label>
                  <input
                    type="text"
                    value={faq.question || ''}
                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    回答
                  </label>
                  <textarea
                    value={faq.answer || ''}
                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
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

export default FAQEditor;