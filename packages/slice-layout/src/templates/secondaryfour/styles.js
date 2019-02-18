import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallStyles = {
  container: {
    flex: 1
  },
  item: {
    width: "50%"
  },
  itemContainer: {
    flexDirection: "row"
  }
};

const mediumStyles = {
  container: { flexDirection: "row", marginHorizontal: spacing(2) },
  item: {
    width: "25%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small ? smallStyles : mediumStyles;
