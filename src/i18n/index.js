import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./resources";

// The key used to persist the selected language across page refreshes.
export const LANGUAGE_STORAGE_KEY = "app_language";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      // Check localStorage first so a previously chosen language is
      // restored immediately on refresh, before falling back to the
      // browser's own language settings.
      order: ["localStorage", "navigator"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ["localStorage"],
    },
  });

export default i18n;
