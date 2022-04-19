import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CreateInvoice,
  Invoices,
  EditInvoice,
  PreviewInvoice,
} from "./pages/index";
import Navbar from "./components/Navbar/Navbar";
import { styled } from "@mui/system";
import {
  editInvoice as editInvoiceInStorage,
  deleteInvoice as deleteInvocieFromStorage,
  getToken,
} from "./storage/localStorage";
import { sendInvoiceToClient } from "./apis/emailApi";
import { getUser } from "./storage/localStorage";
import { Login, Register, ResetPassword } from "./components/Auth/index";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";

const AppBox = styled("main")({
  background: "hsl(232,29%,11%)",
  minHeight: "100vh",
});
export const Wrapper = styled("div")({
  maxWidth: "1150px",
  width: "95%",
  margin: "0 auto",
});

function App() {
  const [invoices, setInvoices] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    getInvoices();
  }, [user]);

  const getInvoices = () => {
    const token = getToken();
    console.log(token);
    axios
      .get("https://invoice-appp.herokuapp.com/api/invoice", {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInvoices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const storeInvoice = () => {
    getInvoices();
  };
  const deleteInvoice = (invoiceId) => {
    axios
      .delete(`https://invoice-appp.herokuapp.com/api/invoice/${invoiceId}`)
      .then((res) => {
        getInvoices();
      })
      .catch((err) => console.log(err));
  };

  const editInvoice = () => {
    getInvoices();
  };
  const togglePaidStatus = (invoiceId) => {
    let val;
    setInvoices(
      invoices.map((invoice) => {
        if (invoice._id === invoiceId) {
          invoice.invoiceStatus.isPaid = !invoice.invoiceStatus.isPaid;
          invoice.invoiceStatus.isPending = invoice.invoiceStatus.isPaid
            ? false
            : true;

          val = invoice;
          return invoice;
        }
        return invoice;
      })
    );

    console.log(val);
    val &&
      axios
        .put(`https://invoice-appp.herokuapp.com/api/invoice/${invoiceId}`, {
          ...val,
          _id: invoiceId,
        })
        .then((res) => {})
        .catch((err) => console.log(err.messsage));
  };
  const convertToSentInvoice = (invoiceId) => {
    let val;
    const updatedInvoices = invoices?.map((invoice) => {
      if (invoice._id === invoiceId) {
        invoice.invoiceStatus.isSent = true;
        val = invoice;
        return invoice;
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
    console.log(val, invoiceId);
    val &&
      axios
        .put(`https://invoice-appp.herokuapp.com/api/invoice/${invoiceId}`, {
          ...val,
          _id: invoiceId,
        })
        .then((res) => {
          console.log(res);
          getInvoices();
        })
        .catch((err) => console.log(err.messsage));
  };
  const convertToDownloadedInvoice = (invoiceId) => {
    let val;
    const updatedInvoices = invoices?.map((invoice) => {
      if (invoice._id === invoiceId) {
        invoice.invoiceStatus.isDownloaded = true;
        val = invoice;
        return invoice;
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
    val &&
      axios
        .put(`https://invoice-appp.herokuapp.com/api/invoice/${invoiceId}`, {
          ...val,
          _id: invoiceId,
        })
        .then((res) => {
          console.log(res);
          getInvoices();
        })
        .catch((err) => console.log(err.messsage));
  };
  const checkEmailStatus = (status) => {
    if (status === true) {
      setIsEmailSent(true);
      setTimeout(() => {
        setIsEmailSent(false);
      }, 3000);
    } else {
      setIsEmailSent(false);
    }
  };
  const sendInvoice = (invoice) => {
    sendInvoiceToClient(invoice, checkEmailStatus);
  };
  const convertToOverdue = (invoiceId) => {
    let val;
    const updatedInvoices = invoices?.map((invoice) => {
      if (invoice._id === invoiceId) {
        invoice.invoiceStatus.isOverDue = true;
        val = invoice;
        return invoice;
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
    val &&
      axios
        .put(`https://invoice-appp.herokuapp.com/api/invoice/${invoiceId}`, {
          ...val,
          _id: invoiceId,
        })
        .then((res) => {
          console.log(res);
          getInvoices();
        })
        .catch((err) => console.log(err.messsage));
  };
  const getLoggedInUser = (user) => {
    setUser(user);
  };

  console.log("App", user);
  return (
    <BrowserRouter>
      <AppBox>
        {!user ? "" : <Navbar getLoggedInUser={getLoggedInUser} user={user} />}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Invoices
                convertToOverdue={convertToOverdue}
                deleteInvoice={deleteInvoice}
                invoices={invoices}
                user={user}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateInvoice
                invoices={invoices}
                user={user}
                storeInvoice={storeInvoice}
              />
            }
          />
          <Route
            path="/edit/:invoiceID"
            element={
              <EditInvoice
                editInvoice={editInvoice}
                user={user}
                invoices={invoices}
              />
            }
          />
          <Route
            path="/view/:invoiceID"
            element={
              <PreviewInvoice
                togglePaidStatus={togglePaidStatus}
                deleteInvoice={deleteInvoice}
                invoices={invoices}
                sendInvoice={sendInvoice}
                convertToSentInvoice={convertToSentInvoice}
                convertToDownloadedInvoice={convertToDownloadedInvoice}
                isEmailSent={isEmailSent}
                convertToOverdue={convertToOverdue}
                user={user}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={<Login getLoggedInUser={getLoggedInUser} user={user} />}
          />
          <Route path="/register" element={<Register user={user} />} />
          <Route
            path="/resetPassword"
            element={<ResetPassword user={user} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppBox>
    </BrowserRouter>
  );
}

export default App;
