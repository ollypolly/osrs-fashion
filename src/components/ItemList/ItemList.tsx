import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItems,
  setLoadoutItem,
  setOpenDropdown,
  selectOpenDropdown,
  selectItemsLoading,
  selectDropdownSearch,
  setDropdownSearch,
  selectCurrentLoadout,
  setLoadout,
  selectAllItems,
} from "../../pages/Loadout/loadoutSlice";
import styled from "styled-components";
import { fetchItems } from "../../pages/Loadout/loadoutSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaTimesCircle, FaBan } from "react-icons/fa";
import { transparentize } from "polished";
import HoverItemInfoWrapper from "../HoverItemInfoWrapper/HoverItemInfoWrapper";
import { StringParam, useQueryParams } from "use-query-params";
import Tooltip from "../Tooltip";
import wikiIcon from "../../img/wiki_icon.svg";

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  border: 1px solid gray;
  border-radius: 4px;
  left: 40px;
  top: 40px;
  height: 340px;
  width: 300px;
  background: white;

  strong {
    font-size: 0.6em;
    padding: 0 0.5rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledSearch = styled.input`
  font-size: 0.5em;
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
  color: black;
  margin-bottom: 0.6rem;
  width: 100%;

  &::placeholder {
    color: lightgray;
  }
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;

  svg {
    font-size: 0.6em;

    transition: color 0.1s ease-in-out;
    cursor: pointer;
    color: ${transparentize(0.5, "black")};

    &:hover {
      color: black;
    }
  }
`;

const ClearIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 14px;

  svg {
    font-size: 0.7em;
    cursor: pointer;

    transition: color 0.1s ease-in;
    color: ${transparentize(0.5, "black")};
  }

  &:hover {
    svg {
      color: black;
    }
  }
`;

const WikiIcon = styled(ClearIcon)`
  right: 50px;
  cursor: pointer;
`;

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const openDropdown = useSelector(selectOpenDropdown)!;
  const itemsLoading = useSelector(selectItemsLoading);
  const dropdownSearch = useSelector(selectDropdownSearch);
  const loadout = useSelector(selectCurrentLoadout);

  const allItems = useSelector(selectAllItems);

  const currentItem = loadout && allItems[loadout[openDropdown]];

  const [query, setQuery] = useQueryParams({
    head: StringParam,
    cape: StringParam,
    neck: StringParam,
    ammo: StringParam,
    weapon: StringParam,
    body: StringParam,
    shield: StringParam,
    legs: StringParam,
    hands: StringParam,
    feet: StringParam,
    ring: StringParam,
    name: StringParam,
  });

  const itemsNotLoaded = !items[openDropdown];

  useEffect(() => {
    dispatch(setDropdownSearch(undefined));
    if (itemsNotLoaded && !itemsLoading) {
      dispatch(fetchItems(openDropdown));
    }
  }, [dispatch, itemsNotLoaded, itemsLoading, openDropdown]);

  return (
    <Dropdown>
      {itemsLoading ? (
        <CenteredDiv>
          <ScaleLoader color={"#4ecca3"} loading={itemsLoading} />
        </CenteredDiv>
      ) : (
        <Wrapper>
          <strong>Select {openDropdown} item</strong>
          {loadout && loadout[openDropdown] && (
            <>
              <Tooltip
                hideArrow
                followCursor
                placement="top"
                trigger="hover"
                tooltip={`Clear ${openDropdown} item`}
              >
                <ClearIcon
                  onClick={() => {
                    const queryClone: { [id: string]: any } = { ...query };
                    delete queryClone[openDropdown];

                    const loadoutClone: { [id: string]: any } = { ...loadout };
                    delete loadoutClone[openDropdown];
                    setQuery({ ...queryClone }, "push");
                    dispatch(setLoadout(loadoutClone));
                    dispatch(setOpenDropdown(undefined));
                  }}
                >
                  <FaBan />
                </ClearIcon>
              </Tooltip>

              <Tooltip
                hideArrow
                followCursor
                placement="top"
                trigger="hover"
                tooltip={`${currentItem?.name} OSRS Wiki page`}
              >
                <a
                  href={currentItem?.wiki_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WikiIcon>
                    <img src={wikiIcon} height="21" alt="OSRS Wiki" />
                  </WikiIcon>
                </a>
              </Tooltip>
            </>
          )}
          <FlexDiv>
            <StyledSearch
              placeholder="Search..."
              value={dropdownSearch ?? ""}
              onChange={(event) =>
                dispatch(setDropdownSearch(event.target.value))
              }
            />

            {dropdownSearch && (
              <FaTimesCircle
                onClick={() => dispatch(setDropdownSearch(undefined))}
              />
            )}
          </FlexDiv>

          <List
            height={275}
            itemCount={
              itemsNotLoaded
                ? 1
                : Object.values(items[openDropdown]).filter((item: any) =>
                    item.name
                      .toLowerCase()
                      .includes(dropdownSearch?.toLowerCase() ?? "")
                  ).length
            }
            itemSize={60}
            width={300}
          >
            {Item}
          </List>
        </Wrapper>
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
  const [query, setQuery] = useQueryParams({
    head: StringParam,
    cape: StringParam,
    neck: StringParam,
    ammo: StringParam,
    weapon: StringParam,
    body: StringParam,
    shield: StringParam,
    legs: StringParam,
    hands: StringParam,
    feet: StringParam,
    ring: StringParam,
    name: StringParam,
  });
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const openDropdown = useSelector(selectOpenDropdown);
  const dropdownSearch = useSelector(selectDropdownSearch);

  if (!openDropdown || !items[openDropdown]) {
    return null;
  }

  const specificItems = [...Object.values(items[openDropdown])]
    .filter((item: any) =>
      item.name.toLowerCase().includes(dropdownSearch?.toLowerCase() ?? "")
    )
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  const item: any = specificItems[index];

  if (!item) {
    return null;
  }

  return (
    <StyledListItem
      style={style}
      onClick={() => {
        setQuery({ ...query, [openDropdown]: item.id }, "push");

        dispatch(setLoadoutItem({ id: item.id, name: openDropdown }));
        dispatch(setOpenDropdown(undefined));
      }}
    >
      <HoverItemInfoWrapper id={item.id}>
        <img
          src={`https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/${item.id}.png`}
          height="32"
          width="36"
          alt="Icon"
        />
      </HoverItemInfoWrapper>
      {item.name}
    </StyledListItem>
  );
};

export default ItemList;
