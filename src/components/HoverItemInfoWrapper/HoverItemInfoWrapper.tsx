import React from "react";
import Tooltip from "../Tooltip";
import styled from "styled-components";

interface Props {
  id: string;
  children: any;
}

const StyledTooltip = styled(Tooltip)`
  span {
    color: black;
  }
`;

const HoverItemInfoWrapper = ({ id, children }: Props) => {
  return (
    <StyledTooltip
      hideArrow
      followCursor
      placement="top"
      trigger="hover"
      tooltip={`Item Info for ${id}`}
    >
      {children}
    </StyledTooltip>
  );
};

export default HoverItemInfoWrapper;
