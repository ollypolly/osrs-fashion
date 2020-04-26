import React from "react";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";
import StatsViewer from "../../components/StatsViewer/StatsViewer";
import InventorySelector from "../../components/InventorySelector/InventorySelector";
import Options from "../../components/Options/Options";
import styled from "styled-components";
import { transparentize } from "polished";
import { FaCaretDown } from "react-icons/fa";
import { useEffect } from "react";

// Have isEditable Props

export const StyledBigInput = styled.input`
  font-size: 2em;
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 0.2rem;
  padding: 0;
  width: 100%;

  /* border-bottom: 2px solid
    ${(props) => transparentize(0.5, props.theme.textColor)};
  

  transition: border-color 0.1s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.textColor};
  } */

  
`;

const LoadoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 541px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-bottom: 0.5rem;
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
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

const DescriptionContainer = styled.div`
  border: 1px solid ${(props) => transparentize(0.8, props.theme.textColor)};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 1.5rem 0;
  transition: border-color 0.1s ease-in-out;

  &:focus-within {
    border-color: ${(props) => props.theme.textColor};
  }
`;

const StyledDescription = styled.textarea`
  width: 100%;
  font-size: 1rem;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textColor};
  margin: 0.5rem 0;
`;

const Loadout = () => {
  useEffect(() => {
    console.log("Getting Data...");
  }, []);

  return (
    <>
      <LoadoutHeader>
        <div>
          <StyledBigInput placeholder="Enter Loadout Name..." />
          <StyledCategory>
            <h2>Select Category</h2>
            <FaCaretDown />
          </StyledCategory>
        </div>

        <Options />
      </LoadoutHeader>
      <DescriptionContainer>
        <StyledDescription placeholder="Enter Description..." />
      </DescriptionContainer>

      <MainContent>
        <StatsViewer />
        <LoadoutSelector />
        <InventorySelector />
      </MainContent>
    </>
  );
};

export default Loadout;
