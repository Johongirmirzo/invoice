import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "../../App";
import { styled } from "@mui/system";
import { Grid, Alert, Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import {
  DownloadInvoice,
  PrintInvoice,
  TogglePaidStatus,
  UpdateInvoice,
  DeleteInvoice,
  SendInvoice,
} from "../../components/Actions/index";
import Invoice from "../../components/Invoice/Invoice";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EmailModal from "../../components/EmailModal/EmailModal";
import axios from "axios";
import { getInvoices } from "../../storage/localStorage";

const PreviewInvoiceBox = styled("div")({
  padding: "100px 0",
});
const ActionBox = styled("div")({
  boxShadow: "0 0.125rem 0.875rem 0 rgb(0 0 0 / 16%)",
  backgroundColor: "#283144",
  padding: "15px",
});

function PreviewInvoice({
  invoices,
  sendInvoice,
  togglePaidStatus,
  deleteInvoice,
  convertToSentInvoice,
  convertToDownloadedInvoice,
  isEmailSent,
  user,
}) {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const el = useRef();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.invoiceID);
    axios
      .get(
        `https://invoicce-appp.herokuapp.com/api/invoice/${params.invoiceID}`
      )
      .then((response) => {
        setInvoice(response.data);
      })
      .catch((err) => console.error(err));
  }, [invoices]);

  useEffect(() => {
    if (!user?.username) {
      navigate("/login");
    }
  }, [user, invoices]);

  // console.log("PreviewInvoice", invoice);
  return (
    <PreviewInvoiceBox>
      <DeleteModal invoiceId={invoice?._id} deleteInvoice={deleteInvoice} />
      <EmailModal invoice={invoice} sendInvoice={sendInvoice} />
      <Wrapper>
        <Link to="/" style={{ marginBottom: "30px", color: "#9884fc" }}>
          <FaHome /> Go Back Home
        </Link>
        <Typography variant="h3" component="h2" color="white">
          View Invoice #{invoice?._id?.slice(0, 7)}
        </Typography>
        {isEmailSent && (
          <Alert
            sx={{ position: "relative", bottom: "-60px" }}
            variant="outlined"
            severity="success"
          >
            Email is successfully sent
          </Alert>
        )}

        <Grid
          container
          spacing={6}
          mt={5}
          sx={{
            [theme.breakpoints.down("md")]: {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Grid item xs="12" md="9" mt={0}>
            <Invoice invoice={invoice} el={el} />
          </Grid>
          <Grid item xs="12" md="3">
            <ActionBox>
              <SendInvoice
                invoiceId={invoice?._id}
                isSent={invoice?.invoiceStatus?.isSent}
                convertToSentInvoice={convertToSentInvoice}
              />
              <DownloadInvoice
                val={el}
                invoiceId={invoice?._id}
                isDownloaded={invoice?.invoiceStatus?.isDownloaded}
                convertToDownloadedInvoice={convertToDownloadedInvoice}
              />
              <PrintInvoice val={el} />
              <UpdateInvoice invoiceID={invoice?._id} />
              <TogglePaidStatus
                isPaid={invoice?.invoiceStatus?.isPaid}
                invoiceId={invoice?._id}
                invoice={invoice}
                togglePaidStatus={togglePaidStatus}
              />
              <DeleteInvoice />
            </ActionBox>
          </Grid>
        </Grid>
      </Wrapper>
    </PreviewInvoiceBox>
  );
}

export default PreviewInvoice;
