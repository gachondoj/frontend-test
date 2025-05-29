import { Game } from "@/utils/endpoint";
import { isObjectInList } from "@/utils/isObjectInList";
import Image from "next/image";
import Button from "./Button";
import Badge from "./Badge";

interface GameCardProps {
  game: Game;
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
}

const GameCard = ({ game, cart, addToCart, removeFromCart }: GameCardProps) => {
  const buttonAction = (game: Game) => {
    if (isObjectInList(game, cart)) {
      removeFromCart(game);
    } else {
      addToCart(game);
    }
  };

  return (
    <div className="relative border-[0.5px] border-gray-200 rounded-2xl justify-between flex flex-col p-6 h-full w-full ">
      <Image
        src={game.image}
        alt={game.name}
        width={1000}
        height={0}
        className="rounded-t-2xl w-full h-fit"
      />
      <div className="flex flex-col gap-5">
        <div className="text-gray-300 font-bold text-base">{game.genre}</div>
        <div className="flex w-full justify-between text-gray-600 font-bold text-lg max-h-6">
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {game.name}
          </div>
          <div>${game.price}</div>
        </div>
        <Button onClick={() => buttonAction(game)}>
          {isObjectInList(game, cart) ? "REMOVE" : "ADD TO CART"}
        </Button>
      </div>

      {game.isNew && <Badge>New</Badge>}
    </div>
  );
};

export default GameCard;
