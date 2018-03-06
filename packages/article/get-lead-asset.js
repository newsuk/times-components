export default function getLeadAsset({ leadAsset: asset }) {
  if (!asset) return { isVideo: false, leadAsset: null };

  const isVideo = !!asset.posterImage;
  const leadAsset = isVideo ? asset.posterImage : asset;

  return {
    leadAsset,
    isVideo
  };
}
