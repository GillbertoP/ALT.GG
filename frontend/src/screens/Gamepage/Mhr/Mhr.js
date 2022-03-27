import React from "react";
import { Container } from "react-bootstrap";
import GuideList from "../../../components/GuideList/GuideList";
import JumboGames from "../../../components/JumboGames/JumboGames";

const mhr = () => {
  return (
    <div className="main">
      <JumboGames
        gameId="2"
        jumboTitle="Guides for Monster Hunter: Rise"
        gameBg="https://res.cloudinary.com/seproject/image/upload/v1648037349/Games/Backgrounds/mhrise_j4dcpk.jpg"
      />
      <Container fluid>
        <GuideList
          sectionTitle="All Guides"
          sectionCreateGuideButton="true"
          gameId="1"
          guidesType="all"
        />
      </Container>
    </div>
  );
};

export default mhr;
