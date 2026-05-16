import { createFileRoute } from "@tanstack/react-router";
import { Input } from "#/components/ui/input";
import { useState } from "react";
import { useDebouncedState } from "@tanstack/react-pacer";
import { Pokemon } from "#/components/Pokemon";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [pokemon, setPokemon] = useState("");

  // higher-level hook that uses React.useState with the state setter automatically debounced
  // optionally, grab the debouncer from the last index of the returned array
  const [debouncedPokemon, setDebouncedPokemon] = useDebouncedState(pokemon, {
    wait: 600,
  });

  function searchPokemon(_pokemon: string) {
    setPokemon(() => {
      setDebouncedPokemon(_pokemon);
      return _pokemon;
    });
  }

  return (
    <div className="flex flex-col gap-2 p-10 pt-0">
      <div className="flex flex-col gap-2 sticky top-0 pt-10 pb-5 px-5 shadow-xl min-w-full w-3/4 max-w-3xl mx-auto rounded-3xl backdrop-blur-2xl">
        <h1 className="text-4xl font-bold">Pokemon Search</h1>
        <Input
          value={pokemon}
          placeholder="Search"
          onChange={(e) => searchPokemon(e.target.value)}
        />
      </div>
      <Pokemon pokemon={debouncedPokemon} />
    </div>
  );
}
