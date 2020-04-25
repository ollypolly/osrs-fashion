import React from "react";
import { toggleDarkMode, selectDarkMode } from "../Nav/navSlice";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <ul>
      <li>My Loadouts</li>
      <li>Loadout 1</li>
      <li>Loadout 2</li>
      <div>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => dispatch(toggleDarkMode())}
        />
        <label>Dark Mode</label>
      </div>
    </ul>
  );
};

export default Sidebar;
