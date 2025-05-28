import { Game } from "@/utils/endpoint";
import CartItem from "./CartItem";

interface CartListProps {
  cart: Game[];
  setCart: (cart: Game[]) => void;
}

const CartList = ({ cart, setCart }: CartListProps) => {
  return (
    <div className="w-full flex flex-col gap-0">
      {cart.map((game, index) => (
        <CartItem
          key={game.id}
          game={game}
          isLast={index + 1 === cart.length}
          disabled={cart.length === 1}
          removeFromCart={(game) => {
            setCart(cart.filter((_game) => game.id !== _game.id));
          }}
        />
      ))}
    </div>
  );
};

export default CartList;
