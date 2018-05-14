export { default as getImageUri } from "./index-base";

export const scrollUpToPaging = window => {
  if (typeof window === "undefined") {
    return;
  }

  window.scroll({
    left: 0,
    top: 0
  });
};
