import { DesignPattern } from '../types';

export const designPatterns: Record<string, DesignPattern[]> = {
  kv: [
    {
      id: 'kv-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#111827',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        buttonBackgroundColor: '#2563eb',
        buttonTextColor: '#ffffff',
        accentColor: '#2563eb',
      }
    },
    {
      id: 'kv-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#f1f5f9',
        headlineColor: '#ffffff',
        descriptionColor: '#cbd5e1',
        buttonBackgroundColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        accentColor: '#06b6d4',
      }
    }
  ],
  features: [
    {
      id: 'features-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        cardBackgroundColor: '#f9fafb',
        cardTextColor: '#374151',
        accentColor: '#3b82f6',
      }
    },
    {
      id: 'features-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
        accentColor: '#00d4aa',
      }
    }
  ],
  cta: [
    {
      id: 'cta-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#2563eb',
        textColor: '#ffffff',
        headlineColor: '#ffffff',
        descriptionColor: '#dbeafe',
        buttonBackgroundColor: '#ffffff',
        buttonTextColor: '#2563eb',
        accentColor: '#ffffff',
      }
    },
    {
      id: 'cta-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#f1f5f9',
        headlineColor: '#ffffff',
        descriptionColor: '#cbd5e1',
        buttonBackgroundColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        accentColor: '#06b6d4',
      }
    }
  ],
  testimonials: [
    {
      id: 'testimonials-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        cardBackgroundColor: '#f9fafb',
        cardTextColor: '#374151',
        accentColor: '#fbbf24',
      }
    },
    {
      id: 'testimonials-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
        accentColor: '#fbbf24',
      }
    }
  ],
  faq: [
    {
      id: 'faq-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        cardBackgroundColor: '#f9fafb',
        cardTextColor: '#374151',
        accentColor: '#3b82f6',
      }
    },
    {
      id: 'faq-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
        accentColor: '#00d4aa',
      }
    }
  ],
  pricing: [
    {
      id: 'pricing-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#f3f4f6',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        accentColor: '#dc2626',
        cardBackgroundColor: '#ffffff',
        cardTextColor: '#374151',
      }
    },
    {
      id: 'pricing-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#1b1b1b',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        accentColor: '#dc2626',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
      }
    }
  ],
  'program-hero': [
    {
      id: 'program-hero-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        buttonBackgroundColor: '#dc2626',
        buttonTextColor: '#ffffff',
        cardBackgroundColor: '#f8fafc',
        cardTextColor: '#374151',
      }
    },
    {
      id: 'program-hero-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        buttonBackgroundColor: '#dc2626',
        buttonTextColor: '#ffffff',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
      }
    }
  ],
  'app-intro': [
    {
      id: 'app-intro-light',
      name: 'ライトモード',
      description: '明るく読みやすい標準的なデザイン',
      style: {
        backgroundColor: '#f8fafc',
        textColor: '#374151',
        headlineColor: '#111827',
        descriptionColor: '#6b7280',
        buttonBackgroundColor: '#000000',
        buttonTextColor: '#ffffff',
        cardBackgroundColor: '#ffffff',
        cardTextColor: '#374151',
        accentColor: '#3b82f6',
      }
    },
    {
      id: 'app-intro-dark',
      name: 'ダークモード',
      description: 'ダークテーマで洗練された印象を与えるデザイン',
      style: {
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        headlineColor: '#f1f5f9',
        descriptionColor: '#cbd5e1',
        buttonBackgroundColor: '#000000',
        buttonTextColor: '#ffffff',
        cardBackgroundColor: '#1e293b',
        cardTextColor: '#e2e8f0',
        accentColor: '#06b6d4',
      }
    }
  ]
};