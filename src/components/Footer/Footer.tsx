import React from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { transparentize } from "polished";
import { CenteredDiv } from "../ItemList/ItemList";

// Add donate link - buy us a beer emoji
// Add copyright stuff

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  font-size: 80%;
  flex-shrink: 0;
  padding: 30px;

  span {
    padding: 0.3rem;
    color: ${(props) => transparentize(0.4, props.theme.textColor)};
  }

  a {
    text-decoration: none;
    padding-right: 0.3rem;
    transition: color 0.1s ease-in;
    color: ${(props) => transparentize(0.5, props.theme.textColor)};

    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <CenteredDiv>
        <span>Made with</span> <FaHeart /> <span>by</span>{" "}
        <a
          href="https://github.com/ollypolly"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ollypolly
        </a>
        <a
          href="https://github.com/rodionisakov"
          rel="noopener noreferrer"
          target="_blank"
        >
          @rodionisakov
        </a>
      </CenteredDiv>
    </StyledFooter>
  );
};

export default Footer;
