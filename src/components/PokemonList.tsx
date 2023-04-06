import { useEffect } from "react";
import { useRouter } from "next/router";

import usePokemonApiList from "../hooks/usePokemonApiList";
import Pagination from "./Pagination";

import PokemonCard from "./PokemonCard";
import PokemonCardShimmer from "./PokemonCardShimmer";

const PokemonList = () => {
  const router = useRouter();
  const {
    query: { page: queryPage },
  } = router;

  let initialPage = 0;
  if (
    queryPage &&
    queryPage != "" &&
    queryPage != undefined &&
    !Array.isArray(queryPage)
  ) {
    initialPage = parseInt(queryPage);
  }

  const {
    data,
    isLoading,
    isFetching,
    error,
    isSuccess,
    isPreviousData,
    page,
    setPage,
  } = usePokemonApiList(initialPage);

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

  if (isLoading || isFetching) {
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
        <Pagination
          page={page}
          onNext={() => {
            setPage((oldPage) => {
              const nextPage = oldPage + 1;
              router.push("/?page=" + nextPage);
              return nextPage;
            });
          }}
          onPrev={() => {
            setPage((oldPage) => {
              const prevPage = oldPage - 1;
              router.push("/?page=" + prevPage);
              return prevPage;
            });
          }}
        />
      </div>
    );
  }

  return <></>;
};

export default PokemonList;
