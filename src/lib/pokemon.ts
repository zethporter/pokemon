import ky from "ky";
import { z } from "zod";

const sprites = z.object({
  back_default: z.url().nullable(),
  back_female: z.url().nullable(),
  back_shiny: z.url().nullable(),
  back_shiny_female: z.url().nullable(),
  front_default: z.url().nullable(),
  front_female: z.url().nullable(),
  front_shiny: z.url().nullable(),
  front_shiny_female: z.url().nullable(),
  other: z.union([
    z.record(z.string(), z.any()),
    z.object({
      "official-artwork": z.object({
        front_default: z.url().nullable(),
        front_shiny: z.url().nullable(),
      }),
    }),
  ]),
  versions: z.record(
    z.string(),
    z.record(
      z.string(),
      z.record(
        z.string(),
        z.union([z.url().nullable(), z.record(z.string(), z.any())]),
      ),
    ),
  ),
});

export type Sprites = z.infer<typeof sprites>;

const pokemonSchema = z.object({
  abilities: z.array(z.any()).optional(),
  cries: z.record(z.string(), z.any()).optional(),
  forms: z.array(z.any()).optional(),
  game_indices: z.array(z.any()),
  moves: z.array(z.any()),
  name: z.string(),
  order: z.number(),
  past_abilities: z.array(z.any()),
  past_stats: z.array(z.any()),
  species: z.record(z.string(), z.any()),
  sprites,
  stats: z.array(z.any()),
  types: z.array(z.any()),
  weight: z.number(),
});

type Pokemon = z.infer<typeof pokemonSchema>;

export const getPokemon = async (id: number) => {
  const poke_api = import.meta.env.VITE_POKE_API_ENDPOINT;
  return await ky.get(`${poke_api}/pokemon/${id}`).json<Pokemon>();
};

export const getPokemonFromList = async (url: string) => {
  return await ky.get(url).json<Pokemon>();
};
