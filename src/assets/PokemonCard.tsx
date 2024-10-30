import { type Pokemon } from "pokenode-ts";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="card bg-base-200 shadow-xl w-56 p-4">
      <h2 className="card-title capitalize pb-2">{pokemon.name}</h2>
      <img
        className="bg-base-300 rounded-btn"
        src={pokemon.sprites.front_default ?? ""}
        alt={pokemon.name}
      />
      {/* <div className="card-body">
        <p>{pokemon.weight}</p>
      </div> */}
    </div>
  );
};

export default PokemonCard;
