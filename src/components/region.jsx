import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Region = () => {
  const [region, setRegion] = useState(3);
  const [regionData, setRegionData] = useState([]);

  const getRegionPokemon = useCallback(async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokedex/${region}`;
      // const url = `https://pokeapi.co/api/v2/region/${region}`;

      const res = await axios.get(url);

      toArray.push(res.data);
      setRegionData(toArray);
      console.log("{Region}");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, [region]);
  useEffect(() => {
    if (region !== "") {
      getRegionPokemon();
    }
  }, [getRegionPokemon, region]);
  return (<div>Region Page (À éditer)</div>);
};

export default Region;
