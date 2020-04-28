import React from "react";
import Nav from "./components/Nav/Nav";
import Loadout from "./pages/Loadout/Loadout";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
  ThemeProps,
} from "styled-components";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./components/Nav/navSlice";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Categories from "./pages/Categories/Categories";
import Sidebar from "./components/Sidebar/Sidebar";
import LoadoutList from "./pages/LoadoutList/LoadoutList";
import { QueryParamProvider } from "use-query-params";

export interface Theme extends DefaultTheme {
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  primaryColor: string;
  navColor: string;
}

const defaultTheme: Partial<Theme> = {
  primaryColor: "#4ecca3",
  linkColor: "#4ecca3",
};

const lightTheme: Partial<Theme> = {
  ...defaultTheme,
  backgroundColor: "#eeeeee",
  textColor: "#061325",
  navColor: "#eeeeee",
};

const darkTheme: Partial<Theme> = {
  ...defaultTheme,
  backgroundColor: "#061325",
  textColor: "#ececec",
  navColor: "#393e46",
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: ${(props: ThemeProps<Theme>) => props.theme.backgroundColor};
    color: ${(props: ThemeProps<Theme>) => props.theme.textColor};

    h1, h2, h3 {
      margin: 0;
    }

    .tooltip-container {
      color: black;
      width: 200px;
    }
  }
`;

export const Container = styled.div`
  padding: 1.5rem;
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
            <QueryParamProvider ReactRouterRoute={Route}>
              <Route exact path="/" component={Loadout} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/list" component={LoadoutList} />
            </QueryParamProvider>
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
