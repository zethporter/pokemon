import { createFileRoute } from "@tanstack/react-router";

import { Pokemon } from "#/components/Pokemon";

type RootSearchParams = {
  pokeId?: number;
};

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search: Record<string, unknown>): RootSearchParams => {
    return { pokeId: (search.pokeId as number) || undefined };
  },
});

function Home() {
  return (
    <div className="flex flex-col gap-2 p-10 pt-0">
      <Pokemon />
    </div>
  );
}
