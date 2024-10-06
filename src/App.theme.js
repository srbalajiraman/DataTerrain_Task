import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import themeJson from "./themes/default.json"; 

const AppTheme = (props) => {
  const giveMeTheme = () => {
    let currentTheme = createTheme(themeJson);
    currentTheme = responsiveFontSizes(currentTheme);
    return currentTheme;
  };

  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={giveMeTheme()}>
          {props.children}
        </ThemeProvider>
      </StyledEngineProvider>
  );
};

export default AppTheme;
