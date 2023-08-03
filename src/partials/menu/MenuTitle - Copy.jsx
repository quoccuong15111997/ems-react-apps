import React, { useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

import SubMenu from "./SubMenu";

const MenuTitle = ({ item }) => {
  console.log('menu',item);

  return (
    <li>
      {item.SUB_MENU ? (
        <>
          <button type="button" aria-haspopup="menu">
            {item.PRCSNAME}{" "}
          </button>
          <SubMenu submenus={item.SUB_MENU} />
        </>
      ) : (
        <a>{item.PRCSNAME}</a>
      )}
    </li>
  );
};

export default MenuTitle;
