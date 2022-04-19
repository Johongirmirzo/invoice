import React, { useState, useEffect } from "react";
import { TextField, Grid, Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  useFormik,
  ErrorMessage,
  Formik,
  Form,
  FieldArray,
  Field,
  getIn,
} from "formik";

import Input from "../../errorValidator/ValidateField";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { validationSchema } from "../../validationSchemas/invoiceFormSchema";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const inputTextColor = {
  ".MuiFilledInput-input": {
    color: "#fff",
  },
  ".MuiInputLabel-root": {
    color: "lightgray",
  },
};

function InvoiceForm({ editInvoice, invoice }) {
  const navigate = useNavigate();

  console.log(invoice, "EditInvoiceForm");
  return (
    <>
      {invoice && (
        <Formik
          initialValues={{
            invoiceId: invoice?.invoiceId,
            invoiceFrom: invoice?.invoiceFrom,
            invoiceTo: invoice?.invoiceTo,
            billTo: invoice?.billTo,
            invoiceDate: invoice?.invoiceDate,
            serviceTitle: invoice?.serviceTitle,
            note: invoice?.note,
            services: invoice?.services,
          }}
          onSubmit={(values) => {
            const total = values.services.reduce(
              (acc, el) => acc + Number(el.price * el.quantity),
              0
            );
            values.total = total;
            console.log(values);
            editInvoice(values.invoiceId, values);
            axios
              .put(
                `https://invoicce-appp.herokuapp.com/api/invoice/${invoice._id}`,
                {
                  ...values,
                  total,
                  _id: invoice?._id,
                }
              )
              .then((res) => {
                editInvoice();
              })
              .catch((err) => console.log(err));
            navigate("/");
          }}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Invoice From
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Your email"
                      name="invoiceFrom.email"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Your Name"
                      name="invoiceFrom.name"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Your city"
                      name="invoiceFrom.city"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Your Address"
                      name="invoiceFrom.streetAddress"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Your country"
                      name="invoiceFrom.country"
                      component={Input}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Your Phone Number"
                      name="invoiceFrom.phoneNumber"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Your Company Name"
                      name="invoiceFrom.companyName"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="Post Code"
                      name="invoiceFrom.postCode"
                      component={Input}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Invoice To
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs="12">
                    <Field
                      variant="filled"
                      styles={{
                        background: "hsl(235,30%,17%)",
                        ...inputTextColor,
                      }}
                      label="His/Her email"
                      name="invoiceTo.email"
                      component={Input}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her Name"
                      name="invoiceTo.name"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her city"
                      name="invoiceTo.city"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her country"
                      name="invoiceTo.country"
                      component={Input}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her Address"
                      name="invoiceTo.streetAddress"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her Post Code"
                      name="invoiceTo.postCode"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="4">
                    <Field
                      variant="filled"
                      label="His/Her Company Name"
                      name="invoiceTo.companyName"
                      component={Input}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Bill To
                </Typography>
                <Box mb={2}>
                  <Field
                    variant="filled"
                    label="Bank Name"
                    name="billTo.bankName"
                    component={Input}
                  />
                </Box>

                <Grid container spacing={4} mb={2}>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Bank Location"
                      name="billTo.country"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Bank Iban"
                      name="billTo.iban"
                      component={Input}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Swift Code"
                      name="billTo.swiftCode"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs="12" sm="6">
                    <Field
                      variant="filled"
                      label="Amound"
                      name="billTo.amount"
                      component={Input}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Service Title
                </Typography>
                <Field
                  variant="filled"
                  label="Service Title"
                  name="serviceTitle"
                  component={Input}
                />
              </Box>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Invoice Date
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <Field name="invoiceDate.issuedAt">
                    {({ field, form: { touched, errors } }) => {
                      console.log(field);
                      return (
                        <div style={{ marginRight: "40px" }}>
                          <TextField
                            label="Issued Date"
                            type="date"
                            {...field}
                            sx={{
                              ...inputTextColor,
                              color: "#fff",
                              "& input:focus": {
                                color: "#fff",
                              },
                            }}
                          />
                          {touched?.invoiceDate?.issuedAt &&
                            errors?.invoiceDate?.issuedAt && (
                              <div style={{ color: "red", marginTop: "5px" }}>
                                {errors?.invoiceDate?.issuedAt}
                              </div>
                            )}
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="invoiceDate.dueDate">
                    {({ field, form: { touched, errors } }) => {
                      return (
                        <div>
                          <TextField
                            type="date"
                            label="Due Date"
                            {...field}
                            sx={{
                              ...inputTextColor,
                              color: "#fff",
                              "& input:focus": {
                                color: "#fff",
                              },
                            }}
                          />
                          {touched?.invoiceDate?.dueDate &&
                            errors?.invoiceDate?.dueDate && (
                              <div style={{ color: "red", marginTop: "5px" }}>
                                {errors?.invoiceDate?.dueDate}
                              </div>
                            )}
                        </div>
                      );
                    }}
                  </Field>
                </Box>
              </Box>
              <FieldArray name="services">
                {({ remove, push, errors }) => (
                  <Box mb={6}>
                    <Typography
                      variant="h6"
                      sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                    >
                      Invoice Items
                    </Typography>
                    {values?.services?.map((val, index) => {
                      return (
                        <Grid container spacing={2} mb={2}>
                          <Grid item xs="12" sm="3">
                            <Field
                              variant="filled"
                              label="Service"
                              name={`services[${index}].service`}
                              component={Input}
                            />
                          </Grid>
                          <Grid item xs="12" sm="3">
                            <Field
                              variant="filled"
                              label="Quantity"
                              name={`services[${index}].quantity`}
                              component={Input}
                            />
                          </Grid>
                          <Grid item xs="12" sm="3">
                            <Field
                              variant="filled"
                              label="Price"
                              name={`services[${index}].price`}
                              component={Input}
                            />
                          </Grid>
                          <Grid item xs="12" sm="3">
                            <Box display="flex" alignItems="center">
                              <p
                                style={{
                                  color: "#fff",
                                  fontSize: "1.2rem",
                                  marginRight: "10px",
                                }}
                              >
                                Total: $
                                {values.services[index].price *
                                values.services[index].quantity
                                  ? values.services[index].price *
                                    values.services[index].quantity
                                  : 0}
                              </p>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  background: "transparent",
                                  color: "hsl(4, 89%, 51%)",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                              >
                                <FaTrashAlt />
                              </button>
                            </Box>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Box mb={4} mt={1}>
                      <Button
                        onClick={() =>
                          push({
                            id: uuidv4(),
                            service: "",
                            price: 0,
                            quantity: 0,
                          })
                        }
                        variant="contained"
                        color="primary"
                      >
                        Add Item
                      </Button>
                    </Box>
                  </Box>
                )}
              </FieldArray>
              <Box mb={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
                >
                  Note for His/Her Service
                </Typography>
                <Field
                  name="note"
                  label="Note for him/her"
                  variant="filled"
                  value={invoice?.note}
                  component={Input}
                />
              </Box>

              <Box mt={8}>
                <Button type="submit" variant="contained" size="large">
                  Edit Invoice
                </Button>
                <Button
                  size="large"
                  sx={{
                    marginLeft: "20px",
                    color: "#fff",
                  }}
                >
                  <Link to="/">Cancel</Link>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default InvoiceForm;
