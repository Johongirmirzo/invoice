import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  useFormik,
  ErrorMessage,
  Formik,
  Form,
  FieldArray,
  Field,
  getIn,
} from "formik";
import * as yup from "yup";
import { FaGithub, FaGoogle, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Wrapper } from "../../../App";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";

const validationSchema = yup.object().shape({
  email: yup
    .string("Please enter your email")
    .email("Email must include @ symbol")
    .required("Email is required"),
  password: yup
    .string("Please enter your password")
    .min(8, "Minium password length is 8")
    .max(20, "Maximum password length is 20")
    .required("Password is required"),
  c_password: yup
    .string("Please enter your password")
    .min(8, "Minium password length is 8")
    .max(20, "Maximum password length is 20")
    .required("Password is required"),
  agreed: yup.boolean().required("Please type agree to register"),
});

const Container = styled("div")({
  background: "rgb(40, 36, 61)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const RegisterBox = styled("div")({
  background: "rgb(49, 45, 75)",
  width: "450px",
  borderRadius: "5px",
  boxShadow: "rgb(19 17 32 / 10%) 0px 2px 10px 0px",
  padding: "40px 30px",
  textAlign: "center",
});
const RegisterHrLine = styled("p")({
  position: "relative",
  color: "lightgray",
  margin: "32px 0",
});

function ResetPassword({ user }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      c_password: "",
      agreed: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("https://invoice-appp.herokuapp.com/resetPassword", {
          ...values,
        })
        .then((response) => {
          if (response.data?.success) {
            navigate("/login");
          } else {
            setErrors(response.data);
          }
        })
        .catch((err) => console.error(err));
    },
  });

  useEffect(() => {
    if (user?.username) {
      navigate("/");
    }
  }, [user]);
  console.log(errors);
  return (
    <Container>
      <RegisterBox>
        <Typography color="white" variant="h4" component="h3" gutterBottom>
          Forget Password
        </Typography>
        <Typography variant="body" component="p" sx={{ color: "lightgray" }}>
          Enter your registered email on the app and enter new password
        </Typography>
        {errors?.length
          ? errors.map((err, index) => (
              <Alert
                key={index}
                severity="error"
                sx={{ position: "relative", top: "20px", marginBottom: "10px" }}
              >
                {err.error}
              </Alert>
            ))
          : null}
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3} mt={5}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              sx={{
                color: "lightgray",
                ".MuiInputLabel-root": {
                  color: "rgba(231, 227, 252, 0.68)",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(231, 227, 252, 0.22)",
                },
                ".MuiOutlinedInput-input": {
                  color: "#fff",
                },
                ".MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsla(250, 81%, 95%, 0.22)",
                },
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="password"
              sx={{
                color: "lightgray",
                ".MuiInputLabel-root": {
                  color: "rgba(231, 227, 252, 0.68)",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(231, 227, 252, 0.22)",
                },
                ".MuiOutlinedInput-input": {
                  color: "#fff",
                },
                ".MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsla(250, 81%, 95%, 0.22)",
                },
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="c_password"
              sx={{
                color: "lightgray",
                ".MuiInputLabel-root": {
                  color: "rgba(231, 227, 252, 0.68)",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(231, 227, 252, 0.22)",
                },
                ".MuiOutlinedInput-input": {
                  color: "#fff",
                },
                ".MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsla(250, 81%, 95%, 0.22)",
                },
              }}
              value={formik.values.c_password}
              onChange={formik.handleChange}
              error={
                formik.touched.c_password && Boolean(formik.errors.c_password)
              }
              helperText={formik.touched.c_password && formik.errors.c_password}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "hsl(261, 98%, 66%)",
              color: "#fff",
              padding: "10px 0",
              "&.MuiButton-root:hover": {
                backgroundColor: "hsl(261, 92%, 66%)",
              },
            }}
          >
            Generate New Password
          </Button>
        </form>
        <Link to="/" style={{ color: "#9155fd", marginTop: "20px" }}>
          <FaAngleLeft style={{ verticalAlign: "middle" }} /> Back to Login
        </Link>
      </RegisterBox>
    </Container>
  );
}

export default ResetPassword;
