import React, { useEffect } from 'react'
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { confrim, register ,getToken } from "../../store/userSlice";
import { paperStyle } from "./AuthStyles";
import { confirmValidation, singUpValidations } from "./validations";
const Confirm = () => {
    let dispatch = useDispatch();
    //console.log("ss")
    const { email, loading, error ,token ,succes } = useSelector(state => state.userReducer);
    console.log(email)
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
        initialValues: {
            email: "",
            code: "",
        },
        validationSchema: confirmValidation,
        onSubmit: (values, bag) => {
            values.email=email
            console.log(values)
              dispatch(confrim(values))
        },
    });

    useEffect(() => {
        if (!error) {
            console.log(token)
            dispatch(getToken(token))
           // console.log("ssssssssssss" , succes)
        }
      }, [error]);
    
    
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid textAlign="center" marginBottom={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Confirm
            </Typography>
                    <Typography variant="caption">
                        Please fill this from to confrim !
            </Typography>
                </Grid>
                <Grid>
                    {errors.general && <Alert severity="error">{errors.general}</Alert>}
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="code"
                        label="Code"
                        variant="standard"
                        placeholder="Enter you code"
                        onChange={handleChange}
                        value={values.code}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />

                    <Grid marginTop={3}>
                        <Button
                            fullWidth
                            sx={{ textAlign: 'center' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Confrim
              </Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default Confirm
