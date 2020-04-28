import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenDropdown,
  selectOpenDropdown,
  selectCurrentLoadout,
} from "../../pages/Loadout/loadoutSlice";
import ItemList from "../ItemList/ItemList";
import HoverItemInfoWrapper from "../HoverItemInfoWrapper/HoverItemInfoWrapper";
import icons from "../../img/icons.png";

export interface Icon {
  name: string;
  image: string;
}

export interface ItemSelectorProps {
  id: string;
  icon: Icon;
}

const StyledDropdownContainer = styled.div`
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
    background: white;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

interface DropdownProps {
  isOpen: boolean;
}

const ClickableArea = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = props.id === openDropdown;

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

  return (
    <StyledDropdownContainer ref={dropdownRef} id={props.id}>
      <ClickableArea
        onClick={() =>
          isOpen
            ? dispatch(setOpenDropdown(undefined))
            : dispatch(setOpenDropdown(props.id))
        }
      >
        {currentLoadout && currentLoadout[props.id] ? (
          <HoverItemInfoWrapper id={currentLoadout[props.id]}>
            <img
              src={`https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/${
                currentLoadout[props.id]
              }.png`}
              height="32"
              width="36"
              alt="Icon"
            />
          </HoverItemInfoWrapper>
        ) : (
          <>
            <IconDiv id={props.id} />
          </>
        )}
      </ClickableArea>
      {isOpen && <ItemList />}
    </StyledDropdownContainer>
  );
};

export default ItemSelector;
