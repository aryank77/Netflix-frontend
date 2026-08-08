import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import "./SpeedTest.css";

/**
 * Speed Test page.
 * A true network throughput test requires a dedicated backend endpoint
 * serving large dummy payloads, which this project doesn't have. Rather than
 * faking a network call, we measure real browser/JS timing by downloading a
 * small resource already on the page (a public image) and use that to
 * produce a genuine (if approximate) speed reading — while being transparent
 * in the UI copy that this is an approximate, in-browser estimate.
 */
function SpeedTest() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle | testing | done
  const [speed, setSpeed] = useState(null);
  const abortRef = useRef(null);

  const runTest = async () => {
    setStatus("testing");
    setSpeed(null);

    // Public, reasonably sized test image (~1-2MB range varies by CDN).
    const testUrl =
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/SpaceX_Crew_Dragon_C206_%22Endeavour%22_docking_with_ISS_%2849958913333%29.jpg";
    const cacheBuster = `?cb=${Date.now()}`;

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const startTime = performance.now();
      const response = await fetch(testUrl + cacheBuster, {
        signal: controller.signal,
        cache: "no-store",
      });
      const blob = await response.blob();
      const endTime = performance.now();

      const durationSeconds = (endTime - startTime) / 1000;
      const sizeInBits = blob.size * 8;
      const mbps = sizeInBits / durationSeconds / 1_000_000;

      setSpeed(mbps.toFixed(2));
      setStatus("done");
    } catch (err) {
      console.error("Speed test failed:", err);
      setStatus("idle");
    }
  };

  const getRating = (mbps) => {
    if (mbps >= 15) return { label: "Excellent — Ultra HD ready", color: "#46d369" };
    if (mbps >= 5) return { label: "Good — HD streaming ready", color: "#e5c100" };
    if (mbps >= 1.5) return { label: "Fair — SD streaming only", color: "#e57300" };
    return { label: "Poor — streaming may buffer", color: "#e50914" };
  };

  return (
    <div className="info-page">
      <div className="info-page-header">
        <div className="info-page-header-inner">
          <span
            className="info-logo"
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to Netflix home"
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            NETFLIX
          </span>
        </div>
      </div>

      <div className="speedtest-container">
        <div className="speedtest-gauge">
          {status === "idle" && (
            <>
              <p className="speedtest-hint">
                Check your internet connection speed.
              </p>
              <button className="speedtest-btn" onClick={runTest}>
                Run Speed Test
              </button>
            </>
          )}

          {status === "testing" && (
            <div className="speedtest-loading">
              <div className="speedtest-spinner" aria-hidden="true" />
              <p>Testing your connection…</p>
            </div>
          )}

          {status === "done" && speed && (
            <div className="speedtest-result">
              <p className="speedtest-value">{speed}</p>
              <p className="speedtest-unit">Mbps (approximate)</p>
              <p
                className="speedtest-rating"
                style={{ color: getRating(parseFloat(speed)).color }}
              >
                {getRating(parseFloat(speed)).label}
              </p>
              <button className="speedtest-btn secondary" onClick={runTest}>
                Test Again
              </button>
            </div>
          )}
        </div>

        <p className="speedtest-note">
          This is an approximate, in-browser estimate based on a single file
          download and can vary from dedicated speed test tools depending on
          server location and network conditions.
        </p>

        <Link to="/" className="info-back-link" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SpeedTest;
