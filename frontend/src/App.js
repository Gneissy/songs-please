import { useState, useEffect } from "react";
import RecommendationsList from "./components/RecommendationsList";
import RecommendationsShow from "./components/RecommendationsShow"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import "./App.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function App(){

  // const backendServer = "https://songs-please.onrender.com";
  const backendServer = "http://localhost:3000";

  // Personal usage for every single user
  const random = localStorage.getItem('random') || uuidv4();
  localStorage.setItem('random', random);
  document.cookie = `userId=${random}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  const userId = document.cookie.split(';').find(cookie => cookie.startsWith('userId=')).split('=')[1];
  console.log(userId);

  // input states
  const [inputSong1, setInputSong1] = useState("");
  const [inputSong2, setInputSong2] = useState("");
  const [inputSong3, setInputSong3] = useState("");

  // Input onChange functions
  const onChange1 = function(event){ setInputSong1(event.target.value); }
  const onChange2 = function(event){ setInputSong2(event.target.value); }
  const onChange3 = function(event){ setInputSong3(event.target.value); }

  // Loading state
  const [loading, setLoading] = useState(false);

  // Results state
  const [results, setResults] = useState([]);

  // Form submitting function
  const handleSubmit = async function(event){
      event.preventDefault(); // Preventing default submit behaviour

      // Thanks to "loading" state, i show people "Let me check..." while process is going on.
      setLoading(true);
            const formData = {
                inputSong1: inputSong1,
                inputSong2: inputSong2,
                inputSong3: inputSong3,
                userId: userId
            };

            // Send post request to spotify api, with user input
            const response = await axios.post( backendServer + "/recommendations", formData);
            // console.log(response.data);
            setResults(response.data);
            setInputSong1("");
            setInputSong2("");
            setInputSong3("");
      setLoading(false);
  }

      // useEffect at the first render, get current data requested
      useEffect(function(){
          async function fetchData(){
              const results = await axios.get(`${backendServer}/recommendations?userId=${userId}&inputSongs=${inputSong1},${inputSong2},${inputSong3}`);
              setResults(results.data);
          }
          fetchData();
      }, [userId]);



  // Send "results" as "results" prop.
  // "results" is an array containing 10 song objects.
  // Show client "Let me check" if loading process is still going on. If done, show RecommendationsList.
  return(
      <div className = "main-container" >
      <Navbar />
      <div className = "interaction-field-box">
      <p className = "title-text"><span className = "title-span__first" >Give 3</span> songs you love, </p>
      <p className = "title-text"><span className = "title-span__second" >Get 10</span> songs you may like! </p>

      <form className = "form-box" onSubmit = {handleSubmit}>
          <label>
              <input type="text" value={inputSong1} onChange={onChange1} />
          </label>
          <label>
              <input type="text" value={inputSong2} onChange={onChange2} />
          </label>
          <label>
              <input type="text" value={inputSong3} onChange={onChange3} />
          </label>
          <button className = "submit-btn" type="submit">Get Recommendations!</button>
      </form>
      </div>
          {loading ? <p className="loading-text">Let me check<span></span></p> : <RecommendationsList results={results} />}
          <Footer />
      </div>
  );
}

export default App;
