import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { siteConfig } from "../store";

const HomePage = () => {
  const { theme } = useRecoilValue(siteConfig);
  return (
    <React.Fragment>
      <Link to="/artists">Artists</Link>

      <h1>{theme}</h1>
    </React.Fragment>
  );
};
export default HomePage;
