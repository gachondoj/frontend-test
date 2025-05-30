import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GameCard from "@/components/GameCard";
import { ShoppingCart } from "@/context/cartContext";

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
  let cart: ShoppingCart = { items: [game], total: game.price };
  const handleButton = jest.fn();

  render(
    <GameCard game={game} cartItems={cart.items} handleButton={handleButton} />
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
  let cart: ShoppingCart = { items: [game], total: game.price };
  const handleButton = jest.fn();

  render(
    <GameCard game={game} cartItems={cart.items} handleButton={handleButton} />
  );

  fireEvent.click(screen.getByRole("button"));
  expect(handleButton).toHaveBeenCalled();
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
  let cart: ShoppingCart = { items: [game], total: game.price };
  const handleButton = jest.fn();

  render(
    <GameCard game={game} cartItems={cart.items} handleButton={handleButton} />
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
  let cart: ShoppingCart = { items: [game], total: game.price };
  const handleButton = jest.fn();

  render(
    <GameCard game={game} cartItems={cart.items} handleButton={handleButton} />
  );

  fireEvent.click(screen.getByRole("button"));
  expect(handleButton).toHaveBeenCalled();
});
