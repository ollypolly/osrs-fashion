import React from "react";
import { Wrapper, ContentContainer } from "../LoadoutSelector/LoadoutSelector";
import styled from "styled-components";
import { transparentize } from "polished";

const StatArea = styled.div`
  h3 {
    font-weight: 500;
    font-size: 1.1em;
  }

  ul {
    list-style: none;
    padding: 0.2rem 1rem;
    margin: 0;

    li {
      font-size: 1em;
      font-weight: 300;
      margin: 0.1rem 0;

      color: ${(props) => transparentize(0.3, props.theme.textColor)};
    }
  }
`;

const StatsViewer = () => {
  return (
    <Wrapper>
      <h2>Stats</h2>
      <ContentContainer>
        <StatArea>
          <h3>Attack Bonuses</h3>
          <ul>
            <li>Stab</li>
            <li>Slash</li>
            <li>Crush</li>
            <li>Magic</li>
            <li>Ranged</li>
          </ul>
        </StatArea>
        <StatArea>
          <h3>Defense Bonuses</h3>
          <ul>
            <li>Stab</li>
            <li>Slash</li>
            <li>Crush</li>
            <li>Magic</li>
            <li>Ranged</li>
          </ul>
        </StatArea>
        <StatArea>
          <h3>Other Bonuses</h3>
          <ul>
            <li>Melee Strength</li>
            <li>Ranged Strength</li>
            <li>Magic Damage</li>
            <li>Prayer</li>
          </ul>
        </StatArea>
        <StatArea>
          <h3>Target Specific Bonuses</h3>
          <ul>
            <li>Undead</li>
            <li>Slayer</li>
          </ul>
        </StatArea>
      </ContentContainer>
    </Wrapper>
  );
};

export default StatsViewer;
