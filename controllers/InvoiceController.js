const Invoice = require("../models/Invoice");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headers = req.headers.token;
  if (headers) {
    const token = headers.split(" ")[1];
    const data = jwt.verify(token, "secret key");
    req.userId = data.userId;
    next();
  } else {
    res.status(403).json({ msg: "You are not authorized to access this data" });
  }
};
const getAllInvoices = [
  verifyToken,
  async (req, res, next) => {
    try {
      console.log(req.userId);
      const invoices = await Invoice.find({ user: req.userId });
      return res.json(invoices);
    } catch (err) {
      console.log(err);
    }
  },
];
const getSingleInvoice = async (req, res, next) => {
  try {
    console.log("getSingleInvoice", req.params);
    return res.json(await Invoice.findById({ _id: req.params.invoiceId }));
  } catch (err) {
    console.log(err);
  }
};
const storeInvoice = [
  verifyToken,
  async (req, res, next) => {
    try {
      const data = await Invoice.create({
        ...req.body,
        user: req.userId,
      });
      console.log("Store Invoice", req.userId, data);
      res.json({ msg: "success" });
    } catch (err) {
      console.log(err);
    }
  },
];
const deleteInvoice = async (req, res, next) => {
  try {
    await Invoice.findByIdAndDelete({ _id: req.params.invoiceId });

    res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
  }
};
const updateInvoice = async (req, res, next) => {
  console.log("Update Invoice", req.body._id, req.body);
  try {
    const invoice = req.body;
    await Invoice.findByIdAndUpdate({ _id: req.body._id }, invoice);
    res.send(await Invoice.findById({ _id: req.body._id }));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllInvoices,
  getSingleInvoice,
  storeInvoice,
  deleteInvoice,
  updateInvoice,
};
