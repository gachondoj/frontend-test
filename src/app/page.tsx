"use client";
import Button from "@/components/Button";
import GameGrid from "@/components/GameGrid";
import Loading from "@/components/Loading";
import Select from "@/components/Select";
import { getGames } from "@/services/games";
import { Game } from "@/utils/endpoint";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const updateRouter = (value: string) => {
    if (value === "All") {
      router.push(pathname);
    } else {
      router.push(pathname + "?" + createQueryString("genre", value));
    }
  };

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
        setFilters(["All", ...res.availableFilters]);
        setTotalPages(res.totalPages);
      }
      setGames(res.games);
      setPage(1);

      setIsLoading(false);
    };

    getNewGames();
  }, [genre]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 lg:py-12 lg:px-32">
      <div className="w-full font-bold text-gray-600 text-4xl">Top Sellers</div>
      <Select
        title="Genre"
        value={genre ?? "All"}
        options={filters}
        onChange={(value: string) => updateRouter(value)}
      />
      <GameGrid games={games} isLoading={isLoading} />
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
