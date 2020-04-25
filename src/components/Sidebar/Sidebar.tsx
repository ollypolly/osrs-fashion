import React from "react";
import { toggleDarkMode, selectDarkMode } from "../Nav/navSlice";
import { toggleIsOpen, selectIsOpen } from "./sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { darken, transparentize } from "polished";

interface SidebarProps {
  isOpen: boolean;
}

const StyledSidebar = styled.div<SidebarProps>`
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-251px")};
  background: ${(props) => darken(0.05, props.theme.backgroundColor)};
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    transition: color 0.1s ease-in;
    color: ${(props) => transparentize(0.5, props.theme.textColor)};

    &:hover {
      color: ${(props) => props.theme.textColor};
    }
  }

  h3 {
    margin: 0;
  }
`;

const StyledListItem = styled.li`
  list-style: none;
  padding: 1rem;
  color: ${(props) => transparentize(0.5, props.theme.textColor)};
  cursor: pointer;
  transition: color 0.1s ease-in;

  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const DarkModeSection = styled.div`
  text-align: right;
  padding: 1rem;
`;

const ListItems = styled.div``;

const Sidebar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const isOpen = useSelector(selectIsOpen);

  return (
    <StyledSidebar isOpen={isOpen}>
      <ListItems>
        <StyledListHeader>
          <FaTimes onClick={() => dispatch(toggleIsOpen())} />
        </StyledListHeader>
        <StyledListItem>Loadout 1</StyledListItem>
        <StyledListItem>Loadout 2</StyledListItem>
      </ListItems>
      <DarkModeSection>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => dispatch(toggleDarkMode())}
        />
        <label>Dark Mode</label>
      </DarkModeSection>
    </StyledSidebar>
  );
};

export default Sidebar;
