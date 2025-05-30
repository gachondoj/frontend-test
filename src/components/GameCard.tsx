import { Game } from "@/utils/endpoint";
import { isObjectInList } from "@/utils/isObjectInList";
import Image from "next/image";
import Button from "./Button";
import Badge from "./Badge";

interface GameCardProps {
  game: Game;
  cartItems: Game[];
  handleButton: (game: Game) => void;
}

const GameCard = ({ game, cartItems, handleButton }: GameCardProps) => {
  return (
    <div className="relative border-[0.5px] border-primary-200 rounded-2xl justify-between flex flex-col p-6 gap-5 h-full lg:max-w-[380px]">
      <div className="h-60 w-full">
        <Image
          src={game.image}
          alt={game.name}
          width={1000}
          height={10000}
          className="rounded-t-2xl object-cover h-60"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="text-primary-300 font-bold text-base">{game.genre}</div>
        <div className="flex w-full justify-between text-primary-600 font-bold text-lg max-h-6">
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {game.name}
          </div>
          <div>${game.price}</div>
        </div>
        <Button onClick={() => handleButton(game)}>
          {isObjectInList(game, cartItems) ? "REMOVE" : "ADD TO CART"}
        </Button>
      </div>

      {game.isNew && <Badge>New</Badge>}
    </div>
  );
};

export default GameCard;
