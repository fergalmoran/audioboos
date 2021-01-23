import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const LoginMenu = () => {
    const history = useHistory();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [userName, setUserName] = useState("");

    let isAuthenticated = false;

    // useEffect(() => {
    //     const populateState = async () => {
    //         const [authResult, user] = await Promise.all([
    //             authService.isAuthenticated(),
    //             authService.getUser(),
    //         ]);
    //         setIsAuthenticated(authResult);
    //         setUserName(user && user.name);
    //     };
    //     const _subscription = authService.subscribe(() => populateState());
    //     populateState();
    //     return () => {
    //         authService.unsubscribe(_subscription);
    //     };
    // }, []);

    const authenticatedView = (
        userName: string,
        profilePath: string,
        logoutPath: string
    ) => {
        return (
            <React.Fragment>
                <Link className="text-dark" to={profilePath}>
                    Hello {userName}
                </Link>
                <Button
                    color="inherit"
                    onClick={() => history.push(logoutPath)}
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

    if (!isAuthenticated) {
        return anonymousView("/register", "/login");
    } else {
        // return authenticatedView();
        return <h1>Who's da man??</h1>;
    }
};
export default LoginMenu;
