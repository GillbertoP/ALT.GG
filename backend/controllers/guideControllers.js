const asyncHandler = require("express-async-handler");
const Guide = require("../models/guideModel");
const Game = require("../models/gameModel");

// const getGuides = asyncHandler(async (req, res) => {
//   const guides = await Guide.find(
//     req.params.game_id !== "all" ? { game_id: req.params.game_id } : {}
//   )
//     .sort({ createdAt: -1 })
//     .limit(req.params.type === "all" ? 0 : 6);
//   res.json(guides);
// });

const getGuides = asyncHandler(async (req, res) => {
  var pipeline = [
    {
      $match:
        req.params.game_id !== "all" ? { game_id: req.params.game_id } : {},
    },
    {
      $lookup: {
        from: "games",
        localField: "game_id",
        foreignField: "game_id",
        as: "game_info",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { poster: "$poster" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$_id", "$$poster"] } },
          },
          {
            $project: {
              name: 1,
            },
          },
        ],
        as: "userInfo",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];
  if (req.params.type !== "all") {
    pipeline.push({ $limit: 6 });
  }
  const guides = await Guide.aggregate(pipeline);
  res.json(guides);
});

const createGuide = asyncHandler(async (req, res) => {
  const { title, subtitle, content, game_id, category, image } = req.body;

  if (!title || !subtitle || !content || !game_id || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const guide = new Guide({
      poster: req.user._id,
      title: title,
      subtitle: subtitle,
      content: content,
      game_id: game_id,
      category: category,
      image: image,
    });

    const createdGuide = await guide.save();

    res.status(201).json(createdGuide);
  }
});

const getGuideById = asyncHandler(async (req, res) => {
  var ObjectId = require("mongodb").ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  var pipeline = [
    {
      $match: { _id: o_id },
    },
    {
      $lookup: {
        from: "users",
        let: { poster: "$poster" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$_id", "$$poster"] } },
          },
          {
            $project: {
              name: 1,
            },
          },
        ],
        as: "userInfo",
      },
    },
  ];
  const guide = await Guide.aggregate(pipeline);

  if (guide) {
    res.json(guide);
  } else {
    res.status(404).json({ message: "Guide not found." });
  }
});

const updateGuide = asyncHandler(async (req, res) => {
  const { title, subtitle, content, game_id, category, image } = req.body;

  const guide = await Guide.findById(req.params.id);

  if (guide.poster.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  if (guide) {
    guide.title = title;
    guide.subtitle = subtitle;
    guide.content = content;
    guide.category = category;
    if (image) {
      guide.image = image;
    }

    const updatedGuide = await guide.save();
    res.json(updatedGuide);
  } else {
    res.status(404);
    throw new Error("Guide not found.");
  }
});

const deleteGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findById(req.params.id);

  if (guide.poster.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action!");
  }

  if (guide) {
    await guide.remove();
    res.json({ message: "Guide deleted" });
  } else {
    res.status(404);
    throw new Error("Guide not found");
  }
});

const getGuidesByGameId = asyncHandler(async (req, res) => {
  const guide = await Guide.find({ game_id: req.params.game_id }).sort({
    $natural: -1,
  });

  if (guide) {
    res.json(guide);
  } else {
    res.status(404).json({ message: "Guide not found." });
  }
});

module.exports = {
  getGuides,
  createGuide,
  getGuideById,
  updateGuide,
  deleteGuide,
  getGuidesByGameId,
};
