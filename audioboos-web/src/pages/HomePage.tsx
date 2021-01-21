import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <React.Fragment>
      Home Page
      <Link to="/artists">Artists</Link>
    </React.Fragment>
  );
};
export default HomePage;
