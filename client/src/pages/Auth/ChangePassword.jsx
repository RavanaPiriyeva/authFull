import React from 'react'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { forgotPasswordValidations } from "./validations";
import { paperStyle } from "./AuthStyles";


const ChangePassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  
    // const handlePasswordChange = (e) => {
    //   setNewPassword(e.target.value);
    // };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   setIsLoading(true);
    //   setErrorMessage("");
  
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:3000/api/webuser/resetPassword",
    //       {
    //         userId,
    //         token,
    //         newPassword,
    //       }
    //     );
  
    //     if (response.ok) {
    //       navigate("/");
    //     } else {
    //       throw new Error("Password reset failed");
    //     }
  
    //   } catch (error) {
    //     setErrorMessage(error.message);
    //   }
  
    //   setIsLoading(false);
    // };
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
      initialValues: {
        password: "",
      },
      //validationSchema: forgotPasswordValidations,
      onSubmit: async ({ password }) => {
        console.log( userId,
          token,
          password,)
        try {
          const response = await axios.put(
            "http://localhost:3000/api/webuser/resetPassword",
          {
            userId,
            token,
            password,
          }
          );
  
  
          alert("Password  sent successfully.");
        } catch (error) {
          console.error(error);
          alert("An error occurred. Please try again later.");
        }
      },
    });
  
    return (
      
      <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            New Password
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Grid marginTop={3}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
    );
}

export default ChangePassword
