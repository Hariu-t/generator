import React, { useState, useMemo, useEffect } from 'react';
import { X, Save, FolderOpen, Trash2, Calendar, FileText, Tag, ChevronDown, ArchiveRestore } from 'lucide-react';
import { usePageStore } from '../../store/usePageStore';
import { SavedProject } from '../../types';

interface ProjectManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ isOpen, onClose }) => {
  const { 
    saveProject, 
    loadProject, 
    deleteProject, 
    getSavedProjects, 
    getCurrentProjectName,
    restoreFromBackup 
  } = usePageStore();
  
  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categories = useMemo(() => [...new Set(savedProjects.map(p => p.category).filter(Boolean))] as string[], [savedProjects]);
  const projectsByCategory = useMemo(() => {
    return savedProjects.reduce<Record<string, SavedProject[]>>((acc, project) => {
      const cat = project.category || '未分類';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(project);
      return acc;
    }, {});
  }, [savedProjects]);

  useEffect(() => {
    if (isOpen) {
      const projects = getSavedProjects();
      setSavedProjects(projects);
      const currentName = getCurrentProjectName();
      if (currentName) {
        const currentProject = projects.find(p => p.name === currentName);
        setProjectName(currentName);
        setCategory(currentProject?.category || '');
      } else {
        setProjectName('');
        setCategory('');
      }
      setExpandedCategories(new Set());
    }
  }, [isOpen, getCurrentProjectName]); // getSavedProjectsを依存配列から削除

  const handleSave = () => {
    const finalCategory = category.trim() || '未分類';
    if (projectName.trim()) {
      saveProject(projectName.trim(), finalCategory);
      setSavedProjects(getSavedProjects());
      setShowSaveForm(false);
      setExpandedCategories(prev => new Set(prev).add(finalCategory));
    }
  };

  const handleRestore = () => {
    if (restoreFromBackup()) {
      onClose();
      setTimeout(() => {
        alert("復元が完了しました。再度プロジェクト管理を開いてください。");
      }, 100);
    }
  };

  const handleLoad = (projectId: string) => { loadProject(projectId); onClose(); };
  const handleDelete = (projectId: string) => { if (confirm('このプロジェクトを削除してもよろしいですか？')) { deleteProject(projectId); setSavedProjects(getSavedProjects()); } };
  const toggleCategory = (cat: string) => setExpandedCategories(prev => { const newSet = new Set(prev); if (newSet.has(cat)) newSet.delete(cat); else newSet.add(cat); return newSet; });
  const formatDate = (date: string) => new Date(date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const getProjectDescription = (p: SavedProject) => `${p.pageData.components.length}個のコンポーネント • ${p.pageData.globalSettings.title}`;

  if (!isOpen) return null;

  // --- Styles (omitted for brevity) ---
  const overlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const modalStyle: React.CSSProperties = { backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', width: '100%', maxWidth: '800px', margin: '16px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' };
  const headerStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid #e5e7eb', flexShrink: 0 };
  const headerContentStyle: React.CSSProperties = { display: 'flex', alignItems: 'center' };
  const headerTitleStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 600, color: '#111827', marginLeft: '12px' };
  const closeButtonStyle: React.CSSProperties = { padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer' };
  const contentStyle: React.CSSProperties = { padding: '24px', overflowY: 'auto', flexGrow: 1 };
  const actionBarStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' };
  const currentProjectStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4b5563' };
  const buttonStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background-color 0.15s ease-in-out', gap: '8px' };
  const primaryButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: '#2563eb', color: '#ffffff' };
  const secondaryButtonStyle: React.CSSProperties = { ...buttonStyle, backgroundColor: '#f3f4f6', color: '#374151' };
  const saveFormStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' };
  const inputGroupStyle: React.CSSProperties = { display: 'flex', gap: '12px' };
  const inputStyle: React.CSSProperties = { flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none' };
  const projectListContainerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px' };
  const categoryHeaderStyle: React.CSSProperties = { fontSize: '16px', fontWeight: 600, color: '#111827', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: '#f9fafb' };
  const projectGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', paddingLeft: '16px', borderLeft: '2px solid #e5e7eb', marginLeft: '12px' };
  const projectCardStyle: React.CSSProperties = { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: '#ffffff', transition: 'box-shadow 0.15s ease-in-out', cursor: 'pointer' };
  const projectHeaderStyle: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' };
  const projectTitleStyle: React.CSSProperties = { fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '4px' };
  const projectDescStyle: React.CSSProperties = { fontSize: '14px', color: '#6b7280', marginBottom: '8px' };
  const projectMetaStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#9ca3af' };
  const projectActionsStyle: React.CSSProperties = { display: 'flex', gap: '8px' };
  const iconButtonStyle: React.CSSProperties = { padding: '4px', backgroundColor: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  const emptyStateStyle: React.CSSProperties = { textAlign: 'center', padding: '48px 24px', color: '#6b7280' };
  const emptyIconStyle: React.CSSProperties = { width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 16px' };
  const restoreButtonStyle: React.CSSProperties = { ...secondaryButtonStyle, backgroundColor: '#fefce8', color: '#a16207', border: '1px solid #facc15' };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}><FolderOpen size={24} color="#2563eb" /><h2 style={headerTitleStyle}>プロジェクト管理</h2></div>
          <button onClick={onClose} style={closeButtonStyle}><X size={20} color="#6b7280" /></button>
        </div>
        <div style={contentStyle}>
          <div style={actionBarStyle}>
            <div style={currentProjectStyle}><FileText size={16} /><span>現在のプロジェクト: {getCurrentProjectName() || '未保存'}</span></div>
            <button onClick={() => setShowSaveForm(!showSaveForm)} style={primaryButtonStyle}><Save size={16} />{getCurrentProjectName() ? '上書き保存' : 'プロジェクトを保存'}</button>
          </div>
          {showSaveForm && (
            <div style={saveFormStyle}>
              <div style={inputGroupStyle}>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="プロジェクト名を入力..." style={inputStyle} autoFocus />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="カテゴリ名（例：テンプレート）" style={inputStyle} list="category-suggestions" />
                <datalist id="category-suggestions">{categories.map(cat => <option key={cat} value={cat} />)}</datalist>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setShowSaveForm(false)} style={secondaryButtonStyle}>キャンセル</button>
                <button onClick={handleSave} disabled={!projectName.trim()} style={{ ...primaryButtonStyle, opacity: projectName.trim() ? 1 : 0.5 }}>保存</button>
              </div>
            </div>
          )}
          {savedProjects.length === 0 ? (
            <div style={emptyStateStyle}>
              <FolderOpen style={emptyIconStyle} />
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>保存されたプロジェクトがありません</h3>
              <p style={{marginBottom: '16px'}}>現在のページを保存して、後で編集を再開することが出来ます。</p>
              <button onClick={handleRestore} style={restoreButtonStyle}><ArchiveRestore size={16} />バックアップから復元</button>
            </div>
          ) : (
            <div style={projectListContainerStyle}>
              {Object.keys(projectsByCategory).sort().map(cat => (
                <div key={cat}>
                  <div onClick={() => toggleCategory(cat)} style={categoryHeaderStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={16} color="#4b5563"/>{cat} ({projectsByCategory[cat].length})</div>
                    <ChevronDown size={20} style={{ transform: expandedCategories.has(cat) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </div>
                  {expandedCategories.has(cat) && (
                    <div style={projectGridStyle}>
                      {projectsByCategory[cat].map((p) => (
                        <div key={p.id} style={projectCardStyle} onClick={() => handleLoad(p.id)}>
                          <div style={projectHeaderStyle}>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                              <h3 style={projectTitleStyle}>{p.name}</h3>
                              <p style={{...projectDescStyle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getProjectDescription(p)}</p>
                              <div style={projectMetaStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /><span>更新: {formatDate(p.updatedAt)}</span></div>
                              </div>
                            </div>
                            <div style={projectActionsStyle}>
                              <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} style={iconButtonStyle}><Trash2 size={16} color="#dc2626" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;