import Loading from "./Loading";
import GameCard from "./GameCard";
import { Game } from "@/utils/endpoint";
import { useCart } from "@/hooks/useCart";
import { isObjectInList } from "@/utils/isObjectInList";

interface GameListProps {
  games: Game[];
  isLoading?: boolean;
}
const GameList = ({ games, isLoading }: GameListProps) => {
  const { items, addItem, removeItem } = useCart();

  const handleButton = (game: Game) => {
    if (isObjectInList(game, items)) {
      removeItem(game);
    } else {
      addItem(game);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 lg:gap-12 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              cartItems={items}
              handleButton={handleButton}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GameList;
