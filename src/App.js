import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [poke, setPoke] = useState([]);

  const getPokemons = async (limit = 30, offset = 0) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fechPokemon = async () => {
    const data = await getPokemons();
    const promises = await data.results.map(async (pokemon) => {
      return await getPokemonData(pokemon.url);
    });
    const result = await Promise.all(promises);
    setPoke(result);

    console.log(result);
  };

  const getPokemonData = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fechPokemon();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {poke.map((pokemon, id) => (
        <div style={{ width: "30ch", textAlign: "center" }} key={id}>
          <div style={{padding: '2rem'}}>
            <h1>{pokemon.name}</h1>
            <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
            {pokemon.types.map((type, index) => {
              return (
                <div key={index} className="">
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
