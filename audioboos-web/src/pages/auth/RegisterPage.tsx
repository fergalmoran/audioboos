import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
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

const RegisterPage = () => {
    const history = useHistory();

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
                    validationSchema={Yup.object().shape({
                        lastName: Yup.string()
                            .max(255)
                            .required("Last name is required"),
                        password: Yup.string()
                            .max(255)
                            .required("password is required"),
                        policy: Yup.boolean().oneOf(
                            [true],
                            "This field must be checked"
                        ),
                    })}
                    onSubmit={() => {
                        history.push("/", { replace: true });
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
