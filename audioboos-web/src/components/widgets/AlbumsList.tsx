import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AudioBoosService from "../../services/api/audiosBooService";
import { Album } from "../../models";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

type Props = {
  artistName: string;
};

function AlbumsList({ artistName }: Props) {
  const classes = useStyles();

  const _service = new AudioBoosService();
  const [albums, setAlbums] = useState<Album[] | undefined>();
  useEffect(() => {
    const loadArtists = async () => {
      const results = await _service.getAlbums(artistName);
      setAlbums(results);
    };
    loadArtists();
  }, []);
  return (
    <React.Fragment>
      {albums?.map((a) => {
        return (
          <Typography className={classes.root} key={a.id}>
            <Link to={`/artist/${artistName}/${a.albumName}`}>
              {a.albumName}
            </Link>
          </Typography>
        );
      })}
    </React.Fragment>
  );
}

export default AlbumsList;
