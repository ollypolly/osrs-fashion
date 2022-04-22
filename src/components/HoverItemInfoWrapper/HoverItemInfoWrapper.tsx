import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllItems } from "../../pages/Loadout/loadoutSlice";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  id: string;
  children: any;
}

const StyledTooltip = styled(Tooltip)`
  span {
    color: black;
  }
`;

const StyledTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  h3 {
  }

  small {
    color: #e4e4e4;
    margin-bottom: 0.5rem;
  }
`;

const StyledValues = styled.div`
  background: #2e2e2e;
  border-radius: 4px;
  padding: 0.3rem;
  margin-top: 0.3rem;
`;

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const HoverItemInfoWrapper = ({ id, children }: Props) => {
  // Get all items using useSelector hook and selectAllItems selector
  const allItems = useSelector(selectAllItems);
  // Get item info from all items object using id
  const itemInfo = allItems[id];

  const equipmentValues = { ...itemInfo.equipment };
  delete equipmentValues.slot;
  delete equipmentValues.requirements;

  const nameMaps: { [id: string]: string } = {
    attack_stab: "Attack Stab",
    attack_crush: "Attack Crush",
    attack_magic: "Attack Magic",
    attack_ranged: "Attack Ranged",
    attack_slash: "Attack Slash",
    defence_crush: "Defence Crush",
    defence_magic: "Defence Magic",
    defence_ranged: "Defence Ranged",
    defence_slash: "Defence Slash",
    defence_stab: "Defence Stab",
    magic_damage: "Magic Damage",
    melee_strength: "Melee Strengh",
    prayer: "Prayer",
    ranged_strength: "Ranged Strength",
  };

  const tooltipContent = (
    <StyledTooltipContent>
      <h3>{itemInfo.name}</h3>
      <small>{itemInfo.examine}</small>
      <span>{`Cost: ${numberWithCommas(parseInt(itemInfo.cost))}gp`}</span>
      <span>{`Members only: ${itemInfo.members ? "Yes" : "No"}`}</span>
      {!Object.values(equipmentValues).every((value) => value === 0) && (
        <StyledValues>
          {Object.keys(equipmentValues).map((key: any) => {
            const value = equipmentValues[key];
            if (value === 0) {
              return null;
            }

            return (
              <React.Fragment key={key}>
                <small>{`${nameMaps[key]}: ${value}`}</small>
                <br />
              </React.Fragment>
            );
          })}
        </StyledValues>
      )}
    </StyledTooltipContent>
  );

  return (
    <StyledTooltip title={tooltipContent} followCursor>
      {children}
    </StyledTooltip>
  );
};

export default HoverItemInfoWrapper;
