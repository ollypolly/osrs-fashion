import React from "react";
import { FaSave, FaTrash, FaShare } from "react-icons/fa";
import styled from "styled-components";
import { transparentize } from "polished";

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
  return (
    <Links>
      <LinkIcon title="Save Loadout">
        <FaSave />
      </LinkIcon>
      <LinkIcon title="Delete Loadout">
        <FaTrash />
      </LinkIcon>
      <LinkIcon title="Share Loadout">
        <FaShare />
      </LinkIcon>
    </Links>
  );
};

export default Options;
