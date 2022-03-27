import React from "react";
import { Row } from "react-bootstrap";

const Jumbo = () => {
  return (
    <Row>
      <div className="jumbo">
        <div className="jumbo-title">Welcome to 'insertnamehere'.</div>
        <div className="jumbo-subtitle">
          A community to learn and share
          <br />
          guides or tutorials for games.
        </div>
        <div className="jumbo-image jumbo-image-home">
          <img src="https://cdn.7tv.app/emote/61500f246251d7e000daa3ca/4x" />
        </div>
      </div>
    </Row>
  );
};

export default Jumbo;
