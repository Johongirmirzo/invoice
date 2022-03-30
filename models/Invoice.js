const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    invoiceStatus: {
      isPaid: {
        type: Boolean,
        required: true,
      },
      isSent: {
        type: Boolean,
        required: true,
      },
      isDownloaded: {
        type: Boolean,
        required: true,
      },
      isOverDue: {
        type: Boolean,
        required: true,
      },
      isPending: {
        type: Boolean,
        required: true,
      },
    },
    invoiceFrom: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
    invoiceTo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      streetAddress: {
        type: String,
        required: true,
      },
    },
    billTo: {
      bankName: {
        type: String,
        required: true,
      },
      iban: {
        type: String,
        required: true,
      },
      swiftCode: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    invoiceDate: {
      issuedAt: {
        type: Date,
        default: () => Date.now(),
      },
      dueDate: {
        type: Date,
        default: () => Date.now(),
      },
    },
    services: {
      type: Array,
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
