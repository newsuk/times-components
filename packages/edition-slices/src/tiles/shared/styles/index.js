import { spacing } from "@times-components/styleguide";

const horizontalStyles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flagStyle: {
    alignItems: "flex-start",
    width: "75%"
  }
};

const tileStar = {
  position: "absolute",
  right: 0,
  bottom: spacing(2)
};

const starHeadlinePaddingBottom = {
  paddingBottom: spacing(3)
};

const starTeaserPaddingBottom = {
  paddingBottom: spacing(5)
};

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  starButton: {
    alignSelf: "center"
  }
};

export {
  horizontalStyles,
  verticalStyles,
  tileStar,
  starHeadlinePaddingBottom,
  starTeaserPaddingBottom
};
