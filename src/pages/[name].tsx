import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "react-query";

import PokemonDetail from "@/components/detail/PokemonDetail";

const DetailPage = () => {
  return (
    <>
      <Head>
        <title>Poke Monster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonDetail />
    </>
  );
};

export default DetailPage;
