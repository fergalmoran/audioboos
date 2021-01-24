import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { auth } from "../../store";

const LoginMenu = () => {
    const history = useHistory();
    const { isLoggedIn } = useRecoilValue(auth);

    const authenticatedView = () => {
        return (
            <React.Fragment>
                <Link className="text-dark" to="/profile">
                    Hello, Sailor
                </Link>
                <Button color="inherit" onClick={() => history.push("/logout")}>
                    Logout
                </Button>
            </React.Fragment>
        );
    };

    const anonymousView = (registerPath: string, loginPath: string) => {
        return (
            <React.Fragment>
                <Button
                    color="inherit"
                    onClick={() => history.push(registerPath)}
                >
                    Register
                </Button>
                <Button color="inherit" onClick={() => history.push(loginPath)}>
                    Login
                </Button>
            </React.Fragment>
        );
    };

    if (!isLoggedIn) {
        return anonymousView("/register", "/login");
    } else {
        return authenticatedView();
    }
};
export default LoginMenu;
