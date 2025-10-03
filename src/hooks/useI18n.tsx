import React, { createContext, useContext, useState, useEffect } from 'react'
import { Locale, defaultLocale, getAllTranslations, t as translateFn, TranslationKey } from '../locales'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  translations: Record<string, string>
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Load saved locale from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem('game-locale') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru')) {
      setLocaleState(savedLocale)
    }
  }, [])

  // Save locale to localStorage when it changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('game-locale', newLocale)
  }

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    return translateFn(key, locale, params)
  }

  const translations = getAllTranslations(locale)

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    translations
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Convenience hook for just getting the translation function
export function useTranslations() {
  const { t } = useI18n()
  return t
}
