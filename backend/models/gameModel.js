const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    game_id: {
      type: String,
      required: true,
    },
    game_name: {
      type: String,
      required: true,
    },
    game_to: {
      type: String,
      required: true,
      default: "#",
    },
    game_img: {
      type: String,
      required: true,
      default:
        "https://i.kym-cdn.com/entries/icons/original/000/037/224/DdJoHa8XUAIClgI.jpeg",
    },
    platforms: {
      type: String,
      required: true,
    },
    guides: {
      type: Number,
      required: true,
      default: 0,
    },
    favorites: {
      type: Number,
      required: true,
      default: 0,
    },
    icon: {
      type: String,
      required: true,
      default:
        "https://i.kym-cdn.com/entries/icons/original/000/037/224/DdJoHa8XUAIClgI.jpeg",
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
