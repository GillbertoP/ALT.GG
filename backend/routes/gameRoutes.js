const express = require("express");
const {
  getGames,
  getGameById,
  insertGame,
} = require("../controllers/gameControllers");
const router = express.Router();

router.route("/").get(getGames);
router.route("/:game_id").get(getGameById);
router.route("/insert").post(insertGame);

module.exports = router;
