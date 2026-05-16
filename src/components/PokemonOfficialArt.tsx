import type { Sprites } from "@/lib/pokemon";

export function PokemonArtwork({ sprites }: { sprites: Sprites }) {
  return (
    <div className="flex gap-2 sm:flex-col lg:flex-row w-full">
      <img
        src={sprites.other["official-artwork"].front_default}
        alt={"Front Default"}
      />
      <img
        src={sprites.other["official-artwork"].front_shiny}
        alt={"Front Shiny"}
      />
    </div>
  );
}
