import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { FaDownload } from "react-icons/fa";
import ReactToPdf from "react-to-pdf";

function DownloadInvoice({
  val: ref,
  isDownloaded,
  invoiceId,
  convertToDownloadedInvoice,
}) {
  return (
    <ReactToPdf
      targetRef={ref}
      filename="div-blue.pdf"
      x={0.5}
      y={0.5}
      scale={0.9}
    >
      {({ toPdf }) => (
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginBottom: "16px",
            background: "#323e52",
            color: "#69809a",
            "&:hover": {
              background: "#323e52",
            },
          }}
          onClick={() => {
            toPdf();
            if (!isDownloaded) {
              convertToDownloadedInvoice(invoiceId);
            }
          }}
        >
          <FaDownload style={{ marginRight: "10px" }} /> Download Invoice
        </Button>
      )}
    </ReactToPdf>
  );
}

export default DownloadInvoice;
