import getStandardTemplateCrop from "./crop-config";

export const defaultAsset = {
  aspectRatio: "1:1",
  displayImage: null,
  isVideo: false,
  leadAsset: null
};

export default function getLeadAsset({ leadAsset }) {
  if (!leadAsset) return defaultAsset;

  /* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
  const isVideo = leadAsset.__typename === "Video";
  const displayImage = isVideo
    ? getStandardTemplateCrop(leadAsset.posterImage)
    : getStandardTemplateCrop(leadAsset);

  const aspectRatio = displayImage.ratio;

  return {
    aspectRatio,
    displayImage,
    isVideo,
    leadAsset: {
      ...leadAsset,
      isVideo
    }
  };
}
