import { useQuery } from "react-query";

interface PokemonDetailStat {
  name: string;
  value: number;
}

interface PokemonDetailResponse {
  id: number;
  name: string;
  image: string;
  abilities: string[];
  types: string[];
  stats: PokemonDetailStat[];
  weight: number;
}

export default function usePokemonApiDetail(name: string) {
  const fetchDetail = (name: string): Promise<PokemonDetailResponse> =>
    fetch("https://pokeapi.co/api/v2/pokemon/" + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("RES DETAIL");
        if (!res) {
          throw new Error("Oh no!");
        }

        if (
          !Array.isArray(res.abilities) ||
          !Array.isArray(res.stats) ||
          !Array.isArray(res.types)
        ) {
          throw new Error("Oh no!");
        }

        const abilities = res.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        );
        const stats: PokemonDetailStat[] = res.stats.map(
          (stat: { stat: { name: string }; base_stat: number }) => {
            return { name: stat.stat.name, value: stat.base_stat };
          }
        );
        const types = res.types.map(
          (type: { type: { name: string } }) => type.type.name
        );
        const detail: PokemonDetailResponse = {
          id: res.id,
          name: res.name,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            res.id +
            ".png",
          abilities: abilities,
          types: types,
          stats: stats,
          weight: 80,
        };
        return detail;
      });

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["fetchPokemonDetail", name],
    queryFn: () => fetchDetail(name),
    // onError: (error) => {
    //   console.log(error);
    // },
  });

  return { isLoading, error, data, isSuccess };
}
