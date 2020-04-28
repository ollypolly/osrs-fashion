import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import styled from "styled-components";
import { transparentize } from "polished";
import Tooltip from "../Tooltip";

const Links = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LinkIcon = styled.li`
  display: inline-block;
  font-size: 1.5em;

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
  const [copied, setCopied] = useState(false);

  return (
    <Links>
      <Tooltip
        hideArrow
        followCursor
        placement="top"
        trigger="hover"
        tooltip={copied ? "Copied!" : "Copy URL to Clipboard"}
      >
        <LinkIcon title="Copy URL to Clipboard">
          <FaCopy
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
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
