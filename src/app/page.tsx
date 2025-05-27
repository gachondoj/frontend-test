"use client";
import Button from "@/components/Button";
import GameCard from "@/components/GameCard";
import Loading from "@/components/Loading";
import { CartContext } from "@/context/cartContext";
import { getGames } from "@/services/games";
import { Game } from "@/utils/endpoint";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Home() {
  const { setCart: updateCart } = useContext(CartContext);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cart, setCart] = useState<Game[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoreGames, setIsLoadingMoreGames] = useState(false);

  const genre = searchParams.get("genre");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const seeMoreGames = async () => {
    setIsLoadingMoreGames(true);
    const res = await getGames({ page: page + 1 });
    setGames([...games, ...res.games]);
    setPage(page + 1);
    setIsLoadingMoreGames(false);
  };

  useEffect(() => {
    const getNewGames = async () => {
      setIsLoading(true);
      const res = await getGames({ genre: genre ?? undefined });
      if (games.length === 0) {
        setFilters(res.availableFilters);
        setTotalPages(res.totalPages);
      }
      setGames(res.games);
      setPage(1);

      setIsLoading(false);
    };

    getNewGames();
  }, [genre]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart(cart);
  }, [cart]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 lg:py-12 lg:px-32">
      <div className="w-full font-bold text-gray-600 text-4xl">Top Sellers</div>
      <div className="w-full justify-end flex mb-12 gap-5 text-gray-600">
        <div className="font-bold">Genre</div>
        <div>|</div>
        <select
          disabled={isLoading}
          value={genre ?? "All"}
          onChange={(e) => {
            if (e.target.value === "All") {
              router.push(pathname);
            } else {
              router.push(
                pathname + "?" + createQueryString("genre", e.target.value)
              );
            }
          }}
        >
          <option value="All">All</option>
          {filters.map((filter, index) => (
            <option key={index} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>
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
      {isLoadingMoreGames && <Loading />}

      {!isLoadingMoreGames && !genre && (
        <div className="w-full flex">
          <Button
            content="SEE MORE"
            onClick={() => seeMoreGames()}
            variant="gray"
            disabled={totalPages === page || isLoadingMoreGames}
            small={true}
          />
        </div>
      )}
    </main>
  );
}
