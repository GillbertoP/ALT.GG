import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

const LogoutForm = ({ logoutExpandRef, expands, setExpands }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div
      className="expand-menu-wrapper"
      style={{ height: "auto", paddingBottom: "20px" }}
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
            onClick={() => setExpands({ expandLogout: false })}
          >
            No
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogoutForm;
