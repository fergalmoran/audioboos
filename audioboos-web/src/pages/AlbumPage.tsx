import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { Album } from "../components/widgets";

interface ParamTypes {
  artistName: string;
  albumName: string;
}
const AlbumPage = () => {
  const { artistName, albumName } = useParams<ParamTypes>();
  return (
    <React.Fragment>
      {artistName && (
        <React.Fragment>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {albumName}
          </Typography>
          <Album artistName={artistName} albumName={albumName} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AlbumPage;
