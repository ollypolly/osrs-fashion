import React from "react";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";
import StatsViewer from "../../components/StatsViewer/StatsViewer";
import Options from "../../components/Options/Options";
import styled from "styled-components";
import { transparentize } from "polished";
import { FaCaretDown } from "react-icons/fa";

// Have isEditable Props

const StyledLoadoutName = styled.input`
  font-size: 2em;
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textColor};
  border-bottom: 2px solid
    ${(props) => transparentize(0.5, props.theme.textColor)};
  margin: 0.5rem 0;

  transition: border-color 0.1s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.textColor};
  }
`;

const LoadoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCategory = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }

  transition: color 0.1s ease-in;
  color: ${(props) => transparentize(0.5, props.theme.textColor)};

  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const Loadout = () => {
  return (
    <>
      <LoadoutHeader>
        <div>
          <StyledLoadoutName placeholder="Enter Loadout Name..." />
          <StyledCategory>
            <h2>Select Category</h2>
            <FaCaretDown />
          </StyledCategory>
        </div>

        <Options />
      </LoadoutHeader>
      <MainContent>
        <LoadoutSelector />
        <StatsViewer />
      </MainContent>
    </>
  );
};

export default Loadout;
