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

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  starButton: {
    alignSelf: "center"
  }
};

const starDefaultPosition = {
  marginTop: "auto",
  alignItems: "flex-end",
  paddingTop: spacing(1)
};

const starCenterPosition = {
  alignItems: "center"
};

const starAfterContentPosition = {
  marginTop: 0
};

const fullHeightSummaryContainer = {
  flex: 1
};

export {
  horizontalStyles,
  verticalStyles,
  starDefaultPosition,
  starCenterPosition,
  starAfterContentPosition,
  fullHeightSummaryContainer
};
