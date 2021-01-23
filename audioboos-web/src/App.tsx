import React from "react";
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
function App() {
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
