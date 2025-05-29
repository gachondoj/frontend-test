import { Game } from "@/utils/endpoint";
import CartSummaryItem from "./CartSummaryItem";

interface CartSummaryListProps {
  games: Game[];
}

const CartSummaryList = ({ games }: CartSummaryListProps) => {
  return (
    <div className="flex flex-col gap-3 font-normal text-gray-600 text-lg">
      {games.map((game) => (
        <CartSummaryItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default CartSummaryList;
