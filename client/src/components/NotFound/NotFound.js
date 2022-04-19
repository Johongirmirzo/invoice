import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Wrapper } from "../../App";

const NotFoundBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
function NotFound() {
  return (
    <NotFoundBox>
      <Typography variant="h2" textAlign="center" color="white">
        404 Not Found!
      </Typography>

      <Box textAlign="center" mt={4}>
        <Link to="/" style={{ color: "#8056f3", fontSize: "20px" }}>
          <FaHome mr={2} /> Go Back to Home Page
        </Link>
      </Box>
    </NotFoundBox>
  );
}

export default NotFound;
