import React, { useEffect, useState } from "react";
import { Wrapper } from "../../App";
import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";
import { styled } from "@mui/system";
import { TextField, Grid, Box, FormControl, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const CreateInvoiceBox = styled("div")({
  padding: "100px 0",
});
const InvoiceFormBox = styled("div")({
  marginTop: "100px",
});

function CreateInvoice({ user, invoices, storeInvoice }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
  }, [user]);

  return (
    <CreateInvoiceBox>
      <Wrapper>
        <Link to="/" style={{ marginBottom: "30px", color: "#9884fc" }}>
          <FaHome /> Go Back Home
        </Link>
        <Typography variant="h3" component="h2" color="white">
          New Invoice
        </Typography>
        <InvoiceFormBox>
          <InvoiceForm storeInvoice={storeInvoice} />
        </InvoiceFormBox>
      </Wrapper>
    </CreateInvoiceBox>
  );
}

export default CreateInvoice;
