module.exports = ({ tiles }) => {
  // Get the section for an article, preferring it not to be news

  if (!tiles) {
    return null;
  }

  const slices = tiles.reduce((acc, tile) => {
    acc.push(...tile.slices);
    return acc;
  }, []);

  const sections = slices.reduce((acc, slice) => {
    acc.push(...slice.sections);
    return acc;
  }, []);

  let titles = sections.map(section => section.title);
  titles = titles.filter(title => title);

  const nonNewsSection = titles.filter(title => title !== "news");

  return nonNewsSection.length
    ? nonNewsSection[0].toLowerCase()
    : "unknown section";
};
