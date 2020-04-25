import React from "react";
import Nav from "./components/Nav/Nav";
import Loadout from "./pages/Loadout/Loadout";
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./components/Nav/navSlice";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./pages/Categories/Categories";

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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <ul>
          Loadouts Sidebar<li>Loadout 1</li>
          <li>Loadout 2</li>
        </ul>
        <Nav />
        <Switch>
          <Route exact path="/" component={Loadout} />
          <Route exact path="/categories" component={Categories} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
