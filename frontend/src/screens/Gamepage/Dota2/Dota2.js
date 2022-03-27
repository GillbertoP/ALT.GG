import React from "react";
import { Container, Row } from "react-bootstrap";
import GuideList from "../../../components/GuideList/GuideList";
import JumboGames from "../../../components/JumboGames/JumboGames";

const dota2 = () => {
  return (
    <div className="main">
      <JumboGames
        gameId="2"
        jumboTitle="Guides for Dota 2"
        gameBg="https://res.cloudinary.com/seproject/image/upload/v1648037348/Games/Backgrounds/dota2_bxlf2y.webp"
      />
      <Container fluid>
        <GuideList
          sectionTitle="All Guides"
          sectionCreateGuideButton="true"
          gameId="2"
          guidesType="all"
        />
      </Container>
    </div>
  );
};

export default dota2;
