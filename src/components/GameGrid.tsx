import Loading from "./Loading";
import GameCard from "./GameCard";
import { Game } from "@/utils/endpoint";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";

interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
}
const GameGrid = ({ games, isLoading }: GameGridProps) => {
  const { setCart: updateCart } = useContext(CartContext);

  const [cart, setCart] = useState<Game[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart(cart);
  }, [cart]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full grid grid-cols-1  lg:grid-cols-3 lg:gap-12 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              cart={cart}
              addToCart={(game: Game) => {
                setCart([...cart, game]);
              }}
              removeFromCart={(game: Game) => {
                setCart(cart.filter((_game) => game.id !== _game.id));
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GameGrid;
