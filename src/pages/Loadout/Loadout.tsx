import React, { useEffect } from "react";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";
import StatsViewer from "../../components/StatsViewer/StatsViewer";
import styled from "styled-components";
import { transparentize } from "polished";
import Options from "../../components/Options/Options";
import qs from "query-string";
import {
  selectAllItemsLoading,
  setLoadout,
  fetchAllItems,
  selectAllItems,
  setLoadoutName,
  selectLoadoutName,
  selectAllItemsError,
} from "./loadoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { CenteredDiv } from "../../components/ItemList/ItemList";
import ScaleLoader from "react-spinners/ScaleLoader";
import { StringParam, useQueryParams } from "use-query-params";

// If url parameter exists for this part of the loadout, load it in and update the loadout

// Have isEditable Props

export const StyledBigInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 2em;
  font-weight: bolder;
  background: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.textColor};
  padding: 0;
  width: 100%;
  padding-left: 0.5rem;

  @media screen and (max-width: 541px) {
    padding-left: 0;
  }

  /* border-bottom: 2px solid
    ${(props) => transparentize(0.5, props.theme.textColor)};
  

  transition: border-color 0.1s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.textColor};
  } */

  
`;

const LoadoutHeader = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 541px) {
    div {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 0;
    }

    input {
      margin-bottom: 0.5rem;
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

// const StyledCategory = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   svg {
//     margin-left: 0.5rem;
//     font-size: 1.5rem;
//   }

//   transition: color 0.1s ease-in;
//   color: ${(props) => transparentize(0.5, props.theme.textColor)};

//   &:hover {
//     color: ${(props) => props.theme.textColor};
//   }
// `;

// const DescriptionContainer = styled.div`
//   border: 1px solid ${(props) => transparentize(0.8, props.theme.textColor)};
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   margin: 1.5rem 0;
//   transition: border-color 0.1s ease-in-out;

//   &:focus-within {
//     border-color: ${(props) => props.theme.textColor};
//   }
// `;

// const StyledDescription = styled.textarea`
//   width: 100%;
//   font-size: 1rem;
//   background: none;
//   border: none;
//   outline: none;
//   color: ${(props) => props.theme.textColor};
//   margin: 0.5rem 0;
// `;

const Loadout = () => {
  const dispatch = useDispatch();
  const allItemsLoading = useSelector(selectAllItemsLoading);
  const allItemsError = useSelector(selectAllItemsError);

  const allItems = useSelector(selectAllItems);
  const loadoutName = useSelector(selectLoadoutName);

  const [query, setQuery] = useQueryParams({
    head: StringParam,
    cape: StringParam,
    neck: StringParam,
    ammo: StringParam,
    weapon: StringParam,
    body: StringParam,
    shield: StringParam,
    legs: StringParam,
    hands: StringParam,
    feet: StringParam,
    ring: StringParam,
    name: StringParam,
  });

  useEffect(() => {
    if (!allItems) {
      dispatch(fetchAllItems());
    }

    const params = qs.parse(window.location.search);
    const clonedParams = { ...params };
    const name = clonedParams.name;
    delete clonedParams.name;

    if (Object.keys(clonedParams).length !== 0 && !allItemsLoading) {
      dispatch(setLoadout(clonedParams));
    }
    if (name) {
      dispatch(setLoadoutName(name));
    }
  }, [allItemsLoading, dispatch, allItems]);

  return (
    <>
      {allItemsError ? (
        <p>{allItemsError}</p>
      ) : allItemsLoading ? (
        <CenteredDiv>
          <ScaleLoader color={"#4ecca3"} loading={allItemsLoading} />
        </CenteredDiv>
      ) : (
        <>
          <LoadoutHeader>
            <div>
              <StyledBigInput
                value={loadoutName ?? ""}
                placeholder="Enter loadout name..."
                onChange={(event) => {
                  setQuery({ ...query, name: event.target.value }, "push");
                  dispatch(setLoadoutName(event.target.value));
                }}
              />
              {/*<StyledCategory>
            <h2>Select Category</h2>
            <FaCaretDown />
          </StyledCategory>*/}

              <Options />
            </div>
          </LoadoutHeader>

          {/*<DescriptionContainer>
        <StyledDescription placeholder="Enter Description..." />
      </DescriptionContainer>*/}

          <MainContent>
            <>
              <LoadoutSelector />
              <StatsViewer />
            </>

            {/*<InventorySelector />*/}
          </MainContent>
        </>
      )}
    </>
  );
};

export default Loadout;
