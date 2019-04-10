const getTileImageUri = (tile, crop) => {
  const leadAsset =
    tile.leadAsset || tile.article.listingAsset || tile.article.leadAsset;
  if (!leadAsset) return null;

  // eslint-disable-next-line no-underscore-dangle
  const isVideo = leadAsset.__typename === "Video";
  const displayImage = isVideo
    ? leadAsset.posterImage[crop] || {}
    : leadAsset[crop] || {};

  return displayImage.url;
};

const getTileSummary = (tile, length) =>
  tile[`teaser${length}`] || tile.article[`summary${length}`];

const getTileStrapline = tile => tile.strapline || tile.article.strapline;

export { getTileImageUri, getTileSummary, getTileStrapline };
