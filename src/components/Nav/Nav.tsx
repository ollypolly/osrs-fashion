import React from "react";
import { toggleDarkMode, selectDarkMode } from "./navSlice";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <nav>
      <ul>
        <li>OSRS Loadout Calculator</li>
        <button onClick={() => dispatch(toggleDarkMode())}>
          {darkMode ? "Dark" : "Light"} Mode
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
