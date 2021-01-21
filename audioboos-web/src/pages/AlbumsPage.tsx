import React from "react";
import { useParams, useHistory } from "react-router-dom";
import AlbumsList from "../components/widgets/AlbumsList";
import { Button } from "@material-ui/core";

interface ParamTypes {
  artistName: string;
}

const AlbumsPage = () => {
  const history = useHistory();
  const { artistName } = useParams<ParamTypes>();
  return (
    <React.Fragment>
      {artistName && (
        <React.Fragment>
          <h1>{artistName}</h1>
          <Button onClick={() => history.goBack()}>&lt; Back</Button>
          <AlbumsList artistName={artistName} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AlbumsPage;
