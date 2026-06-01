import { useQuery } from "@tanstack/react-query";
import { getPokemonFromList } from "#/lib/pokemon";
import { PokemonArtwork } from "./PokemonOfficialArt";
import { Spinner } from "./ui/spinner";

export const Pokemon = ({ url }: { url: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: ({ queryKey }) => getPokemonFromList(queryKey[0]),
    enabled: !!url,
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
