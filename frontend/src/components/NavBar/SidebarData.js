import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarData = (props) => {
  const { menuIcon, menuText, subMenus, to } = props;

  const [expand, setExpand] = useState(false);

  return (
    <li>
      <Link to={to} className={`menu-item`} onClick={() => setExpand(!expand)}>
        <div className="menu-icon">{menuIcon}</div>
        <div className="menu-text">{menuText}</div>
      </Link>
      {subMenus && subMenus.length > 0 ? (
        <ul
          className={`sub-menu ${expand ? "active" : ""}`}
          style={
            expand
              ? { maxHeight: subMenus.length * 38 + "px" }
              : { maxHeight: "0" }
          }
        >
          {subMenus.map((menu, index) => (
            <li key={index}>
              <Link to={menu.to} className="menu-item">
                <div className="menu-icon">{menu.menuIcon}</div>
                <div className="menu-text">{menu.menuText}</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default SidebarData;
