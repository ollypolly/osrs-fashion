import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Category } from "../../pages/Categories/Categories";

interface CategoryBlockProps {
  category: Category;
}

const StyledBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 1rem;

  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  transition: filter 0.1s ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const CategoryBlock = ({ category }: CategoryBlockProps) => {
  return (
    <StyledLink to="/list">
      <StyledBlock
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(
            ${category.image}
        )`,
        }}
      >
        <h2>{category.name}</h2>
      </StyledBlock>
    </StyledLink>
  );
};

export default CategoryBlock;
