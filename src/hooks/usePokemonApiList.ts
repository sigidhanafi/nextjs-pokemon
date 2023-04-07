import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import request from "../services/request";

interface PokemonListData {
  id: number;
  name: string;
  url: string;
  image: string;
}

interface PokemonListResponse {
  count: number;
  next: string;
  results: PokemonListData[];
}

export default function usePokemonApiList(initialPage: number) {
  const [page, setPage] = useState(initialPage);

  const fetchPokemonList = async (
    page: number
  ): Promise<PokemonListResponse> => {
    const response = await request<PokemonListResponse>(
      "https://pokeapi.co/api/v2/pokemon?limit=12&offset=" + (page - 1) * 12,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    const pokemontList = response.results.map((pokemon) => {
      const url = pokemon.url;

      // get id by url
      let id = 0;
      const segments = url.split("/");
      const tempId = segments.pop() || segments.pop();
      if (tempId && tempId != undefined) {
        id = parseInt(tempId);
      }

      // compose image url by id
      const image =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        id +
        ".png";
      return { ...pokemon, id: id, image: image };
    });

    return { ...response, results: pokemontList };
  };

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
