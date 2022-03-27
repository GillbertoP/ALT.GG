import React from "react";
import { Row } from "react-bootstrap";
import "./JumboGames.css";

const JumboGames = ({
  gameId,
  jumboTitle,
  jumboSubtitle1,
  jumboSubtitle2,
  jumboSubtitle3,
  jumboViews,
  jumboLikes,
  gameBg,
}) => {
  return (
    <Row>
      <div className="jumbo jumboGames">
        <div className="jumbo-title">{jumboTitle}</div>
        <div className="jumbo-subtitle1">{jumboSubtitle1}</div>
        <div className="jumbo-subtitle2">{jumboSubtitle2}</div>
        <div className="jumbo-subtitle3">{jumboSubtitle3}</div>
        <div className="jumbo-image">
          <img src={gameBg} />
        </div>
      </div>
    </Row>
  );
};

export default JumboGames;
