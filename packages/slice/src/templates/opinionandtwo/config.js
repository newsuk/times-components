import { spacing } from "@times-components/styleguide";

export const opinionConfig = {
  imageConfig: {
    cropSize: "23",
    imageRatio: 2 / 3,
    style: {
      bottom: 0,
      marginTop: -140,
      maxWidth: "40%",
      minWidth: "40%",
      position: "relative",
      right: 0
    }
  },
  isOpinionByline: true,
  isReversed: true,
  summaryConfig: {
    lengths: [125],
    style: {
      paddingRight: spacing(2),
      width: "60%"
    }
  }
};

export const supportConfig = {
  showImage: false,
  showSummary: false
};
