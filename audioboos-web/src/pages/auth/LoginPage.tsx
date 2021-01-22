import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import authService from "../../services/api/authService";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));

const LoginPage = () => {
    const [userName, setUserName] = useState(
        "fergal.moran+audioboos@gmail.com"
    );
    const [password, setPassword] = useState("secret");
    const classes = useStyles();

    const doLogin = (e: any) => {
        e.preventDefault();
        authService.login(userName, password).then((r) => {
            if (r) {
                alert("Yassss boi!");
            } else {
                alert("Nah boi!");
            }
        });
    };
    return (
        <Container className={classes.container} maxWidth="xs">
            <form onSubmit={doLogin}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    size="small"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setUserName(event.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Log in
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default LoginPage;

// import React, { useState } from "react";
// import {
//     Button,
//     TextField,
//     Grid,
//     Paper,
//     Typography,
//     Link,
// } from "@material-ui/core";
// import "./LoginPage.css";

// const Login = () => {
//     const [userName, setUserName] = useState(
//         "fergal.moran+audioboos@gmail.com"
//     );
//     const [password, setPassword] = useState("secret");

//     return (
//         <Grid container spacing={0} justify="center" direction="row">
//             <Grid item>
//                 <Grid
//                     container
//                     direction="column"
//                     justify="center"
//                     spacing={2}
//                     className="login-form"
//                 >
//                     <Paper
//                         variant="elevation"
//                         elevation={2}
//                         className="login-background"
//                     >
//                         <Grid item>
//                             <Typography component="h1" variant="h5">
//                                 Sign in
//                             </Typography>
//                         </Grid>
//                         <Grid item>
//                             <form onSubmit={() => alert("Submit")}>
//                                 <Grid container direction="column" spacing={2}>
//                                     <Grid item>
//                                         <TextField
//                                             type="email"
//                                             placeholder="Email"
//                                             fullWidth
//                                             name="username"
//                                             variant="outlined"
//                                             value={userName}
//                                             onChange={(event) =>
//                                                 setUserName(event.target.value)
//                                             }
//                                             required
//                                             autoFocus
//                                         />
//                                     </Grid>
//                                     <Grid item>
//                                         <TextField
//                                             type="password"
//                                             placeholder="Password"
//                                             fullWidth
//                                             name="password"
//                                             variant="outlined"
//                                             value={password}
//                                             onChange={(event) =>
//                                                 setPassword(event.target.value)
//                                             }
//                                             required
//                                         />
//                                     </Grid>
//                                     <Grid item>
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             type="submit"
//                                             className="button-block"
//                                         >
//                                             Submit
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </form>
//                         </Grid>
//                         <Grid item>
//                             <Link href="#" variant="body2">
//                                 Forgot Password?
//                             </Link>
//                         </Grid>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };
// export default Login;
