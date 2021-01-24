import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import { RecoilRoot } from "recoil";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
