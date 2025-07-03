import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#111827',
    color: '#ffffff',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 16px',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth >= 1024 ? '2fr 1fr 1fr' : window.innerWidth >= 768 ? '2fr 1fr 1fr' : '1fr',
    gap: '32px',
  };

  const companyStyle: React.CSSProperties = {
    gridColumn: window.innerWidth >= 1024 ? 'span 2' : 'span 1',
  };

  const companyHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const companyIconStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
  };

  const companyTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
  };

  const copyrightStyle: React.CSSProperties = {
    borderTop: '1px solid #1f2937',
    marginTop: '32px',
    paddingTop: '32px',
    textAlign: 'center',
    color: '#9ca3af',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Company Info */}
          <div style={companyStyle}>
            <div style={companyHeaderStyle}>
              <div style={companyIconStyle}>
                <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}>LP</span>
              </div>
              <h3 style={companyTitleStyle}>LP Builder</h3>
            </div>

          </div>

        </div>

        {/* Copyright */}
        <div style={copyrightStyle}>
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;