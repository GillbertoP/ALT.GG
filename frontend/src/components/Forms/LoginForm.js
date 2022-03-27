import React, { useEffect, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";
import ErrorMessage from "../ErrorMessage";
import * as FaIcons from "react-icons/fa";
import Loading from "../Loading";

const LoginForm = ({ loginExpandRef }) => {
  const [formData, setFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      usernameRegister: "",
      emailRegister: "",
      passwordRegister: "",
      passwordConfirmRegister: "",
    }
  );
  const dispatch = useDispatch();

  //login
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, loginError, userInfo } = userLogin;

  //submit login form
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(formData.email, formData.password));
  };

  //register
  //open register form
  const [registerMenu, setRegisterMenu] = useState(false);

  //register error message
  const [registerMessage, setRegisterMessage] = useState({
    registerErrorVariant: "danger",
    registerErrorMessage: "",
  });

  const userRegister = useSelector((state) => state.userRegister);
  const { registerLoading, registerError, registerUserInfo } = userRegister;

  //subtmit register form
  const submitHandlerRegister = async (e) => {
    e.preventDefault();

    if (formData.passwordRegister !== formData.passwordConfirmRegister) {
      setRegisterMessage({
        registerErrorMessage: "Passwords do not match.",
        registerErrorVariant: "danger",
      });
    } else {
      dispatch(
        register(
          formData.usernameRegister,
          formData.emailRegister,
          formData.passwordRegister
        )
      );
    }
  };

  //check if logged in
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userInfo || registerUserInfo) {
      setLoggedIn(true);
    }

    if (registerError && registerError.registerErrorMessage) {
      setRegisterMessage({
        registerErrorMessage: registerError.registerErrorMessage,
        registerErrorVariant: registerError.registerErrorVariant,
      });
    } else if (registerUserInfo && registerUserInfo.registerErrorMessage) {
      setRegisterMessage({
        registerErrorMessage: registerUserInfo.registerErrorMessage,
        registerErrorVariant: registerUserInfo.registerErrorVariant,
      });
    }
  }, [userInfo, registerUserInfo, registerError]);

  return (
    <>
      {(loading || registerLoading) && <Loading />}
      <div
        className={`expand-menu-wrapper ${registerMenu ? "register" : ""}`}
        style={
          registerMenu && registerMessage.registerErrorMessage
            ? { height: "480px" }
            : null
        }
        ref={loginExpandRef}
      >
        <div className="expand-menu-header">Login</div>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="loginFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ email: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="loginFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={formData.password || ""}
              onChange={(e) => setFormData({ password: e.target.value })}
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

        <fieldset disabled={registerMenu ? false : true}>
          <div className={`register-menu ${registerMenu ? "active" : ""}`}>
            <div className="expand-menu-header">
              <Button
                className="register-menu-back-button"
                onClick={() => {
                  setRegisterMenu(false);
                  setFormData({ email: "", password: "" });
                  if (loginError) {
                    loginError.loginErrorMessage = "";
                  }
                }}
              >
                <FaIcons.FaArrowLeft />
              </Button>
              Register
            </div>
            <Form onSubmit={submitHandlerRegister}>
              <Form.Group controlId="registerFormUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={formData.usernameRegister || ""}
                  onChange={(e) => {
                    if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
                      setFormData({ usernameRegister: e.target.value });
                    }
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="registerFormEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.emailRegister || ""}
                  onChange={(e) =>
                    setFormData({ emailRegister: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="registerFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.passwordRegister || ""}
                  onChange={(e) =>
                    setFormData({ passwordRegister: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="registerFormPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.passwordConfirmRegister || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirmRegister: e.target.value,
                    })
                  }
                ></Form.Control>
              </Form.Group>

              {registerMessage && registerMessage.registerErrorMessage && (
                <ErrorMessage variant={registerMessage.registerErrorVariant}>
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
        </fieldset>
      </div>
      <div className={`loggedIn ${loggedIn ? "true" : ""}`}></div>
    </>
  );
};

export default LoginForm;
