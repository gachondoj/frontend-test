import { Game } from "@/utils/endpoint";
import { isObjectInList } from "@/utils/isObjectInList";
import Image from "next/image";

const GameCard = ({
  game,
  cart,
  addToCart,
  removeFromCart,
}: {
  game: Game;
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
}) => {
  const buttonAction = (game: Game) => {
    if (isObjectInList(game, cart)) {
      removeFromCart(game);
    } else {
      addToCart(game);
    }
  };

  return (
    <div className="border-[0.5px] border-[#8F8F8F] rounded-2xl p-6 flex flex-col gap-5 h-[436px] w-[380px]">
      <Image
        src={game.image}
        alt={game.name}
        width={300}
        height={100}
        className="rounded-t-2xl min-w-[332px] w-full h-60"
      />
      <div className="text-gray-300 font-bold text-base">{game.genre}</div>
      <div className="flex w-full justify-between text-gray-600 font-bold text-lg max-h-6">
        <div className="text-ellipsis overflow-hidden whitespace-nowrap">
          {game.name}
        </div>
        <div>${game.price}</div>
      </div>
      <button
        onClick={() => buttonAction(game)}
        type="button"
        className="w-full rounded-lg border border-gray-600 h-14 text-gray-600 font-bold"
      >
        {isObjectInList(game, cart) ? "REMOVE" : "ADD TO CART"}
      </button>
    </div>
  );
};

export default GameCard;
