import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { register } from "../../store/userSlice";
import { paperStyle } from "./AuthStyles";
import { singUpValidations } from "./validations";
export const RegisterPage = () => {
  //use Formik
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, loading, error } = useSelector(state => state.userReducer);
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: singUpValidations,
    onSubmit: ({ email, password, username }, bag) => {
      //  console.log("Jjj")
      const value = {
        email: email,
        password: password,
        name: username,
      };
      dispatch(register(value))

    },
  });

  useEffect(() => {
    console.log("aaaa e", email)
    console.log("errorrrr", error)

    if (!error && email) {
      //   console.log("errorrrr", error)
      navigate("/confirm");
    }

  }, [error, email]);


  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Sign Up
            </Typography>
          <Typography variant="caption">
            Please fill this from to create an account!
            </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="standard"
            placeholder="Enter you username"
            onChange={handleChange}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter you email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter you password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            type="password"
            name="confirmPassword"
            fullWidth
            label="Confirm Password"
            variant="standard"
            placeholder="Enter you comfirm password"
            onChange={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              sx={{ textAlign: 'center' }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign Up
              </Button>
          </Grid>
          <Typography style={{margin:"20px 0"}}>
            If you have account ? <Link to="/signin">Login</Link>
           </Typography>
        </form>
      </Paper>
    </Grid>
  );
};
