import { type Pokemon } from "@/app/page";

interface InfoCardProps {
    pokemon: Pokemon;
}

export default function InfoCard({ pokemon }: InfoCardProps) {
    return (
        <div key={pokemon.name} className="border border-white p-2 rounded-sm">
            <img src={pokemon.image.front} alt="Pokeman bilder" className="h-40 w-40 object-cover" />
            <h3 className="capitalize font-semibold text-lg">{pokemon.name}</h3>
            <button className="text-blue-500 hover:underline">See more</button>
        </div>
    );
}