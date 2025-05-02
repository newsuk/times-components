import GET_PUZZLE_SECTIONS from "@times-components/provider-queries/src/sidebar-data.js";

const baseURL = "/puzzles/word-puzzles";
const londonDate = new Intl.DateTimeFormat("en-UK", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const [day, month, year] = londonDate.split("/");
const formattedDate = `${year}-${month}-${day}`;

const fetchPolygonData = async () => {
  try {
    const response = await fetch("https://api.thetimes.co.uk/graphql", {
      method: "POST",
      headers: { "x-use-standalone-puzzle-data": "true" },
      body: JSON.stringify({
        query: GET_PUZZLE_SECTIONS,
        variables: {
          puzzleStartDate: formattedDate,
          puzzleEndDate: formattedDate,
          type: "polygon"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const puzzles =
      data && data.data && data.data.puzzles && data.data.puzzles.list;

    const puzzleUrl = puzzles
      ? puzzles.map(
          ({ slug, shortIdentifier }) => `${baseURL}/${slug}-${shortIdentifier}`
        )
      : [];
    return puzzleUrl;
  } catch (error) {
    console.error("Error fetching puzzle data:", error);
    return [];
  }
};

export default fetchPolygonData;
