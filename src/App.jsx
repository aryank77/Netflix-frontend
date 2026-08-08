import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PageLoader from "./components/PageLoader/PageLoader";

// Route-level code splitting: each page is only downloaded when the user
// actually navigates to it, instead of bundling the entire app into one
// large initial payload. Login/Signup stay eager since they're the very
// first thing a logged-out visitor needs.
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const Home = lazy(() => import("./pages/Home/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails"));
const SearchResults = lazy(() => import("./pages/SearchResults/SearchResults"));
const TVShows = lazy(() => import("./pages/TVShows/TVShows"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const NewPopular = lazy(() => import("./pages/NewPopular/NewPopular"));
const MyList = lazy(() => import("./pages/MyList/MyList"));

// Footer / info pages
const InfoPage = lazy(() => import("./pages/InfoPages/InfoPage"));
const FAQ = lazy(() => import("./pages/InfoPages/FAQ"));
const HelpCenter = lazy(() => import("./pages/InfoPages/HelpCenter"));
const ContactUs = lazy(() => import("./pages/InfoPages/ContactUs"));
const SpeedTest = lazy(() => import("./pages/InfoPages/SpeedTest"));
const CookiePreferences = lazy(() => import("./pages/InfoPages/CookiePreferences"));
const Account = lazy(() => import("./pages/InfoPages/Account"));
const OnlyOnNetflix = lazy(() => import("./pages/InfoPages/OnlyOnNetflix"));

// Profile / account management pages
const ManageProfile = lazy(() => import("./pages/ManageProfile/ManageProfile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const WatchHistory = lazy(() => import("./pages/WatchHistory/WatchHistory"));
const Plans = lazy(() => import("./pages/Plans/Plans"));

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/tv"
            element={isLoggedIn ? <TVShows /> : <Navigate to="/login" />}
          />

          <Route
            path="/movies"
            element={isLoggedIn ? <Movies /> : <Navigate to="/login" />}
          />

          <Route
            path="/new-popular"
            element={isLoggedIn ? <NewPopular /> : <Navigate to="/login" />}
          />

          <Route
            path="/my-list"
            element={isLoggedIn ? <MyList /> : <Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/movie/:id"
            element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />}
          />

          <Route
            path="/search"
            element={isLoggedIn ? <SearchResults /> : <Navigate to="/login" />}
          />

          {/* Footer / info pages — publicly accessible, like real Netflix's
              legal & support pages, so they work whether or not the user is
              logged in. */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/speed-test" element={<SpeedTest />} />
          <Route path="/cookie-preferences" element={<CookiePreferences />} />
          <Route path="/media-center" element={<InfoPage slug="media-center" />} />
          <Route path="/investor-relations" element={<InfoPage slug="investor-relations" />} />
          <Route path="/jobs" element={<InfoPage slug="jobs" />} />
          <Route path="/ways-to-watch" element={<InfoPage slug="ways-to-watch" />} />
          <Route path="/terms-of-use" element={<InfoPage slug="terms-of-use" />} />
          <Route path="/privacy" element={<InfoPage slug="privacy" />} />
          <Route path="/corporate-information" element={<InfoPage slug="corporate-information" />} />
          <Route path="/legal-notices" element={<InfoPage slug="legal-notices" />} />
          <Route path="/plans" element={<Plans />} />

          {/* Requires login, consistent with other member-only routes above */}
          <Route
            path="/account"
            element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
          />
          <Route
            path="/only-on-netflix"
            element={isLoggedIn ? <OnlyOnNetflix /> : <Navigate to="/login" />}
          />
          <Route
            path="/manage-profile"
            element={isLoggedIn ? <ManageProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/watch-history"
            element={isLoggedIn ? <WatchHistory /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
