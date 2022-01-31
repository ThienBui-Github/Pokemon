/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useParams, useNavigate } from "react-router";
import PokemonList from "./pokemonList";

const Region = () => {
  let updatedRegion = useParams().region;
  let updatedRegionId;
  console.log("Top level " + updatedRegion);
  let navigate = useNavigate();

  const [region, setRegion] = useState(updatedRegion);
  const [regionData, setRegionData] = useState([]);

  //Assigns ID for request
  const changeRegionName = async (update) => {
    console.log("Change " + update);
    switch (update) {
      case "Kanto":
        updatedRegionId = 2;
        break;
      case "Johto":
        updatedRegionId = 3;
        break;
      case "Hoenn":
        updatedRegionId = 4;
        break;
      case "Sinnoh":
        updatedRegionId = 5;
        break;
      case "Unova":
        updatedRegionId = 8;
        break;
      case "Kalos":
        updatedRegionId = 12;
        break;
      case "Alola":
        updatedRegionId = 16;
        break;
      case "Galar":
        updatedRegionId = 27;
        break;

      default:
        break;
    }
  };
  //Navigate to correct Region route
  const navigateTo = (name) => {
    let string = "../region/";
    let result = string.concat("", name);
    navigate(result, { replace: true });
  };

  //Fetch region from Api
  const getRegionPokemon = async () => {
    const toArray = [];
    try {
      console.log("Get " + updatedRegionId);
      const url = `https://pokeapi.co/api/v2/pokedex/${updatedRegionId}`;

      const res = await axios.get(url);

      toArray.push(res.data);
      setRegionData(toArray);
      console.log("{Region}");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const delayedGetRegion = debounce(getRegionPokemon, 300);

  //Update the UI and route
  const update = async () => {
    changeRegionName(updatedRegion);
    if (updatedRegion === "" || updatedRegion === undefined) {
      navigateTo("Kanto");

      return;
    }
    if (region === "" || region === undefined) {
      navigateTo("Kanto");
      return;
    }

    console.log("test");
    delayedGetRegion();
  };

  useEffect(() => {
    console.log("Effect " + region);
    update();
  }, [updatedRegion]);

  if (regionData[0] === undefined) {
    return <div></div>;
  } else {
    return (
      <div>
        <PokemonList RegionData={regionData[0]} />
      </div>
    );
  }
};

export default Region;
