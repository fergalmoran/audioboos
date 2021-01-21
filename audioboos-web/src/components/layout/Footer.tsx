import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    width: "99% !important",
    height: "62px !important",
    background: theme.palette.grey[400],
    color: theme.palette.common.white
  },
}));

const Footer = () => {
  const classes = useStyles();
  return <Typography className={classes.footer}>Footer Text</Typography>;
};

export default Footer;
