import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Homepage.css";
import GuideList from "../../components/GuideList/GuideList";
import GameList from "../../components/GameList/GameList";
import Jumbo from "../../components/Jumbo/Jumbo";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const Homepage = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const { data } = await axios.get("/api/games");

    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="main">
      <Jumbo />
      <Container fluid>
        <GameList />

        <GuideList sectionTitle="Recent Guides" guidesType="recent" />
      </Container>
    </div>
  );
};

export default Homepage;
