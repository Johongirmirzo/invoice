import React from "react";
import { AppLogo, ToggleTheme, UserAccount } from "./index";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Wrapper } from "../../App";

const Header = styled("header")({
  background: "hsl(235,30%,17%)",
  boxShadow: "0 0 15px rgba(0,0,0,.2)",
  padding: "15px 0",
});
const HeaderNav = styled("nav")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const HeaderBox = styled("div")({
  display: "flex",
  alignItems: "center",
});

function Navbar({ getLoggedInUser, user }) {
  return (
    <Header>
      <Wrapper>
        <HeaderNav>
          <AppLogo />
          <UserAccount user={user} getLoggedInUser={getLoggedInUser} />
        </HeaderNav>
      </Wrapper>
    </Header>
  );
}

export default Navbar;
