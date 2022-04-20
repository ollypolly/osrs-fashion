import React, { useRef } from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenDropdown,
  selectOpenDropdown,
  selectCurrentLoadout,
  selectAllItems,
} from "../../pages/Loadout/loadoutSlice";
import ItemList from "../ItemList/ItemList";
import HoverItemInfoWrapper from "../HoverItemInfoWrapper/HoverItemInfoWrapper";
import icons from "../../img/icons.png";
import Tooltip from "../Tooltip";

export interface Icon {
  name: string;
  image: string;
}

export interface ItemSelectorProps {
  id: string;
  icon: Icon;
}

interface ClickableAreaProps {
  disabledShieldSlot: boolean;
}

const StyledDropdownContainer = styled.div<ClickableAreaProps>`
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  color: black;
  font-size: 2em;
  border: 1px solid lightgray;

  transition: background 0.1s ease-in;
  background: ${transparentize(0.3, "white")};

  &:hover {
    background: ${(props) =>
      props.disabledShieldSlot ? transparentize(0.3, "white") : "white"};
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const ClickableArea = styled.div<ClickableAreaProps>`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => props.disabledShieldSlot && 0.4};
`;

const IconDiv = styled.div`
  background: url(${icons}) no-repeat 50% 9px;
  width: 50px;
  height: 50px;

  &#cape {
    background-position: 50% -391px;
  }

  &#neck {
    background-position: 50% -241px;
  }

  &#ammo {
    background-position: 50% -491px;
  }

  &#weapon {
    background-position: 50% -141px;
  }

  &#body {
    background-position: 50% -41px;
  }

  &#shield {
    background-position: 50% -191px;
  }

  &#legs {
    background-position: 50% -91px;
  }

  &#feet {
    background-position: 50% -341px;
  }

  &#hands {
    background-position: 50% -291px;
  }

  &#ring {
    background-position: 50% -441px;
  }
`;

const ItemSelector = (props: ItemSelectorProps) => {
  const openDropdown = useSelector(selectOpenDropdown);
  const currentLoadout = useSelector(selectCurrentLoadout);
  const allItems = useSelector(selectAllItems);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = props.id === openDropdown;

  const disabledShieldSlot = !!(
    currentLoadout &&
    allItems[currentLoadout.weapon]?.equipment?.slot === "2h" &&
    props.id === "shield"
  );

  return (
    <StyledDropdownContainer
      disabledShieldSlot={disabledShieldSlot}
      ref={dropdownRef}
      id={props.id}
    >
      <Tooltip
        hideArrow={false}
        tooltipShown={openDropdown === props.id && !!openDropdown}
        placement="bottom"
        trigger="click"
        tooltip={<ItemList />}
      >
        <ClickableArea
          disabledShieldSlot={disabledShieldSlot}
          onClick={() => {
            if (!disabledShieldSlot) {
              isOpen
                ? dispatch(setOpenDropdown(undefined))
                : dispatch(setOpenDropdown(props.id));
            }
          }}
        >
          {currentLoadout && currentLoadout[props.id] ? (
            <>
              <HoverItemInfoWrapper id={currentLoadout[props.id]}>
                <img
                  src={`data:image/png;base64, ${
                    allItems[currentLoadout[props.id]].icon
                  }`}
                  height="44"
                  width="48"
                  alt="Icon"
                />
              </HoverItemInfoWrapper>
            </>
          ) : (
            <Tooltip
              hideArrow
              followCursor
              placement="top"
              trigger={disabledShieldSlot ? "none" : "hover"}
              tooltip={`Select ${props.id} item`}
            >
              <IconDiv id={props.id} />
            </Tooltip>
          )}
        </ClickableArea>
      </Tooltip>
    </StyledDropdownContainer>
  );
};

export default ItemSelector;
