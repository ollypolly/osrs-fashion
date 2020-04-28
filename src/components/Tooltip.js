import React from "react";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tooltip = ({ children, tooltip, hideArrow, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container",
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: "tooltip-arrow",
              "data-placement": placement,
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <StyledSpan
        {...getTriggerProps({
          ref: triggerRef,
          className: "trigger",
        })}
      >
        {children}
      </StyledSpan>
    )}
  </TooltipTrigger>
);

export default Tooltip;
