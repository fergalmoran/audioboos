import React from "react";
import { useEffect, useState } from "react";
import SettingsService from "../../services/api/settingsService";
import { Settings } from "../../models";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../theme";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const settingsService = new SettingsService();
  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    const loadArtists = async () => {
      const results = await settingsService.getSettings();
      setSettings(results);
    };
    loadArtists();
  }, []);
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Navbar title={settings?.siteName} />
        {children}
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};
export default Layout;
