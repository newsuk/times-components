import { spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4)
  },
  leadItem: {
    width: "75%"
  },
  keyline: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  supportItem: {
    width: "25%"
  },
  colSeparatorStyle: {
    marginVertical: spacing(3)
  }
};

const wideBreakpointStyles = {
  ...styles,
  container: {
    ...styles.container,
    marginHorizontal: spacing(2)
  }
};

const stylesToreturn = {
  medium: styles,
  huge: wideBreakpointStyles,
  wide: wideBreakpointStyles
};

export default breakpoint => stylesToreturn[breakpoint] || styles;
