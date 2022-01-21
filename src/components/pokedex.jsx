import React from "react";

const Pokedex = (props) => {
  const pokemonData = props.data;
  var type1 = "";
  var type2 = "";

  if (pokemonData !== null) {
    return pokemonData.map((data) => {
      if (data.types.length > 1) {
        type1 = data.types[0].type.name;
        type2 = data.types[1].type.name;
      } else {
        type1 = data.types[0].type.name;
        type2 = "N/A";
      }

      return (
        <div className='container-pokedex'>
          <div className='left-screen'>
            <div className='left-screen-top'>
              <div className='light-container'>
                <div className='light blue-light'></div>
              </div>
              <div className='light red-light'></div>
              <div className='light yellow-light'></div>
              <div className='light green-light'></div>
            </div>
            <div className='left-screen-bottom'>
              <div className='main-screen'>
                <div className='main-screen-top-lights'></div>
                <div id='display' className='main-screen-display'>
                  <div className='pokemon-img'>
                    <img src={data.sprites["front_default"]} alt='' />
                    <img src={data.sprites["back_default"]} alt='' />
                  </div>
                </div>
                <div className='main-screen-speaker-light'></div>
                <div className='main-screen-speaker'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              <div className='redBtn'></div>
              <div className='blueBtn'></div>

              <div className='greenScreen'>
                <div className='middleLine'></div>
                <div className='vertical v1'></div>
                <div className='vertical v2'></div>
                <div className='vertical v3'></div>
                <div className='vertical v4'></div>
              </div>

              <div className='arrow-pad'>
                <div className='arrow-up'></div>
                <div className='arrow-right'></div>
                <button
                  className='nextPokemonBtn'
                  value='next'
                  onClick={() => {
                    if (data.id === 898) {
                      props.setPokemon(data.id = 1)
                    } else {
                      props.setPokemon(data.id + 1)
                    }
                  }}
                ></button>
                <div className='arrow-down'></div>
                <div className='arrow-left'></div>
                <button
                  className='previousPokemonBtn'
                  value='previous'
                  onClick={() => {
                    if (data.id === 1) {
                      props.setPokemon(data.id = 898)
                    } else {
                      props.setPokemon(data.id - 1)
                    }
                  }}
                ></button>
                <div className='arrow-mid'>
                  <div className='circle-shadow'></div>
                </div>
              </div>

              <div className='left-screen-joint'>
                <div className='joint'></div>
                <div className='joint'></div>
                <div className='joint'></div>
                <div className='joint'></div>
                <div className='joint-reflection'></div>
              </div>
            </div>
          </div>
          <div className='right-screen-bottom'>
            <div className='info-container'>
              <section className='info-screen'>
                <div id='name' className='info'>
                  <div className='label description'>
                    Type1: &nbsp;&nbsp; {type1}
                  </div>
                </div>

                <div id='name' className='info'>
                  <div className='label description'>
                    Type2: &nbsp;&nbsp; {type2}
                  </div>
                </div>
                <div id='name' className='info'>
                  <div className='label description'>
                    HP: &nbsp;&nbsp; {data.stats[0].base_stat}
                  </div>
                </div>

                <div id='name' className='info'>
                  <div className='label description'>
                    Attack: &nbsp;&nbsp; {data.stats[1].base_stat}
                  </div>
                </div>
                <div id='name' className='info'>
                  <div className='label description'>
                    Defense: &nbsp;&nbsp; {data.stats[2].base_stat}
                  </div>
                </div>
                <div id='name' className='info'>
                  <div className='label description'>
                    Sp.Attack: &nbsp;&nbsp; {data.stats[3].base_stat}
                  </div>
                </div>
                <div id='name' className='info'>
                  <div className='label description'>
                    Sp.Defense: &nbsp;&nbsp; {data.stats[4].base_stat}
                  </div>
                </div>
                <div id='name' className='info'>
                  <div className='label description'>
                    Speed: &nbsp;&nbsp; {data.stats[5].base_stat}
                  </div>
                </div>
              </section>
            </div>
            <div className='blue-pad-first-row'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='blue-pad-second-row'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className='whiteBtn'>
              <div className='firstWhiteBtn'></div>
              <div></div>
            </div>

            <div className='blackBtn1'></div>
            <div className='blackBtn2'></div>

            <div className='screenName'>{data.name}</div>
            <div className='screenType'></div>

            <div className='yellow yellowBtn'></div>
          </div>
        </div>
      );
    });
  }
};
export default Pokedex;
