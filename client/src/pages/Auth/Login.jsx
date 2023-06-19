import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { paperStyle } from "./AuthStyles";
  import { singInValidations } from "./validations";
  
  export const LoginPage = () => {
    //use Formik
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: singInValidations,
      onSubmit: ({ email, password }, bag) => {
      },
    });
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
          </form>
        </Paper>
      </Grid>
    );
  };
  