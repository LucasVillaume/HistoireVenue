//Home page component

import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HistoireVenu";
  }, []);


  return (
    <div>
      <h1 class="home-title">Welcome To</h1>
      <img src={process.env.PUBLIC_URL + '/logo_1080.png'} alt="logo" /> 
      <div class="home-container">
        <div class="case">
          <h2>Setup</h2>
          <p>Choose the themes you will play with</p>
          <button class="home-button" onClick={() => navigate('/setup')}>Custom</button>
        </div>
        <div class="case">
          <h2>Game</h2>
          <p>play now with three random themes</p>
          <button class="home-button" onClick={() => navigate('/game')}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default Home;