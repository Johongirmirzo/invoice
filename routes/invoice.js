const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/InvoiceController");

router.get("/", InvoiceController.getAllInvoices);
router.post("/", InvoiceController.storeInvoice);
router.get("/:invoiceId", InvoiceController.getSingleInvoice);
router.delete("/:invoiceId", InvoiceController.deleteInvoice);
router.put("/:invoiceId", InvoiceController.updateInvoice);

module.exports = router;
