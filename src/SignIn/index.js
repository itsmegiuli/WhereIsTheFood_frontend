import React, {useState} from 'react';
import {Alert, Button, Card, Container, Grid, TextField, Typography} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import {useNavigate, Navigate} from "react-router-dom";
import { baseUrl } from '../config';


const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignIn = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();

    const sendSignInRequestToBackend = async (username, password) => {
        const url = `${baseUrl}/sign-in`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            });
            const responseJson = await response.json();
            if (response.status >= 400) {
                throw new Error(responseJson.error);
            }
            localStorage.setItem("token", responseJson.token);
        } catch (err) {
            setError(err.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await sendSignInRequestToBackend(values.username, values.password);
        },
    });

    // if token is set, sign in redirects to home
    if (localStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{padding: 4}} elevation={4}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h2">
                                Sign In
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
                            <Button type="submit" variant="contained">Sign in</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => navigate('/sign-up')} variant="outlined">Create account</Button>
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Card>
        </Container>
    );
};

export default SignIn;