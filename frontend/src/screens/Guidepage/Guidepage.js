import React from "react";
import { Container, Row } from "react-bootstrap";
import GuideList from "../../components/GuideList/GuideList";

const Guidepage = () => {
  return (
    <div className="main">
      <Container fluid>
        <GuideList sectionTitle="All Guides" gameId="all" guidesType="all" />
      </Container>
    </div>
  );
};

export default Guidepage;
