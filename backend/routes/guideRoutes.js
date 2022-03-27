const express = require("express");
const {
  getGuides,
  createGuide,
  getGuideById,
  updateGuide,
  deleteGuide,
  getGuidesByGameId,
} = require("../controllers/guideControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/:game_id/:type").get(getGuides);
router.route("/create").post(protect, createGuide);
router
  .route("/:id")
  .get(getGuideById)
  .put(protect, updateGuide)
  .delete(protect, deleteGuide);
//router.route("/:id").get().put().delete();
router.route("/games/:game_id").get(getGuidesByGameId);

module.exports = router;
