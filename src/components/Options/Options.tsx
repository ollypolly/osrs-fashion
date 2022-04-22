import React from "react";
import { FaShareAlt } from "react-icons/fa";
import styled from "styled-components";
import { transparentize } from "polished";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Links = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LinkIcon = styled.li`
  display: inline-block;
  font-size: 1.5em;
  padding-right: 0.5rem;

  cursor: pointer;

  transition: color 0.1s ease-in;
  color: ${(props) => transparentize(0.5, props.theme.textColor)};

  &:hover {
    color: ${(props) => props.theme.textColor};
  }

  &:not(:first-child) {
    margin-left: 0.7rem;
  }
`;

const Options = () => {
  return (
    <Links>
      <Tooltip followCursor title="Share">
        <LinkIcon title="Share">
          <FaShareAlt
            onClick={() => {
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => toast.success("URL copied to clipboard!"))
                .catch((err) => toast.error(err));
            }}
          />
        </LinkIcon>
      </Tooltip>
      {/* <LinkIcon title="Save Loadout">
        <FaSave />
      </LinkIcon>
      <LinkIcon title="Delete Loadout">
        <FaTrash />
      </LinkIcon>
      <LinkIcon title="Share Loadout">
        <FaShare />
      </LinkIcon> */}
    </Links>
  );
};

export default Options;
