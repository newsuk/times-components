import GET_PUZZLE_SECTIONS from "@times-components/provider-queries/src/polygon-data.js";

const baseURL = "/puzzles/word-puzzles";

const fetchPolygonData = async () => {
  try {
    const response = await fetch("https://api.thetimes.co.uk/graphql", {
      method: "POST",
      headers: { "x-use-standalone-puzzle-data": "true" },
      body: JSON.stringify({
        query: GET_PUZZLE_SECTIONS,
        variables: { type: "polygon" }
      })
    });

    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.status}`);

    const data = await response.json();
    const puzzleUrls =
      data?.data?.puzzles?.list?.map(
        ({ slug, shortIdentifier }) => `${baseURL}/${slug}-${shortIdentifier}`
      ) || [];
    return puzzleUrls;
  } catch (error) {
    console.error("Error fetching puzzle data:", error);
    return [];
  }
};

export default fetchPolygonData;
