export { getImageUri, getHeadline } from "./index-base";

export const scrollUpToPaging = window => {
  window.scroll({
    left: 0,
    top: 0
  });
};
