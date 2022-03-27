import React, { useEffect } from "react";
import { Card, CardGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { listGames } from "../../actions/gamesActions";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const GameList = () => {
  const dispatch = useDispatch();

  const gameList = useSelector((state) => state.gameList);
  const { loading, games, error } = gameList;

  useEffect(() => {
    dispatch(listGames());
  }, [dispatch]);

  return (
    <Row>
      <div className="section">
        <div className="section-title">Popular Games</div>
        <CardGroup className="section-card-list">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          {games?.map((game) => (
            <Link key={game.game_id} to={game.game_to}>
              <Card className="section-card">
                <Card.Img
                  variant="top"
                  src={game.game_img}
                  className="section-card-image"
                />
                <Card.Body>
                  <Card.Title className="section-card-title">
                    {game.game_name}
                  </Card.Title>
                  <Card.Subtitle className="section-card-subtitle">
                    {game.platforms}
                  </Card.Subtitle>
                </Card.Body>
                <Card.Footer className="section-card-footer">
                  <div className="section-card-footer-stuff">
                    <div className="section-card-footer-icon">
                      <FaIcons.FaBookOpen />
                    </div>
                    <div className="section-card-footer-text">
                      {game.guides}
                    </div>
                  </div>
                  <div className="section-card-footer-stuff">
                    <div className="section-card-footer-icon">
                      <FaIcons.FaStar />
                    </div>
                    <div className="section-card-footer-text">
                      {game.favorites}
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </CardGroup>
      </div>
    </Row>
  );
};

export default GameList;
