import React from "react";
import { Wrapper, ContentContainer } from "../LoadoutSelector/LoadoutSelector";
import styled from "styled-components";
import { transparentize } from "polished";
import { useSelector } from "react-redux";
import {
  selectAllItemsLoading,
  selectLoadoutValues,
  selectAllItemsError,
} from "../../pages/Loadout/loadoutSlice";
import { CenteredDiv } from "../ItemList/ItemList";
import ScaleLoader from "react-spinners/ScaleLoader";

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
  const allItemsLoading = useSelector(selectAllItemsLoading);
  const allItemsError = useSelector(selectAllItemsError);

  const loadoutValues = useSelector(selectLoadoutValues);
  const {
    attack_crush,
    attack_magic,
    attack_ranged,
    attack_slash,
    attack_stab,
    defence_crush,
    defence_magic,
    defence_ranged,
    defence_slash,
    defence_stab,
    magic_damage,
    melee_strength,
    prayer,
    ranged_strength,
  } = loadoutValues;

  return (
    <Wrapper>
      <ContentContainer>
        {allItemsError ? (
          <p>{allItemsError}</p>
        ) : !allItemsLoading ? (
          <div>
            <StatArea>
              <h3>Attack Bonuses</h3>
              <ul>
                <li>Stab: {attack_stab}</li>
                <li>Slash: {attack_slash}</li>
                <li>Crush: {attack_crush}</li>
                <li>Magic: {attack_magic}</li>
                <li>Ranged: {attack_ranged}</li>
              </ul>
            </StatArea>
            <StatArea>
              <h3>Defense Bonuses</h3>
              <ul>
                <li>Stab: {defence_stab}</li>
                <li>Slash: {defence_slash}</li>
                <li>Crush: {defence_crush}</li>
                <li>Magic: {defence_magic}</li>
                <li>Ranged: {defence_ranged}</li>
              </ul>
            </StatArea>
            <StatArea>
              <h3>Other Bonuses</h3>
              <ul>
                <li>Melee Strength: {melee_strength}</li>
                <li>Ranged Strength: {ranged_strength}</li>
                <li>Magic Damage: {magic_damage}</li>
                <li>Prayer: {prayer}</li>
              </ul>
            </StatArea>
            {/* <StatArea>
              <h3>Target Specific Bonuses</h3>
              <ul>
                <li>Undead</li>
                <li>Slayer</li>
              </ul>
            </StatArea> */}
          </div>
        ) : (
          <CenteredDiv>
            <ScaleLoader color={"#4ecca3"} loading={allItemsLoading} />
          </CenteredDiv>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default StatsViewer;
