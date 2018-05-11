import get from "lodash.get";

const getImageUri = item =>
  get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

export default getImageUri;
