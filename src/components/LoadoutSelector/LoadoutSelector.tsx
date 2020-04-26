import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import ItemSelector, { Icon } from "../ItemSelector/ItemSelector";
import helmetIcon from "../../img/helmet-icon-gray.png";

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
  return (
    <Wrapper>
      <h2>Loadout</h2>
      <ContentContainer>
        {Object.keys(icons).map((icon) => (
          <ItemSelector icon={icons[icon]} />
        ))}
      </ContentContainer>
    </Wrapper>
  );
};

export default LoadoutSelector;
