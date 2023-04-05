const mongoose = require ("mongoose");

const recommendedSongSchema = new mongoose.Schema({
  inputSongs: [String],
  recommendedSongId: String
});

const RecommendedSong = mongoose.model("recommendedSong", recommendedSongSchema);

module.exports = RecommendedSong;
