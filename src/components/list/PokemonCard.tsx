import Image from "next/image";
import Link from "next/link";

interface PorkemonCardProps {
  name: string;
  id: string;
  image: string;
}

const PokemonCard = (props: PorkemonCardProps) => {
  return (
    <div className="w-1/3 flex-shrink-0">
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
