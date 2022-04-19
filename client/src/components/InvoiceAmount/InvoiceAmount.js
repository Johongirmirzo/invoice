import React from "react";

function InvoiceAmount({ invoiceAmount }) {
  return (
    <div style={{ color: "#fff", fontSize: "1.1rem", marginTop: "15px" }}>
      There are total {invoiceAmount} invoices
    </div>
  );
}

export default InvoiceAmount;
