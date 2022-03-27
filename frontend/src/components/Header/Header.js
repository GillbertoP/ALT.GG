import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar expand="lg">
      <Container fluid className="headerContainer">
        <Navbar.Brand className="m-auto" href="/">
          'insertlogohere'
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
