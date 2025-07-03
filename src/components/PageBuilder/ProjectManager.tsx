import React, { useState } from 'react';
import { X, Save, FolderOpen, Trash2, Calendar, FileText, Plus } from 'lucide-react';
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
    pageData 
  } = usePageStore();
  
  const [projectName, setProjectName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setSavedProjects(getSavedProjects());
      const currentName = getCurrentProjectName();
      if (currentName) {
        setProjectName(currentName);
      }
    }
  }, [isOpen, getSavedProjects, getCurrentProjectName]);

  const handleSave = () => {
    if (projectName.trim()) {
      saveProject(projectName.trim());
      setSavedProjects(getSavedProjects());
      setShowSaveForm(false);
      setProjectName('');
    }
  };

  const handleLoad = (projectId: string) => {
    loadProject(projectId);
    onClose();
  };

  const handleDelete = (projectId: string) => {
    if (confirm('このプロジェクトを削除してもよろしいですか？')) {
      deleteProject(projectId);
      setSavedProjects(getSavedProjects());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProjectDescription = (project: SavedProject) => {
    const componentCount = project.pageData.components.length;
    const title = project.pageData.globalSettings.title;
    return `${componentCount}個のコンポーネント • ${title}`;
  };

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '800px',
    margin: '16px',
    maxHeight: '90vh',
    overflow: 'hidden',
    position: 'relative',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
  };

  const headerContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    marginLeft: '12px',
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 160px)',
  };

  const actionBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  };

  const currentProjectStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#4b5563',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    gap: '8px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: '#ffffff',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
  };

  const saveFormStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  };

  const projectGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  };

  const projectCardStyle: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#ffffff',
    transition: 'box-shadow 0.15s ease-in-out',
    cursor: 'pointer',
  };

  const projectHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '12px',
  };

  const projectTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    marginBottom: '4px',
  };

  const projectDescStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  };

  const projectMetaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    color: '#9ca3af',
  };

  const projectActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
  };

  const iconButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '48px 24px',
    color: '#6b7280',
  };

  const emptyIconStyle: React.CSSProperties = {
    width: '64px',
    height: '64px',
    color: '#d1d5db',
    margin: '0 auto 16px',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <FolderOpen size={24} color="#2563eb" />
            <h2 style={headerTitleStyle}>プロジェクト管理</h2>
          </div>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} color="#6b7280" />
          </button>
        </div>

        <div style={contentStyle}>
          {/* アクションバー */}
          <div style={actionBarStyle}>
            <div style={currentProjectStyle}>
              <FileText size={16} />
              <span>
                現在のプロジェクト: {getCurrentProjectName() || '未保存'}
              </span>
            </div>
            <button
              onClick={() => setShowSaveForm(!showSaveForm)}
              style={primaryButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              <Save size={16} />
              プロジェクトを保存
            </button>
          </div>

          {/* 保存フォーム */}
          {showSaveForm && (
            <div style={saveFormStyle}>
              <Save size={16} color="#0369a1" />
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="プロジェクト名を入力..."
                style={inputStyle}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  }
                }}
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={!projectName.trim()}
                style={{
                  ...primaryButtonStyle,
                  opacity: projectName.trim() ? 1 : 0.5,
                }}
              >
                保存
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setProjectName('');
                }}
                style={secondaryButtonStyle}
              >
                キャンセル
              </button>
            </div>
          )}

          {/* プロジェクト一覧 */}
          {savedProjects.length === 0 ? (
            <div style={emptyStateStyle}>
              <FolderOpen style={emptyIconStyle} />
              <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>
                保存されたプロジェクトがありません
              </h3>
              <p style={{ marginBottom: '16px' }}>
                現在のページを保存して、後で編集を続けることができます。
              </p>
              <button
                onClick={() => setShowSaveForm(true)}
                style={primaryButtonStyle}
              >
                <Plus size={16} />
                最初のプロジェクトを保存
              </button>
            </div>
          ) : (
            <div style={projectGridStyle}>
              {savedProjects.map((project) => (
                <div
                  key={project.id}
                  style={projectCardStyle}
                  onClick={() => handleLoad(project.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={projectHeaderStyle}>
                    <div style={{ flex: 1 }}>
                      <h3 style={projectTitleStyle}>{project.name}</h3>
                      <p style={projectDescStyle}>
                        {getProjectDescription(project)}
                      </p>
                      <div style={projectMetaStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} />
                          <span>作成: {formatDate(project.createdAt)}</span>
                        </div>
                        {project.updatedAt !== project.createdAt && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>更新: {formatDate(project.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={projectActionsStyle}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                        style={iconButtonStyle}
                        title="プロジェクトを削除"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fef2f2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </button>
                    </div>
                  </div>
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