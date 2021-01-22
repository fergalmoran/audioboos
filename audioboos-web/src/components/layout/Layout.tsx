import React from "react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import settingsService from "../../services/api/settingsService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import theme from "../../theme";
import { useRecoilState } from "recoil";
import { siteConfig } from "../../store";
type Props = {
  children: React.ReactNode;
};
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Layout = ({ children }: Props) => {
  const [settings, setSettings] = useRecoilState(siteConfig);
  const classes = useStyles();

  useEffect(() => {
    const loadSettings = async () => {
      const results = await settingsService.getSettings();
      setSettings({ settings: results });
    };
    loadSettings();
  }, [setSettings]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{settings.settings?.siteName}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <React.Fragment>{children}</React.Fragment>
          </Container>
        </main>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};
export default Layout;
