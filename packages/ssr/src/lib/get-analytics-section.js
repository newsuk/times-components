module.exports = article => {
  // Get the section for an article, preferring it not to be news

  const { tiles } = article;

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

  const titles = sections.map(section => section.title);

  if (titles.length === 0) {
    return null;
  }

  const nonNews = titles.filter(title => title !== "news");

  return nonNews.length ? nonNews[0].toLowerCase() : "news";
};
