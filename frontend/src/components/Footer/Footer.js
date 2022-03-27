import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justityContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">IDK MAN</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
