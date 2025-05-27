import { getGames } from "@/services/games";
import { API_URL } from "@/config";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("fetches games without genre (defaults to page 1)", async () => {
  const mockResponse = {
    games: [
      {
        id: "id",
        genre: "Puzzle",
        image: "https://picsum.photos/200",
        name: "Test Game",
        description: "Description if needed",
        price: 19.99,
        isNew: false,
      },
    ],
    availableFilters: ["Action", "Puzzle"],
    totalPages: 3,
    currentPage: 1,
  };

  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const result = await getGames({});
  expect(fetch).toHaveBeenCalledWith(`${API_URL}/games?page=1`);
  expect(result).toEqual(mockResponse);
});

test("fetches games with genre and specific page", async () => {
  const mockResponse = {
    games: [],
    availableFilters: [],
    totalPages: 0,
    currentPage: 2,
  };

  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  });

  const result = await getGames({ genre: "action", page: 2 });
  expect(fetch).toHaveBeenCalledWith(`${API_URL}/games?genre=action&page=2`);
  expect(result).toEqual(mockResponse);
});

test("throws error if fetch fails", async () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: false,
  });

  await expect(getGames({})).rejects.toThrow("Failed to fetch game");
});
