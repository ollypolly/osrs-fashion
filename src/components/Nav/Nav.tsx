import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { transparentize } from "polished";
import { toggleDarkMode, selectDarkMode } from "./navSlice";
import Tooltip from "../Tooltip";

const NavBackground = styled.div`
  background: ${(props) => props.theme.backgroundColor};
  border-bottom: 1px solid ${(props) => props.theme.primaryColor};
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.1s ease-in-out;
  vertical-align: middle;

  color: ${(props) => props.theme.linkColor};

  &:hover {
    color: ${(props) => lighten(0.2, props.theme.linkColor)};
  }
`;

const NavLinkGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin-right: 1rem;
  }

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    transition: color 0.1s ease-in;
    color: ${(props) => transparentize(0.5, props.theme.textColor)};

    &:hover {
      color: ${(props) => props.theme.textColor};
    }
  }

  /* a {
    margin-left: 1rem;
  } */

  .subtitle {
    /* border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 5px; */
    font-size: 1.5em;
    color: ${(props) => props.theme.textColor};
    font-weight: 200;
  }
`;

const Container = styled.div`
  padding: 1.5rem;
  max-width: 1100px;
  margin: auto;
`;

const Nav = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <NavBackground>
      <Container>
        <StyledNav>
          <NavLinkGroup>
            {/* <FaBars onClick={() => dispatch(toggleIsOpen())} /> */}
            <span className="subtitle">osrs</span>
            <StyledLink to="/">
              <h2>.fashion</h2>
            </StyledLink>
            {/* <span className="subtitle">Share osrs loadouts</span> */}
          </NavLinkGroup>

          <NavLinkGroup>
            <StyledLink to="/">Create</StyledLink>
            <StyledLink to="/browse">Browse</StyledLink>
            <Tooltip
              hideArrow
              followCursor
              placement="top"
              trigger="hover"
              tooltip={`${darkMode ? "Light" : "Dark"} mode`}
            >
              <div onClick={() => dispatch(toggleDarkMode())}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </div>
            </Tooltip>
          </NavLinkGroup>
        </StyledNav>
      </Container>
    </NavBackground>
  );
};

export default Nav;
