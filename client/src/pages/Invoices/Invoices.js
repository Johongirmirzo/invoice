import React, { useState, useEffect } from "react";
import InvoiceAmount from "../../components/InvoiceAmount/InvoiceAmount";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import CreateNewInvoiceBtn from "../../components/CreateNewInvoiceBtn/CreateNewInvoiceBtn";
import FilterInvoiceByStatus from "../../components/FilterInvoiceByStatus/FilterInvoiceByStatus";
import SearchInvoice from "../../components/SearchInvoice/SearchInvoice";
import { styled, experimental_sx as sx } from "@mui/system";
import { Wrapper } from "../../App";
import Typography from "@mui/material/Typography";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";

const InvoiceBox = styled("div")(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const SearchBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
}));

function Invoices({ invoices, deleteInvoice, convertToOverdue, user }) {
  const [clientName, setClientName] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const navigate = useNavigate();

  const getClientName = (name) => setClientName(name);
  const getFilterInvoiceStatus = (status) => setInvoiceStatus(status);
  const getInvoiceId = (invoiceId) => setInvoiceId(invoiceId);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  console.log("Invoices Page", invoiceId);
  return (
    <Wrapper style={{ marginTop: "75px", paddingBottom: "100px" }}>
      <DeleteModal deleteInvoice={deleteInvoice} invoiceId={invoiceId} />
      <Typography variant="h3" color="white" fontWeight="bold" component="h1">
        Invoices
      </Typography>
      <InvoiceAmount invoiceAmount={invoices ? invoices.length : 0} />
      <InvoiceBox flexBox>
        <CreateNewInvoiceBtn />
        <SearchBox>
          <SearchInvoice getClientName={getClientName} />
          <FilterInvoiceByStatus
            getFilterInvoiceStatus={getFilterInvoiceStatus}
          />
        </SearchBox>
      </InvoiceBox>
      <div style={{ marginTop: "100px" }}>
        <InvoiceList
          clientName={clientName}
          invoices={invoices ? invoices : []}
          deleteInvoice={deleteInvoice}
          invoiceStatus={invoiceStatus}
          getInvoiceId={getInvoiceId}
          convertToOverdue={convertToOverdue}
        />
      </div>
    </Wrapper>
  );
}

export default Invoices;
