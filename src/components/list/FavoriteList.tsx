import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import usePokemonApiFavorite from "@/hooks/usePokemonApiFavorite";

import PokemonCard from "./PokemonCard";
import PokemonCardShimmer from "./PokemonCardShimmer";

const FavoriteList = () => {
  const router = useRouter();

  const isLoading = false;
  const error = null;

  const { favorites: data } = usePokemonApiFavorite();

  if (isLoading) {
    return (
      <div className="flex w-full flex-wrap">
        <PokemonCardShimmer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-wrap">
        <p>Error</p>
      </div>
    );
  }

  if (data && data.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-96 space-y-4">
        <span className="text-gray-500">No pokemon in your favorite!</span>
        <button className="bg-blue-300 text-white rounded-lg px-4 py-2">
          Add
        </button>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex w-full flex-wrap">
        {data &&
          data.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
              />
            );
          })}
      </div>
    );
  }

  return <></>;
};

export default FavoriteList;
