import { createTheme } from "@mui/material";

export const customTheme = {
  borderRadius: 30,
  padding: 10,
  ratio: 1.33,
  color: {
    shadowColor: "#888888",
    grey: "#E8E8E8",
    darkGrey: "#808080",
    blue: "#2EB1CC",
    blueLight: "#CFE5F0",
    orange: "#F7901E",
    orangeLight: "#FEEFDF",
    red: "#e03a00",
    yellow: "#EFCE4A",
    green: "#58C27D",
  },
};

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const appTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  typography: {
    fontWeightBold: 700,
    fontFamily: "Poppins",
    h1: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      lineHeight: "1.5rem",
    },
    h2: {
      fontSize: "1.125rem",
      fontWeight: "bold",
      lineHeight: "1.375rem",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "1.25rem",
    },
    h4: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: "1.125rem",
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "1rem",
    },
    body2: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: "0.8rem",
    },
    subtitle2: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "15px",
    },
    subtitle1: {
      fontSize: "8px",
      fontWeight: 500,
      lineHeight: "15px",
    },
  },
  palette: {
    primary: {
      main: customTheme.color.blue,
      light: customTheme.color.blueLight,
    },
    secondary: {
      main: customTheme.color.orange,
      light: customTheme.color.orangeLight,
    },
    error: {
      main: customTheme.color.red,
    },
    success: {
      main: customTheme.color.green,
    },
    text: {
      primary: customTheme.color.blue,
      secondary: customTheme.color.orange,
      disabled: customTheme.color.grey,
    },
    background: {
      default: "#FFFFFF",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
});

export default appTheme;
