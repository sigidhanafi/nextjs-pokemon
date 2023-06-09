import Head from "next/head";

import PokemonList from "@/components/list/PokemonList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Poke Monster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonList />
    </>
  );
}
