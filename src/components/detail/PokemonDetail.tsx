import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

import usePokemonApiDetail from "../../hooks/usePokemonApiDetail";
import usePokemonApiDescription from "../../hooks/usePokemonApiDescription";

const PokemonDetail = () => {
  const router = useRouter();
  const { query } = router;
  const name: string =
    query && query.name ? (query.name as string) : ("" as string);

  const { error, isLoading, data, isSuccess } = usePokemonApiDetail(name);
  const { data: description } = usePokemonApiDescription(name);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        <p>Loading content</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-96">
        <span className="text-gray-500">
          Error when fetch the pokemon data.
        </span>
        <span className="text-gray-500">Please try again.</span>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col w-full">
        <div className="bg-blue-200 border border-blue-300 rounded-lg mx-2 my-2">
          <div className="w-full h-fit">
            <Image src={data.image} width={600} height={0} alt={"bulbasaur"} />
          </div>
          <div className="p-4">
            <span className="text-blue-500 font-medium text-xl">
              {data.name}
            </span>
            {description && (
              <p>{description.flavor_text_entries[0].flavor_text}</p>
            )}
          </div>
          <div className="flex justify-start space-x-2 bg-white p-2 rounded-br-lg rounded-bl-lg">
            {data.types.map((type) => {
              return (
                <div
                  key={type.type.name}
                  className="rounded-full border-blue-300 border px-3 py-1"
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="border border-blue-300 rounded-lg mx-2 my-2">
          <div className="p-4 bg-blue-300">
            <span className="text-white font-medium text-xl">Base Stat</span>
          </div>
          <div className="flex flex-col space-y-4">
            {data.stats.map((stat) => {
              return (
                <div
                  key={stat.stat.name}
                  className="flex flex-row items-center justify-between border border-b-blue-200 p-4"
                >
                  <span className="w-1/3 text-sm font-medium">
                    {stat.stat.name}
                  </span>
                  <div className="flex flex-row items-center w-2/3 space-x-2 pr-2">
                    <div className="bg-gray-200 w-full h-1">
                      <div className="bg-blue-300 w-1/3 h-1"></div>
                    </div>
                    <span className="w-2 text-sm font-medium">
                      {stat.base_stat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default PokemonDetail;
