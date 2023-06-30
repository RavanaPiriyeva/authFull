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
import { Link, useNavigate } from "react-router-dom";
import { getToken, login } from "../../store/userSlice";
import { paperStyle } from "./AuthStyles";
import { singInValidations } from "./validations";

export const LoginPage = () => {
  //use Formik
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, loading, error, token, isLoggedIn } = useSelector(state => state.userReducer);
  const { handleSubmit, handleChange, touched, values, errors, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: singInValidations,
    onSubmit: async ({ email, password }, bag) => {
      const value = {
        email: email,
        password: password,
      };
      try {
        await dispatch(login(value));
      }
       catch (error) {
        console.log("error aaa", error);
        setErrors({ general: error.toString() });
      }
    },
  });
  useEffect(() => {

    // if (error) {
    //   console.log("error aaa", error)
    //   // setErrors({ general: error.toString() });
    // }
    if (!error && email) {
      //   console.log("errorrrr", error)
      navigate("/confirm");
    }
    if (token && !error) {
      const tokenObj = {
        token: token
      };
      dispatch(getToken(tokenObj))
    }


  }, [error, email, token, setErrors]);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn]);
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Sign In
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
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign In
              </Button>
          </Grid>
          <Typography style={{ margin: "20px 0" }}>
            If you have not account ? <Link to="/">Register</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};
