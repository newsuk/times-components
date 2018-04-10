export const defaultAsset = {
  isVideo: false,
  leadAsset: null,
  displayImage: null,
  aspectRatio: "1:1"
};

export default function getLeadAsset({ leadAsset }) {
  if (!leadAsset) return defaultAsset;

  /* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
  const isVideo = leadAsset.__typename === "Video";
  const displayImage = isVideo ? leadAsset.posterImage.crop : leadAsset.crop;
  const aspectRatio = displayImage.ratio;

  return {
    isVideo,
    leadAsset: { ...leadAsset, isVideo },
    displayImage,
    aspectRatio
  };
}
