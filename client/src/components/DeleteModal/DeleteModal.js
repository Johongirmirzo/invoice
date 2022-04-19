import React, { useContext, useState } from "react";
import { Typography, Button, TextField, Modal, Box } from "@mui/material";
import { ToggleModalContext } from "../../contexts/ToggleModal";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../../storage/localStorage";

import { styled } from "@mui/system";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "90%",
  background: "hsl(237,31%,17%)",
  color: "#fff",
  boxShadow: 24,
  padding: "32px",
});
const CancelBtn = styled("button")({
  position: "absolute",
  top: "10px",
  right: "32px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "30px",
  background: "transparent",
  cursor: "pointer",
  border: "1px solid hsl(237,31%,12%)",
  padding: "2px",
  boxShadow: "0 0 5px rgba(0,0,0,.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function DeleteModal({ invoiceId, deleteInvoice }) {
  const { isModalOpen, toggleModal } = useContext(ToggleModalContext);
  const [deleteEnablingMessage, setDeleteEnablingMessage] = useState("");
  const navigate = useNavigate();

  // console.log("Delete Modal", invoiceId);
  return (
    <div>
      <Modal
        keepMounted
        open={isModalOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ModalBox>
          <CancelBtn
            onClick={() => {
              setDeleteEnablingMessage("");
              toggleModal(false);
            }}
          >
            <AiOutlineClose />
          </CancelBtn>
          <Typography textAlign="center" variant="h3" component="h2">
            Delete an Invoice
          </Typography>
          <Typography sx={{ mt: 2, color: "lightgray" }}>
            You are deleting an invoice with the id of #{invoiceId?.slice(0, 7)}
            . You can NOT undo this action. So rethink this twice.
          </Typography>
          <Typography
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            Please type{" "}
            <Typography fontWeight="bold" mx={1} color="white">
              "I'm sure to delete this invoice"
            </Typography>{" "}
            to confirm.
          </Typography>
          <Box my={2}>
            <TextField
              fullWidth
              label="Delete an Invoice"
              variant="outlined"
              value={deleteEnablingMessage}
              onChange={(e) => setDeleteEnablingMessage(e.target.value)}
              sx={{
                backgroundColor: "hsl(235,30%,15%)",
                "& .MuiOutlinedInput-input": {
                  color: "#fff",
                },
                ".MuiInputLabel-root": {
                  color: "lightgray",
                },
                "::placeholder": {
                  color: "#fff",
                },
              }}
            />
          </Box>
          <Button
            disabled={
              deleteEnablingMessage === "I'm sure to delete this invoice"
                ? false
                : true
            }
            fullWidth
            sx={{
              textTransform: "capitalize",
              color: "#f85149",
              background: "hsl(237,31%,12%)",
              padding: "10px 0",
              "&:hover": {
                background: "hsl(237,31%,13%)",
              },
              "&:disabled": {
                color: "#f8514980",
              },
            }}
            onClick={() => {
              deleteInvoice(invoiceId);
              setDeleteEnablingMessage("");
              toggleModal(false);
              navigate("/");
            }}
          >
            I understand consequences. Delete this invoice
          </Button>
        </ModalBox>
      </Modal>
    </div>
  );
}

export default DeleteModal;
