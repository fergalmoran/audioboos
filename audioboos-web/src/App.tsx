import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layout";
import AlbumPage from "./pages/AlbumPage";
import AlbumsPage from "./pages/AlbumsPage";
import ArtistsPage from "./pages/ArtistsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/artists">
            <ArtistsPage />
          </Route>
          <Route path="/artist/:artistName/:albumName">
            <AlbumPage />
          </Route>
          <Route path="/artist/:artistName">
            <AlbumsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
