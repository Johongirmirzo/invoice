import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

function CreateNewInvoiceBtn() {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        position: "relative",
        borderRadius: "30px",
        padding: "15px 20px",
        backgroundColor: "hsl(252,88%,66%)",
        "&:hover": {
          backgroundColor: "hsl(252,88%,60%)",
        },
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          marginRight: "20px",
          backgroundColor: "#fff",
          color: "hsl(252,88%,66%)",
          fontWeight: "bold",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +
      </span>
      <Link to="/create" style={{ marginLeft: "30px" }}>
        Create Invoice
      </Link>
    </Button>
  );
}

export default CreateNewInvoiceBtn;
