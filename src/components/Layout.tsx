import { ThemeSwitcher } from "./theme-switcher";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "#/components/ui/combobox";
import { Badge } from "#/components/ui/badge";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { usePokemonList, extractPokemonId } from "#/lib/pokemon-list";
import type { PokemonListItem } from "#/lib/pokemon-list";
import { useNavigate } from "@tanstack/react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate({
    from: "/",
  });
  const { allPokemon } = usePokemonList();

  return (
    <div className="h-full w-full overflow-auto">
      <div className="p-4 flex flex-row flex-nowrap items-start gap-4 sticky top-0 z-30 bg-linear-to-b from-background/10 backdrop-blur-lg h-20 w-full">
        <div className="grow">
          <h1 className="text-2xl font-bold tracking-wide">Pokemon Helper</h1>
        </div>
        <Combobox
          items={allPokemon}
          itemToStringValue={(pokemon: PokemonListItem) => pokemon.name}
          itemToStringLabel={(pokemon: PokemonListItem) =>
            pokemon.name.toLocaleUpperCase()
          }
          onValueChange={(pokemon) =>
            pokemon
              ? navigate({
                  search: { pokeId: extractPokemonId(pokemon.url) },
                })
              : null
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
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  );
}
