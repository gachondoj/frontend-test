import { API_URL } from "@/config";

export const getGames = async (props: { genre?: string; page?: number }) => {
  const urlProps = props.genre
    ? `genre=${props.genre}&page=${props.page ?? 1}`
    : `page=${props.page ?? 1}`;

  const res = await fetch(`${API_URL}/games?${urlProps}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch games, status: ${res.status}`);
  }

  return res.json();
};
