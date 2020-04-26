import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import ItemSelector, { Icon } from "../ItemSelector/ItemSelector";
import helmetIcon from "../../img/helmet-icon-gray.png";
import { useSelector } from "react-redux";
import { selectHelmetLoading } from "../../pages/Loadout/loadoutSlice";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 1100px) {
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

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
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

  #helmet {
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

  #arrow {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  #mainhand {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #torso {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  #offhand {
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
  helmet: {
    name: "Helmet",
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
  arrow: {
    name: "Arrows",
    image: helmetIcon,
  },
  mainhand: {
    name: "Main Hand",
    image: helmetIcon,
  },
  torso: {
    name: "Torso",
    image: helmetIcon,
  },
  offhand: {
    name: "Off Hand",
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
  const isHelmetLoading = useSelector(selectHelmetLoading);

  return (
    <Wrapper>
      <h2>Loadout</h2>
      <ContentContainer>
        {!isHelmetLoading ? (
          <ItemSelectorGridWrapper>
            <ItemSelectorGrid>
              {Object.keys(icons).map((icon) => (
                <ItemSelector key={icon} id={icon} icon={icons[icon]} />
              ))}
            </ItemSelectorGrid>
          </ItemSelectorGridWrapper>
        ) : (
          <p>Loading</p>
        )}
        <WeightArea>
          <p>Weight</p>
        </WeightArea>
      </ContentContainer>
    </Wrapper>
  );
};

export default LoadoutSelector;
