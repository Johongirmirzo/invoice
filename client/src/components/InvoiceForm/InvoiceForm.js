import React, { useState, useReducer } from "react";
import { TextField, Grid, Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Formik, Form, FieldArray, Field } from "formik";
import Input from "../../errorValidator/ValidateField";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { validationSchema } from "../../validationSchemas/invoiceFormSchema";
import axios from "axios";
import { getToken } from "../../storage/localStorage";

const inputTextColor = {
  ".MuiFilledInput-input": {
    color: "#fff",
  },
  ".MuiInputLabel-root": {
    color: "lightgray",
  },
};

function InvoiceForm({ storeInvoice }) {
  const navigate = useNavigate();

  const calc = (values) => {};
  return (
    <Formik
      initialValues={{
        invoiceFrom: {
          name: "",
          email: "",
          city: "",
          country: "",
          phoneNumber: "",
          streetAddress: "",
          postCode: "",
          companyName: "",
        },
        invoiceTo: {
          name: "",
          email: "",
          city: "",
          country: "",
          streetAddress: "",
          postCode: "",
          companyName: "",
        },
        billTo: {
          bankName: "",
          iban: "",
          swiftCode: "",
          amount: null,
          country: "",
        },
        invoiceDate: {
          issuedAt: "",
          dueDate: "",
        },
        serviceTitle: "",
        note: "",
        services: [{ id: uuidv4(), service: "", quantity: 0, price: 0 }],
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          const total = values.services.reduce(
            (acc, el) => acc + Number(el.price * el.quantity),
            0
          );
          const token = getToken();
          console.log(token);
          axios
            .post(
              "https://invoicce-appp.herokuapp.com/api/invoice",
              {
                ...values,
                total,
                invoiceStatus: {
                  isPaid: false,
                  isDrafted: false,
                  isOverDue: false,
                  isSent: false,
                  isPending: true,
                  isDownloaded: false,
                },
              },
              {
                headers: {
                  token: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              storeInvoice();
            })
            .catch((err) => console.log(err));
          navigate("/");
        }, 500);
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
                  styles={{ background: "hsl(235,30%,17%)", ...inputTextColor }}
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
                  styles={{ background: "hsl(235,30%,17%)", ...inputTextColor }}
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

            <Box display="flex" alignItems="center">
              <Field name="invoiceDate.issuedAt">
                {({ field, form: { touched, errors } }) => {
                  return (
                    <div>
                      <TextField
                        fullWidth
                        label="Issued Date"
                        type="date"
                        {...field}
                        sx={{
                          ...inputTextColor,
                          " .MuiInputBase-input": {
                            color: "#fff",
                          },
                          " input:focus": {
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
                    <div style={{ marginLeft: "40px" }}>
                      <TextField
                        type="date"
                        {...field}
                        label="Due Date"
                        sx={{
                          ...inputTextColor,
                          " .MuiInputBase-input": {
                            color: "#fff",
                          },
                          " input:focus": {
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
                {values.services.map((val, index) => {
                  console.log(val, values);
                  return (
                    <Grid container key={val.id} spacing={2} mb={2}>
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
                            onClick={() => remove(index)}
                            style={{
                              background: "transparent",
                              color: "hsl(4, 89%, 51%)",
                              fontSize: "25px",
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
                        id: Math.random(),
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
              component={Input}
            />
          </Box>

          <Box mt={8}>
            <Button type="submit" variant="contained" size="large">
              Save Invoice
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
  );
}

export default InvoiceForm;
