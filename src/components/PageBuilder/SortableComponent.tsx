import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { ComponentData } from '../../types';
import { usePageStore } from '../../store/usePageStore';
import ComponentRenderer from './ComponentRenderer';

interface SortableComponentProps {
  component: ComponentData;
  showAccessibilityToggle?: boolean;
  hasAccessibilityIssues?: boolean;
  onAccessibilityToggle?: () => void;
}

const SortableComponent: React.FC<SortableComponentProps> = ({ 
  component, 
  showAccessibilityToggle = false,
  hasAccessibilityIssues = false,
  onAccessibilityToggle
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const { selectedComponentId, selectComponent, deleteComponent } = usePageStore();
  const isSelected = selectedComponentId === component.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(component.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteComponent(component.id);
  };

  const handleAccessibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAccessibilityToggle) {
      onAccessibilityToggle();
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    outline: isSelected ? '2px solid #2563eb' : 'none',
    outlineOffset: isSelected ? '-2px' : '0',
    ...style,
  };

  const controlsStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    opacity: 0,
    transition: 'opacity 0.15s ease-in-out',
  };

  const controlButtonStyle: React.CSSProperties = {
    padding: '6px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease-in-out',
  };

  const dragButtonStyle: React.CSSProperties = {
    ...controlButtonStyle,
    cursor: 'grab',
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...controlButtonStyle,
    color: '#dc2626',
  };

  const accessibilityButtonStyle: React.CSSProperties = {
    ...controlButtonStyle,
    backgroundColor: hasAccessibilityIssues ? '#fef2f2' : '#ffffff',
    borderColor: hasAccessibilityIssues ? '#fecaca' : '#d1d5db',
    color: hasAccessibilityIssues ? '#dc2626' : '#6b7280',
  };

  const selectionIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    zIndex: 20,
    padding: '4px 8px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: '12px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const contentStyle: React.CSSProperties = {
    outline: isSelected ? '2px solid #2563eb inset' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      onClick={handleSelect}
      data-component-id={component.id}
      onMouseEnter={(e) => {
        const controls = e.currentTarget.querySelector('.component-controls') as HTMLElement;
        if (controls) {
          controls.style.opacity = '1';
        }
      }}
      onMouseLeave={(e) => {
        const controls = e.currentTarget.querySelector('.component-controls') as HTMLElement;
        if (controls && !isSelected) {
          controls.style.opacity = '0';
        }
      }}
    >
      {/* Component Controls */}
      <div 
        className="component-controls"
        style={{
          ...controlsStyle,
          opacity: isSelected ? 1 : 0,
        }}
      >
        {/* アクセシビリティチェックボタン（左端） */}
        {showAccessibilityToggle && hasAccessibilityIssues && (
          <button
            onClick={handleAccessibilityToggle}
            style={accessibilityButtonStyle}
            title="アクセシビリティチェックを表示"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hasAccessibilityIssues ? '#fecaca' : '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = hasAccessibilityIssues ? '#fef2f2' : '#ffffff';
            }}
          >
            <AlertTriangle size={12} />
          </button>
        )}
        
        {/* ドラッグボタン */}
        <button
          {...attributes}
          {...listeners}
          style={dragButtonStyle}
          title="Drag to reorder"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.cursor = 'grabbing';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.cursor = 'grab';
          }}
        >
          <GripVertical size={12} color="#9ca3af" />
        </button>
        
        {/* 削除ボタン（右端） */}
        <button
          onClick={handleDelete}
          style={deleteButtonStyle}
          title="Delete component"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fef2f2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div style={selectionIndicatorStyle}>
          <Eye size={12} />
          Selected
        </div>
      )}

      {/* Component Content */}
      <div style={contentStyle}>
        <ComponentRenderer component={component} />
      </div>
    </div>
  );
};

export default SortableComponent;