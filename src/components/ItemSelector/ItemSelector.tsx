import React from "react";
import styled from "styled-components";
import { transparentize } from "polished";

export interface Icon {
  name: string;
  image: string;
}

export interface ItemSelectorProps {
  id: string;
  icon: Icon;
}

const StyledDropdownContainer = styled.div`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  color: black;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
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
    <StyledDropdownContainer id={props.id}>
      {props.icon.name.charAt(0)}
      {/*<img src={props.icon.image} alt="Helmet Slot" />*/}
    </StyledDropdownContainer>
  );
};

export default ItemSelector;
