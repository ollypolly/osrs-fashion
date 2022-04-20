import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadout,
  fetchAllItems,
  selectAllItems,
  selectOpenModalContent,
  setOpenModalContent,
  selectAllItemsLoading,
} from "../Loadout/loadoutSlice";
import { transparentize } from "polished";
import { loadouts } from "./loadouts";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";
import { FaTimes } from "react-icons/fa";
import { CenteredDiv } from "../../components/ItemList/ItemList";
import ScaleLoader from "react-spinners/ScaleLoader";

const StyledBrowseMore = styled.div`
  overflow: hidden;
  hr {
    border-color: ${(props) => transparentize(0.8, props.theme.textColor)};
  }

  .heading {
    margin-bottom: 2rem;
    small {
      font-size: 110%;
    }
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
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  opacity: ${(props) => (props.hidden ? "0" : "1")};
  display: flex;
  justify-content: center;
  align-items: center;

  .popup {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 70px auto;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    height: 450px;
    position: relative;

    .clear-icon {
      display: none;
    }

    .image-container {
      height: 100%;
      align-self: center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .full-image {
      height: 100%;
      align-self: center;
    }

    .close-icon {
      display: none;
      position: absolute;
      font-size: 1.5em;
      top: 48px;
      left: 45px;

      cursor: pointer;

      transition: color 0.1s ease-in;
      color: ${(props) => transparentize(0.5, props.theme.textColor)};

      &:hover {
        color: ${(props) => props.theme.textColor};
      }
    }

    @media screen and (max-width: 541px) {
      flex-direction: column;
      width: 300px;
      height: auto;

      .full-image {
        width: 100%;
        align-self: center;
        height: auto;
      }
    }
  }

  @media screen and (max-width: 541px) {
    display: block;
  }
`;

const StyledHeading = styled.div``;

const categoryMap: { [id: string]: any } = {
  fashionscape: {
    name: "Best of r/fashionscape",
    tagline: "Like r/malefashion but better",
  },
  bis: { name: "Best in Slot", tagline: "It doesn't get better than this" },
  emo: { name: "Hot Topics", tagline: "For when you're feeling extra edgy" },

  // skill: {
  //   name: "Working hard or hardly workin'",
  //   tagline: "For when you need to look good whilst skilling",
  // },
  // pet: {
  //   name: "Walking the dog",
  //   tagline: "Outfits which use a pet to accessorise",
  // },
};

//TODO Add bouncing arrow to say scroll more on the right
//TODO add filters e.g combat levels, fire cape

const BrowseLoadouts = () => {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllItems);
  const allItemsLoading = useSelector(selectAllItemsLoading);
  const [hideLoadout, setHideLoadout] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const openModalContent = useSelector(selectOpenModalContent);

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
        dispatch(setLoadout(undefined));
        dispatch(setOpenModalContent(undefined));
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

  return allItemsLoading ? (
    <CenteredDiv>
      <ScaleLoader color={"#4ecca3"} loading={allItemsLoading} />
    </CenteredDiv>
  ) : (
    <StyledBrowseMore>
      <PopUpLoadoutSelector hidden={hideLoadout}>
        <div className="popup" ref={popupRef}>
          <div className="image-container">
            <img
              className="full-image"
              src={openModalContent && openModalContent.background_image}
              alt="Loadout"
            />
          </div>

          <LoadoutSelector />
          <FaTimes
            className="close-icon"
            onClick={() => setHideLoadout(true)}
          />
        </div>
      </PopUpLoadoutSelector>

      <div className="heading">
        <h1>Looking for inspiration?</h1>
        <small>Here's some of our favs</small>
      </div>

      {Object.keys(categoryMap).map((category) => {
        const categoryInfo = categoryMap[category];

        return (
          <div key={category}>
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
                    onClick={async () => {
                      await dispatch(setLoadout(loadout.loadout));
                      dispatch(setOpenModalContent(loadout));
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
          </div>
        );
      })}
    </StyledBrowseMore>
  );
};

export default BrowseLoadouts;
