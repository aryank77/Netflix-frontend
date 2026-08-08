import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";

import "../InfoPages/InfoPage.css";
import "./Plans.css";
import { PLANS, PLAN_STORAGE_KEY, getSavedPlan } from "../../data/plans";

function Plans() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");
  const prefillEmail = location.state?.email || "";
  const currentPlan = getSavedPlan();

  const handleChoosePlan = (plan) => {
    localStorage.setItem(PLAN_STORAGE_KEY, plan.id);
    toast.success(`${plan.name} plan selected`);

    if (isLoggedIn) {
      // Already a member (e.g. came here from Account > Change Plan) —
      // there's nowhere else to send them, just confirm and go back.
      navigate("/account");
    } else {
      navigate("/signup", { state: { email: prefillEmail, plan: plan.id } });
    }
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

      <div className="info-page-container plans-container">
        <h1 className="info-title">Choose the plan that's right for you</h1>
        <p className="info-subtitle">
          Switch plans or cancel anytime — no commitments, no contracts.
        </p>

        {currentPlan && (
          <p className="plans-current-note">
            You're currently on the <strong>{currentPlan.name}</strong> plan.
          </p>
        )}

        <div className="plans-table-wrap">
          <table className="plans-table">
            <thead>
              <tr>
                <th className="plans-row-label" scope="col"></th>
                {PLANS.map((plan) => (
                  <th key={plan.id} scope="col">
                    {plan.recommended && (
                      <span className="plans-recommended-tag">
                        Most Popular
                      </span>
                    )}
                    <span className="plans-name">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="plans-price-row">
                <th scope="row" className="plans-row-label">
                  Monthly price
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>
                    <span className="plans-price">₹{plan.price}</span>
                    <span className="plans-price-suffix">/month</span>
                  </td>
                ))}
              </tr>

              <tr className="plans-cta-row">
                <th scope="row" className="plans-row-label"></th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>
                    <button
                      type="button"
                      className={`plans-cta-btn ${
                        currentPlan?.id === plan.id ? "current" : ""
                      }`}
                      onClick={() => handleChoosePlan(plan)}
                      disabled={currentPlan?.id === plan.id}
                    >
                      {currentPlan?.id === plan.id
                        ? "Current Plan"
                        : isLoggedIn
                        ? "Switch to This Plan"
                        : "Choose Plan"}
                    </button>
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Video and sound quality
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>{plan.quality}</td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Resolution
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>{plan.resolution}</td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Supported devices
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>{plan.devices}</td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Watch on devices at the same time
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>{plan.screens}</td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Download devices
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>{plan.downloadDevices}</td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Ultra HD (4K) &amp; HDR
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>
                    {plan.ultraHD ? (
                      <FiCheck className="plans-check" aria-label="Included" />
                    ) : (
                      <span className="plans-dash" aria-label="Not included">
                        —
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <th scope="row" className="plans-row-label">
                  Spatial Audio
                </th>
                {PLANS.map((plan) => (
                  <td key={plan.id}>
                    {plan.spatialAudio ? (
                      <FiCheck className="plans-check" aria-label="Included" />
                    ) : (
                      <span className="plans-dash" aria-label="Not included">
                        —
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="plans-footnote">
          Prices shown are for demo purposes and mirror Netflix India's
          published rates. No real payment is collected on this site.
        </p>
      </div>
    </div>
  );
}

export default Plans;
