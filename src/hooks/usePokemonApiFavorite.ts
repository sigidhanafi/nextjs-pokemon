import { useEffect, useState } from "react";

import { Pokemon } from "@/models/pokemon";

export default function usePokemonApiFavorite() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const getFavorites = () => {
    const localData = localStorage.getItem("favorite");
    let currentFavorite = [];
    if (localData != null) {
      currentFavorite = JSON.parse(localData);
    }

    return currentFavorite;
  };

  const addFavorite = (favorite: Pokemon) => {
    const localData = localStorage.getItem("favorite");
    let currentFavorite = [];
    if (localData != null) {
      currentFavorite = JSON.parse(localData);
    }

    currentFavorite.push(favorite);
    localStorage.setItem("favorite", JSON.stringify(currentFavorite));
  };

  const removeFavorite = (favorite: Pokemon) => {
    const localData = localStorage.getItem("favorite");
    let currentFavorite: Pokemon[] = [];
    if (localData != null) {
      currentFavorite = JSON.parse(localData);
    }

    const newFavorites = currentFavorite.filter(
      (pokemon) => pokemon.id != favorite.id
    );
    localStorage.setItem("favorite", JSON.stringify(newFavorites));
  };

  const isFavorite = (item: Pokemon) => {
    const localData = localStorage.getItem("favorite");
    let currentFavorite: Pokemon[] = [];
    if (localData != null) {
      currentFavorite = JSON.parse(localData);
    }

    const isFavorite = currentFavorite.filter(
      (pokemon) => pokemon.id == item.id
    );
    const isFavorited = isFavorite.length >= 1 ? true : false;
    return isFavorited;
  };

  useEffect(() => {
    const localData = localStorage.getItem("favorite");
    let currentFavorite = [];
    if (localData != null) {
      currentFavorite = JSON.parse(localData);
    }
    setFavorites(currentFavorite);
  }, []);

  return { favorites, getFavorites, addFavorite, removeFavorite, isFavorite };
}
