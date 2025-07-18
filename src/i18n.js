import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ملفات الترجمة (تقدر تغيرهم بعدين)
import translationEN from './locales/en/translation.json'
import translationAR from './locales/ar/translation.json'

i18n
  .use(LanguageDetector) // ← بيكشف اللغة ويخزنها تلقائيًا
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    fallbackLng: 'en', // لو اللغة مش موجودة
    detection: {
      order: ['localStorage', 'navigator'], // منين يجيب اللغة
      caches: ['localStorage'], // فين يخزنها
    },
    interpolation: {
      escapeValue: false, // React بيأمن النصوص تلقائيًا
    },
  })

export default i18n