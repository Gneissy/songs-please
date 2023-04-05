import React from "react";
import RecommendationsShow from "./RecommendationsShow"
import "./RecommendationsList.css"

function RecommendationsList( { results } ){
    const renderedSongs = results.map(function (song){
        // I sent an individual song object as song prop, from "List" to "Show" component.
        return <RecommendationsShow song= {song} key= {song._id} />;
    });

    // Display "renderedSongs" which are many "RecommendationsShow" components
    return(
        <div className = "song-list-wrapper">
            <div className = "song-list"> {renderedSongs} </div>
        </div>
    );
}

export default RecommendationsList;
