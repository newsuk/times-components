import { spacing } from "@times-components/styleguide";

const main = {
  column: {
    width: "50%"
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacing(2)
  }
};

const stylesWide = {
  column: {
    width: "42%"
  },
  middleTile: {
    paddingTop: spacing(2),
    width: "16%"
  }
};

const stylesResolver = {
  huge: stylesWide,
  wide: stylesWide
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
