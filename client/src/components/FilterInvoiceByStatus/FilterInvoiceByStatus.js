import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function FilterInvoiceByStatus({ getFilterInvoiceStatus }) {
  const theme = useTheme();
  return (
    <FormControl
      sx={{
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
          marginTop: "20px",
          marginLeft: "0",
        },
      }}
    >
      <InputLabel sx={{ color: "#fff" }} id="demo-multiple-name-label">
        Search by Status
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Search by Status"
        sx={{
          minWidth: "200px",
          maxWidth: "100%",
          backgroundColor: "hsl(235,30%,15%)",
          ".MuiOutlinedInput-input": {
            color: "#fff",
          },
          "::placeholder": {
            color: "#fff",
          },
          ".MuiSelect-icon": {
            color: "#fff",
          },
          ".MuiList-root": {
            backgroundColor: "hsl(235,30%,15%)",
          },
        }}
        onChange={(e) => getFilterInvoiceStatus(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="isPaid">Paid</MenuItem>
        <MenuItem value="isPending">Pending</MenuItem>
        <MenuItem value="isSent">Sent</MenuItem>
        <MenuItem value="isDownloaded">Downloaded</MenuItem>
        <MenuItem value="isOverdue">Overdue</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FilterInvoiceByStatus;
