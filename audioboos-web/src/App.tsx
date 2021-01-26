import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { Layout } from "./components/layout";
import AlbumPage from "./pages/AlbumPage";
import AlbumsPage from "./pages/AlbumsPage";
import ArtistsPage from "./pages/ArtistsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { useRecoilState } from "recoil";
import { auth } from "./store";
import authService from "./services/api/authService";
import DebugPage from "./pages/DebugPage";
function App() {
    const [authSettings, setAuthSettings] = useRecoilState(auth);

    useEffect(() => {
        const checkIsAuth = async () => {
            const result = await authService.isAuthed();
            setAuthSettings({ ...authSettings, isLoggedIn: result });
        };

        checkIsAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/artists">
                        <ArtistsPage />
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/debug">
                        <DebugPage />
                    </Route>
                    <Route path="/artist/:artistName/:albumName">
                        <AlbumPage />
                    </Route>
                    <Route path="/artist/:artistName">
                        <AlbumsPage />
                    </Route>
                    {/* <Route
                        path={ApplicationPaths.ApiAuthorisationPrefix}
                        component={ApiAuthorisationRoutes}
                    /> */}
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/404" component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
