import React from "react";
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `50%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <Typography variant="h1">F*ck</Typography>
        <Typography variant="subtitle1">
          I said boo urns...
        </Typography>
        <Button
          color="secondary"
          aria-label="home"
          href="/"
          className={classes.button}
        >
          Might as well go <Home/>
        </Button>
      </div>
    </Paper>
  )
}

export default NotFoundPage;
