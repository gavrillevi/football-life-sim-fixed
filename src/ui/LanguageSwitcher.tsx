import React from 'react'
import { useI18n } from '../hooks/useI18n'
import { Locale } from '../locales'

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <span style={{ color: 'var(--text-secondary)' }}>🌐</span>
      <button
        onClick={() => handleLanguageChange('en')}
        style={{
          background: locale === 'en' ? 'var(--accent-blue)' : 'transparent',
          color: locale === 'en' ? 'white' : 'var(--text-primary)',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s ease'
        }}
      >
        EN
      </button>
      <span style={{ color: 'var(--text-secondary)' }}>|</span>
      <button
        onClick={() => handleLanguageChange('ru')}
        style={{
          background: locale === 'ru' ? 'var(--accent-blue)' : 'transparent',
          color: locale === 'ru' ? 'white' : 'var(--text-primary)',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          transition: 'all 0.2s ease'
        }}
      >
        RU
      </button>
    </div>
  )
}
