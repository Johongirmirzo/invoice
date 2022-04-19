import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { ToggleEmailModalContext } from "../../contexts/ToggleEmailModal";
import { styled } from "@mui/system";
import { BiLink } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { Formik, Form, Field, getIn, useFormik } from "formik";

const validationSchema = yup.object().shape({
  subject: yup
    .string("Enter the reason of message")
    .min(10, "Minium characters allowed 10")
    .max(50, "Maximum characters allowed 50")
    .required("Please provide subject"),
  message: yup
    .string("Enter the reason of message")
    .min(25, "Minium characters allowed 25")
    .max(1000, "Maximum characters allowed 1000")
    .required("Please provide message"),
});

const style = {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  overflowY: "visible",
  width: 400,
  transform: "translateX(400px)",
  transition: "all .3s ease-out",
  border: "2px solid #000",
  boxShadow: "0 0.125rem 1.25rem 0 rgb(0 0 0 / 28%)",
  borderLeft: "0px solid rgba(0,0,0,.2)",
  backgroundColor: "#283144",
};

const TextArea = styled("textarea")({
  display: "block",
  width: "100%",
  resize: "vertical",
  minHeight: "200px",
  maxHeight: "250px",
  backgroundColor: "#283144",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  transition: "all .3s",
  padding: "10px",
  color: "#a1b0cb",
  fontSize: "1.1rem",
  "&:hover": {
    border: "1px solid #000",
  },
  "&:focus": {
    border: "0",
    outline: "2px solid rgb(24, 128, 247)",
  },
  "&::placeholder": {
    color: "#a1b0cb",
    fontSize: "1.1rem",
  },
});
const InvoiceAttachedBox = styled("div")({
  marginTop: "10px",
  backgroundColor: "#30405f",
  color: "#5a8dee",
  width: "170px",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const CancelBtn = styled("div")({
  color: "#a1b0cb",
  fontSize: "22px",
  fontWeight: "bold",
  cursor: "pointer",
});

export default function BasicModal({ invoice, sendInvoice }) {
  const { isModalOpen, toggleModal } = useContext(ToggleEmailModalContext);
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      toggleModal();
      formik.subject = "";
      formik.message = "";
      sendInvoice({ ...invoice, ...values });
    },
  });

  return (
    <div>
      <Modal
        keepMounted
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={
            isModalOpen
              ? { transform: "translateX(0)" }
              : { transform: "translateX(400px)" }
          }
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ padding: "32px", borderBottom: "1px solid #36445d" }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              color="white"
              component="h2"
              sx={{
                color: "lightgray",
              }}
            >
              Send Invoice
            </Typography>
            <CancelBtn onClick={toggleModal}>
              <AiOutlineClose />
            </CancelBtn>
          </Box>
          <Box sx={{ padding: "32px" }}>
            <TextField
              label="From"
              variant="outlined"
              value={invoice?.invoiceFrom?.email}
              fullWidth
              sx={{
                marginBottom: "24px",
                ".MuiInputLabel-root, .MuiOutlinedInput-input": {
                  color: "#a1b0cb",
                },
              }}
            />
            <TextField
              label="To"
              variant="outlined"
              fullWidth
              value={invoice?.invoiceTo?.email}
              sx={{
                marginBottom: "24px",
                ".MuiInputLabel-root, .MuiOutlinedInput-input": {
                  color: "#a1b0cb",
                },
              }}
            />
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject"
                sx={{
                  marginBottom: "24px",
                  ".MuiInputLabel-root, .MuiOutlinedInput-input": {
                    color: "#a1b0cb",
                  },
                }}
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Message"
                multiline
                maxRows={5}
                sx={{
                  marginBottom: "24px",
                  ".MuiInputLabel-root, .MuiOutlinedInput-input": {
                    color: "#a1b0cb",
                  },
                }}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />

              <InvoiceAttachedBox>
                <BiLink /> Invoice Attached
              </InvoiceAttachedBox>
              <Box mt={4}>
                <Button type="submit" variant="contained" color="primary">
                  Send
                </Button>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: "20px" }}
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
