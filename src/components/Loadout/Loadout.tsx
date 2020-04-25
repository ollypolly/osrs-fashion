import React from "react";
import LoadoutSelector from "../LoadoutSelector/LoadoutSelector";
import StatsViewer from "../StatsViewer/StatsViewer";
import Options from "../Options/Options";

const Loadout = () => {
  return (
    <>
      <h1>Loadout Name</h1>
      <h2>Category</h2>
      <Options />
      <LoadoutSelector />
      <StatsViewer />
    </>
  );
};

export default Loadout;
