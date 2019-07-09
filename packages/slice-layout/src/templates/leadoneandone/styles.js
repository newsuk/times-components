import {
  spacing,
  colours,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  leadItem: {
    width: "83.33%"
  },
  keyline: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  supportItem: {
    width: "16.67%"
  }
};

const hugeBreakpointStyles = {
  ...styles,
  container: {
    ...styles.container,
    width: "86%",
    alignSelf: "center"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.huge ? hugeBreakpointStyles : styles;
