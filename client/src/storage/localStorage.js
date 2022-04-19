const getInvoices = () => {
  let invoices = JSON.parse(localStorage.getItem("invoice"));
  return invoices?.length > 0 ? invoices : [];
};
const addInvoice = (invoice) => {
  const invoices = getInvoices();
  if (invoices.length > 0) {
    invoices.push(invoice);
    localStorage.setItem("invoice", JSON.stringify(invoices));
  } else {
    invoices.push(invoice);
    localStorage.setItem("invoice", JSON.stringify(invoices));
  }
};
const deleteInvoice = (invoiceId) => {
  const invoices = getInvoices();
  if (invoices.length > 0) {
    const updatedInvoices = invoices.filter(
      (invoice) => invoice.invoiceId !== invoiceId
    );
    localStorage.setItem("invoice", JSON.stringify(updatedInvoices));
  }
};
const editInvoice = (invoice) => {
  const invoices = getInvoices();
  if (invoices.length > 0) {
    const updatedInvoices = invoices?.map((val) => {
      if (val.invoiceId === invoice.invoiceId) {
        return Object.assign(val, invoice);
      }
      return val;
    });
    localStorage.setItem("invoice", JSON.stringify(updatedInvoices));
  }
};
const editPaymentStatus = (invoiceId) => {
  const invoices = getInvoices();
  if (invoices.length > 0) {
    const updatedInvoices = invoices?.map((invoice) => {
      if (invoice.invoiceId === invoiceId) {
        invoice.invoiceStatus.isPaid = !invoice.invoiceStatus.isPaid;
        invoice.invoiceStatus.isPending = invoice.invoiceStatus.isPaid
          ? false
          : true;
        return invoice;
      }
      return invoice;
    });
    localStorage.setItem("invoice", JSON.stringify(updatedInvoices));
  }
};
const storeInvoices = (invoices) => {
  localStorage.setItem("invoice", JSON.stringify(invoices));
};

//  user info
const getUser = () => JSON.parse(localStorage.getItem("user"));

const storeUser = (loggedUser) => {
  const user = getUser();
  if (user) {
    return user;
  } else {
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }
};
const removeUser = () => {
  localStorage.removeItem("user");
};

const getRememberedUser = () => {
  return JSON.parse(localStorage.getItem("remember-user"));
};
const storeRememberedUser = (user) => {
  localStorage.setItem("remember-user", JSON.stringify(user));
};
const removeRememberedUser = () => {
  localStorage.removeItem("remember-user");
};
const storeToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};
const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};
const removeToken = () => {
  localStorage.removeItem("token");
};

export {
  addInvoice,
  deleteInvoice,
  getInvoices,
  editInvoice,
  editPaymentStatus,
  storeInvoices,
  getUser,
  storeUser,
  removeUser,
  storeRememberedUser,
  removeRememberedUser,
  getRememberedUser,
  storeToken,
  getToken,
  removeToken,
};
