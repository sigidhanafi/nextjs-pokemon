import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { Pokemon } from "@/models/pokemon";

import usePokemonApiFavorite from "@/hooks/usePokemonApiFavorite";

interface PorkemonCardProps {
  name: string;
  id: number;
  image: string;
}

const PokemonCard = (props: PorkemonCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const { getFavorites, addFavorite, removeFavorite, isFavorite } =
    usePokemonApiFavorite();

  useEffect(() => {
    const selectedPokemon: Pokemon = {
      id: props.id,
      name: props.name,
      image: props.image,
    };
    const isFavorited = isFavorite(selectedPokemon);
    setIsFavorited(isFavorited);
  }, [props, isFavorite]);

  const handleOnChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedPokemon: Pokemon = {
      id: props.id,
      name: props.name,
      image: props.image,
    };

    if (e.target.checked) {
      // Add Item
      addFavorite(selectedPokemon);
      setIsFavorited(true);
    } else {
      // Remove item
      removeFavorite(selectedPokemon);
      setIsFavorited(false);
    }
  };

  return (
    <div className="relative w-1/3 flex-shrink-0">
      <input
        type="checkbox"
        className="absolute top-3 left-2 checked:bg-blue-500 mx-2 my-1"
        onChange={handleOnChangeCheckbox}
        checked={isFavorited}
      />
      <Link href={"/" + props.name}>
        <div className="bg-blue-200 border border-blue-300 rounded-lg mx-2 my-2">
          <Image src={props.image} width={300} height={500} alt="" />
          <div className="flex justify-center p-2">
            <span className="text-blue-500 font-medium text-sm md:text-xl">
              {props.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
