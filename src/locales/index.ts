import { en } from './en'
import { ru } from './ru'

export type Locale = 'en' | 'ru'

export const locales: Record<Locale, typeof en> = {
  en,
  ru
}

export const defaultLocale: Locale = 'en'

export type TranslationKey = keyof typeof en

export function getTranslation(key: TranslationKey, locale: Locale = defaultLocale): string {
  const translation = locales[locale]?.[key]
  if (translation === undefined) {
    console.warn(`Missing translation for key "${key}" in locale "${locale}"`)
    return locales[defaultLocale]?.[key] || key
  }
  return translation
}

export function getAllTranslations(locale: Locale = defaultLocale) {
  return locales[locale] || locales[defaultLocale]
}

// Helper function for string interpolation
export function t(
  key: TranslationKey, 
  locale: Locale = defaultLocale, 
  params?: Record<string, string | number>
): string {
  let translation = getTranslation(key, locale)
  
  if (params) {
    Object.keys(params).forEach(paramKey => {
      translation = translation.replace(`{${paramKey}}`, String(params[paramKey]))
    })
  }
  
  return translation
}
