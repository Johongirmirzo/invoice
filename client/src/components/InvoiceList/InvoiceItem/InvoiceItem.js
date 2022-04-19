import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/system";
import { FaRegEye, FaPencilAlt, FaCircle, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToggleModalContext } from "../../../contexts/ToggleModal";
import moment from "moment";

const InvoiceBox = styled("div")({
  marginTop: "20px",
  color: "#fff",
});
const Invoice = styled("div")(({ theme }) => ({
  boxShadow: "0 0 15px rgba(0, 0, 0, .2)",
  borderRadius: "15px",
  background: "hsl(237,31%,17%)",
  padding: "25px 40px",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  gap: "15px",
  textAlign: "center",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));

const InvoiceId = styled("div")({
  flex: "1",
  fontSize: "1.2rem",
});
const InvoiceDue = styled("p")({
  color: "lightgray",
  flex: "1",
});
const InvoiceTo = styled("p")({
  color: "lightgray",
  flex: "1",
});
const InvoiceTotal = styled("p")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  flex: "1",
});
const InvoiceStatus = styled("div")({
  position: "relative",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "hsl(159,66%,51%)",
  padding: "10px 0",
  borderRadius: "10px",
});
const InvoiceActions = styled("div")({
  fontSize: "20px",
  flex: "1",
});
const InvoiceDeleteBtn = styled("button")({
  backgroundColor: "transparent",
  fontSize: "20px",
  marginRight: "20px",
  color: "#C62828",
  cursor: "pointer",
});

function InvoiceItem({ getInvoiceId, invoice, convertToOverdue }) {
  const { toggleModal } = useContext(ToggleModalContext);

  useEffect(() => {
    return moment(invoice.invoiceDate.dueDate).unix() * 1000 > Date.now()
      ? ""
      : convertToOverdue(invoice?.invoiceId);
  }, []);
  // console.log("Invoice Item", invoice);
  return (
    <InvoiceBox>
      <Invoice>
        <InvoiceId>#{invoice?._id?.slice(0, 7)}</InvoiceId>
        <InvoiceDue>
          {moment(invoice.invoiceDate.dueDate).unix() * 1000 > Date.now()
            ? "Due"
            : "Overdue"}{" "}
          {moment(invoice?.invoiceDate?.dueDate).format("yy-MM-DD")}
        </InvoiceDue>
        <InvoiceTo>{invoice?.invoiceTo?.name}</InvoiceTo>
        <InvoiceTotal>$ {invoice?.total}</InvoiceTotal>
        <InvoiceStatus
          style={
            invoice?.invoiceStatus?.isPaid
              ? {
                  background: "hsla(159,66%,51%, .1)",
                  color: "hsl(159,66%,51%)",
                }
              : {
                  background: "hsla(33,98%,49%, .05)",
                  color: "hsl(33,98%,49%)",
                }
          }
        >
          <FaCircle style={{ marginRight: "5px", fontSize: "12px" }} />{" "}
          {invoice?.invoiceStatus?.isPaid ? "Paid" : "Pending"}
        </InvoiceStatus>
        <InvoiceActions>
          <InvoiceDeleteBtn
            onClick={() => {
              toggleModal();
              getInvoiceId(invoice._id);
            }}
          >
            <FaTrashAlt />
          </InvoiceDeleteBtn>
          <Link
            to={`/view/${invoice?._id}`}
            style={{
              color: "hsl(240, 100%, 70%)",
            }}
          >
            <FaRegEye />
          </Link>
          <Link to={`/edit/${invoice?._id}`}>
            <FaPencilAlt style={{ color: "orange", marginLeft: "20px" }} />
          </Link>
        </InvoiceActions>
      </Invoice>
    </InvoiceBox>
  );
}

export default InvoiceItem;
