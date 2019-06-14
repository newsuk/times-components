import get from "lodash.get";
export { getImageUri, getHeadline } from "./index-base";

export const scrollUpToPaging = window => {
  window.scroll({
    left: 0,
    top: 0
  });
};

export const getAltText = item => get(item, "leadAsset.title", null) || get(item, "leadAsset.caption", "");
