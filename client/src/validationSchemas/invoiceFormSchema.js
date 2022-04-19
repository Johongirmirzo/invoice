import * as yup from "yup";
import moment from "moment";

export const validationSchema = yup.object().shape({
  invoiceFrom: yup.object().shape({
    name: yup
      .string("Enter your name")
      .min(2, "Minimum number of characters allowed are 2")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Your name is required"),
    email: yup
      .string("Enter your email")
      .email("Email must include @")
      .required("Please provide email"),
    city: yup.string("Enter your city").required("Please provide city"),
    country: yup
      .string("Enter your country")
      .min(2, "Minimum number of characters allowed are 2")
      .max(25, "Maximum number of characters allowed are 30")
      .required("Please provide country"),
    streetAddress: yup
      .string("Enter your street address")
      .min(2, "Minimum number of characters allowed are 2")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide street address"),
    phoneNumber: yup
      .string("Enter your phone number")
      .min(7, "Minimum number of characters allowed are 7")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide phone number"),

    postCode: yup
      .string("Enter your post code")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide post code"),
    companyName: yup
      .string("Enter his/her company name")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide company name"),
  }),
  invoiceTo: yup.object().shape({
    name: yup
      .string("Enter his/her name")
      .min(2, "Minimum number of characters allowed are 2")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide name"),
    email: yup
      .string("Enter your email")
      .email("Email must include @")
      .required("Please provide email"),
    city: yup
      .string("Enter your city")
      .min(4, "Minimum number of characters allowed are 4")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide city"),
    country: yup
      .string("Enter your country")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide country"),
    streetAddress: yup
      .string("Enter your street address")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide street address"),
    postCode: yup
      .string("Enter your post code")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide post code"),
    companyName: yup
      .string("Enter his/her company name")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide company name"),
  }),
  billTo: yup.object().shape({
    bankName: yup
      .string("Enter bank name")
      .min(2, "Minimum number of characters allowed are 2")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide bank name"),
    country: yup
      .string("Enter your country")
      .min(4, "Minimum number of characters allowed are 4")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide country"),
    iban: yup
      .string("Enter bank iban")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide bank iban"),
    swiftCode: yup
      .string("Enter bank swift code")
      .min(5, "Minimum number of characters allowed are 5")
      .max(30, "Maximum number of characters allowed are 30")
      .required("Please provide bank swift code"),
    amount: yup
      .number()
      .moreThan(0, "Minimum allowed amound is 1")
      .typeError("Please provide number")
      .required("Pleas provide amount"),
  }),
  serviceTitle: yup
    .string("Enter service title")
    .min(10, "Minimum number of characters allowed are 10")
    .max(40, "Maximum number of characters allowed are 40")
    .required("Please provide service title"),
  services: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      service: yup
        .string("Enter his/her service")
        .min(10, "Minimum number of characters allowed are 10")
        .max(40, "Maximum number of characters allowed are 40")
        .required("Please provide service"),
      quantity: yup
        .number()
        .min(1, "Minimum quantity is 1")
        .max(10, "Maximum quanttiy is 10")
        .integer("Please provide only integer")
        .typeError("Only numbers are allowed")
        .required("Please provide quantity"),
      price: yup
        .number()
        .min(5, "Minimum price is 5")
        .max(100000, "Maximum quanttiy is 100000")
        .integer("Please provide only integer")
        .typeError("Only numbers are allowed")
        .required("Please provide price"),
    })
  ),
  note: yup
    .string("Enter your note for his/her service")
    .min(20, "Minimum number of characters allowed are 20")
    .max(250, "Maximum number of characters allowed are 30")
    .required("Please provide value"),
  invoiceDate: yup.object().shape({
    issuedAt: yup
      .date()
      .min(
        new Date(),
        `Minimum allowed date is ${moment(Date.now()).format("yy-MM-DD")}`
      )

      .required("Please choose a date"),
    dueDate: yup
      .date()
      .min(
        new Date(),
        `Minimum allowed date is ${moment(Date.now()).format("yy-MM-DD")}`
      )
      .required("Please choose a date"),
  }),
});
