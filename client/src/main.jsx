import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";

import App from "./App";
import "./index.css";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain="mumbai"
    clientId="eb45707ead633f90481a63f25026683f"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
