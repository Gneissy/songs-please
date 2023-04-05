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

// Default parameters
const loadQuantity = 10; // I may add an extension button like "add more"
let inputSongs = []; // To be able to use in both route


// @@@@@@@@@@@@@@@@@@@@ Routes @@@@@@@@@@@@@@@@@@@@
app.post("/recommendations", async function(req, res){
    inputSongs = [req.body.inputSong1, req.body.inputSong2, req.body.inputSong3];

    const trackIds = [];

    // To get rid of app crashing with 3 invalid inputs
    let hasValidInput = false;

    // Search for track IDs for each input song
    for (let i = 0; i < inputSongs.length; i++) {
        const song = inputSongs[i];

        // If input is empty, dont continue next iteration.
        if (song === ""){ continue; }

        const results = await spotifyApi.searchTracks("track:" + song);

        // If there is no song in spotify, don't crash the app
        if(results.body.tracks.items.length > 0){
            const trackId = results.body.tracks.items[0].id;

            // To find user input songs' id.
            // Gonna be used in sending request for recommendations.
            trackIds.push(trackId);

            // If at least on of the inputs are valid
            hasValidInput = true;

        }else{
            console.log("No track is found for this input song: " + song);
        }
    }

    if(hasValidInput){
        // Retrieve recommended tracks based on input songs
        const recommendations = await spotifyApi.getRecommendations({
            seed_tracks: trackIds.join(",")
            // The seed_tracks parameter is used to specify the track IDs to use as the basis for generating the recommendations.
            // In this case, it joins the trackIds array into a comma-separated string using the join method,
            // so that it can be used as the value for seed_tracks.
        });

        // These are recommended song objects coming from spotify api
        const recommendedTracks = recommendations.body.tracks;

        for (let i = 0; i < recommendedTracks.length; i++) {
            const recommendedTrack = recommendedTracks[i]; // Each track object

            // Each song recommended by Spotify will be saved into database.
            // Each saved object contains both user input songs and recommended songs' id's.
            // It is going to be used in order to find by input songs via my api and display later on.
            const recommendedSong = new RecommendedSong({
                inputSongs: inputSongs, // 3 user input
                recommendedSongId: recommendedTrack.id,
            });
            await recommendedSong.save();
        }

        console.log("Recommendations have saved into database successfully.");

        // RecommendedSongs are all songs recommended by spotify api.
        // Fetching them from my api via finding by inputSongs.
        const recommendedSongs = await RecommendedSong.find({inputSongs: inputSongs});

        // New array declaration. It will contain recommendedSongId for each recommendedSongs object.
        const recommendedSongsIds = [];

        // We call map in order to apply the same function for each element in the recommendedSongs array.
        const recommendedSongIds = recommendedSongs.map(function(recommendedSong){
            return recommendedSong.recommendedSongId;
        });

        // Now we get all tracks by requesting our songs' id's from spotify api
        // loadQuantity is how many song we want as recommendation. It is hardcoded "10" for default. Spotify has limit of "20".
        for(let i=0; i<loadQuantity; i++){
            const recommendedTracks = await spotifyApi.getTrack(recommendedSongIds[i])
                .then(function(data){
                    // console.log(data.body);
                    const songArtist = data.body.artists[0].name;
                    const songName = data.body.name;
                    const songSpotifyURL = data.body.external_urls.spotify;
                    const songAlbumImageURL = data.body.album.images[0].url;
                    const songArtistSpotifyURL = data.body.artists[0].external_urls.spotify;
                    const songPreviewURL = data.body.preview_url;

                    // Each song will be saved into "song" collection, which is the object i'll display with React.
                    const newSong = new Song({
                        inputSongs: inputSongs,
                        songArtist: songArtist,
                        songName: songName,
                        songSpotifyURL: songSpotifyURL,
                        songAlbumImageURL: songAlbumImageURL,
                        songArtistSpotifyURL: songArtistSpotifyURL,
                        songPreviewURL : songPreviewURL
                    });
                    newSong.save();
                    console.log("This song is saved into database: " + newSong.songName + " from " + newSong.songArtist);
                  }, function(err){
                    console.error(err);
                  });
          }
          res.status(200).redirect("/recommendations");
      }

      // If none of the 3 input songs are valid
      else{
        res.status(400).send("This is a bad request. At least one of the songs should be in spotify.");
        return;
      }
});


// Fetching all songs related to inputSongs, in order to display via React.
app.get("/recommendations", async function(req, res){
      const recommendedSongs = await Song.find({ inputSongs: inputSongs });
      res.json(recommendedSongs);
});


// Running the server with database
connectDB().then(function (){
      app.listen(process.env.PORT || 3000, function() {
            console.log("Server is on and ready to wrack baby");
      });
});