import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from './app/page';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <IndexPage />
  </React.StrictMode>
);
