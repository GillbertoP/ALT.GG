import React, { useEffect, useRef, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import "./NavBar.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import SidebarData2 from "./SidebarData2";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../actions/userActions";

const NavBar = () => {
  //gotta fix/optimize all of these useStates bruh
  const [inactive, setInactive] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandLogin, setExpandLogin] = useState(false);
  const [expandLogout, setExpandLogout] = useState(false);
  const [registerMenu, setRegisterMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loginError, setLoginError] = useState({
  //   loginErrorVariant: "danger",
  //   loginErrorMessage: "",
  // });
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordConfirmRegister, setPasswordConfirmRegister] = useState("");
  const [registerMessage, setRegisterMessage] = useState({
    registerErrorVariant: "danger",
    registerErrorMessage: "",
  });
  // const [loading, setLoading] = useState(false);

  const ref = useRef();
  const loginExpandRef = useRef();
  const loginMenuItemRef = useRef();
  const logoutExpandRef = useRef();
  const logoutMenuItemRef = useRef();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, loginError, userInfo } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));

    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };

    //   setLoading(true);

    //   const { data } = await axios.post(
    //     "/api/users/login",
    //     {
    //       email,
    //       password,
    //     },
    //     config
    //   );

    //   console.log(data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    //   setLoginError({
    //     loginErrorMessage: "Login success",
    //     loginErrorVariant: "success",
    //   });
    // } catch (error) {
    //   setLoginError({
    //     loginErrorMessage: error.response.data.message,
    //     loginErrorVariant: "danger",
    //   });
    //   setLoading(false);
    //   console.log(error.response.data.message);
    // }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandlerRegister = async (e) => {
    e.preventDefault();

    if (passwordRegister !== passwordConfirmRegister) {
      setRegisterMessage({
        registerErrorMessage: "Passwords do not match.",
        registerErrorVariant: "danger",
      });
    } else {
      setRegisterMessage({ registerErrorMessage: null });

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        //setLoading(true);

        const { data } = await axios.post(
          "/api/users/",
          { email: emailRegister, password: passwordRegister },
          config
        );

        //setLoading(false);
        setRegisterMessage({
          registerErrorMessage: "Register success",
          registerErrorVariant: "success",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setRegisterMessage({
          registerErrorMessage: error.response.data.message,
          registerErrorVariant: "danger",
        });
        console.log(error.response.data.message);
        //setLoading(false);
      }
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (inactive && ref.current && !ref.current.contains(e.target)) {
        setInactive(false);
        setExpand(false);
        setExpandLogin(false);
        setExpandLogout(false);
      }

      if (
        !loginExpandRef.current.contains(e.target) &&
        !loginMenuItemRef.current.contains(e.target)
      ) {
        setExpandLogin(false);
      }

      if (
        !logoutExpandRef.current.contains(e.target) &&
        !logoutMenuItemRef.current.contains(e.target)
      ) {
        setExpandLogout(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [inactive]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div
          className={`side-menu ${inactive ? "" : "inactive canClick"}`}
          onClick={inactive ? null : () => setInactive(!inactive)}
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
                  setInactive(!inactive);
                  setExpand(false);
                }}
              />
            </div>
          </div>

          <div
            className={`search-controller 
            ${inactive ? "" : "search-controller-inactive"}`}
          >
            <div className="search-controller-button">
              <AiIcons.AiOutlineSearch />
            </div>
            <input type="text" placeholder="Search" />
          </div>

          <div className="menu-divider"></div>

          <div className="menu-list">
            <ul>
              {/* {SidebarItems.map((SidebarItem, index) => (
                <SidebarData
                  key={index}
                  to={SidebarItem.to}
                  menuIcon={SidebarItem.menuIcon}
                  menuText={SidebarItem.menuText}
                  subMenus={SidebarItem.subMenus || []}
                />
              ))} */}
              {SidebarData2.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={`menu-item`}
                      onClick={item.subMenus ? () => setExpand(!expand) : null}
                    >
                      <div className="menu-icon">{item.menuIcon}</div>
                      <div className="menu-text">{item.menuText}</div>
                    </Link>
                    {item.subMenus && item.subMenus.length > 0 ? (
                      <ul
                        className={`sub-menu ${expand ? "active" : ""}`}
                        style={
                          expand
                            ? { maxHeight: item.subMenus.length * 38 + "px" }
                            : { maxHeight: "0" }
                        }
                      >
                        {item.subMenus.map((menu, index) => (
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
              })}
            </ul>
          </div>

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
                  className={`menu-item ${expandLogin ? "active" : ""}`}
                  onClick={() => setExpandLogin(!expandLogin)}
                  ref={loginMenuItemRef}
                >
                  <div className="menu-icon">
                    <FaIcons.FaDoorOpen />
                  </div>
                  <div className="menu-text">Login</div>
                </div>
                <div className={`expand-menu ${expandLogin ? "expanded" : ""}`}>
                  {loading && <Loading />}
                  <div className="expand-menu-wrapper" ref={loginExpandRef}>
                    <div className="expand-menu-header">Login</div>
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="loginFormEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="loginFormPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          value={password || ""}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      {loginError && loginError.loginErrorMessage ? (
                        <ErrorMessage variant={loginError.loginErrorVariant}>
                          {loginError.loginErrorMessage}
                        </ErrorMessage>
                      ) : null}

                      {userInfo && userInfo.loginErrorMessage ? (
                        <ErrorMessage variant={userInfo.loginErrorVariant}>
                          {userInfo.loginErrorMessage}
                        </ErrorMessage>
                      ) : null}

                      <div className="expand-menu-footer">
                        <Button className="expand-menu-button" type="submit">
                          Login
                        </Button>

                        <div className="login-menu-small-text">
                          Don't have an account?
                          <br />
                          <div
                            className="login-menu-small-text-link"
                            onClick={() => setRegisterMenu(true)}
                          >
                            Register here.
                          </div>
                        </div>
                      </div>
                    </Form>

                    <div
                      className={`register-menu ${
                        registerMenu ? "active" : ""
                      }`}
                    >
                      <div className="expand-menu-header">
                        <div
                          className="register-menu-back-button"
                          onClick={() => {
                            setRegisterMenu(false);
                            setEmail("");
                            setPassword("");
                          }}
                        >
                          <FaIcons.FaArrowLeft />
                        </div>
                        Register
                      </div>
                      <Form onSubmit={submitHandlerRegister}>
                        <Form.Group controlId="registerFormEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={emailRegister || ""}
                            onChange={(e) => setEmailRegister(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="registerFormPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={passwordRegister || ""}
                            onChange={(e) =>
                              setPasswordRegister(e.target.value)
                            }
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="registerFormPasswordConfirm">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={passwordConfirmRegister || ""}
                            onChange={(e) =>
                              setPasswordConfirmRegister(e.target.value)
                            }
                          ></Form.Control>
                        </Form.Group>

                        {registerMessage.registerErrorMessage && (
                          <ErrorMessage
                            variant={registerMessage.registerErrorVariant}
                          >
                            {registerMessage.registerErrorMessage}
                          </ErrorMessage>
                        )}

                        <div className="expand-menu-footer">
                          <Button className="expand-menu-button" type="submit">
                            Register
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`expand-menu-something-idk ${
                  localStorage.getItem("userInfo") ? "" : "hidden"
                }`}
              >
                <div
                  className={`menu-item ${expandLogout ? "active" : ""}`}
                  onClick={() => setExpandLogout(!expandLogout)}
                  ref={logoutMenuItemRef}
                >
                  <div className="menu-icon">
                    <FaIcons.FaDoorOpen />
                  </div>
                  <div className="menu-text">Logout</div>
                </div>
                <div
                  className={`expand-menu ${expandLogout ? "expanded" : ""}`}
                >
                  <div
                    className="expand-menu-wrapper"
                    style={{ height: "auto" }}
                    ref={logoutExpandRef}
                  >
                    <div className="expand-menu-header">Logout</div>
                    <Form className="expand-menu-logout">
                      <Form.Group controlId="loginFormEmail">
                        <Form.Label>Are you sure?</Form.Label>
                      </Form.Group>

                      <div>
                        <Button
                          className="expand-menu-button yesno"
                          type="submit"
                          onClick={logoutHandler}
                        >
                          Yes
                        </Button>

                        <Button
                          className="expand-menu-button yesno"
                          type="submit"
                        >
                          No
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default NavBar;
