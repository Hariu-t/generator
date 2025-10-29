// Component HTML wrapper with unique IDs

import { ComponentData } from '../types';
import { componentTemplates } from '../data/componentTemplates';

/**
 * コンポーネントに対応するテンプレートを取得
 */
export const getComponentTemplate = (componentType: string) => {
  return componentTemplates.find(template => template.type === componentType);
};

/**
 * コンポーネントHTMLを一意のIDを持つdivでラップ
 */
export const wrapComponentHTML = (
  componentHTML: string,
  component: ComponentData
): string => {
  const template = getComponentTemplate(component.type);

  if (!template) {
    // テンプレートが見つからない場合は、そのまま返す
    return componentHTML;
  }

  // 一意のIDを取得
  const uniqueId = template.uniqueId;
  const sectionId = template.uniqueId ? `${template.uniqueId}Area` : undefined;

  if (!uniqueId || !sectionId) {
    // 一意のIDがない場合は、そのまま返す
    return componentHTML;
  }

  // コンポーネントHTMLをdivでラップ
  return `
    <div id="${sectionId}" class="component-wrapper" data-component-type="${component.type}" data-unique-id="${uniqueId}">
      ${componentHTML}
    </div>
  `.trim();
};

/**
 * コンポーネントの一意のIDを取得
 */
export const getComponentUniqueId = (componentType: string): string | null => {
  const template = getComponentTemplate(componentType);
  return template?.uniqueId || null;
};

/**
 * コンポーネントのセクションIDを取得
 */
export const getComponentSectionId = (componentType: string): string | null => {
  const template = getComponentTemplate(componentType);
  if (template?.uniqueId) {
    return `${template.uniqueId}Area`;
  }
  return null;
};

/**
 * 複数のコンポーネントHTMLをラップ
 */
export const wrapMultipleComponentsHTML = (
  componentsWithHTML: Array<{ component: ComponentData; html: string }>
): string => {
  return componentsWithHTML
    .map(({ component, html }) => wrapComponentHTML(html, component))
    .join('\n\n');
};
