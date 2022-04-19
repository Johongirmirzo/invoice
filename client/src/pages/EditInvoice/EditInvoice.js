import React, { useEffect, useState } from "react";
import EditInvoiceForm from "../../components/EditInvoiceForm/EditInvoiceForm";
import { Wrapper } from "../../App";
import Typography from "@mui/material/Typography";
import { Link, useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { FaHome } from "react-icons/fa";
import { getInvoices } from "../../storage/localStorage";

const EditInvoiceBox = styled("div")({
  padding: "100px 0",
});
const EditFormBox = styled("div")({
  marginTop: "100px",
});

function EditInvoice({ user, invoices, editInvoice }) {
  const [invoice, setInvoice] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setInvoice(invoices.find((val) => val._id === params.invoiceID));
    if (!user?.username) {
      navigate("/login");
    }
  }, [invoices, user]);

  console.log("Edit Invoice", invoices);
  return (
    <EditInvoiceBox>
      <Wrapper>
        <Link to="/" style={{ marginBottom: "30px", color: "#9884fc" }}>
          <FaHome /> Go Back Home
        </Link>
        <Typography variant="h3" component="h2" color="white">
          Edit Invoice
        </Typography>
        <EditFormBox>
          <EditInvoiceForm invoice={invoice} editInvoice={editInvoice} />
        </EditFormBox>
      </Wrapper>
    </EditInvoiceBox>
  );
}

export default EditInvoice;
