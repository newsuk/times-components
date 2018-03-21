export default function getLeadAsset({ leadAsset }) {
  if (!leadAsset)
    return {
      isVideo: false,
      leadAsset: null,
      displayImage: null,
      aspectRatio: "1:1"
    };

  const isVideo = leadAsset.type === "Video";
  const displayImage = isVideo ? leadAsset.posterImage.crop : leadAsset.crop;
  const aspectRatio = displayImage.ratio;

  return {
    isVideo,
    leadAsset,
    displayImage,
    aspectRatio
  };
}
