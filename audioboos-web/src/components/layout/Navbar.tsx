import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useRecoilState } from "recoil";
import { siteConfig } from "../../store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 0,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

}));

const Navbar = () => {
  const classes = useStyles();

  const [config, setConfig] = useRecoilState(siteConfig);

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {config.settings?.siteName}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Button color="inherit" onClick={() => setConfig({ theme: "Farts" })}>
          Set theme
        </Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    // <AppBar position="static">
    //   <Toolbar>
    //     <IconButton
    //       edge="start"
    //       className={classes.menuButton}
    //       color="inherit"
    //       aria-label="menu"
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //     <Typography variant="h6" className={classes.title}>
    //       {settings.settings?.siteName}
    //     </Typography>
    //     <Button color="inherit" onClick={() => setTheme({ theme: "Farts" })}>
    //       Set theme
    //     </Button>
    //     <Button color="inherit">Login</Button>
    //   </Toolbar>
    // </AppBar>
  );
};

export default Navbar;
