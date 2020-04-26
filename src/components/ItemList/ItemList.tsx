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
  display: flex;
  align-items: center;
  font-size: 0.5em;
  padding: 0 0.5rem;
  cursor: pointer;

  &:hover {
    background: lightgray;
  }

  img {
    padding: 0 0.2rem;
  }
`;

const Item = ({ index, style }: ItemProps) => {
  const helmetItems = useSelector(selectHelmetItems);
  const items = Object.values(helmetItems).sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );

  const item: any = items[index];
  return (
    <StyledListItem style={style}>
      <img
        src={`https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/${item.id}.png`}
        height="36"
        width="32"
        alt="Icon"
      />
      {item.name}
    </StyledListItem>
  );
};

const ItemList = () => {
  return (
    <List height={300} itemCount={1000} itemSize={60} width={300}>
      {Item}
    </List>
  );
};

export default ItemList;
