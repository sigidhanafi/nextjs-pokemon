import { useState } from "react";
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

export default function usePokemonApiList() {
  const [page, setPage] = useState(0);
  const fetchPokemonList = (page: number): Promise<PokemonListResponse> =>
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + page * 10, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
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

  const { isLoading, error, data, isSuccess, isPreviousData } = useQuery({
    queryKey: ["fetchPokemonList", page],
    queryFn: () => fetchPokemonList(page),
    keepPreviousData: true,
  });

  return { isLoading, error, data, isSuccess, isPreviousData, page, setPage };
}
