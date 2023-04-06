import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface PokemonListData {
  name: string;
  url: string;
  image: string;
  id: string;
}

interface PokemonListResponse {
  count: number;
  next: string;
  results: PokemonListData[];
}

export default function usePokemonApiList(initialPage: number) {
  const [page, setPage] = useState(initialPage);

  const fetchPokemonList = (page: number): Promise<PokemonListResponse> =>
    fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=12&offset=" + (page - 1) * 12,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const pokemontList = response.results.map(
          (pokemon: PokemonListData) => {
            const url = pokemon.url;
            const segments = url.split("/");
            const id = segments.pop() || segments.pop();
            const image =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
              id +
              ".png";
            return { ...pokemon, id: id, image: image };
          }
        );
        return { ...response, results: pokemontList };
      });

  useEffect(() => {
    if (initialPage <= 0) {
      setPage(1);
      return;
    }
    setPage(initialPage);
  }, [initialPage]);

  const { isLoading, isFetching, error, data, isSuccess, isPreviousData } =
    useQuery({
      queryKey: ["fetchPokemonList", page],
      queryFn: () => fetchPokemonList(page),
      keepPreviousData: true,
    });

  return {
    isLoading,
    isFetching,
    error,
    data,
    isSuccess,
    isPreviousData,
    page,
    setPage,
  };
}
