import React from "react";
import { StyledBigInput } from "../Loadout/Loadout";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import styled from "styled-components";

export interface Category {
  name: string;
  image: string;
}

const categories: { [id: string]: Category } = {
  boss: {
    name: "Bosses",
    image: "https://pbs.twimg.com/media/DSzBNCkVAAAr7sG.jpg",
  },
  skill: {
    name: "Skilling",
    image:
      "https://oldschool.runescape.wiki/images/thumb/f/fe/Warding_Blog_%281%29.jpg/600px-Warding_Blog_%281%29.jpg?83627",
  },
  mini: {
    name: "Mini Games",
    image: "https://pbs.twimg.com/media/DKt_06yXoAAxbib.jpg",
  },
  bis: {
    name: "Best In Slot",
    image:
      "https://gamesmeta.com/wp-content/uploads/2019/08/Webp.net-resizeimage-21.jpg",
  },
};

const Container = styled.div`
  margin: 2rem 0;
`;

const Categories = () => {
  return (
    <>
      <h1>Select Category</h1>
      <StyledBigInput placeholder="Search..." />
      <Container>
        {Object.keys(categories).map((category) => (
          <CategoryBlock category={categories[category]} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
