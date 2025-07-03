import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye, X } from 'lucide-react';
import { ComponentData } from '../../types';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

interface AccessibilityCheckerProps {
  component: ComponentData;
  isVisible: boolean;
  onClose: () => void;
}

const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({ component, isVisible, onClose }) => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);

  // 色のコントラスト比を計算する関数
  const calculateContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (color: string): number => {
      // HEXカラーをRGBに変換
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;

      // 相対輝度を計算
      const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  };

  // アクセシビリティチェックを実行
  useEffect(() => {
    const checkAccessibility = () => {
      const newIssues: AccessibilityIssue[] = [];
      const { style } = component;

      if (style?.backgroundColor && style?.textColor) {
        const contrastRatio = calculateContrastRatio(style.backgroundColor, style.textColor);
        
        if (contrastRatio < 3) {
          newIssues.push({
            type: 'error',
            message: `コントラスト比が不十分です (${contrastRatio.toFixed(2)}:1)`,
            suggestion: 'WCAG AA基準では4.5:1以上、AAA基準では7:1以上のコントラスト比が推奨されています。'
          });
        } else if (contrastRatio < 4.5) {
          newIssues.push({
            type: 'warning',
            message: `コントラスト比がAA基準を下回っています (${contrastRatio.toFixed(2)}:1)`,
            suggestion: 'WCAG AA基準の4.5:1以上にすることを推奨します。'
          });
        } else if (contrastRatio < 7) {
          newIssues.push({
            type: 'info',
            message: `コントラスト比はAA基準を満たしています (${contrastRatio.toFixed(2)}:1)`,
            suggestion: 'AAA基準の7:1以上にするとより良いアクセシビリティを提供できます。'
          });
        } else {
          newIssues.push({
            type: 'info',
            message: `優秀なコントラスト比です (${contrastRatio.toFixed(2)}:1)`,
            suggestion: 'WCAG AAA基準を満たしており、優れたアクセシビリティを提供しています。'
          });
        }
      }

      // 色の組み合わせの視認性チェック
      if (style?.backgroundColor && style?.textColor) {
        const bgColor = style.backgroundColor.toLowerCase();
        const textColor = style.textColor.toLowerCase();
        
        // 類似色の警告
        if (bgColor === textColor) {
          newIssues.push({
            type: 'error',
            message: '背景色と文字色が同じです',
            suggestion: '文字が見えません。異なる色を選択してください。'
          });
        }
        
        // 色覚異常への配慮
        const isRedGreenCombination = (
          (bgColor.includes('red') || bgColor.includes('#ff') || bgColor.includes('#f00')) &&
          (textColor.includes('green') || textColor.includes('#0f') || textColor.includes('#00ff00'))
        ) || (
          (bgColor.includes('green') || bgColor.includes('#0f') || bgColor.includes('#00ff00')) &&
          (textColor.includes('red') || textColor.includes('#ff') || textColor.includes('#f00'))
        );
        
        if (isRedGreenCombination) {
          newIssues.push({
            type: 'warning',
            message: '赤と緑の組み合わせが検出されました',
            suggestion: '色覚異常の方には区別が困難な場合があります。他の色の組み合わせを検討してください。'
          });
        }
      }

      // フォントサイズのチェック（コンポーネントタイプに応じて）
      if (component.type === 'kv') {
        newIssues.push({
          type: 'info',
          message: 'KVコンポーネントのテキストサイズ',
          suggestion: 'メインタイトルは最低24px以上、説明文は16px以上を推奨します。'
        });
      }

      setIssues(newIssues);
    };

    checkAccessibility();
  }, [component.style?.backgroundColor, component.style?.textColor, component.type]);

  // エラーまたは警告がある場合のみ表示
  const hasWarningsOrErrors = issues.some(issue => issue.type === 'error' || issue.type === 'warning');

  if (!isVisible || issues.length === 0) {
    return null;
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle size={16} color="#dc2626" />;
      case 'warning':
        return <AlertTriangle size={16} color="#f59e0b" />;
      case 'info':
        return <CheckCircle size={16} color="#10b981" />;
      default:
        return <Eye size={16} color="#6b7280" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error':
        return '#fef2f2';
      case 'warning':
        return '#fffbeb';
      case 'info':
        return '#f0fdf4';
      default:
        return '#f9fafb';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'error':
        return '#fecaca';
      case 'warning':
        return '#fed7aa';
      case 'info':
        return '#bbf7d0';
      default:
        return '#e5e7eb';
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '40px',
    right: '8px',
    zIndex: 30,
    width: '300px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    maxHeight: '400px',
    overflowY: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  };

  const headerContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease-in-out',
  };

  const contentStyle: React.CSSProperties = {
    padding: '12px',
  };

  const issueItemStyle: React.CSSProperties = {
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid',
  };

  const issueHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px',
    fontSize: '12px',
    fontWeight: 500,
  };

  const suggestionStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#6b7280',
    lineHeight: '1.4',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <Eye size={16} color="#2563eb" />
          アクセシビリティチェック
        </div>
        <button
          onClick={onClose}
          style={closeButtonStyle}
          title="閉じる"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={16} color="#6b7280" />
        </button>
      </div>
      
      <div style={contentStyle}>
        {issues.map((issue, index) => (
          <div
            key={index}
            style={{
              ...issueItemStyle,
              backgroundColor: getIssueColor(issue.type),
              borderColor: getBorderColor(issue.type),
            }}
          >
            <div style={issueHeaderStyle}>
              {getIssueIcon(issue.type)}
              <span>{issue.message}</span>
            </div>
            <div style={suggestionStyle}>
              {issue.suggestion}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityChecker;