import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import ItemSelector, { Icon } from "../ItemSelector/ItemSelector";
import helmetIcon from "../../img/helmet-icon-gray.png";
import { selectWeight } from "../../pages/Loadout/loadoutSlice";
import { useSelector } from "react-redux";
import { FaWeightHanging } from "react-icons/fa";

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

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const LoadoutContainer = styled(ContentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ItemSelectorGridWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
//loadout grid
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

export const icons: { [id: string]: Icon } = {
  head: {
    name: "Head",
    image: helmetIcon,
  },
  cape: {
    name: "Cape",
    image: helmetIcon,
  },
  neck: {
    name: "Neck",
    image: helmetIcon,
  },
  ammo: {
    name: "Ammo",
    image: helmetIcon,
  },
  weapon: {
    name: "Weapon",
    image: helmetIcon,
  },
  body: {
    name: "Body",
    image: helmetIcon,
  },
  shield: {
    name: "Shield",
    image: helmetIcon,
  },
  legs: {
    name: "Legs",
    image: helmetIcon,
  },
  hands: {
    name: "Hands",
    image: helmetIcon,
  },
  feet: {
    name: "Feet",
    image: helmetIcon,
  },
  ring: {
    name: "Ring",
    image: helmetIcon,
  },
};

const LoadoutSelector = () => {
  const weight = useSelector(selectWeight);

  return (
    <Wrapper>
      <h2>Loadout</h2>

      <LoadoutContainer>
        <ItemSelectorGridWrapper>
          <ItemSelectorGrid>
            {Object.keys(icons).map((icon) => (
              <ItemSelector key={icon} id={icon} icon={icons[icon]} />
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
