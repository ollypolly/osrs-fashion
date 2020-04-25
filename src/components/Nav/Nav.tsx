import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.1s ease-in-out;

  color: ${(props) => props.theme.linkColor};

  &:hover {
    color: ${(props) => lighten(0.2, props.theme.linkColor)};
  }
`;

const StyledNavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin-left: 0.5rem;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <StyledLink to="/">
        <h2>loadout</h2>
      </StyledLink>
      <StyledNavLinks>
        <StyledLink to="/">Create</StyledLink>
        <StyledLink to="/categories">Browse</StyledLink>
      </StyledNavLinks>
    </StyledNav>
  );
};

export default Nav;
