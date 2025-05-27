import { Game } from "@/utils/endpoint";
import Image from "next/image";

interface CartItemProps {
  game: Game;
  isLast: boolean;
  disabled: boolean;
  removeFromCart: (game: Game) => void;
}

const CartItem = ({
  game,
  isLast,
  disabled,
  removeFromCart,
}: CartItemProps) => {
  return (
    <div
      className={`w-full px-4 py-5 flex gap-6 h-fit md:h-[196px] ${
        isLast ? "" : "border-b-[0.5px] border-b-gray-200"
      }`}
    >
      <Image
        src={game.image}
        alt={game.name}
        width={256}
        height={156}
        className="max-h-[156px] lg:min-w-64"
      />
      <div className="w-full">
        <div className="text-gray-300 font-bold text-base mb-3">
          {game.genre}
        </div>
        <div className="mb-2">{game.name}</div>
        <div className="mb-5 text-gray-300 font-normal text-base">
          {game.description}
        </div>
        <div className="w-full flex justify-end font-bold text-gray-600 text-xl">
          ${game.price}
        </div>
      </div>
      <div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => removeFromCart(game)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
