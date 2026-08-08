import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        if (!user.email || !user.password) {
            return toast.error("Please fill all fields");
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "https://netflix-backend-bkz0.onrender.com/api/auth/login",
                user
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Welcome back!");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-box">
                <h1>{t("auth_login")}</h1>

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

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Signing In..." : t("auth_login")}
                </button>

                <p>
                    New to Netflix?{" "}
                    <Link to="/signup">
                        <span>Sign up now.</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;