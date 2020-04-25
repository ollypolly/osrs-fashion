import React from "react";
import { toggleDarkMode, selectDarkMode } from "./navSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <nav>
      <Link to="/">
        <h2>OSRS Loadout Calculator</h2>
      </Link>
      <Link to="/">Create</Link>
      <Link to="/categories">Browse</Link>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
      />
    </nav>
  );
};

export default Nav;
