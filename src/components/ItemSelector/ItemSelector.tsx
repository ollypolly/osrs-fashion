import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

export interface Icon {
  name: string;
  image: string;
}

export interface ItemSelectorProps {
  icon: Icon;
}

const StyledDropdownContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid lightgray;

  transition: background 0.1s ease-in;
  background: ${transparentize(0.3, "white")};

  &:hover {
    background: white;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const ItemSelector = (props: ItemSelectorProps) => {
  return (
    <StyledDropdownContainer>
      <img src={props.icon.image} alt="Helmet Slot" />
    </StyledDropdownContainer>
  );
};

export default ItemSelector;
