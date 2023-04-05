import React from "react";
import "./RecommendationsShow.css";

function RecommendationsShow( { song } ){

  // Display each song.
  return(
      <div className = "individual-song-wrapper" key={song._id}>
          <img className = "song-image" src = {song.songAlbumImageURL} />
          <audio controls source src={song.songPreviewURL} type="audio/mpeg" />
          <a className = "song-name" href = {song.songSpotifyURL} target= "_blank" > {song.songName} </a>
          <a className = "song-artist" href = {song.songArtistSpotifyURL} target= "_blank" >{song.songArtist}</a>
      </div>
  );
}

export default RecommendationsShow;
