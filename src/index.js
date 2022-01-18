import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UIContextProvider } from "./store/UI/ui-context";

ReactDOM.render(
  <React.StrictMode>
    <UIContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UIContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
