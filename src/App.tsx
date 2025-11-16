import React from "react";
import './App.css';
import InfoBox from "./components/InfoBox/InfoBox";
import GameContainer from "./components/GameContainer/GameContainer";

function App() {
  return (
    <div className="App">
      <h1>Roulette Game</h1>
      <GameContainer></GameContainer>
    </div>
  );
}

export default App;
