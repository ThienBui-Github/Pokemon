import React from "react";
import Pokedex from "./components/pokedex";
import Region from "./components/region";

const App = () => {
  return (
    <div className='App'>
      <Pokedex></Pokedex>
      <Region></Region>
    </div>
  );
};

export default App;
