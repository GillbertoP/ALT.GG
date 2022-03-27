import React, { useEffect, useReducer, useRef } from "react";
import * as AiIcons from "react-icons/ai";
import "./NavBar.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import SidebarData2 from "./SidebarData2";
import NavBarFooter from "./NavBarFooter";

const NavBar = () => {
  const [expands, setExpands] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      expandSideMenu: false,
      expandMenuItem: false,
      expandLogin: false,
      expandLogout: false,
    }
  );

  const ref = useRef();

  const loginExpandRef = useRef();
  const logoutExpandRef = useRef();
  const loginMenuItemRef = useRef();
  const logoutMenuItemRef = useRef();

  function handleClick(e) {
    if (
      e.target === document.querySelector(".side-menu-footer") ||
      e.target === document.querySelector(".side-menu")
    ) {
      setExpands({
        expandSideMenu: true,
      });
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // uncomment if needed
      // if (
      //   expands.expandLogin &&
      //   !expands.expandSideMenu &&
      //   !loginExpandRef.current.contains(e.target) &&
      //   !loginMenuItemRef.current.contains(e.target)
      // ) {
      //   setExpands({ expandLogin: false });
      // }

      // if (
      //   expands.expandLogout &&
      //   !logoutExpandRef.current.contains(e.target) &&
      //   !logoutMenuItemRef.current.contains(e.target)
      // ) {
      //   setExpands({ expandLogout: false });
      // }

      if (ref.current && !ref.current.contains(e.target)) {
        setExpands({
          expandSideMenu: false,
          expandMenuItem: false,
          expandLogin: false,
          expandLogout: false,
        });
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [expands]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div
          className={`side-menu ${
            expands.expandSideMenu ? "" : "inactive canClick"
          }`}
          onClick={handleClick}
          ref={ref}
        >
          <div className="top-section">
            <Link to="/">
              <div className="logo">
                <AiIcons.AiFillPlayCircle />
              </div>
            </Link>
            <div className="toggle-menu-button">
              <AiIcons.AiOutlineArrowLeft
                onClick={() => {
                  setExpands({
                    expandSideMenu: false,
                    expandMenuItem: false,
                  });
                }}
              />
            </div>
          </div>

          <div
            className={`search-controller 
            ${expands.expandSideMenu ? "" : "search-controller-inactive"}`}
            onClick={() =>
              expands.expandSideMenu
                ? null
                : setExpands({ expandSideMenu: true })
            }
          >
            <div className="search-controller-button">
              <AiIcons.AiOutlineSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              disabled={!expands.expandSideMenu}
            />
          </div>

          <div className="menu-divider"></div>

          <div className="menu-list">
            <ul>
              {SidebarData2.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={`menu-item`}
                      onClick={
                        item.subMenus
                          ? () =>
                              expands.expandSideMenu
                                ? setExpands({
                                    expandMenuItem: !expands.expandMenuItem,
                                  })
                                : setExpands({
                                    expandSideMenu: true,
                                    expandMenuItem: !expands.expandMenuItem,
                                  })
                          : null
                      }
                    >
                      <div className="menu-icon">{item.menuIcon}</div>
                      <div className="menu-text">{item.menuText}</div>
                    </Link>
                    {item.subMenus && item.subMenus.length > 0 ? (
                      <ul
                        className={`sub-menu ${
                          expands.expandMenuItem ? "active" : ""
                        }`}
                        style={
                          expands.expandMenuItem
                            ? { maxHeight: item.subMenus.length * 38 + "px" }
                            : { maxHeight: "0" }
                        }
                      >
                        {item.subMenus.map((menu, index) => (
                          <li key={index}>
                            <Link to={menu.to} className="menu-item">
                              <div className="menu-icon">
                                <img src={menu.menuIcon} />
                              </div>
                              <div className="menu-text">{menu.menuText}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          <NavBarFooter
            loginExpandRef={loginExpandRef}
            logoutExpandRef={logoutExpandRef}
            loginMenuItemRef={loginMenuItemRef}
            logoutMenuItemRef={logoutMenuItemRef}
            expands={expands}
            setExpands={setExpands}
          />
        </div>
      </IconContext.Provider>
    </>
  );
};

export default NavBar;
