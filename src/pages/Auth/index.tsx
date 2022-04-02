import React, { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Stack, TextField, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import { useAppDispatch } from "hooks";
import { EUserAction } from "modules/types";

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [{ loading }, login] = useAxios<any>(
    {
      url: "/auth/login",
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Incorrect email format")
      .required("Email field required"),
    password: Yup.string().required("Password field required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      login({
        data: {
          email: formik.values.email,
          password: formik.values.password,
        },
      })
        .then((res) => {
          dispatch({ type: EUserAction.SET_USER, payload: res.data.user });
          dispatch({ type: EUserAction.SET_IS_AUTH, payload: true });
          dispatch({
            type: EUserAction.SET_TOKEN,
            payload: res.data.tokens.access.token,
          });
          navigate("/home", { replace: true });
        })
        .catch((err) => {
          setLoginError("Email or password incorrect");
          console.log(err.message || "Email or password incorrect");
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Box width="60%" margin="auto">
        <Typography variant="h1" color="primary" style={{ marginBottom: 20 }}>
          Login
        </Typography>
        <Typography variant="h4" color="error">
          {loginError}
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              style={{ color: "#fff" }}
            >
              Login
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};
