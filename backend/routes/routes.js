const express = require("express");
const router = express.Router();

// Bringing in Models
const RecommendedSong = require("../models/recommendedSong");
const Song = require("../models/song");

// Bringing in Controllers
const { getRecommendedSongs, postInputSongs } = require("../controllers/controllers");

router.get("/recommendations", getRecommendedSongs);
router.post("./recommendations", postInputSongs);

module.exports = router;
