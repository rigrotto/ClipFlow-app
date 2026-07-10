import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClipStoreProvider } from "./stores/ClipStore";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClipStoreProvider>
      <App />
    </ClipStoreProvider>
  </React.StrictMode>
);