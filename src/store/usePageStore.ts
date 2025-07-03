import { create } from 'zustand';
import { ComponentData, PageData, ViewMode, SavedProject } from '../types';

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
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  resetPage: () => void;
  toggleComponentLibrary: () => void;
  togglePropertiesPanel: () => void;
  
  // 新しく追加: プロジェクト保存機能
  saveProject: (name: string) => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  getSavedProjects: () => SavedProject[];
  getCurrentProjectName: () => string | null;
  setCurrentProjectName: (name: string | null) => void;
  currentProjectName: string | null;
}

const initialPageData: PageData = {
  components: [],
  globalSettings: {
    title: 'My Landing Page',
    description: 'A beautiful landing page created with our no-code builder',
    directory: '', // デフォルトは空（ルートディレクトリ）
  },
};

// LocalStorageのキー
const PROJECTS_STORAGE_KEY = 'lp-builder-projects';
const CURRENT_PROJECT_KEY = 'lp-builder-current-project';

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
      // リセット前の状態をhistoryに追加
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(initialPageData);
      
      return {
        pageData: initialPageData,
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

  // プロジェクト保存機能
  saveProject: (name: string) => {
    const state = get();
    const now = new Date().toISOString();
    const projectId = `project-${Date.now()}`;
    
    const newProject: SavedProject = {
      id: projectId,
      name,
      pageData: state.pageData,
      createdAt: now,
      updatedAt: now,
    };

    // 既存のプロジェクトを取得
    const existingProjects = get().getSavedProjects();
    
    // 同じ名前のプロジェクトがある場合は更新、ない場合は新規作成
    const existingProjectIndex = existingProjects.findIndex(p => p.name === name);
    
    let updatedProjects: SavedProject[];
    if (existingProjectIndex >= 0) {
      // 既存プロジェクトを更新
      updatedProjects = [...existingProjects];
      updatedProjects[existingProjectIndex] = {
        ...existingProjects[existingProjectIndex],
        pageData: state.pageData,
        updatedAt: now,
      };
    } else {
      // 新規プロジェクトを追加
      updatedProjects = [...existingProjects, newProject];
    }

    // LocalStorageに保存
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    
    // 現在のプロジェクト名を設定
    set({ currentProjectName: name });
    localStorage.setItem(CURRENT_PROJECT_KEY, name);
  },

  loadProject: (projectId: string) => {
    const projects = get().getSavedProjects();
    const project = projects.find(p => p.id === projectId);
    
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
    const projects = get().getSavedProjects();
    const updatedProjects = projects.filter(p => p.id !== projectId);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    
    // 削除したプロジェクトが現在のプロジェクトの場合、現在のプロジェクト名をクリア
    const deletedProject = projects.find(p => p.id === projectId);
    if (deletedProject && get().currentProjectName === deletedProject.name) {
      set({ currentProjectName: null });
      localStorage.removeItem(CURRENT_PROJECT_KEY);
    }
  },

  getSavedProjects: () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load saved projects:', error);
      return [];
    }
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