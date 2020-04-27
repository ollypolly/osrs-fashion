import React from "react";
import Tooltip from "../Tooltip";
import styled from "styled-components";

interface Props {
  src: string;
}

const StyledTooltip = styled(Tooltip)`
  span {
    color: black;
  }
`;

const HoverItemIcon = ({ src }: Props) => {
  return (
    <StyledTooltip
      hideArrow
      followCursor
      placement="top"
      trigger="hover"
      tooltip="Item Info"
    >
      <img src={src} height="32" width="36" alt="Icon" />
    </StyledTooltip>
  );
};

export default HoverItemIcon;
