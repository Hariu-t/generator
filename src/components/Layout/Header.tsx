import React from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoIconStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const logoTextStyle: React.CSSProperties = {
    marginLeft: '12px',
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* Logo */}
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}>LP</span>
            </div>
            <div style={logoTextStyle}>
              <h1>LP Builder</h1>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;