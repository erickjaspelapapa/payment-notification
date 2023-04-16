import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    h3: {
      fontWeight: 900,
      fontSize: 24,
    },
    fontFamily: [
      "Montserrat",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },
});

export default theme;
