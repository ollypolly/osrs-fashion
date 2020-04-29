import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadout,
  fetchAllItems,
  selectAllItems,
} from "../Loadout/loadoutSlice";
import { transparentize } from "polished";
import { loadouts } from "./loadouts";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";

const StyledBrowseMore = styled.div`
  hr {
    border-color: ${(props) => transparentize(0.8, props.theme.textColor)};
  }

  h1 {
    margin-bottom: 2rem;
    color: ${(props) => transparentize(0.1, props.theme.textColor)};
  }

  h2 {
    color: ${(props) => transparentize(0.1, props.theme.textColor)};
  }

  small {
    color: ${(props) => transparentize(0.5, props.theme.textColor)};
  }
`;

const FlexDiv = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow: auto;
  white-space: nowrap;

  button {
    margin: 0.3rem;
    padding: 0.2rem;
    background: lightgray;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
    border: none;

    &:hover {
      background: gray;
    }
  }
`;

const StyledLoadoutCard = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 300px;
  min-width: 350px;
  background-color: lightgray;
  border-radius: 4px;
  margin: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: black;
  cursor: pointer;
  transition: transform 0.1s ease-in-out, color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  &:hover {
    transform: scale(1.03);
    h2 {
      color: lightgrey;
    }
  }

  &:first-child {
    margin-left: 0;
  }

  .name-and-tag {
    position: absolute;
    margin: 0.5rem;
    bottom: 0;
    width: 100%;

    h2 {
      color: white;
    }

    small {
      color: lightgray;
    }
  }

  @media screen and (max-width: 541px) {
    height: 200px;
    min-width: 250px;
  }
`;

interface PopUpLoadoutSelectorProps {
  hidden: boolean;
}

const PopUpLoadoutSelector = styled.div<PopUpLoadoutSelectorProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  transition: opacity 500ms;
  z-index: 999;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  opacity: ${(props) => (props.hidden ? "0" : "1")};

  .popup {
    margin: 70px auto;
    padding: 20px;
    border-radius: 5px;
    width: 30%;
    position: relative;
    transition: all 5s ease-in-out;
  }
`;

const StyledHeading = styled.div``;

const categoryMap: { [id: string]: any } = {
  bis: { name: "Best In Slot", tagline: "It doesn't get better than this" },
  emo: { name: "Emo fits", tagline: "For when you're feeling extra emosh" },
  fashionscape: {
    name: "Best of r/fashionscape",
    tagline: "Like r/malefashion but better",
  },
  skill: {
    name: "Working hard or hardly workin'",
    tagline: "For when you need to look good whilst skilling",
  },
  pet: {
    name: "Walking the dog",
    tagline: "Outfits which use a pet to accessorise",
  },
};

//TODO Add bouncing arrow to say scroll more on the right
//TODO add filters e.g combat levels, fire cape

const BrowseLoadouts = () => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllItems);
  const [hideLoadout, setHideLoadout] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!allItems) {
      dispatch(fetchAllItems());
    }

    const handleClickOutside = (e: any) => {
      if (popupRef && popupRef.current) {
        if (popupRef.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        setHideLoadout(true);
      }
    };

    if (!hideLoadout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, allItems, hideLoadout]);

  return (
    <StyledBrowseMore>
      <PopUpLoadoutSelector hidden={hideLoadout}>
        <div className="popup" ref={popupRef}>
          <LoadoutSelector />
        </div>
      </PopUpLoadoutSelector>

      <h1>Browse loadouts</h1>
      {Object.keys(categoryMap).map((category) => {
        const categoryInfo = categoryMap[category];

        return (
          <React.Fragment key={category}>
            <StyledHeading>
              <h2>{categoryInfo.name}</h2>
              <small>{categoryInfo.tagline}</small>
            </StyledHeading>
            <FlexDiv>
              {loadouts
                .filter((loadout) => loadout.category === category)
                .map((loadout) => (
                  <StyledLoadoutCard
                    style={{
                      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) ), url(${loadout.background_image})`,
                    }}
                    key={loadout.name}
                    onClick={() => {
                      dispatch(setLoadout(loadout.loadout));
                      setHideLoadout(false);
                    }}
                  >
                    <div className="name-and-tag">
                      <h2>{loadout.name}</h2>
                      {loadout.tagline && <small>{loadout.tagline}</small>}
                    </div>
                  </StyledLoadoutCard>
                ))}
            </FlexDiv>
          </React.Fragment>
        );
      })}
    </StyledBrowseMore>
  );
};

export default BrowseLoadouts;
