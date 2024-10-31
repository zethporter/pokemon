import { type Pokemon } from "pokenode-ts";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="card bg-yellow-500 shadow-xl w-56 border-4 p-4 border-yellow-700">
      <h2 className="card-title capitalize pb-2 text-blue-900">
        {pokemon.name}
      </h2>
      <img
        className="bg-yellow-100 rounded-btn"
        src={pokemon.sprites.front_default ?? ""}
        alt={pokemon.name}
      />
      <div className="text-blue-900 font-bold pt-2">
        <p>{`Weight: ${pokemon.weight}`}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
