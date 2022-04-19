import React from "react";
import { Link } from "react-router-dom";

function AppLogo() {
  return (
    <Link to="/" style={{ color: "#fff", fontSize: "2rem" }}>
      Invoice App
    </Link>
  );
}

export default AppLogo;
