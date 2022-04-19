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
import Alert from "@mui/material/Alert";
import {
  removeRememberedUser,
  removeToken,
} from "../../../storage/localStorage";

import axios from "axios";

const validationSchema = yup.object().shape({
  username: yup
    .string("Please enter username")
    .min(3, "Minimum characters allowed are 3")
    .max(20, "Maximum characters allowed are 20")
    .required("Username is required"),
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
  padding: "50px 0",
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

function Register({ user }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState([]);
  const el = useRef();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      c_password: "",
      agreed: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.agreed) {
        axios
          .post("https://invoice-appp.herokuapp.com/register", values)
          .then((response) => {
            if (response.data.success) {
              removeToken();
              removeRememberedUser();
              navigate("/");
            } else {
              setErrors(response.data);
            }
          });
      }
      if (!values.agreed) {
        if (errors.length === 0) {
          setErrors([
            { error: "Please accepts terms to login", termExist: true },
          ]);
        } else if (errors.length === 1) {
          errors.forEach((err) => {
            if (!err?.termExist) {
              setErrors([
                ...errors,
                { error: "Please accepts terms to login", termExist: true },
              ]);
            }
          });
        }
      }
    },
  });
  useEffect(() => {
    console.log(user?.email);
    if (user?.email) {
      navigate("/");
    }
    if (el.current) {
      el.current.style.display = "flex";
      setTimeout(() => {
        el.current.style.display = "none";
      }, 3000);
    }
  }, [el, user]);

  console.log(errors);
  return (
    <Container>
      <RegisterBox>
        <Typography color="white" variant="h4" component="h3">
          Register to Access App
        </Typography>
        {errors?.length
          ? errors.map((err, index) => (
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
        <form onSubmit={formik.handleSubmit}>
          <Box mb={3} mt={8}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              sx={{
                color: "lightgray",
                background: "rgb(49, 45, 75)",
                ".MuiInputLabel-root": {
                  color: "rgba(231, 227, 252, 0.68)",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsla(250, 81%, 94%, 0.22)",
                },
                ".MuiOutlinedInput-input": {
                  color: "#fff",
                },
                ".MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "hsla(250, 81%, 95%, 0.22)",
                },
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            {errors?.email && <p style={{ color: "red" }}>{errors?.email}</p>}
          </Box>
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
          <Box mb={3}>
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
          <Box mb={2} display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "lightgray" }}
                  name="agreed"
                  onChange={formik.handleChange}
                  value={formik.values.agreed}
                  error={formik.touched.agreed && Boolean(formik.errors.agreed)}
                  helperText={formik.touched.agreed && formik.errors.agreed}
                />
              }
              label={
                <a style={{ color: "#9155fd" }}>
                  <span style={{ paddingRight: "5px", color: "lightgray" }}>
                    I agree to
                  </span>{" "}
                  the policy & terms
                </a>
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
            SIGN UP
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
            Already have an account?
          </Typography>
          <Link to="/" style={{ color: "#9155fd" }}>
            Sign in instead
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

export default Register;

/**
 * 1. import styled, formik, google, linkedin, github twitter icons,
 *
 *
 *
 */
