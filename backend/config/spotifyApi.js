const SpotifyWebApi = require('spotify-web-api-node');

// Set up Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.spotifyClientId,
  clientSecret: process.env.spotifyClientSecret
});

// Authenticate with Spotify API
spotifyApi.clientCredentialsGrant()
    .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']); // Works on its own
  }).catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });


module.exports = spotifyApi;
