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
  right: spacing(2),
  bottom: spacing(1)
};

const starPaddingBottom = {
  paddingBottom: spacing(3)
};

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  starButton: {
    alignSelf: "center"
  }
};

export { horizontalStyles, verticalStyles, tileStar, starPaddingBottom };
