import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface TestimonialsEditorProps {
  component: ComponentData;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ component }) => {
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

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const newTestimonials = [...(component.props.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    handlePropChange('testimonials', newTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonials = [...(component.props.testimonials || [])];
    newTestimonials.push({
      name: '新しいお客様',
      role: '役職',
      company: '会社名',
      content: 'お客様の声がここに入ります。',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    handlePropChange('testimonials', newTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = [...(component.props.testimonials || [])];
    newTestimonials.splice(index, 1);
    handlePropChange('testimonials', newTestimonials);
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
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">お客様の声</h3>
          <button
            onClick={addTestimonial}
            className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            追加
          </button>
        </div>

        <div className="space-y-4">
          {(component.props.testimonials || []).map((testimonial: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-600">お客様の声 {index + 1}</span>
                <button
                  onClick={() => removeTestimonial(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    名前
                  </label>
                  <input
                    type="text"
                    value={testimonial.name || ''}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    役職
                  </label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    会社名
                  </label>
                  <input
                    type="text"
                    value={testimonial.company || ''}
                    onChange={(e) => handleTestimonialChange(index, 'company', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    アバターURL
                  </label>
                  <input
                    type="url"
                    value={testimonial.avatar || ''}
                    onChange={(e) => handleTestimonialChange(index, 'avatar', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    お客様の声
                  </label>
                  <textarea
                    value={testimonial.content || ''}
                    onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">スタイル</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              テーマ
            </label>
            <select
              value={component.style?.theme || 'light'}
              onChange={(e) => handleStyleChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="light">ライト</option>
              <option value="dark">ダーク</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              背景色
            </label>
            <input
              type="color"
              value={component.style?.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              文字色
            </label>
            <input
              type="color"
              value={component.style?.textColor || '#111827'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsEditor;