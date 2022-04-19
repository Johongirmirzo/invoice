import React from "react";
import { getIn } from "formik";
import TextField from "@mui/material/TextField";

const inputTextColor = {
  ".MuiFilledInput-input": {
    color: "#fff",
  },
  ".MuiInputLabel-root": {
    color: "lightgray",
  },
};

const ErrorMessage = ({ variant, label, field, form: { errors } }) => {
  const errorMessage = getIn(errors, field.name);
  // console.log(field);
  return (
    <>
      <TextField
        sx={{ background: "hsl(235,30%,17%)", ...inputTextColor }}
        variant={variant}
        label={label}
        {...field}
        fullWidth
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

export default ErrorMessage;
