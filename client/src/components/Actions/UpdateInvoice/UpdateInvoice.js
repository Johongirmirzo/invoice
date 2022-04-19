import React from "react";
import Button from "@mui/material/Button";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function DownloadInvoice({ invoiceID }) {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        marginBottom: "16px",
        background: "#323e52",
        color: "#69809a",
        "&:hover": {
          background: "#323e52",
        },
      }}
    >
      <FaPencilAlt style={{ marginRight: "10px" }} />
      <Link to={`/edit/${invoiceID}`}>Edit Invoice</Link>
    </Button>
  );
}

export default DownloadInvoice;
