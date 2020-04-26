import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenDropdown,
  selectOpenDropdown,
} from "../../pages/Loadout/loadoutSlice";
import ItemList from "../ItemList/ItemList";

export interface Icon {
  name: string;
  image: string;
}

export interface ItemSelectorProps {
  id: string;
  icon: Icon;
}

const StyledDropdownContainer = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  color: black;
  font-size: 2em;
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

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown = styled.div<DropdownProps>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  z-index: 1;
  border: 1px solid gray;
  border-radius: 4px;
  left: 40px;
  top: 40px;
  height: 100px;
  width: 200px;
  background: white;
`;

const ClickableArea = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ItemSelector = (props: ItemSelectorProps) => {
  const openDropdown = useSelector(selectOpenDropdown);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = props.id === openDropdown;

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef && dropdownRef.current) {
        if (dropdownRef.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        dispatch(setOpenDropdown(undefined));
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  // TODO add onmousemove attribute to show dropdown where the user clicked
  // TODO Make it so information about the current selected item is shown on hover (moves with the mouse like in game)
  // TODO optimise rerendering so when list is closed it doens't rerender other elements

  return (
    <>
      <StyledDropdownContainer ref={dropdownRef} id={props.id}>
        <ClickableArea
          onClick={() =>
            isOpen
              ? dispatch(setOpenDropdown(undefined))
              : dispatch(setOpenDropdown(props.id))
          }
        >
          {props.icon.name.charAt(0)}
        </ClickableArea>

        {/*<img src={props.icon.image} alt="Helmet Slot" />*/}
        <Dropdown isOpen={isOpen}>
          <ItemList />
        </Dropdown>
      </StyledDropdownContainer>
    </>
  );
};

export default ItemSelector;
