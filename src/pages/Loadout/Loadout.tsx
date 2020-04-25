import React from "react";
import LoadoutSelector from "../../components/LoadoutSelector/LoadoutSelector";
import StatsViewer from "../../components/StatsViewer/StatsViewer";
import Options from "../../components/Options/Options";

// Have isEditable Props

const Loadout = () => {
  return (
    <>
      <h1>Enter Loadout Name...</h1>
      <h2>Select Category</h2>
      <Options />
      <LoadoutSelector />
      <StatsViewer />
    </>
  );
};

export default Loadout;
