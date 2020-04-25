import React from "react";
import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 1100px) {
    margin: 0.5rem 0;
  }
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  background: ${(props) => darken(0.05, props.theme.backgroundColor)};
  border-radius: 5px;
  padding: 1rem;
  min-width: 300px;
  min-height: 461px;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const LoadoutSelector = () => {
  return (
    <Wrapper>
      <h2>Loadout</h2>
      <ContentContainer></ContentContainer>
    </Wrapper>
  );
};

export default LoadoutSelector;
