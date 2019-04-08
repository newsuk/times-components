import { spacing } from "@times-components/styleguide";

const horizontalStyles = {
  container: {
    flexDirection: "row"
  },
  flagStyle: {
    alignItems: "flex-start",
    width: "75%"
  },
  starButton: {
    alignItems: "flex-end",
    flex: 1,
    marginTop: -spacing(1),
    width: "25%"
  }
};

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  flagStyle: {},
  starButton: {
    alignItems: "center",
    marginTop: spacing(2)
  }
};

export { horizontalStyles, verticalStyles };
