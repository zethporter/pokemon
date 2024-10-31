import { z, ZodError } from 'zod';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { PokemonClient, type Pokemon } from 'pokenode-ts';
import { getRandomPokemonId } from '../utils';
import PokemonCard from '../components/PokemonCard';

const pokemonSearchSchema = z.object({
  id: z
    .number()
    .min(1, {
      message: 'ID must be greater than 0'
    })
    .max(1025, {
      message: 'There is no Pokemon with this ID'
    })
    .optional()
});

const getPokemon = async (id: number | undefined) => {
  const pmc = new PokemonClient();
  const idToUse = id ?? getRandomPokemonId();
  const pokemon = await pmc
    .getPokemonById(idToUse)
    .then((data: Pokemon) => {
      return data;
    })
    .catch((err: Error) => {
      throw err;
    });

  return pokemon;
};

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: zodSearchValidator(pokemonSearchSchema),
  loaderDeps: ({ search: { id } }) => ({ id }),
  loader: ({ deps: { id } }) => getPokemon(id),
  errorComponent: ({ error }) => {
    const errorJson = JSON.parse(error.message);
    return errorJson.map((error: ZodError, i: number) => (
      <p key={i}>{error.message}</p>
    ));
  }
});

function Home() {
  const pokemon = Route.useLoaderData();
  console.log('pokemon', pokemon);

  return (
    <div className='p-10 flex justify-center'>
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
