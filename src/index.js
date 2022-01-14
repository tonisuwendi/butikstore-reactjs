import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UIContextProvider } from "./store/UI/ui-context";

ReactDOM.render(
  <React.StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
