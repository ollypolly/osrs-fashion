import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { FaBars } from "react-icons/fa";
import { Container } from "../../App";
import { toggleIsOpen } from "../Sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
import { transparentize } from "polished";

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

  color: ${(props) => props.theme.linkColor};

  &:hover {
    color: ${(props) => lighten(0.2, props.theme.linkColor)};
  }

  span {
    color: ${(props) => props.theme.textColor};
    font-weight: 200;
    margin-left: 0.3rem;
  }
`;

const NavLinkGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    transition: color 0.1s ease-in;
    color: ${(props) => transparentize(0.5, props.theme.textColor)};

    &:hover {
      color: ${(props) => props.theme.textColor};
    }
  }

  a {
    margin-left: 1rem;
  }
`;

const Nav = () => {
  const dispatch = useDispatch();

  return (
    <NavBackground>
      <Container>
        <StyledNav>
          <NavLinkGroup>
            <FaBars onClick={() => dispatch(toggleIsOpen())} />
            <StyledLink to="/">
              <h2>
                loadout<span>osrs</span>
              </h2>
            </StyledLink>
          </NavLinkGroup>

          <NavLinkGroup>
            <StyledLink to="/">Create</StyledLink>
            <StyledLink to="/categories">Browse</StyledLink>
          </NavLinkGroup>
        </StyledNav>
      </Container>
    </NavBackground>
  );
};

export default Nav;
