import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GameCard from "@/components/GameCard";
import { Game } from "@/utils/endpoint";

test("shows game genre, name, price and image", async () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  let cart: Game[] = [];
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  render(
    <GameCard
      game={game}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );

  expect(screen.getByText(game.name)).toBeInTheDocument();
  expect(screen.getByText(game.genre)).toBeInTheDocument();
  expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
  expect(screen.queryByText("New")).not.toBeInTheDocument();

  const img: HTMLImageElement = await screen.findByRole("img");
  expect(img.src).toContain(encodeURIComponent(game.image));
  expect(img).toHaveProperty("alt", game.name);
});

test("adds item to cart when clicked", () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  let cart: Game[] = [];
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  render(
    <GameCard
      game={game}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );

  fireEvent.click(screen.getByText("ADD TO CART"));
  expect(addToCart).toHaveBeenCalled();
});

test("shows new tag", () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: true,
  };
  let cart: Game[] = [game];
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  render(
    <GameCard
      game={game}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );

  expect(screen.getByText("New")).toBeInTheDocument();
});

test("removes item from cart when clicked", () => {
  let game = {
    id: "id",
    genre: "Genre",
    image: "https://picsum.photos/200",
    name: "name",
    description: "Description if needed",
    price: 19.99,
    isNew: false,
  };
  let cart: Game[] = [game];
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();

  render(
    <GameCard
      game={game}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );

  fireEvent.click(screen.getByText("REMOVE"));
  expect(removeFromCart).toHaveBeenCalled();
});
