import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "semantic-ui-react";
import { debounce } from "lodash";
import { useParams, useNavigate } from "react-router";

const Pokedex = (props) => {
  let updatedPokemon = useParams().pokemon;
  let navigate = useNavigate();
  const [pokemon, setPokemon] = useState(updatedPokemon);
  const [pokemonData, setPokemonData] = useState([]);
  const [toggleView, setToggleView] = useState(true);

  //Set Pokemon image to front or back
  const changeView = () => {
    setToggleView(!toggleView);
  };

  // Call and set pokemonData of current Pokemon
  const getPokemon = useCallback(async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

      const res = await axios.get(url);

      toArray.push(res.data);
      setPokemonData(toArray);
      console.log("{Pokedex}");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, [pokemon]);

  //Handling onChange event of Search bar
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  //Throttle number of resquest to api when typing
  const debouncedHandleChange = debounce(handleChange, 300);

  //Prevent refresh on enter
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const update = useCallback(async () => {
    let string = "../pokedex/";
    if (updatedPokemon === "" || updatedPokemon === undefined) {
      let result = string.concat("", "bulbasaur");
      navigate(result, { replace: true });

      return;
    }
    if (pokemon === "" || pokemon === undefined) {
      setPokemon("bulbasaur");
      return;
    }
    if (pokemon > 898) {
      setPokemon("bulbasaur");
      return;
    }

    let result = string.concat("", pokemon);
    navigate(result, { replace: true });
    getPokemon();
  }, [getPokemon, pokemon, updatedPokemon, navigate]);

  //Rerender and reRoute when pokemon change
  useEffect(() => {
    update();
  }, [update]);
  var type1 = "";
  var type2 = "";

  if (pokemonData !== null) {
    //Map data of Pokemon
    return pokemonData.map((data) => {
      //Check if more than 1 Type
      if (data.types.length > 1) {
        type1 = data.types[0].type.name;
        type2 = data.types[1].type.name;
      } else {
        type1 = data.types[0].type.name;
        type2 = "N/A";
      }

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="inputDiv">
              {/* Seach bar */}
              <Input
                icon="search"
                type="text"
                onChange={debouncedHandleChange}
                placeholder="Enter Pokémon name"
              />
            </div>
          </form>

          {/* Render Pokedex */}
          <div className="container-pokedex">
            <div className="left-screen">
              <div className="left-screen-top">
                <div className="light-container">
                  <div className="light blue-light"></div>
                </div>
                <div className="light red-light"></div>
                <div className="light yellow-light"></div>
                <div className="light green-light"></div>
              </div>
              <div className="left-screen-bottom">
                <div className="main-screen">
                  <div className="main-screen-top-lights"></div>
                  <div id="display" className="main-screen-display">
                    <div className="pokemon-img">
                      {toggleView ? (
                        <img src={data.sprites["front_default"]} alt="" />
                      ) : (
                        <img src={data.sprites["back_default"]} alt="" />
                      )}
                    </div>
                  </div>
                  <div className="main-screen-speaker-light"></div>
                  <div className="main-screen-speaker">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div className="redBtn"></div>
                <div className="blueBtn"></div>

                <div className="greenScreen">
                  <div className="middleLine"></div>
                  <div className="vertical v1"></div>
                  <div className="vertical v2"></div>
                  <div className="vertical v3"></div>
                  <div className="vertical v4"></div>
                </div>

                <div className="arrow-pad">
                  <div className="arrow-up"></div>
                  <div className="arrow-right"></div>
                  <button
                    className="nextPokemonBtn"
                    value="next"
                    onClick={() => {
                      if (data.id === 898) {
                        setPokemon((data.id = 1));
                      } else {
                        setPokemon(data.id + 1);
                      }
                    }}
                  ></button>
                  <div className="arrow-down"></div>
                  <div className="arrow-left"></div>
                  <button
                    className="previousPokemonBtn"
                    value="previous"
                    onClick={() => {
                      if (data.id === 1) {
                        setPokemon((data.id = 898));
                      } else {
                        setPokemon(data.id - 1);
                      }
                    }}
                  ></button>
                  <div className="arrow-mid">
                    <div className="circle-shadow"></div>
                  </div>
                </div>

                <div className="left-screen-joint">
                  <div className="joint"></div>
                  <div className="joint"></div>
                  <div className="joint"></div>
                  <div className="joint"></div>
                  <div className="joint-reflection"></div>
                </div>
              </div>
            </div>
            <div className="right-screen-bottom">
              <div className="info-container">
                <section className="info-screen">
                  <div id="name" className="info">
                    <div className="label description">
                      Type1: &nbsp;&nbsp; {type1}
                    </div>
                  </div>

                  <div id="name" className="info">
                    <div className="label description">
                      Type2: &nbsp;&nbsp; {type2}
                    </div>
                  </div>
                  <div id="name" className="info">
                    <div className="label description">
                      HP: &nbsp;&nbsp; {data.stats[0].base_stat}
                    </div>
                  </div>

                  <div id="name" className="info">
                    <div className="label description">
                      Attack: &nbsp;&nbsp; {data.stats[1].base_stat}
                    </div>
                  </div>
                  <div id="name" className="info">
                    <div className="label description">
                      Defense: &nbsp;&nbsp; {data.stats[2].base_stat}
                    </div>
                  </div>
                  <div id="name" className="info">
                    <div className="label description">
                      Sp.Attack: &nbsp;&nbsp; {data.stats[3].base_stat}
                    </div>
                  </div>
                  <div id="name" className="info">
                    <div className="label description">
                      Sp.Defense: &nbsp;&nbsp; {data.stats[4].base_stat}
                    </div>
                  </div>
                  <div id="name" className="info">
                    <div className="label description">
                      Speed: &nbsp;&nbsp; {data.stats[5].base_stat}
                    </div>
                  </div>
                </section>
              </div>
              <div className="blue-pad-first-row">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="blue-pad-second-row">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="whiteBtn">
                <div className="firstWhiteBtn"></div>
                <div></div>
              </div>

              <div className="blackBtn1"></div>
              <div className="blackBtn2"></div>

              <div className="screenName">{data.name}</div>
              <div className="screenType"></div>

              <button
                className="changeView"
                value="viewImg"
                onClick={changeView}
              ></button>
            </div>
          </div>
        </div>
      );
    });
  }
};
export default Pokedex;
