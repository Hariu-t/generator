// Component Template localStorage management

export interface ComponentTemplateData {
  id: string;
  name: string;
  nameRomanized: string;
  displayName: string;
  category: string;
  categoryRomanized: string;
  uniqueId: string;
  sectionId: string;
  thumbnailUrl?: string;
  description?: string;
  codeTemplate: string;
  defaultProps: Record<string, any>;
  propSchema: any[];
  styleSchema?: any[];
  cssFiles: string[];
  jsFiles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const COMPONENT_TEMPLATES_KEY = 'lp-builder-component-templates';

export const getComponentTemplates = (): ComponentTemplateData[] => {
  try {
    const stored = localStorage.getItem(COMPONENT_TEMPLATES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load component templates:', error);
    return [];
  }
};

export const saveComponentTemplates = (templates: ComponentTemplateData[]): void => {
  try {
    localStorage.setItem(COMPONENT_TEMPLATES_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Failed to save component templates:', error);
  }
};

export const addComponentTemplate = (template: Omit<ComponentTemplateData, 'id' | 'createdAt' | 'updatedAt'>): ComponentTemplateData => {
  const templates = getComponentTemplates();
  const now = new Date().toISOString();
  const newTemplate: ComponentTemplateData = {
    ...template,
    id: `template-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  templates.push(newTemplate);
  saveComponentTemplates(templates);
  return newTemplate;
};

export const updateComponentTemplate = (id: string, updates: Partial<ComponentTemplateData>): void => {
  const templates = getComponentTemplates();
  const index = templates.findIndex(t => t.id === id);
  if (index >= 0) {
    templates[index] = {
      ...templates[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveComponentTemplates(templates);
  }
};

export const deleteComponentTemplate = (id: string): void => {
  const templates = getComponentTemplates();
  const filtered = templates.filter(t => t.id !== id);
  saveComponentTemplates(filtered);
};

export const getComponentTemplateByName = (name: string): ComponentTemplateData | undefined => {
  const templates = getComponentTemplates();
  return templates.find(t => t.name === name);
};

export const getComponentTemplatesByCategory = (category: string): ComponentTemplateData[] => {
  const templates = getComponentTemplates();
  return templates.filter(t => t.category === category);
};
