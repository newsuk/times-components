import fetchPolygonData from "../../src/article-sidebar";

// Mock fetch globally
global.fetch = jest.fn();

describe("fetchPolygonData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct puzzle URL when API responds successfully", async () => {
    const mockResponse = {
      data: {
        puzzles: {
          list: [
            {
              slug: "polygon",
              shortIdentifier: "tbkft6qhw"
            }
          ]
        }
      }
    };

    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    });

    const result = await fetchPolygonData();
    expect(result).toEqual(["/puzzles/word-puzzles/polygon-tbkft6qhw"]);
  });

  it("should return an empty array if API response is not ok", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500
    });

    const result = await fetchPolygonData();
    expect(result).toEqual([]);
  });

  it("should handle fetch errors and return an empty array", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    const result = await fetchPolygonData();
    expect(result).toEqual([]);
  });
});
