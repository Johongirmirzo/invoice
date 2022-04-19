import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ModalContext from "./contexts/ToggleModal";
import EmailModalContext from "./contexts/ToggleEmailModal";

ReactDOM.render(
  <React.StrictMode>
    <ModalContext>
      <EmailModalContext>
        <App />
      </EmailModalContext>
    </ModalContext>
  </React.StrictMode>,
  document.getElementById("root")
);
