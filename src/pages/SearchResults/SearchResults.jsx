import "./SearchResults.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import api from "../../services/api";
import requests from "../../services/requests";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import PosterSkeleton from "../../components/Skeletons/PosterSkeleton";
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from "../../utils/recentSearches";

const DEBOUNCE_MS = 500;

function SearchResults() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(Boolean(initialQuery));
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());

  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus the search input when the page opens, like Netflix's search overlay.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await api.get(requests.searchMovies(searchTerm));
      // Only keep results that actually have a poster so the grid looks clean.
      setResults((res.data.results || []).filter((m) => m.poster_path));
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce live search: wait for the user to pause typing before calling
  // the API, and keep the URL's query param in sync for shareable/back-button links.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchParams(query ? { query } : {}, { replace: true });
      runSearch(query);

      if (query.trim()) {
        setRecentSearches(addRecentSearch(query));
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-page-content">
        <div className="search-input-wrapper">
          <FaSearch className="search-page-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="search-page-input"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("search_placeholder")}
          />
          {query && (
            <button
              className="search-page-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Recent searches — only shown before a search is actively typed */}
        {!hasSearched && recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-searches-header">
              <h3>{t("search_recent")}</h3>
              <button onClick={handleClearRecent} className="recent-clear-btn">
                {t("search_clear")}
              </button>
            </div>
            <div className="recent-chips">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  className="recent-chip"
                  onClick={() => handleRecentClick(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="search-results-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <PosterSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <p className="search-no-results">
            {t("search_no_results")} "{query}"
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="search-results-grid">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
