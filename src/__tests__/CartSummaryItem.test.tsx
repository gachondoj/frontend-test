import CartSummaryItem from "@/components/CartSummaryItem";
import { Game } from "@/utils/endpoint";
import { render, screen } from "@testing-library/react";

test("shows game info correctly", async () => {
  let game: Game = {
    id: "game1",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "Product 1 Name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };

  render(<CartSummaryItem game={game} />);

  expect(screen.getByText(game.name)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
});
