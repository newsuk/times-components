export default article =>
  article &&
  article.tiles.length > 0 &&
  article.tiles[0].slices &&
  article.tiles[0].slices.length > 0 &&
  article.tiles[0].slices[0].sections &&
  article.tiles[0].slices[0].sections.length > 0 &&
  article.tiles[0].slices[0].sections[0].title
    ? article.tiles[0].slices[0].sections[0].title.toLowerCase()
    : "default";
