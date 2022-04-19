import React from "react";
import Button from "@mui/material/Button";
import { FaToggleOff } from "react-icons/fa";

function TogglePaidStatus({ invoice, togglePaidStatus, invoiceId, isPaid }) {
  console.log("Toggle Paid Status", isPaid);
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
      onClick={() => togglePaidStatus(invoiceId)}
    >
      <FaToggleOff style={{ marginRight: "10px" }} />
      Mark as {isPaid ? "Not Paid" : "Paid"}
    </Button>
  );
}

export default TogglePaidStatus;
