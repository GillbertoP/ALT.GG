const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");

const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find({}).sort({ guides: -1 });
  res.json(games);
});

const getGameById = asyncHandler(async (req, res) => {
  const games = await Game.findOne({ game_id: req.params.game_id });
  res.json(games);
});

const insertGame = asyncHandler(async (req, res) => {
  const {
    game_id,
    game_name,
    game_to,
    game_img,
    platforms,
    guides,
    favorites,
    icon,
  } = req.body;

  if (!game_id || !game_name || !platforms) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const game = new Game({
      game_id,
      game_name,
      game_to,
      game_img,
      platforms,
      guides,
      favorites,
      icon,
    });

    const insertedGame = await game.save();

    res.status(201).json(insertedGame);
  }
});

module.exports = {
  getGames,
  getGameById,
  insertGame,
};
