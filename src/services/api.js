import axios from "axios";
import { getTmdbLanguage } from "../i18n/tmdbLanguageMap";
import { LANGUAGE_STORAGE_KEY } from "../i18n";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 20000,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Attach the current app language to every TMDB request so movie/TV data
// (titles, overviews) comes back in the user's selected language whenever
// TMDB has a translation available. Reading directly from localStorage
// (rather than importing i18n's runtime instance) keeps this file free of
// a circular dependency with the i18n module.
api.interceptors.request.use((config) => {
  const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  config.params = {
    ...config.params,
    language: getTmdbLanguage(savedLang),
  };
  return config;
});

export default api;
