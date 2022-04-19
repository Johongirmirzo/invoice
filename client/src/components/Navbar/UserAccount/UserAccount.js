import React from "react";
import Button from "@mui/material/Button";
import { removeUser } from "../../../storage/localStorage";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";

function UserAccount({ user, getLoggedInUser }) {
  console.log(user);
  return (
    <div style={{ display: "flex", alignItems: "center", color: "white" }}>
      <p style={{ marginRight: "10px" }}>Hello {user?.username}</p>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          removeUser();
          getLoggedInUser(null);
        }}
      >
        <LogoutIcon sx={{ marginRight: "10px" }} />
        LogOut
      </Button>
    </div>
  );
}

export default UserAccount;
