import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "#/lib/pokemon";
import { PokemonArtwork } from "./PokemonOfficialArt";
import { useSearch } from "@tanstack/react-router";
import { Loading } from "./Loading";

export const Pokemon = () => {
  const { pokeId } = useSearch({ from: "/" });
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", pokeId],
    queryFn: ({ queryKey }) => getPokemon(Number(queryKey[1])),
    enabled: !!pokeId,
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <PokemonArtwork sprites={data.sprites} />
    </div>
  );
};
