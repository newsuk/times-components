import get from "lodash.get";

const getImageUri = item =>
  get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

const getHeadline = (headline, shortHeadline) => shortHeadline || headline;

export { getImageUri, getHeadline };
