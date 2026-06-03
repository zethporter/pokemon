import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

export interface PokemonListItem {
  name: string;
  url: string;
}
interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export const pokemonListQueryOptions = queryOptions({
  queryKey: ["pokemon-list"],
  queryFn: async () =>
    await ky
      .get(
        import.meta.env.VITE_POKE_API_ENDPOINT +
          "/pokemon?limit=100000&offset=0",
      )
      .json<PokemonList>(),
  staleTime: Infinity,
  gcTime: Infinity,
});

export const usePokemonList = () => {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  const searchPokemon = (query: string) => {
    return pokemonList?.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return {
    searchPokemon,
    allPokemon: pokemonList?.results,
  };
};

export const extractPokemonId = (url: string): number => {
  return Number(url.split("/").filter(Boolean).at(-1));
};
