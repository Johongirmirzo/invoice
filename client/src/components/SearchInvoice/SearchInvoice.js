import React from "react";
import TextField from "@mui/material/TextField";

function SearchInvoice({ getClientName }) {
  return (
    <TextField
      id="outlined-basic"
      label="Search Client"
      variant="outlined"
      onChange={(e) => getClientName(e.target.value)}
      sx={{
        color: "red",
        backgroundColor: "hsl(235,30%,15%)",
        ".MuiOutlinedInput-input": {
          color: "#fff",
        },
        ".MuiInputLabel-root": {
          color: "lightgray",
        },
        "::placeholder": {
          color: "#fff",
        },
      }}
    />
  );
}

export default SearchInvoice;
