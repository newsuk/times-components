import { spacing } from "@times-components/ts-styleguide";

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

const starDefaultStyles = {
  marginTop: "auto",
  alignItems: "flex-end",
  paddingTop: spacing(1)
};

const starCenterStyles = {
  alignItems: "center"
};

const starUnderneathTextStyles = {
  marginTop: 0
};

const playIconStyles = {
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  left: 0,
  position: "absolute",
  top: 0,
  zIndex: 2,
  width: "100%",
  height: "100%"
};

export {
  horizontalStyles,
  verticalStyles,
  starDefaultStyles,
  starCenterStyles,
  starUnderneathTextStyles,
  playIconStyles
};
