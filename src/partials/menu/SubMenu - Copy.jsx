import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SubMenu = ({ submenus }) => {
  console.log("submenus", submenus);

  return (
    <ul className="dropdown">
      {submenus.SUB_MENU ? (
        <>
          <button type="button" aria-haspopup="menu">
            {submenus.PRCSNAME}{" "}
          </button>
          <SubMenu submenus={submenus.SUB_MENU} />
        </>
      ) : (
        <a>{submenus.PRCSNAME}</a>
      )}
    </ul>
  );
};

export default SubMenu;
