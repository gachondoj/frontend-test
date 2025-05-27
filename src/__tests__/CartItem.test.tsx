import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItem from "@/components/CartItem";

test("shows game genre, name, description, price and image", async () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  const removeFromCart = jest.fn();

  render(
    <CartItem
      isLast={false}
      disabled={false}
      game={game}
      removeFromCart={removeFromCart}
    />
  );

  expect(screen.getByText(game.name)).toBeInTheDocument();
  expect(screen.getByText(game.genre)).toBeInTheDocument();
  expect(screen.getByText(game.description)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();

  const img: HTMLImageElement = await screen.findByRole("img");
  expect(img.src).toContain(encodeURIComponent(game.image));
  expect(img).toHaveProperty("alt", game.name);
});

test("removes item from cart", () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  const removeFromCart = jest.fn();

  render(
    <CartItem
      isLast={false}
      disabled={false}
      game={game}
      removeFromCart={removeFromCart}
    />
  );

  fireEvent.click(screen.getByText("X"));
  expect(removeFromCart).toHaveBeenCalled();
});

test("doesn't remove item from cart if disabled", () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  const removeFromCart = jest.fn();

  render(
    <CartItem
      isLast={false}
      disabled={true}
      game={game}
      removeFromCart={removeFromCart}
    />
  );

  fireEvent.click(screen.getByText("X"));
  expect(removeFromCart).toHaveBeenCalledTimes(0);
});
