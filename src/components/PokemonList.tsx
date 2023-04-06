import { useEffect } from "react";

import usePokemonApiList from "../hooks/usePokemonApiList";

import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { data, isLoading, error, isSuccess, isPreviousData, setPage } =
    usePokemonApiList();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentHeight =
  //       window.innerHeight + document.documentElement.scrollTop;
  //     const minimumHeightToTrigger = document.body.offsetHeight * 0.9;

  //     if (currentHeight < minimumHeightToTrigger) return;

  //     console.log("load more", currentHeight, minimumHeightToTrigger);
  //     // setTriggerFetch(true);
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  if (isLoading) {
    return (
      <div className="flex w-full flex-wrap">
        <p>Loading content</p>
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

  console.log("isPreviousData", isPreviousData, data?.results);

  if (isSuccess && data) {
    return (
      <div>
        <div className="flex w-full flex-wrap">
          {data &&
            data.results &&
            data.results.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  id={pokemon.id}
                  image={pokemon.image}
                />
              );
            })}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-200 px-4 rounded-md"
            onClick={() => {
              setPage((oldPage) => oldPage + 1);
            }}
          >
            Load more
          </button>
        </div>
      </div>
    );
  }

  return <></>;
};

export default PokemonList;
