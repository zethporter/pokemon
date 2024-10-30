import { useState } from "react";
import { PokemonClient, type Pokemon } from "pokenode-ts";

import PokemonCard from "./assets/PokemonCard";

function App() {
  const _MAX_POKEMON_ID = 1025;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const pmc = new PokemonClient();
  const getPokemon = async () => {
    const id = Math.floor(Math.random() * _MAX_POKEMON_ID) + 1;
    await pmc
      .getPokemonById(id)
      .then((data: Pokemon) => {
        setPokemon(data);
      })
      .catch((err: Error) => {
        console.error("pokemon Error", err.message);
      });
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center p-10">
      {pokemon ? (
        <PokemonCard pokemon={pokemon} />
      ) : (
        <span className="loading loading-ball loading-lg text-secondary py-10"></span>
      )}
      <button
        type="button"
        className="btn btn-primary btn-wide"
        onClick={() => getPokemon()}
      >
        Get a Pokemon
      </button>
    </div>
  );
}

export default App;
