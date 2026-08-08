import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./i18n"; // initialize react-i18next before the app renders
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#141414",
            color: "#fff",
            border: "1px solid #E50914",
            borderRadius: "8px",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);