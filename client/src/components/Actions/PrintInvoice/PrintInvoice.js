import React from "react";
import { FaPrint } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useReactToPrint } from "react-to-print";

function PrintInvoice({ val }) {
  const handleClick = useReactToPrint({
    content: () => val.current,
  });
  console.log(val);
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
      onClick={handleClick}
    >
      <FaPrint style={{ marginRight: "10px" }} /> Print Invoice
    </Button>
  );
}

export default PrintInvoice;
