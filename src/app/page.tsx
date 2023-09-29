"use client"

import InfoCard from "@/components/infor-card";
import { useState, useEffect } from "react";

export type Pokemon = {
  name: string;
  url?: string;
  image: {
    front: string;
    back: string;
  };
};

export default function Home() {
  const [pokemon, setPokemon] =useState<Pokemon[]>([])

  useEffect(()=>{
    const getAllPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
      const data = await response.json()
      
      const urls = data.results.map ((p: { url: string}) => p.url);

      const pokemanData = await Promise.all(
        urls.map(async (url: string) => {
          const response = await fetch (url);
          const p = await response.json();
            
            return {
              id: p.id,
              name: p.name,
              image:{
                front: p.sprites.front_default,
                back: p.sprites.back_default,
              },
              types: p.types.map(
                (t: {type: { name: string} }) => t.type.name
              ),
                weight: p.weight,
            };
          }))
        setPokemon(pokemanData); 
      
    }

    getAllPokemon();
  }, []);

  return (
    <main className=" bg-red-950 text-white min-h-screen">
      <header className="py-4 px-8 border-b border-white">
      <h1 className="text-4xl font-serif text-center"> My Pokedex </h1>
      </header>
      <div className="text-black text-right">
        <input type="text" placeholder="Searchbar"></input>
      </div>
      <div className="grid grid-cols-3 gap-12 p-8">
        {pokemon.map((p: Pokemon) => (
          <InfoCard key={p.name} pokemon={p}/>
        ))}
      </div>
     </main>
  );
}
