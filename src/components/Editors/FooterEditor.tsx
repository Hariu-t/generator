import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';

interface FooterEditorProps {
  component: ComponentData;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ component }) => {
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

  const handleLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...(component.props.links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handlePropChange('links', newLinks);
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const newSocialLinks = [...(component.props.socialLinks || [])];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    handlePropChange('socialLinks', newSocialLinks);
  };

  const addLink = () => {
    const newLinks = [...(component.props.links || [])];
    newLinks.push({ label: 'New Link', url: '#' });
    handlePropChange('links', newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = [...(component.props.links || [])];
    newLinks.splice(index, 1);
    handlePropChange('links', newLinks);
  };

  const addSocialLink = () => {
    const newSocialLinks = [...(component.props.socialLinks || [])];
    newSocialLinks.push({ platform: 'Twitter', url: '#' });
    handlePropChange('socialLinks', newSocialLinks);
  };

  const removeSocialLink = (index: number) => {
    const newSocialLinks = [...(component.props.socialLinks || [])];
    newSocialLinks.splice(index, 1);
    handlePropChange('socialLinks', newSocialLinks);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Company Info</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={component.props.companyName || ''}
              onChange={(e) => handlePropChange('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={component.props.description || ''}
              onChange={(e) => handlePropChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Copyright Text
            </label>
            <input
              type="text"
              value={component.props.copyright || ''}
              onChange={(e) => handlePropChange('copyright', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Quick Links</h3>
          <button
            onClick={addLink}
            className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {(component.props.links || []).map((link: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={link.label || ''}
                onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                placeholder="Link text"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="url"
                value={link.url || ''}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Social Links</h3>
          <button
            onClick={addSocialLink}
            className="flex items-center px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {(component.props.socialLinks || []).map((social: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                value={social.platform || ''}
                onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
              </select>
              <input
                type="url"
                value={social.url || ''}
                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => removeSocialLink(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Style</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              value={component.style?.theme || 'dark'}
              onChange={(e) => handleStyleChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;