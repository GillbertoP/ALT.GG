import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
import LogoutForm from "../Forms/LogoutForm";

const NavBarFooter = ({
  loginExpandRef,
  logoutExpandRef,
  loginMenuItemRef,
  logoutMenuItemRef,
  expands,
  setExpands,
}) => {
  return (
    <div className="menu-list side-menu-footer">
      <ul>
        <li>
          <Link to="/" className={`menu-item`}>
            <div className="menu-icon">
              <FaIcons.FaUser />
            </div>
            <div className="menu-text">Account</div>
          </Link>
        </li>

        <li>
          <Link to="/" className={`menu-item`}>
            <div className="menu-icon">
              <AiIcons.AiFillSetting />
            </div>
            <div className="menu-text">Settings</div>
          </Link>
        </li>

        <li
          className={`expand-menu-something-idk ${
            localStorage.getItem("userInfo") ? "hidden" : ""
          }`}
        >
          <div
            className={`menu-item ${expands.expandLogin ? "active" : ""}`}
            onClick={(e) => {
              setExpands({ expandLogin: !expands.expandLogin });
            }}
            ref={loginMenuItemRef}
          >
            <div className="menu-icon">
              <FaIcons.FaDoorOpen />
            </div>
            <div className="menu-text">Login</div>
          </div>
          <div
            className={`expand-menu ${expands.expandLogin ? "expanded" : ""}`}
          >
            <LoginForm loginExpandRef={loginExpandRef} />
          </div>
        </li>

        <li
          className={`expand-menu-something-idk ${
            localStorage.getItem("userInfo") ? "" : "hidden"
          }`}
        >
          <div
            className={`menu-item ${expands.expandLogout ? "active" : ""}`}
            onClick={() => {
              setExpands({ expandLogout: !expands.expandLogout });
            }}
            ref={logoutMenuItemRef}
          >
            <div className="menu-icon">
              <FaIcons.FaDoorOpen />
            </div>
            <div className="menu-text">Logout</div>
          </div>
          <div
            className={`expand-menu ${expands.expandLogout ? "expanded" : ""}`}
          >
            <LogoutForm
              logoutExpandRef={logoutExpandRef}
              expands={expands}
              setExpands={setExpands}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavBarFooter;
