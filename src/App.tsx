import React from "react";
import Nav from "./components/Nav/Nav";
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./components/Nav/navSlice";

export interface Theme extends DefaultTheme {
  backgroundColor: string;
  textColor: string;
}

const lightTheme: Theme = {
  backgroundColor: "white",
  textColor: "black",
};

const darkTheme: Theme = {
  backgroundColor: "#121212",
  textColor: "white",
};

const GlobalStyles = createGlobalStyle`
  body {
    transition: background .2s ease-in-out;
    background: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.textColor}
  }
`;

const App = () => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Nav />
      <h1>OSRS Loadout Calculator</h1>
    </ThemeProvider>
  );
};

export default App;
