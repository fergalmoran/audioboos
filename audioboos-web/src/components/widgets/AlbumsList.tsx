import React, { useEffect, useState } from "react";
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import audioBoosService from "../../services/api/audiosBooService";
import { Album } from "../../models";
import Image from "material-ui-image";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

type Props = {
    artistName: string;
};

function AlbumsList({ artistName }: Props) {
    const classes = useStyles();
    const history = useHistory();
    const [albums, setAlbums] = useState<Album[] | undefined>();
    useEffect(() => {
        const loadArtists = async () => {
            const results = await audioBoosService.getAlbums(artistName);
            setAlbums(results);
        };
        loadArtists();
    }, [artistName]);
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {albums?.map((a) => (
                            <TableRow
                                hover
                                key={a.id}
                                onClick={() =>
                                    history.push(
                                        `/artist/${artistName}/${a.albumName}`
                                    )
                                }
                            >
                                <TableCell component="th" scope="row">
                                    {a.smallImage && (
                                        <Image
                                            style={{
                                                paddingTop: 0,
                                                width: 32,
                                                height: 32,
                                            }}
                                            src={a.smallImage}
                                            disableSpinner
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{a.albumName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default AlbumsList;
