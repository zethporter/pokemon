import { createFileRoute } from "@tanstack/react-router";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "#/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "#/components/ui/badge";
import { useState } from "react";
import { Pokemon } from "#/components/Pokemon";
import { usePokemonList, extractPokemonId } from "#/lib/pokemon-list";
import type { PokemonListItem } from "#/lib/pokemon-list";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { allPokemon } = usePokemonList();
  const [pokemonUrl, setPokemonUrl] = useState("");
  extractPokemonId;
  return (
    <div className="flex flex-col gap-2 p-10 pt-0">
      <div className="flex flex-col gap-2 sticky top-0 pt-10 pb-5 px-5 shadow-xl min-w-full w-3/4 max-w-3xl mx-auto rounded-3xl backdrop-blur-2xl">
        <h1 className="text-4xl font-bold">Pokemon Search</h1>
        <Combobox
          items={allPokemon}
          itemToStringValue={(pokemon: PokemonListItem) => pokemon.name}
          itemToStringLabel={(pokemon: PokemonListItem) =>
            pokemon.name.toLocaleUpperCase()
          }
          onValueChange={(pokemon) =>
            pokemon ? setPokemonUrl(pokemon.url) : null
          }
        >
          <ComboboxInput placeholder="Search pokemon..." />
          <ComboboxContent>
            <ComboboxEmpty>No Pokemon found.</ComboboxEmpty>
            <ComboboxList>
              {(pokemon) => (
                <ComboboxItem key={pokemon.url} value={pokemon}>
                  <Item size="xs" className="p-0">
                    <ItemContent>
                      <ItemTitle className="whitespace-nowrap">
                        <span>
                          <Badge variant="outline">
                            {extractPokemonId(pokemon.url)}
                          </Badge>
                        </span>
                        {pokemon.name.toLocaleUpperCase()}
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <Pokemon url={pokemonUrl} />
    </div>
  );
}
