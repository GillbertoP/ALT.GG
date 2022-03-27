import React, { useReducer } from "react";
import { Button, Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterForm = (registerMenu, registerMessage, loginError) => {
  const [formData, setFormData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      emailRegister: "",
      passwordRegister: "",
      passwordConfirmRegister: "",
    }
  );

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, registerError, userInfo } = userRegister;
  const submitHandlerRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={`register-menu ${registerMenu ? "active" : ""}`}>
      <div className="expand-menu-header">
        <div
          className="register-menu-back-button"
          onClick={() => {
            registerMenu = false;
            setFormData({ email: "", password: "" });
            if (loginError) loginError.loginErrorMessage = "";
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
            value={formData.emailRegister || ""}
            onChange={(e) => setFormData({ emailRegister: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="registerFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={formData.passwordRegister || ""}
            onChange={(e) => setFormData({ passwordRegister: e.target.value })}
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
  );
};

export default RegisterForm;
