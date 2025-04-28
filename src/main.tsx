
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@/styles/roi-tracker.css"; // Import our ROI tracker styles
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ShadcnToaster />
    <SonnerToaster />
  </React.StrictMode>
);
