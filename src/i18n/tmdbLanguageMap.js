// Maps our i18next language codes to the region-specific codes TMDB expects.
// TMDB generally wants a full locale (e.g. "hi-IN") rather than a bare
// language code, so this keeps that mapping in one place.
const TMDB_LANGUAGE_MAP = {
  en: "en-US",
  hi: "hi-IN",
  bn: "bn-BD",
  ta: "ta-IN",
  te: "te-IN",
  ml: "ml-IN",
  kn: "kn-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
  ar: "ar-SA",
  ru: "ru-RU",
};

/**
 * Returns the TMDB locale string for a given app language code.
 * Falls back to English if the language isn't recognized or TMDB doesn't
 * have solid coverage for it (some regional languages return partial data
 * from TMDB, but the request itself is still valid).
 */
export function getTmdbLanguage(langCode) {
  const base = (langCode || "en").split("-")[0];
  return TMDB_LANGUAGE_MAP[base] || "en-US";
}

export default TMDB_LANGUAGE_MAP;
