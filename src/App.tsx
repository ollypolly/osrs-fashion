import React from "react";
import Nav from "./components/Nav/Nav";
import Loadout from "./components/Loadout/Loadout";
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./components/Nav/navSlice";
import { Grommet } from "grommet";

export interface Theme extends DefaultTheme {
  backgroundColor: string;
  textColor: string;
}

const lightTheme: Theme = {
  backgroundColor: "white",
  textColor: "black",
};

const darkTheme: Theme = {
  backgroundColor: "#3C3C3C",
  textColor: "white",
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    transition: background .2s ease-in-out, color .2s ease-in-out;
    background: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.textColor}
  }
`;

const App = () => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <Grommet plain>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Nav />
        <Loadout />
      </ThemeProvider>
    </Grommet>
  );
};

export default App;
