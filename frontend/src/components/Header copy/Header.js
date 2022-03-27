import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container fluid className="headerContainer">
        <Navbar.Brand href="/">This Title</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Welcome:</Navbar.Text>
            <NavDropdown title="Guest" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="/">Login</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
