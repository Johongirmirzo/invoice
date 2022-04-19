import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { AiOutlineSend } from "react-icons/ai";
import { ToggleEmailModalContext } from "../../../contexts/ToggleEmailModal";

function SendInvoice({ convertToSentInvoice, isSent, invoiceId }) {
  const { toggleModal } = useContext(ToggleEmailModalContext);

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ marginBottom: "16px" }}
      onClick={() => {
        toggleModal();
        if (!isSent) {
          convertToSentInvoice(invoiceId);
        }
      }}
    >
      <AiOutlineSend style={{ marginRight: "10px" }} />
      Send Invoice
    </Button>
  );
}

export default SendInvoice;
