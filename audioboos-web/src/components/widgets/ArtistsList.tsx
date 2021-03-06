import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Artist } from "../../models";
import audioBoosService from "../../services/api/audiosBooService";

function ArtistsList() {

  const [artists, setArtists] = useState<Artist[] | undefined>();
  useEffect(() => {
    const loadArtists = async () => {
      const results = await audioBoosService.getArtists();
      setArtists(results);
    };
    loadArtists();
  }, []);
  return (
    <React.Fragment>
      <h1>Hello Artists</h1>
      {artists?.map((a) => {
        return (
          <Typography key={a.id}>
            <Link to={`/artist/${a.artistName}`}>{a.artistName}</Link>
          </Typography>
        );
      })}
    </React.Fragment>
  );
}

export default ArtistsList;
