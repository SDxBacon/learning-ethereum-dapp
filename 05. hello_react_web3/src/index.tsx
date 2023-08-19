import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Web3Provider from "./components/Web3Provider/Web3Provider";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>
);
