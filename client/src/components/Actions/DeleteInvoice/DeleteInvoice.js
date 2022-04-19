import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { FaTrashAlt } from "react-icons/fa";
import { ToggleModalContext } from "../../../contexts/ToggleModal";

function DeleteInvoice() {
  const { toggleModal } = useContext(ToggleModalContext);

  return (
    <Button fullWidth variant="contained" color="error" onClick={toggleModal}>
      <FaTrashAlt style={{ marginRight: "10px" }} />
      Delete Invoice
    </Button>
  );
}

export default DeleteInvoice;
