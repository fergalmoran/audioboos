import React from "react";
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
import AudioPlayer from "material-ui-audio-player";

import {Album} from "../../models";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
type Props = {
    album?: Album;
};

const AlbumTrackList = ({album}: Props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {album && album.tracks && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {album.tracks.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.trackName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <AudioPlayer
                                            useStyles={useStyles}
                                            rounded={true}
                                            elevation={100}
                                            width="100%"
                                            volume={false}
                                            variation="secondary"
                                            spacing={3}
                                            download={false}
                                            autoplay={false}
                                            order="standart"
                                            loop={false}
                                            src={row.audioUrl}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </React.Fragment>
    );
};

export default AlbumTrackList;
