import { Game } from "@/utils/endpoint";
import CartItem from "./CartItem";

interface CartListProps {
  cart: Game[];
  removeFromCart: (game: Game) => void;
}

const CartList = ({ cart, removeFromCart }: CartListProps) => {
  return (
    <div className="w-full flex flex-col gap-0">
      {cart.map((game, index) => (
        <CartItem
          key={game.id}
          game={game}
          isLast={index + 1 === cart.length}
          disabled={cart.length === 1}
          removeFromCart={(game) => {
            removeFromCart(game);
          }}
        />
      ))}
    </div>
  );
};

export default CartList;
