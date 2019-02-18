export default (leadAsset, crop) => {
  if (!leadAsset) return null;

  // eslint-disable-next-line no-underscore-dangle
  const isVideo = leadAsset.__typename === "Video";
  const displayImage = isVideo
    ? leadAsset.posterImage[crop] || {}
    : leadAsset[crop] || {};

  return displayImage.url;
};
