import { Game } from "@/utils/endpoint";

interface CartSummaryItemProps {
  game: Game;
}

const CartSummaryItem = ({ game }: CartSummaryItemProps) => {
  return (
    <div className="flex w-full justify-between">
      <div>{game.name}</div>
      <div>${game.price}</div>
    </div>
  );
};

export default CartSummaryItem;
