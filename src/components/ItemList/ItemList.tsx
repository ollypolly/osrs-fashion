import React, { useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoadoutItem,
  setOpenDropdown,
  selectOpenDropdown,
  selectDropdownSearch,
  setDropdownSearch,
  selectCurrentLoadout,
  setLoadout,
  selectAllItems,
} from "../../pages/Loadout/loadoutSlice";
import styled from "styled-components";
import { FaTimesCircle, FaBan } from "react-icons/fa";
import { transparentize } from "polished";
import HoverItemInfoWrapper from "../HoverItemInfoWrapper/HoverItemInfoWrapper";
import { StringParam, useQueryParams } from "use-query-params";
import Tooltip from "@mui/material/Tooltip";
import wikiIcon from "../../img/wiki_icon.svg";
import { Box } from "@mui/material";
import { pets } from "./pets";

const Dropdown = styled.div`
  z-index: 1;
  background: white;

  strong {
    padding: 0 0.5rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const StyledSearch = styled.input`
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

export const StyledList = styled(List)`
  overflow-x: hidden !important;
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
    font-size: 1.2em;
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

const sortFilter = (a: any, b: any) => a.name.localeCompare(b.name);
const membersOnlyPetsFilter = (item: any) => item.members;

const ItemList = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const openDropdown = useSelector(selectOpenDropdown)!;
  const dropdownSearch = useSelector(selectDropdownSearch);
  const loadout = useSelector(selectCurrentLoadout);

  const searchFilter = (item: any) =>
    item.name.toLowerCase().includes(dropdownSearch?.toLowerCase() ?? "");

  const slotSelectFiler = (item: any) =>
    item.equipment?.slot === openDropdown ||
    (openDropdown === "weapon" && item.equipment?.slot === "2h");

  const allItems = useSelector(selectAllItems);
  const itemArray = [...Object.values(allItems)];

  let slotItems = itemArray
    .filter(slotSelectFiler)
    .filter(searchFilter)
    .sort(sortFilter);

  if (openDropdown === "pet") {
    slotItems = itemArray
      .filter((item: any) => pets.includes(item.name))
      .filter(searchFilter)
      .filter(membersOnlyPetsFilter)
      .sort(sortFilter);
  }

  const currentItem = loadout && allItems[loadout[openDropdown]];

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = id === openDropdown;

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef && dropdownRef.current) {
        if (dropdownRef.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        dispatch(setOpenDropdown(undefined));
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

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
    pet: StringParam,
  });

  useEffect(() => {
    dispatch(setDropdownSearch(undefined));
    if (searchRef && searchRef.current) {
      searchRef.current.focus();
    }
  }, [dispatch]);

  return (
    <Dropdown ref={dropdownRef}>
      <Wrapper>
        <Box mt={1}>
          <strong>Select {openDropdown} item</strong>
          {loadout && loadout[openDropdown] && (
            <>
              <Tooltip followCursor title={`Clear ${openDropdown} item`}>
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
                followCursor
                title={`${currentItem?.name} OSRS Wiki page`}
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
        </Box>

        <FlexDiv>
          <StyledSearch
            ref={searchRef}
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

        <StyledList
          height={275}
          itemCount={slotItems.length}
          itemSize={60}
          width={300}
        >
          {Item}
        </StyledList>
      </Wrapper>
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
    pet: StringParam,
  });
  const dispatch = useDispatch();
  const openDropdown = useSelector(selectOpenDropdown);
  const dropdownSearch = useSelector(selectDropdownSearch);
  const allItems = useSelector(selectAllItems);

  if (!openDropdown) {
    return null;
  }

  const searchFilter = (item: any) =>
    item.name.toLowerCase().includes(dropdownSearch?.toLowerCase() ?? "");

  const slotSelectFiler = (item: any) =>
    item.equipment?.slot === openDropdown ||
    (openDropdown === "weapon" && item.equipment?.slot === "2h");

  const itemArray = [...Object.values(allItems)];
  let slotItems = itemArray
    .filter(slotSelectFiler)
    .filter(searchFilter)
    .sort(sortFilter);

  if (openDropdown === "pet") {
    slotItems = itemArray
      .filter((item: any) => pets.includes(item.name))
      .filter(searchFilter)
      .filter(membersOnlyPetsFilter)
      .sort(sortFilter);
  }

  const item: any = slotItems[index];

  if (!item) {
    return null;
  }

  return (
    <StyledListItem
      style={style}
      onClick={() => {
        dispatch(setLoadoutItem({ id: item.id, name: openDropdown }));
        dispatch(setOpenDropdown(undefined));
        const queryClone: { [id: string]: any } = { ...query };

        if (item.equipment && item.equipment.slot === "2h") {
          dispatch(setLoadoutItem({ id: undefined, name: "shield" }));
          // Clear item from url
          delete queryClone["shield"];
        }

        setQuery({ ...queryClone, [openDropdown]: item.id }, "push");
      }}
    >
      <HoverItemInfoWrapper id={item.id}>
        <img
          src={`data:image/png;base64, ${item.icon}`}
          height="44"
          width="48"
          alt="Icon"
        />
      </HoverItemInfoWrapper>
      {item.name}
    </StyledListItem>
  );
};

export default ItemList;
