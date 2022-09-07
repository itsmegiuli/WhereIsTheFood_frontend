import React from 'react';
import {Button, Card, Container, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import {baseUrl} from '../config';
import theme from "../customTheme";


const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignUp = () => {
    const navigate = useNavigate();
    const sendSignUpRequestToBackend = async (username, password) => {
        const url = `${baseUrl}/sign-up`;
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        });
        console.log(response.json());
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await sendSignUpRequestToBackend(values.username, values.password);
        },
    });

    // if token is set, sign in redirects to home
    if (sessionStorage.getItem("token")) {
        return <Navigate to="/" replace/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx={{padding: 10}}>
                <Card sx={{padding: 4}} elevation={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Sign Up
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained">Sign up</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => navigate('/sign-in')} variant="outlined">Already signed
                                    up?</Button>
                                <Button onClick={() => navigate(-1)} variant="outlined" sx={{marginLeft: 2}}> Go
                                    Back </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;