export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  style?: ComponentStyle;
}

export type ComponentType = 
  | 'kv'
  | 'features'
  | 'cta'
  | 'testimonials'
  | 'faq'
  | 'footer'
  | 'about'
  | 'pricing'
  | 'contact';

export interface ComponentStyle {
  theme?: 'light' | 'dark';
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
  layout?: string;
  backgroundColor?: string;
  textColor?: string;
  designPattern?: string;
  // ダークモード関連
  isDarkMode?: boolean;
  lightModeBackup?: {
    backgroundColor?: string;
    textColor?: string;
    headlineColor?: string;
    descriptionColor?: string;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    cardBackgroundColor?: string;
    cardTextColor?: string;
    accentColor?: string;
  };
  // 詳細なスタイル設定
  headlineColor?: string;
  descriptionColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  accentColor?: string;
  borderColor?: string;
  cardBackgroundColor?: string;
  cardTextColor?: string;
}

export interface PageData {
  components: ComponentData[];
  globalSettings: {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    directory?: string;
  };
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

export interface ComponentTemplate {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  defaultProps: Record<string, any>;
}

export interface DesignPattern {
  id: string;
  name: string;
  description: string;
  style: ComponentStyle;
}

// 新しく追加: プロジェクト関連の型定義
export interface SavedProject {
  id: string;
  name: string;
  pageData: PageData;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  componentCount: number;
  description: string;
}