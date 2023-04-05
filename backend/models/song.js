const mongoose = require ("mongoose");

const songSchema = new mongoose.Schema({
  inputSongs: [String],
  songArtist: String,
  songName: String,
  songSpotifyURL: String,
  songAlbumImageURL: String,
  songArtistSpotifyURL: String,
  songPreviewURL: String
});

const Song = mongoose.model("song", songSchema);

module.exports = Song;
