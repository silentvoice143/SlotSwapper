import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./libs/components/ui/sonner.tsx";
import StoreProvider from "./libs/store/storeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <App />
      <Toaster />
    </StoreProvider>
  </StrictMode>
);
