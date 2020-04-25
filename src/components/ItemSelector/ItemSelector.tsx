import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

const StyledDropdownContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => transparentize(0.5, props.theme.textColor)};

  transition: background 0.1s ease-in;
  background: ${(props) => transparentize(0.5, props.theme.textColor)};

  &:hover {
    background: ${(props) => props.theme.textColor};
  }
`;

const ItemSelector = () => {
  return <StyledDropdownContainer></StyledDropdownContainer>;
};

export default ItemSelector;
