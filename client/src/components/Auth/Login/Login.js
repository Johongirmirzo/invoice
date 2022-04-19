import React, { useState, useEffect, useRef } from "react";
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
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import Alert from "@mui/material/Alert";
import {
  storeUser,
  storeRememberedUser,
  getRememberedUser,
  removeRememberedUser,
  storeToken,
} from "../../../storage/localStorage";

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
  remember: yup.boolean(),
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

function Login({ user, getLoggedInUser }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const el = useRef();
  const storedUser = getRememberedUser();

  const formik = useFormik({
    initialValues: {
      email: storedUser?.email || "",
      password: storedUser?.password || "",
      remember: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("https://invoice-appp.herokuapp.com/login", values)
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            storeUser(response.data.user);
            storeToken(response.data.token);
            getLoggedInUser(response.data.user);
            if (values.remember) {
              storeRememberedUser(response.data.user);
            } else {
              removeRememberedUser();
            }
            navigate("/");
          } else {
            setErrors(response.data);
          }
        })
        .catch((err) => console.log(err.message));
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
        <Typography color="white" variant="h4" component="h3">
          Login to Access App
        </Typography>
        {errors?.length
          ? errors?.map((err, index) => (
              <Alert
                key={index}
                ref={el}
                severity="error"
                sx={{ position: "relative", top: "20px", marginBottom: "10px" }}
              >
                {err.error}
              </Alert>
            ))
          : null}
        <Box mb={3} mt={8}></Box>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3}>
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
          <Box mb={1}>
            <TextField
              fullWidth
              label="Password"
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
          <Box mb={2} display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "gray" }}
                  defaultChecked
                  name="remember"
                  onChange={formik.handleChange}
                  value={formik.values.remember}
                  error={
                    formik.touched.remember && Boolean(formik.errors.remember)
                  }
                  helperText={formik.touched.remember && formik.errors.remember}
                />
              }
              label={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "360px",
                  }}
                >
                  <span style={{ paddingRight: "5px", color: "lightgray" }}>
                    Remember Me
                  </span>{" "}
                  <Link to="/resetPassword" style={{ color: "#9155fd" }}>
                    Forget Password?
                  </Link>
                </div>
              }
              sx={{ color: "gray" }}
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
            LOG IN
          </Button>
        </form>
        <Box mt={3} display="flex" alignItems="center" justifyContent="center">
          <Typography
            sx={{
              color: "lightgray",
              marginRight: "10px",
              textAlign: "center",
            }}
          >
            Haven't you registered yet
          </Typography>
          <Link to="/register" style={{ color: "#9155fd" }}>
            Create an account
          </Link>
        </Box>
        <Box my={3} display="flex" alignItems="center">
          <hr
            style={{
              flex: "1",
              border: "0",
              border: "thin solid rgba(231, 227, 252, 0.12)",
              marginRight: "5px",
            }}
          />
          <p style={{ color: "lightgray" }}>or</p>
          <hr
            style={{
              flex: "1",
              border: "0",
              border: "thin solid rgba(231, 227, 252, 0.12)",
              marginLeft: "5px",
            }}
          />
        </Box>
        <Box sx={{ fontSize: "20px" }}>
          <FaGithub style={{ color: "#fff", marginRight: "20px" }} />
          <FaGoogle
            style={{ color: "rgb(219, 68, 55)", marginRight: "20px" }}
          />
          <FaLinkedinIn
            style={{ color: "rgb(29, 161, 242)", marginRight: "20px" }}
          />
          <FaTwitter
            style={{ color: "rgb(29, 161, 242)", marginRight: "20px" }}
          />
        </Box>
      </RegisterBox>
    </Container>
  );
}

export default Login;
