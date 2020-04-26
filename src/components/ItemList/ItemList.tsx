import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItems,
  setLoadoutItem,
  setOpenDropdown,
  selectOpenDropdown,
  selectItemsLoading,
} from "../../pages/Loadout/loadoutSlice";
import styled from "styled-components";
import { fetchItems } from "../../pages/Loadout/loadoutSlice";

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  border: 1px solid gray;
  border-radius: 4px;
  left: 40px;
  top: 40px;
  height: 300px;
  width: 300px;
  background: white;
`;

const ItemList = () => {
  // Check if list exists in state
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const openDropdown = useSelector(selectOpenDropdown)!;
  const itemsLoading = useSelector(selectItemsLoading);

  const itemsNotLoaded = !items[openDropdown];

  useEffect(() => {
    if (itemsNotLoaded && !itemsLoading) {
      // Fetch items
      dispatch(fetchItems(openDropdown));
    }
  }, [dispatch, itemsNotLoaded, itemsLoading, openDropdown]);

  return (
    <Dropdown>
      {itemsLoading ? (
        <p>Loading Spinner</p>
      ) : (
        <List height={300} itemCount={1000} itemSize={60} width={300}>
          {Item}
        </List>
      )}
    </Dropdown>
  );
};

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
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const openDropdown = useSelector(selectOpenDropdown);

  if (!openDropdown || !items[openDropdown]) {
    return null;
  }

  const specificItems = Object.values(
    items[openDropdown]
  ).sort((a: any, b: any) => a.name.localeCompare(b.name));

  const item: any = specificItems[index];
  return (
    <StyledListItem
      style={style}
      onClick={() => {
        dispatch(setLoadoutItem({ id: item.id, name: openDropdown }));
        dispatch(setOpenDropdown(undefined));
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/${item.id}.png`}
        height="32"
        width="36"
        alt="Icon"
      />
      {item.name}
    </StyledListItem>
  );
};

export default ItemList;
