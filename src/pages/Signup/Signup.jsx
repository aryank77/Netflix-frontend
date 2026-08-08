import "./Signup.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { PLAN_STORAGE_KEY, getPlanById } from "../../data/plans";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const selectedPlan = getPlanById(location.state?.plan);

  const [user, setUser] = useState({
    name: "",
    email: location.state?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://netflix-backend-bkz0.onrender.com/api/auth/signup",
        user
      );

      // The plan chosen on /plans has no home on the backend (User model
      // has no billing field), so it's kept client-side, the same way
      // watch history / cookie preferences already are in this app.
      if (selectedPlan) {
        localStorage.setItem(PLAN_STORAGE_KEY, selectedPlan.id);
      }

      toast.success(res.data.message || "Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h1>{t("auth_signup")}</h1>

        {selectedPlan && (
          <p className="signup-plan-note">
            You're signing up for the <strong>{selectedPlan.name}</strong>{" "}
            plan (₹{selectedPlan.price}/month).{" "}
            <Link to="/plans">Change plan</Link>
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder={t("auth_name")}
          value={user.name}
          onChange={handleChange}
          aria-label={t("auth_name")}
        />

        <input
          type="email"
          name="email"
          placeholder={t("auth_email")}
          value={user.email}
          onChange={handleChange}
          aria-label={t("auth_email")}
        />

        <input
          type="password"
          name="password"
          placeholder={t("auth_password")}
          value={user.password}
          onChange={handleChange}
          aria-label={t("auth_password")}
        />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : t("auth_signup")}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;