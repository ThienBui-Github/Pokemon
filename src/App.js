import "./index.css";
import axios from "axios";
import React, { Component, useState, useEffect, useCallback } from "react";
import Pokedex from "./components/pokedex";
import { Input } from "semantic-ui-react";

const App = () => {
  const [pokemon, setPokemon] = useState("bulbasaur");
  const [pokemonData, setPokemonData] = useState([]);
  // const [pokemonType, setPokemonType] = useState("");

  const getPokemon = useCallback(async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

      const res = await axios.get(url);

      toArray.push(res.data);
      // setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, [pokemon]);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pokemon !== "") {
      getPokemon();
    }
  };

  useEffect(() => {
    if (pokemon !== "") {
      getPokemon();
    }
  }, [getPokemon, pokemon]);

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div className='inputDiv'>
          <Input
            type='text'
            className='inputName'
            onChange={handleChange}
            placeholder='Enter Pokémon name'
          />
        </div>
      </form>
      <Pokedex data={pokemonData} setPokemon={setPokemon}></Pokedex>
    </div>
  );
};

export default App;
