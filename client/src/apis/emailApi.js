import axios from "axios";

export const sendInvoiceToClient = (invoice, checkEmailStatus) => {
  var options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": process.env.REACT_APP_SENDGRID_HOST,
      "x-rapidapi-key": process.env.REACT_APP_SENDGRID_API,
    },
    data: {
      personalizations: [
        { to: [{ email: invoice.invoiceTo.email }], subject: invoice.subject },
      ],
      from: { email: invoice.invoiceFrom.email },
      content: [{ type: "text/plain", value: invoice.message }],
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      checkEmailStatus(true);
    })
    .catch(function (error) {
      console.error(error);
      checkEmailStatus(false);
    });
};
