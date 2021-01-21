import React from "react";
import { useEffect } from "react";
import SettingsService from "../../services/api/settingsService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../theme";
import { useRecoilState } from "recoil";
import { siteConfig } from "../../store";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [settings, setSettings] = useRecoilState(siteConfig);

  useEffect(() => {
    const settingsService = new SettingsService();
    const loadSettings = async () => {
      const results = await settingsService.getSettings();
      setSettings({ settings: results });
    };
    loadSettings();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};
export default Layout;
