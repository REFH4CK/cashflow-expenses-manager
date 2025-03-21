import "@/css/anotherStyles.css";
import "@/css/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "@pheralb/toast";
import App from "./App.jsx";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        maxToasts={1}
        toastOptions={{
          defaultCloseContent: "X",
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
