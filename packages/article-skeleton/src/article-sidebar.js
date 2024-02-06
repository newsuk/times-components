import GET_PUZZLE_SECTIONS from "@times-components/provider-queries/src/polygon-data.js";

const generatePuzzleUrl = slice => {
  const base = "/puzzles/word-puzzles";

  if (slice.shortIdentifier) {
    return `${base}/${slice.slug}-${slice.shortIdentifier}`;
  }
  return base;
};

const fetchPolygonData = async () => {
  try {
    const response = await fetch("https://api.thetimes.co.uk/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: GET_PUZZLE_SECTIONS
      })
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();

    const puzzleSectionsData =
      data && data.data && data.data.editions && data.data.editions.list
        ? data.data.editions.list
            .map(edition => {
              const puzzleSection = edition.sections.find(
                sec => sec && sec.__typename === "PuzzleSection"
              );
              return puzzleSection
                ? {
                    ...puzzleSection,
                    slices: puzzleSection.slices.map(slice => ({
                      ...slice,
                      section: {
                        title: puzzleSection.title,
                        id: puzzleSection.id
                      }
                    }))
                  }
                : null;
            })
            .filter(Boolean)
        : [];

    const filteredPuzzleSlices = puzzleSectionsData.flatMap(sec =>
      sec.slices
        .filter(
          slice => slice.__typename === "Puzzle" && slice.type === "polygon"
        )
        .map(({ slug, shortIdentifier }) => ({
          slug,
          shortIdentifier
        }))
    );

    const polygonData = filteredPuzzleSlices.map(puzzle =>
      generatePuzzleUrl(puzzle)
    );

    return polygonData[0];
  } catch (error) {
    // Handle error fetching puzzle data
    return null;
  }
};

export default fetchPolygonData;
