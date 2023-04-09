require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Database connection
const connectDB = require("./backend/config/database");

// Bringing in Models
const RecommendedSong = require("./backend/models/recommendedSong");
const Song = require("./backend/models/song");

// Spotify connection
const spotifyApi = require("./backend/config/spotifyApi");

// Routes
const router = require("./backend/routes/routes");
app.use(router);

// Running the server with database
connectDB().then(function (){
      app.listen(process.env.PORT || 3001, function() {
            console.log("Server is on and ready to wrack baby");
      });
});
