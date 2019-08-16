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

export {
  horizontalStyles,
  verticalStyles,
  starDefaultStyles,
  starCenterStyles,
  starUnderneathTextStyles
};
