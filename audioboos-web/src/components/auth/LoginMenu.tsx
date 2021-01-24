import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { auth } from "../../store";
import authService from "../../services/api/authService";

const LoginMenu = () => {
    const history = useHistory();
    const [authSettings, setAuthSettings] = useRecoilState(auth);

    const authenticatedView = () => {
        return (
            <React.Fragment>
                <Link className="text-dark" to="/profile">
                    Hello, Sailor
                </Link>
                <Button
                    color="inherit"
                    onClick={async () => {
                        const result = await authService.logout();
                        if (result) {
                            setAuthSettings({ isLoggedIn: false });
                            result && history.push("/");
                        }
                    }}
                >
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

    return authSettings.isLoggedIn
        ? authenticatedView()
        : anonymousView("/register", "/login");
};
export default LoginMenu;
