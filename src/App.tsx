import React from 'react';
import { usePageStore } from './store/usePageStore';
import ComponentLibrary from './components/PageBuilder/ComponentLibrary';
import Canvas from './components/PageBuilder/Canvas';
import PropertiesPanel from './components/PageBuilder/PropertiesPanel';
import Toolbar from './components/PageBuilder/Toolbar';

function App() {
  const { previewMode, showComponentLibrary, showPropertiesPanel } = usePageStore();

  const appStyle: React.CSSProperties = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  };

  if (previewMode) {
    return (
      <div style={appStyle}>
        <Toolbar />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Canvas />
        </div>
      </div>
    );
  }

  return (
    <div style={appStyle}>
      <Toolbar />
      <div style={mainStyle}>
        {showComponentLibrary && <ComponentLibrary />}
        <Canvas />
        {showPropertiesPanel && <PropertiesPanel />}
      </div>
    </div>
  );
}

export default App;