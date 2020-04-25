import React from "react";
import Nav from "./components/Nav/Nav";
import Loadout from "./pages/Loadout/Loadout";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from "styled-components";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./components/Nav/navSlice";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./pages/Categories/Categories";
import Sidebar from "./components/Sidebar/Sidebar";

export interface Theme extends DefaultTheme {
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  primaryColor: string;
}

const defaultTheme: Partial<Theme> = {
  primaryColor: "orange",
  linkColor: "orange",
};

const lightTheme: Partial<Theme> = {
  ...defaultTheme,
  backgroundColor: "white",
  textColor: "black",
};

const darkTheme: Partial<Theme> = {
  ...defaultTheme,
  backgroundColor: "#262626",
  textColor: "white",
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    transition: background .2s ease-in-out, color .2s ease-in-out;
    background: ${(props: any) => props.theme.backgroundColor};
    color: ${(props: any) => props.theme.textColor};

    left: ${(props) => (props.isNavOpen ? "250px" : "0")};

    h1, h2, h3 {
      margin: 0;
    }
  }
`;

export const Container = styled.div`
  padding: 1rem;
  max-width: 1100px;
  margin: auto;
`;

const App = () => {
  const darkMode = useSelector(selectDarkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Sidebar />

        <Nav />
        <Container>
          <Switch>
            <Route exact path="/" component={Loadout} />
            <Route exact path="/categories" component={Categories} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
