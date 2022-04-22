import React from "react";
import styled from "styled-components";
import { darken, transparentize } from "polished";
import ItemSelector, { Icon } from "../ItemSelector/ItemSelector";
import {
  selectWeight,
  setLoadout,
  selectCurrentLoadout,
} from "../../pages/Loadout/loadoutSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaWeightHanging, FaBan, FaShare } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { useQueryParams, StringParam } from "use-query-params";
import { useNavigate } from "react-router-dom";
import qs from "qs";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 900px) {
    margin: 0.5rem 0;
  }
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  background: ${(props) => darken(0.04, props.theme.backgroundColor)};
  border-radius: 5px;
  padding: 1rem;
  min-width: 300px;
  min-height: 461px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const LoadoutContainer = styled(ContentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;
`;

const ItemSelectorGridWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 1em;

  #head {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  #cape {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  #neck {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  #ammo {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  #weapon {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #body {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #shield {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #legs {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
  }

  #hands {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 5;
    grid-row-end: 6;
  }

  #feet {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;
  }

  #ring {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 5;
    grid-row-end: 6;
  }
`;

const WeightArea = styled.div`
  display: flex;
  justify-content: center;
`;

const Icons = styled.div`
  width: 100%;
  position: absolute;
  right: 18px;
  top: 18px;
  display: flex;
  justify-content: flex-end;
`;

const ClearIcon = styled.div`
  margin: 0.5rem;
  svg {
    font-size: 1.5em;
    cursor: pointer;

    transition: color 0.1s ease-in;
    color: ${(props) => transparentize(0.5, props.theme.textColor)};
  }

  &:hover {
    svg {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

export const icons: { [id: string]: Icon } = {
  head: {
    name: "Head",
    image: "",
  },
  cape: {
    name: "Cape",
    image: "",
  },
  neck: {
    name: "Neck",
    image: "",
  },
  ammo: {
    name: "Ammo",
    image: "",
  },
  weapon: {
    name: "Weapon",
    image: "",
  },
  body: {
    name: "Body",
    image: "",
  },
  shield: {
    name: "Shield",
    image: "",
  },
  legs: {
    name: "Legs",
    image: "",
  },
  hands: {
    name: "Hands",
    image: "",
  },
  feet: {
    name: "Feet",
    image: "",
  },
  ring: {
    name: "Ring",
    image: "",
  },
  pet: {
    name: "Pet",
    image: "",
  },
};

// const WikiLink = styled.div`
//   position: absolute;
//   top: 15px;
//   left: 15px;
//   height: 50px;
// `;

const LoadoutSelector = ({
  disabled,
  loadoutsPage,
}: {
  disabled?: boolean;
  loadoutsPage?: boolean;
}) => {
  const weight = useSelector(selectWeight);
  const loadout = useSelector(selectCurrentLoadout);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [query, setQuery] = useQueryParams({
    name: StringParam,
  });

  return (
    <Wrapper>
      <LoadoutContainer>
        <ItemSelectorGridWrapper>
          <Icons>
            {!loadoutsPage && loadout && Object.keys(loadout).length !== 0 && (
              <Tooltip followCursor title="Clear all">
                <ClearIcon
                  className="clear-icon clear"
                  onClick={() => {
                    setQuery(query, "push");
                    dispatch(setLoadout({}));
                  }}
                >
                  <FaBan />
                </ClearIcon>
              </Tooltip>
            )}
            {loadoutsPage && (
              <Tooltip followCursor title="Use as template">
                <ClearIcon
                  className="clear-icon export"
                  onClick={() => {
                    const queryString = qs.stringify(loadout);
                    navigate(`../?${queryString}`, { replace: true });
                  }}
                >
                  <FaShare />
                </ClearIcon>
              </Tooltip>
            )}
          </Icons>

          <ItemSelectorGrid>
            {Object.keys(icons).map((icon) => (
              <ItemSelector
                disabled={disabled}
                key={icon}
                id={icon}
                icon={icons[icon]}
              />
            ))}
          </ItemSelectorGrid>
        </ItemSelectorGridWrapper>
        <WeightArea>
          <p>
            <FaWeightHanging /> {Math.round(weight)}kg
          </p>
        </WeightArea>
      </LoadoutContainer>
    </Wrapper>
  );
};

export default LoadoutSelector;
