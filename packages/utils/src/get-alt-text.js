import get from "lodash.get";

export const getAltText = item => get(item, "leadAsset.title", null) || get(item, "leadAsset.caption", "");
