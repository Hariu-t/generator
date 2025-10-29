import { create } from 'zustand';
import { ComponentData, PageData, ViewMode, SavedProject, GlobalStyles } from '../types';
import { supabase } from '../lib/supabase';

interface PageStore {
  pageData: PageData;
  selectedComponentId: string | null;
  viewMode: ViewMode;
  previewMode: boolean;
  history: PageData[];
  historyIndex: number;
  showComponentLibrary: boolean;
  showPropertiesPanel: boolean;
  showClassNames: boolean;

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
  toggleClassNames: () => void;
  
  // プロジェクト保存機能（共有ストレージ）
  saveProject: (name: string, category: string) => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  getSavedProjects: () => SavedProject[];
  getCurrentProjectName: () => string | null;
  setCurrentProjectName: (name: string | null) => void;
  currentProjectName: string | null;
  restoreFromBackup: () => boolean;
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

// Supabaseからプロジェクトを取得
const getSharedProjects = async (): Promise<SavedProject[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return data ? data.map(project => ({
      id: project.id,
      name: project.name,
      category: project.category,
      pageData: project.page_data,
      createdAt: project.created_at,
    })) : [];
  } catch (error) {
    console.error('Failed to load projects from Supabase:', error);
    return [];
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
  showClassNames: false,
  currentProjectName: null,

  addComponent: (component) => {
    set((state) => {
      const newPageData = { ...state.pageData, components: [...state.pageData.components, component] };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      return { pageData: newPageData, selectedComponentId: component.id, history: newHistory, historyIndex: newHistory.length - 1 };
    });
    setTimeout(() => {
      document.querySelector(`[data-component-id="${component.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  },

  updateComponent: (id, updates) => {
    set((state) => {
      const newComponents = state.pageData.components.map((comp) => comp.id === id ? { ...comp, ...updates } : comp);
      const newPageData = { ...state.pageData, components: newComponents };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      return { pageData: newPageData, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  },

  deleteComponent: (id) => {
    set((state) => {
      const newComponents = state.pageData.components.filter((comp) => comp.id !== id);
      const newPageData = { ...state.pageData, components: newComponents };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      return { pageData: newPageData, selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId, history: newHistory, historyIndex: newHistory.length - 1 };
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
      return { pageData: newPageData, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  },

  selectComponent: (id) => set({ selectedComponentId: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setPreviewMode: (enabled) => set({ previewMode: enabled, selectedComponentId: enabled ? null : get().selectedComponentId }),
  updateGlobalSettings: (settings) => {
    set((state) => {
      const newPageData = { ...state.pageData, globalSettings: { ...state.pageData.globalSettings, ...settings } };
      if (settings.title && !settings.title.includes('｜スカパー！:')) {
        newPageData.globalSettings.title = `${settings.title}｜スカパー！: スポーツ＆音楽ライブ、アイドル、アニメ、ドラマ、映画など`;
      }
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      return { pageData: newPageData, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  },
  updateGlobalStyles: (styles) => {
    set((state) => {
      const newPageData = { ...state.pageData, globalStyles: { ...state.pageData.globalStyles, ...styles } };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newPageData);
      return { pageData: newPageData, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  },
  undo: () => set((state) => state.historyIndex > 0 ? { pageData: state.history[state.historyIndex - 1], historyIndex: state.historyIndex - 1, selectedComponentId: null } : state),
  redo: () => set((state) => state.historyIndex < state.history.length - 1 ? { pageData: state.history[state.historyIndex + 1], historyIndex: state.historyIndex + 1, selectedComponentId: null } : state),
  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
  resetPage: () => {
    set((state) => {
      const headlineComponent = { id: 'headline-default', type: 'headline' as const, props: { text: 'タイトルを挿入', usePageTitle: true }, style: { theme: 'light' as const, colorScheme: 'blue' as const } };
      const resetPageData = { ...initialPageData, components: [headlineComponent] };
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(resetPageData);
      return { pageData: resetPageData, selectedComponentId: null, history: newHistory, historyIndex: newHistory.length - 1, currentProjectName: null };
    });
  },
  toggleComponentLibrary: () => set((state) => ({ showComponentLibrary: !state.showComponentLibrary })),
  togglePropertiesPanel: () => set((state) => ({ showPropertiesPanel: !state.showPropertiesPanel })),
  toggleClassNames: () => set((state) => ({ showClassNames: !state.showClassNames })),

  saveProject: async (name, category) => {
    const state = get();

    try {
      // 既存のプロジェクトをチェック
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('name', name)
        .maybeSingle();

      if (existing) {
        // 更新
        const { error } = await supabase
          .from('projects')
          .update({
            category,
            page_data: state.pageData,
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // 新規作成
        const { error } = await supabase
          .from('projects')
          .insert({
            name,
            category,
            page_data: state.pageData,
          });

        if (error) throw error;
      }

      set({ currentProjectName: name });
      console.log('Project saved successfully to Supabase');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('プロジェクトの保存に失敗しました');
    }
  },
  
  loadProject: async (projectId) => {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) throw error;

      if (project) {
        set(state => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          newHistory.push(project.page_data);
          return {
            pageData: project.page_data,
            selectedComponentId: null,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            currentProjectName: project.name
          };
        });
        console.log('Project loaded successfully from Supabase');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('プロジェクトの読み込みに失敗しました');
    }
  },

  deleteProject: async (projectId) => {
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('name')
        .eq('id', projectId)
        .maybeSingle();

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      if (project && get().currentProjectName === project.name) {
        set({ currentProjectName: null });
      }

      console.log('Project deleted successfully from Supabase');
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('プロジェクトの削除に失敗しました');
    }
  },
  
  getSavedProjects: getSharedProjects,
  getCurrentProjectName: () => get().currentProjectName,
  setCurrentProjectName: (name) => {
    set({ currentProjectName: name });
  },

  restoreFromBackup: () => {
    // Supabaseに移行したため、バックアップ機能は不要
    alert('Supabaseデータベースを使用しているため、データは自動的に保存されています。');
    return false;
  },
}));