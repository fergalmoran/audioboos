import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
} from "@material-ui/core";
import authService from "../../services/api/authService";
import { useRecoilState } from "recoil";
import { auth } from "../../store";

const RegisterValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(6)
        .max(16)
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$/)
        .required(),
});
const RegisterPage = () => {
    const history = useHistory();

    const [authSettings, setAuthSettings] = useRecoilState(auth);

    const doRegister = async (
        email: string,
        password: string,
        confirmPassword: string
    ): Promise<boolean> => {
        const token = await authService.register(
            email,
            password,
            confirmPassword
        );
        setAuthSettings({
            isLoggedIn: token ? true : false,
            token: token,
        });

        return authSettings.isLoggedIn;
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
                        email: "",
                        password: "",
                        policy: false,
                    }}
                    validationSchema={RegisterValidation}
                    onSubmit={async (data, { setSubmitting }) => {
                        console.log("RegisterPage", "onSubmit", data);
                        setSubmitting(true);
                        const result = await doRegister(
                            data.email,
                            data.password,
                            data.password
                        );
                        if (result) {
                            history.push("/", {
                                replace: true,
                            });
                        }
                        setSubmitting(false);
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
                                    Create new account
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body2"
                                >
                                    Use your email to create new account
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                                variant="outlined"
                            />
                            <Box alignItems="center" display="flex" ml={-1}>
                                <Checkbox
                                    checked={values.policy}
                                    name="policy"
                                    onChange={handleChange}
                                />
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    I have read the{" "}
                                    <Link
                                        color="primary"
                                        component={RouterLink}
                                        to="#"
                                        underline="always"
                                        variant="h6"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </Typography>
                            </Box>
                            {Boolean(touched.policy && errors.policy) && (
                                <FormHelperText error>
                                    {errors.policy}
                                </FormHelperText>
                            )}
                            <Box my={2}>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign up now
                                </Button>
                            </Box>
                            <Typography color="textSecondary" variant="body1">
                                Have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="h6"
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default RegisterPage;
