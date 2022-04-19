import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaCircle } from "react-icons/fa";
import moment from "moment";

const InvoiceBox = styled("div")({
  background: "hsl(220,25%,21%)",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0, 0, 0, .2)",
});
const PaidStatus = styled("p")({
  position: "relative",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  padding: "10px 0",
  borderRadius: "10px",
});
function Invoice({ invoice, el }) {
  console.log("Invoice ", invoice);
  return (
    <InvoiceBox className="invoice" ref={el}>
      <Box
        sx={{
          padding: "40px",
          marginTop: "0",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          borderBottom: "1px solid gray",
          justifyContent: "space-between",
        }}
      >
        <Box mt={0}>
          <Typography
            variant="h6"
            sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
          >
            Invoice From
          </Typography>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Name:
              </span>
              {invoice?.invoiceFrom?.name}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Email:
              </span>
              {invoice?.invoiceFrom?.email}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                City:
              </span>
              {invoice?.invoiceFrom?.city}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Country:
              </span>
              {invoice?.invoiceFrom?.country}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Street Address:
              </span>
              {invoice?.invoiceFrom?.streetAddress}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Post Code:
              </span>
              {invoice?.invoiceFrom?.postCode}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Phone Number:
              </span>
              {invoice?.invoiceFrom?.phoneNumber}
            </Typography>
          </Box>
          {invoice?.invoiceFrom?.companyName && (
            <Box>
              <Typography color="white" variant="body">
                <span style={{ color: "lightgray", marginRight: "10px" }}>
                  Company Name:
                </span>
                {invoice?.invoiceFrom?.companyName}
              </Typography>
            </Box>
          )}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
          >
            Invoice #{invoice?._id?.slice(0, 7)}
          </Typography>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Date Issued:
              </span>
              {moment(invoice?.invoiceDate?.dateIssued).format("yy-MM-DD")}
            </Typography>
          </Box>
          <Box>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Date{" "}
                {moment(invoice?.invoiceDate?.dueDate).unix() * 1000 >
                Date.now()
                  ? "Due"
                  : "Overdue"}{" "}
                :
              </span>
              {moment(invoice?.invoiceDate?.dueDate).format("yy-MM-DD")}
            </Typography>
            <Box mt={4}>
              <Typography
                variant="h6"
                sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
              >
                Invoice Status
              </Typography>
              <PaidStatus
                style={
                  invoice?.invoiceStatus?.isPaid
                    ? {
                        background: "hsla(159,66%,51%, .1)",
                        color: "hsl(159,66%,51%)",
                      }
                    : {
                        background: "hsla(33,98%,49%, .05)",
                        color: "hsl(33,98%,49%)",
                      }
                }
              >
                <FaCircle style={{ marginRight: "5px", fontSize: "12px" }} />
                {invoice?.invoiceStatus?.isPaid ? "Paid" : "Not Paid"}
              </PaidStatus>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "40px",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          borderBottom: "1px solid gray",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
          >
            Invoice To
          </Typography>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Name:
              </span>
              {invoice?.invoiceTo?.name}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Email:
              </span>
              {invoice?.invoiceTo?.email}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                City:
              </span>
              {invoice?.invoiceTo?.city}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Country:
              </span>
              {invoice?.invoiceTo?.country}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Street Address:
              </span>

              {invoice?.invoiceTo?.streetAddress}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Post Code:
              </span>
              {invoice?.invoiceTo?.postCode}
            </Typography>
          </Box>

          {invoice?.invoiceFrom?.companyName && (
            <Box>
              <Typography color="white" variant="body">
                <span style={{ color: "lightgray", marginRight: "10px" }}>
                  Company Name:
                </span>
                {invoice?.invoiceTo?.companyName}
              </Typography>
            </Box>
          )}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
          >
            Bill To
          </Typography>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Bank Name:
              </span>
              {invoice?.billTo?.bankName}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Country:
              </span>
              {invoice?.billTo?.country}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Iban:
              </span>
              {invoice?.billTo?.iban}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Swift Code:
              </span>
              {invoice?.billTo?.swiftCode}
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography color="white" variant="body">
              <span style={{ color: "lightgray", marginRight: "10px" }}>
                Amount:
              </span>
              {invoice?.billTo?.amount > 0 ? `$${invoice?.billTo?.amount}` : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "40px 0",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "hsl(249,39%,59%)",
            marginBottom: "15px",
            paddingLeft: "40px",
          }}
        >
          Invoice Items
        </Typography>
        <Box>
          {invoice?.services?.length && (
            <TableContainer fullWidth>
              <Table
                sx={{
                  minWidth: 650,
                  background: "hsl(220,25%,21%)",
                  boxShadow: "0",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="table__header">
                      ItemID
                    </TableCell>
                    <TableCell align="center" className="table__header">
                      Item
                    </TableCell>
                    <TableCell align="center" className="table__header">
                      Quantity
                    </TableCell>
                    <TableCell align="center" className="table__header">
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice?.services?.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell align="center" className="table__data">
                        #{item?.id?.slice(0, 7)}
                      </TableCell>
                      <TableCell align="center" className="table__data">
                        {item.service}
                      </TableCell>
                      <TableCell align="center" className="table__data">
                        {item.quantity}
                      </TableCell>
                      <TableCell align="center" className="table__data">
                        {item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      color="black"
                      scope="row"
                      align="center"
                      className="table__data"
                      rowSpan={3}
                      colSPan={2}
                    >
                      <Typography fontWeight="bold">Sub Total</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table__data"
                    >
                      ${invoice?.total}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
      {invoice?.note && (
        <Box
          sx={{
            padding: "40px",
            marginTop: "20px",
            borderTop: "1px solid gray",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "hsl(249,39%,59%)", marginBottom: "15px" }}
          >
            Note
          </Typography>
          <Typography color="white">{invoice?.note}</Typography>
        </Box>
      )}
    </InvoiceBox>
  );
}

export default Invoice;
