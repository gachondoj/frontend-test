import { API_URL } from "@/config";
import { Game } from "@/utils/endpoint";

interface GetGamesProps {
  genre?: string;
  page?: number;
}

interface GetGamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export const getGames = async ({
  genre,
  page,
}: GetGamesProps): Promise<GetGamesResponse> => {
  const urlProps = genre
    ? `genre=${genre}&page=${page ?? 1}`
    : `page=${page ?? 1}`;

  const res = await fetch(`${API_URL}/games?${urlProps}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch games, status: ${res.status}`);
  }

  return res.json();
};
