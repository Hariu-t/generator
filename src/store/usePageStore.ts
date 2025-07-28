import { create } from 'zustand';
import { ComponentData, PageData, ViewMode, SavedProject, GlobalStyles } from '../types';

interface PageStore {
  pageData: PageData;
  selectedComponentId: string | null;
  viewMode: ViewMode;
  previewMode: boolean;
  history: PageData[];
  historyIndex: number;
  showComponentLibrary: boolean;
  showPropertiesPanel: boolean;
  
  // Actions
  addComponent: (component: ComponentData) => void;
  updateComponent: (id: string, updates: Partial<ComponentData>) => void;
  deleteComponent: (id: string) => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  selectComponent: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setPreviewMode: (enabled: boolean) => void;
  updateGlobalSettings: (settings: Partial<PageData['globalSettings']>) => void;
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  resetPage: () => void;
  toggleComponentLibrary: () => void;
  togglePropertiesPanel: () => void;
  
  // プロジェクト保存機能（共有ストレージ）
  // saveProject: (name: string) => void;
  saveProject: (name: string, category: string) => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  getSavedProjects: () => SavedProject[];
  getCurrentProjectName: () => string | null;
  setCurrentProjectName: (name: string | null) => void;
  currentProjectName: string | null;
}

const initialPageData: PageData = {
  components: [
    {
      id: 'headline-default',
      type: 'headline',
      props: {
        text: 'タイトルを挿入',
        usePageTitle: true
      },
      style: { theme: 'light', colorScheme: 'blue' as const },
    }
  ],
  globalSettings: {
    title: 'タイトルを挿入｜スカパー！: スポーツ＆音楽ライブ、アイドル、アニメ、ドラマ、映画など',
    description: 'ディスクリプションを挿入',
    directory: 'test',
  },
  globalStyles: {
    mainColor: '#C3000F',
    mainColorSub: '#ffffff',
    baseColor: '#f8fafc',
    baseColorSub: '#333333',
    base2Color: '#f1f5f9',
    base2ColorSub: '#333333',
    accentColor: '#E60012',
    accentColorSub: '#ffffff',
    commonColor: '#000000',
    commonColorBg: '#ffffff',
  },
};

// 共有ストレージのキー（すべてのユーザーが共通で使用）
const SHARED_PROJECTS_STORAGE_KEY = 'lp-builder-shared-projects';
const CURRENT_PROJECT_KEY = 'lp-builder-current-project';

// 共有ストレージのヘルパー関数
const getSharedProjects = (): SavedProject[] => {
  try {
    const stored = localStorage.getItem(SHARED_PROJECTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load shared projects:', error);
    return [];
  }
};

const saveSharedProjects = (projects: SavedProject[]): void => {
  try {
    localStorage.setItem(SHARED_PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save shared projects:', error);
  }
};

export const usePageStore = create<PageStore>((set, get) => ({
  pageData: initialPageData,
  selectedComponentId: null,
  viewMode: 'desktop',
  previewMode: false,
  history: [initialPageData],
  historyIndex: 0,
  showComponentLibrary: true,
  showPropertiesPanel: true,
  currentProjectName: null,

  addComponent: (component) => {
    set((state) => {
      const newPageData = {
        ...state.pageData,
        components: [...state.pageData.components, component],
      };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        selectedComponentId: component.id,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });

    // コンポーネント追加後に自動スクロール
    setTimeout(() => {
      const componentElement = document.querySelector(`[data-component-id="${component.id}"]`);
      if (componentElement) {
        componentElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  },

  updateComponent: (id, updates) => {
    set((state) => {
      const newComponents = state.pageData.components.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      );
      const newPageData = { ...state.pageData, components: newComponents };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  deleteComponent: (id) => {
    set((state) => {
      const newComponents = state.pageData.components.filter((comp) => comp.id !== id);
      const newPageData = { ...state.pageData, components: newComponents };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  reorderComponents: (fromIndex, toIndex) => {
    set((state) => {
      const newComponents = [...state.pageData.components];
      const [removed] = newComponents.splice(fromIndex, 1);
      newComponents.splice(toIndex, 0, removed);
      
      const newPageData = { ...state.pageData, components: newComponents };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  selectComponent: (id) => {
    set({ selectedComponentId: id });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  setPreviewMode: (enabled) => {
    set({ previewMode: enabled, selectedComponentId: enabled ? null : get().selectedComponentId });
  },

  updateGlobalSettings: (settings) => {
    set((state) => {
      const newPageData = {
        ...state.pageData,
        globalSettings: { ...state.pageData.globalSettings, ...settings },
      };
      
      // タイトルが変更された場合、自動的にサフィックスを追加
      if (settings.title && !settings.title.includes('｜スカパー！:')) {
        newPageData.globalSettings.title = `${settings.title}｜スカパー！: スポーツ＆音楽ライブ、アイドル、アニメ、ドラマ、映画など`;
      }
      
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  updateGlobalStyles: (styles) => {
    set((state) => {
      const newPageData = {
        ...state.pageData,
        globalStyles: { ...state.pageData.globalStyles, ...styles },
      };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      
      return {
        pageData: newPageData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        return {
          pageData: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
          selectedComponentId: null,
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        return {
          pageData: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
          selectedComponentId: null,
        };
      }
      return state;
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  resetPage: () => {
    set((state) => {
      // ヘッドラインコンポーネントは必須なので残す
      const headlineComponent = {
        id: 'headline-default',
        type: 'headline' as const,
        props: {
          text: 'タイトルを挿入',
          usePageTitle: true
        },
        style: { theme: 'light' as const, colorScheme: 'blue' as const },
      };
      
      const resetPageData = {
        ...initialPageData,
        components: [headlineComponent]
      };
      
      // リセット前の状態をhistoryに追加
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(resetPageData);
      
      return {
        pageData: resetPageData,
        selectedComponentId: null,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        currentProjectName: null, // プロジェクト名もリセット
      };
    });
  },

  toggleComponentLibrary: () => {
    set((state) => ({ showComponentLibrary: !state.showComponentLibrary }));
  },

  togglePropertiesPanel: () => {
    set((state) => ({ showPropertiesPanel: !state.showPropertiesPanel }));
  },

  // プロジェクト保存機能（共有ストレージ）
  saveProject: (name: string, category: string) => {
    const state = get();
    const now = new Date().toISOString();
    const newProject: SavedProject = {
      id: `project-${Date.now()}`,
      name,
      category, // Add category
      pageData: state.pageData,
      createdAt: now,
      updatedAt: now,
    };

    const existingProjects = getSharedProjects();
    const existingProjectIndex = existingProjects.findIndex((p: SavedProject) => p.name === name);
    let updatedProjects: SavedProject[];
    if (existingProjectIndex >= 0) {
      // Update existing project if name matches
      updatedProjects = [...existingProjects];
      updatedProjects[existingProjectIndex] = {
        ...updatedProjects[existingProjectIndex],
        pageData: state.pageData,
        category: category, // Update category as well
        updatedAt: now,
      };
    } else {
      // Add new project
      updatedProjects = [...existingProjects, newProject];
    }

    saveSharedProjects(updatedProjects);
    set({ currentProjectName: name });
    localStorage.setItem(CURRENT_PROJECT_KEY, name);
  },

  loadProject: (projectId: string) => {
    const projects = getSharedProjects();
    const project = projects.find((p: SavedProject) => p.id === projectId);
    
    if (project) {
      set((state) => {
        // 現在の状態をhistoryに追加してからロード
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(project.pageData);
        
        return {
          pageData: project.pageData,
          selectedComponentId: null,
          history: newHistory,
          historyIndex: newHistory.length - 1,
          currentProjectName: project.name,
        };
      });
      
      localStorage.setItem(CURRENT_PROJECT_KEY, project.name);
    }
  },

  deleteProject: (projectId: string) => {
    const projects = getSharedProjects();
    const updatedProjects = projects.filter((p: SavedProject) => p.id !== projectId);
    saveSharedProjects(updatedProjects);
    
    // 削除したプロジェクトが現在のプロジェクトの場合、現在のプロジェクト名をクリア
    const deletedProject = projects.find((p: SavedProject) => p.id === projectId);
    if (deletedProject && get().currentProjectName === deletedProject.name) {
      set({ currentProjectName: null });
      localStorage.removeItem(CURRENT_PROJECT_KEY);
    }
  },

  getSavedProjects: () => {
    return getSharedProjects();
  },

  getCurrentProjectName: () => {
    return get().currentProjectName;
  },

  setCurrentProjectName: (name: string | null) => {
    set({ currentProjectName: name });
    if (name) {
      localStorage.setItem(CURRENT_PROJECT_KEY, name);
    } else {
      localStorage.removeItem(CURRENT_PROJECT_KEY);
    }
  },
}));