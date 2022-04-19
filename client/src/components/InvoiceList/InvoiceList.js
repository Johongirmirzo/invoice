import React from "react";
import InvoiceItem from "./InvoiceItem/InvoiceItem";
import Typography from "@mui/material/Typography";

function InvoiceList({
  getInvoiceId,
  invoices,
  deleteInvoice,
  clientName,
  invoiceStatus,
  convertToOverdue,
}) {
  const invoiceList =
    invoices?.length && clientName
      ? invoices.filter((invoice) =>
          invoice.invoiceTo.name
            .toLowerCase()
            .includes(clientName.toLowerCase())
        )
      : invoiceStatus && invoices?.length
      ? invoices.filter((invoice) => {
          if (invoiceStatus === "all") {
            return true;
          } else {
            return invoice.invoiceStatus[invoiceStatus];
          }
        })
      : invoices;
  // console.log(invoices);
  return invoiceList?.length ? (
    invoiceList.map((invoice) => (
      <InvoiceItem
        key={invoice?.invoiceId}
        invoice={invoice}
        getInvoiceId={getInvoiceId}
        deleteInvoice={deleteInvoice}
        convertToOverdue={convertToOverdue}
      />
    ))
  ) : (
    <Typography
      sx={{
        textAlign: "center",
        color: "#fff",
        fontSize: "1.5rem",
      }}
    >
      {invoices?.length ? "There are 0 matches" : null}
    </Typography>
  );
}

export default InvoiceList;
