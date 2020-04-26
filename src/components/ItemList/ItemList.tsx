import React from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { selectHelmetItems } from "../../pages/Loadout/loadoutSlice";
import styled from "styled-components";

interface ItemProps {
  index: number;
  style: any;
}

const StyledListItem = styled.div`
  font-size: 0.5em;
`;

const Item = ({ index, style }: ItemProps) => {
  const helmetItems = useSelector(selectHelmetItems);
  const items = Object.values(helmetItems);

  const item: any = items[index];
  return <StyledListItem style={style}>{item.name}</StyledListItem>;
};

const ItemList = () => {
  return (
    <List height={150} itemCount={1000} itemSize={35} width={300}>
      {Item}
    </List>
  );
};

export default ItemList;
