const hasTiles = t => t && t.tiles && t.tiles.length > 0;

const hasSlices = s => s.slices && s.slices.length > 0;

const hasSections = s =>
  s.slices[0].sections && s.slices[0].sections.length > 0;

const getSectionTitle = t =>
  t.slices[0].sections[0].title
    ? t.slices[0].sections[0].title.toLowerCase()
    : "";

module.exports = article =>
  hasTiles(article)
    ? article.tiles.reduce(
        (acc, curr) =>
          hasSlices(curr) && hasSections(curr) && getSectionTitle(curr)
            ? getSectionTitle(curr)
            : acc,
        "default"
      )
    : "default";
