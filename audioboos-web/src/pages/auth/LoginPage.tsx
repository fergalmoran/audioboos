import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from "@material-ui/core";
import { FacebookIcon, GoogleIcon } from "../../components/icons";
import authService from "../../services/api/authService";
import { useRecoilState } from "recoil";
import { auth } from "../../store";

const LoginPage = () => {
    const history = useHistory();
    const [userName, setUserName] = useState(
        "fergal.moran+audioboos@gmail.com"
    );
    const [password, setPassword] = useState("secret");
    const [token, setToken] = useRecoilState(auth);

    const doLogin = async (): Promise<boolean>   => {
        const token = await authService.login(userName, password);
        setToken({ token: token });

        return token ? true : false;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
        >
            <Container maxWidth="sm">
                <Formik
                    initialValues={{
                        email: userName,
                        password: password,
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("Must be a valid email")
                            .max(255)
                            .required("Email is required"),
                        password: Yup.string()
                            .max(255)
                            .required("Password is required"),
                    })}
                    onSubmit={async () => {
                        const result = await doLogin();
                        if (result) {
                            history.push("/", { replace: true });
                        }
                    }}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                    }: any) => (
                        <form onSubmit={handleSubmit}>
                            <Box mb={3}>
                                <Typography color="textPrimary" variant="h2">
                                    Sign in
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body2"
                                >
                                    Sign in on the internal platform
                                </Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        startIcon={<FacebookIcon />}
                                        onClick={handleSubmit}
                                        size="large"
                                        variant="contained"
                                    >
                                        Login with Facebook
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        fullWidth
                                        startIcon={<GoogleIcon />}
                                        onClick={handleSubmit}
                                        size="large"
                                        variant="contained"
                                    >
                                        Login with Google
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box mt={3} mb={1}>
                                <Typography
                                    align="center"
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    or login with email address
                                </Typography>
                            </Box>
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                fullWidth
                                helperText={touched.email && errors.email}
                                label="Email Address"
                                margin="normal"
                                name="email"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setUserName(values.email);
                                }}
                                type="email"
                                value={values.email}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(
                                    touched.password && errors.password
                                )}
                                fullWidth
                                helperText={touched.password && errors.password}
                                label="Password"
                                margin="normal"
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setPassword(values.password);
                                }}
                                type="password"
                                value={values.password}
                                variant="outlined"
                            />
                            <Box my={2}>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign in now
                                </Button>
                            </Box>
                            <Typography color="textSecondary" variant="body1">
                                Don&apos;t have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    variant="h6"
                                >
                                    Sign up
                                </Link>
                            </Typography>
                        </form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default LoginPage;