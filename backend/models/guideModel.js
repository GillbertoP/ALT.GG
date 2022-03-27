const mongoose = require("mongoose");

const guideSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    game_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
      default:
        "https://i.kym-cdn.com/entries/icons/original/000/037/224/DdJoHa8XUAIClgI.jpeg",
    },
    views: {
      type: Number,
      required: true,
      default: "0",
    },
    likes: {
      type: Number,
      required: true,
      default: "0",
    },
  },
  {
    timestamps: true,
  }
);

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
