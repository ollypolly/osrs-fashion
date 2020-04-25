import React from "react";
import { toggleDarkMode, selectDarkMode } from "./navSlice";
import { useSelector, useDispatch } from "react-redux";
import { Header, CheckBox } from "grommet";

const Nav = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <Header>
      <h2>OSRS Loadout Calculator</h2>
      <CheckBox
        checked={darkMode}
        label="Dark Mode"
        onChange={() => dispatch(toggleDarkMode())}
      />
    </Header>
  );
};

export default Nav;
