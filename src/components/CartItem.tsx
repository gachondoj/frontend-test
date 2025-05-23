import { useCart } from "@/context/cartContext";
import { Game } from "@/utils/endpoint";
import Image from "next/image";

const CartItem = ({ game, isLast }: { game: Game; isLast: boolean }) => {
  const { cart, removeFromCart } = useCart();
  return (
    <div
      className={`w-full px-4 py-5 flex gap-6 h-[196px] ${
        isLast ? "" : "border-b-[0.5px] border-b-gray-200"
      }`}
    >
      <Image
        src={game.image}
        alt={game.name}
        width={256}
        height={156}
        className="max-h-[156px] min-w-64"
      />
      <div>
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
          disabled={cart.length === 1}
          onClick={() => removeFromCart(game)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
