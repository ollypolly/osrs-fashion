import React from "react";
import { toggleDarkMode, selectDarkMode } from "../Nav/navSlice";
import { toggleIsOpen, selectIsOpen } from "./sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { darken, transparentize } from "polished";

interface SidebarProps {
  isOpen: boolean;
}

const StyledSidebar = styled.div<SidebarProps>`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? "0" : "-251px")};
  background: ${(props) => darken(0.04, props.theme.backgroundColor)};
  transition: left 0.3s ease;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  small {
    color: ${(props) => transparentize(0.5, props.theme.textColor)};
    text-align: right;
    padding: 1rem;
  }
`;

const StyledListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;

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

// const StyledListItem = styled.li`
//   list-style: none;
//   font-size: 1.3rem;
//   font-weight: 600;
//   padding: 0.5rem 1.5rem;
//   color: ${(props) => transparentize(0.5, props.theme.textColor)};
//   cursor: pointer;
//   transition: color 0.1s ease-in;

//   &:hover {
//     color: ${(props) => props.theme.textColor};
//   }
// `;

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
          <div onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
        </StyledListHeader>
      </ListItems>
      <small>version 0.0.1</small>
    </StyledSidebar>
  );
};

export default Sidebar;
