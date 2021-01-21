import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Album } from "../components/widgets";
import AlbumsList from "../components/widgets/AlbumsList";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
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
          <h1>{albumName}</h1>
          <Album artistName={artistName} albumName={albumName} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default AlbumPage;
