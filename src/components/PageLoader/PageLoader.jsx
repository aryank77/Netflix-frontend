import "./PageLoader.css";

/** Full-viewport loading spinner shown while a lazy-loaded route chunk downloads. */
function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <div className="page-loader-spinner" />
    </div>
  );
}

export default PageLoader;
