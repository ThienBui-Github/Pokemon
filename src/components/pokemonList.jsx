import { useEffect, useState } from "react";
import { Button, Card, Image } from 'semantic-ui-react';

import axios from "axios";

const PokemonList = (props) => {
  let regionData = props.RegionData;
  let pokemonData = [];

  // let indexList = 0;
  let increment = 25;

  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(true);
  const [indexList, setIndexList] = useState(0);
  const [pokemonTemp, setPokemonTemp] = useState([]);

  //Calls api and gets pokemon
  const getPokemon = async (pokemon) => {
    const toArray = [];

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      //setPokemonTemp(toArray);
    } catch (e) {
      console.log(e);
    }
    return toArray;
  };
  //Function for getting all pokemon id in order of current Region
  const pokemonArray = () => {
    let array = [];
    for (let index = 0; index < regionData.pokemon_entries.length; index++) {
      let element = regionData.pokemon_entries[index];
      let pokemonString = element.pokemon_species.url;
      let length = pokemonString.length;
      array[index] = pokemonString.slice(42, length - 1);
    }
    return array;
  };
  //Handler for previous button
  const handlePrevious = (e) => {
    let num = indexList;
    if (num === 0) {
      setPrevDisable(true);
      setNextDisable(false);
      loadPokemon(num);
    } else if (num - increment < 0) {
      setPrevDisable(true);
      setNextDisable(false);
      setIndexList(0);
      loadPokemon(num);
    } else {
      setIndexList((num -= increment));

      loadPokemon(num);
    }
  };
  //Handler for next button
  const handleNext = (e) => {
    let num = indexList;
    if (num + increment > pokemonArray().length) {
      setNextDisable(true);
      setPrevDisable(false);
      loadPokemon(num);
    } else {
      setNextDisable(false);
      setPrevDisable(false);
      setIndexList((num += increment));

      loadPokemon(num);
    }
  };

  //Load all pokemon to Component state
  const loadPokemon = async (indexPokemon) => {
    if (indexPokemon + increment > pokemonArray().length) {
      for (let index = indexPokemon; index < pokemonArray().length; index++) {
        const element = pokemonArray();
        pokemonData[index] = await getPokemon(element[index]);
      }
    } else {
      for (let index = indexPokemon; index < indexPokemon + 25; index++) {
        const element = pokemonArray();
        pokemonData[index] = await getPokemon(element[index]);
      }
    }
    setPokemonTemp(pokemonData);
  };

  var type1 = "";
  var type2 = "";

  //Render all the pokemon of the current page
  const renderPokemon = () => {
    console.log(pokemonTemp);
    return (
      <div class="ui fluid doubling stackable cards centered">
        {pokemonTemp.map((data) => {
          if (data[0].types.length > 1) {
            type1 = data[0].types[0].type.name;
            type2 = data[0].types[1].type.name;
          } else {
            type1 = data[0].types[0].type.name;
            type2 = "";
          }

          return (
            <Card>
              <Image
                floated=''
                size=''
                src={data[0].sprites.front_default} />
              <Card.Header><div class="description centered title">{data[0].name}</div></Card.Header>
              <Card.Meta><div class="description centered type">{type1} &nbsp; {type2}</div></Card.Meta>

            </Card>
          )
        })
        }
      </div>
    );
  };

  useEffect(() => {
    setIndexList(0);
    setPrevDisable(true);
    setNextDisable(false);
    loadPokemon(indexList);
  }, [regionData]);

  if (pokemonArray() === null) {
    return <div></div>;
  }
  return (
    <div>
      <br></br>
      <div className="centered">
        <Button onClick={handlePrevious} disabled={prevDisable}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={nextDisable}>
          Next
        </Button>
      </div>
      <br></br>
      <div>{renderPokemon()}</div>
    </div >
  );
};

export default PokemonList;
