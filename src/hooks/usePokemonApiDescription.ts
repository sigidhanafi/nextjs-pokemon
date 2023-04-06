import { useQuery } from "react-query";

interface PokemonDescriptionResponse {
  description: string;
}

export default function usePokemonApiDescription(name: string) {
  const fetchDescription = async (
    name: string
  ): Promise<PokemonDescriptionResponse> =>
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          throw new Error("Oh no!");
        }

        if (!Array.isArray(res.flavor_text_entries)) {
          throw new Error("Oh no!");
        }

        return { description: res.flavor_text_entries[0].flavor_text };
      });

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["fetchDescription", name],
    queryFn: () => fetchDescription(name),
  });

  return { isLoading, error, data, isSuccess };
}
