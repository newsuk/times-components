export default function getLeadAsset({ leadAsset: asset }) {
  if (!asset) return { isVideo: false, leadAsset: null };

  const isVideo = asset.type === "Video";
  const leadAsset = { ...asset, isVideo };

  return {
    leadAsset,
    isVideo
  };
}
