import React from "react";
import { render, screen } from "@testing-library/react";
import CartSummary from "@/components/CartSummary";
import { Game } from "@/utils/endpoint";

test("shows cart info correctly", async () => {
  let items: Game[] = [
    {
      id: "game1",
      genre: "Genre",
      image: "https://picsum.photos/200",
      name: "Product 1 Name",
      description: "Description if needed",
      price: 19.99,
      isNew: false,
    },
    {
      id: "game2",
      genre: "Genre",
      image: "https://picsum.photos/200",
      name: "Product 2 Name",
      description: "Description if needed",
      price: 19.99,
      isNew: false,
    },
    {
      id: "game3",
      genre: "Genre",
      image: "https://picsum.photos/200",
      name: "Product 3 Name",
      description: "Description if needed",
      price: 19.99,
      isNew: false,
    },
  ];

  let total = 0;
  items.forEach((game) => {
    total += game.price;
  });

  render(<CartSummary items={items} total={total} />);

  expect(screen.getByText(`$${total}`)).toBeInTheDocument();
});
