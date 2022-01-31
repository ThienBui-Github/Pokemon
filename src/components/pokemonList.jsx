import { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";

import { useNavigate } from "react-router";

import axios from "axios";

const PokemonList = (props) => {
  let regionData = props.RegionData;
  let pokemonData = [];
  let navigate = useNavigate();
  const nbPokemon = regionData.pokemon_entries.length;
  const increment = 24;

  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(true);
  const [page, setPage] = useState(1);
  const [indexList, setIndexList] = useState(0);
  const [pokemonTemp, setPokemonTemp] = useState([]);

  //Navigation to pokedex on Card Click
  const navigateTo = (name) => {
    let string = "../pokedex/";
    let result = string.concat("", name);
    navigate(result, { replace: true });
  };

  const getNbPage = () => {
    if (pokemonData != null) {
    }
  };

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
    for (let index = 0; index < nbPokemon; index++) {
      let element = regionData.pokemon_entries[index];
      let pokemonString = element.pokemon_species.url;
      let length = pokemonString.length;
      array[index] = pokemonString.slice(42, length - 1);
    }
    return array;
  };

  //Handler for page counter
  const handleChangePage = (e) => {
    console.log("Before " + page);
    setPage(e.target.value);
    console.log("After " + page);
  };

  //Handler for previous button
  const handlePrevious = async (e) => {
    let num = indexList - increment;
    if (num === 0) {
      setPrevDisable(true);
      setNextDisable(false);
      setPage(1);
      setIndexList(0);
      await loadPokemon(num);
    } else if (num - increment < 0) {
      setPrevDisable(true);
      setNextDisable(false);
      setPage(1);
      setIndexList(0);
      await loadPokemon(num);
    } else {
      setNextDisable(false);
      setIndexList(num);

      await loadPokemon(num);
    }
  };
  //Handler for next button
  const handleNext = async (e) => {
    let num = indexList + increment;
    if (num + increment >= pokemonArray().length) {
      console.log("test1 " + num);
      setNextDisable(true);
      setPrevDisable(false);
      setIndexList(num);
    } else {
      console.log("test2 " + num);
      setNextDisable(false);
      setPrevDisable(false);
      setIndexList(num);
    }

    await loadPokemon(num);
  };

  //Load all pokemon to Component state
  const loadPokemon = async (indexPokemon) => {
    if (indexPokemon + increment > pokemonArray().length) {
      for (let index = indexPokemon; index < pokemonArray().length; index++) {
        const element = pokemonArray();
        pokemonData[index] = await getPokemon(element[index]);
      }
    } else {
      for (
        let index = indexPokemon;
        index < indexPokemon + increment;
        index++
      ) {
        const element = pokemonArray();
        pokemonData[index] = await getPokemon(element[index]);
      }
    }
    setPokemonTemp(pokemonData);
  };

  //Render all the pokemon of the current page
  const renderPokemon = () => {
    console.log(pokemonTemp);
    var type1 = "";
    var type2 = "";
    return (
      <div class="ui fluid doubling stackable cards centered">
        {pokemonTemp.map((pokemon) => {
          if (pokemon[0].types.length > 1) {
            type1 = pokemon[0].types[0].type.name;
            type2 = pokemon[0].types[1].type.name;
          } else {
            type1 = pokemon[0].types[0].type.name;
            type2 = "";
          }

          return (
            <Card
              onClick={() => {
                navigateTo(pokemon[0].name);
              }}
            >
              <Image
                floated=""
                size=""
                src={pokemon[0].sprites.front_default}
              />
              <Card.Header>
                <div class="description centered title">
                  #{pokemon[0].id}&nbsp;{pokemon[0].name}
                </div>
              </Card.Header>
              <Card.Meta>
                <div class="description centered type">
                  {type1} &nbsp; {type2}
                </div>
              </Card.Meta>
            </Card>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    setPage(1);
    setIndexList(0);
    setPrevDisable(true);
    setNextDisable(false);
    loadPokemon(0);
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
        <div class="ui right labeled input">
          <input
            defaultValue={page}
            placeholder=""
            maxLength={1}
            type="text"
            
            onChange={handleChangePage}
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1");
            }}
          />
          <div class="ui basic label">/ 4</div>
        </div>
        <Button onClick={handleNext} disabled={nextDisable}>
          Next
        </Button>
      </div>
      <br></br>
      <div>{renderPokemon()}</div>
    </div>
  );
};

export default PokemonList;
