import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "#/lib/pokemon";
import { PokemonArtwork } from "./PokemonOfficialArt";
import { Spinner } from "./ui/spinner";

export const Pokemon = ({ pokemon }: { pokemon: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [pokemon],
    queryFn: ({ queryKey }) => getPokemon(queryKey[0]),
    enabled: !!pokemon,
    staleTime: Infinity,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <PokemonArtwork sprites={data.sprites} />
    </div>
  );
};
