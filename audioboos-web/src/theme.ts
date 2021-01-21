import { createMuiTheme } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// Override Mui's theme typings to include the new theme property
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: React.CSSProperties["color"];
    };
  }
}

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: "orange",
  },
});
export default theme;
