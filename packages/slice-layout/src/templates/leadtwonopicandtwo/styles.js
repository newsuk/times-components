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
    width: "16%"
  }
};

const stylesHuge = {
  column: {
    width: "36%"
  },
  middleTile: {
    width: "14%"
  }
};

const stylesResolver = {
  huge: stylesHuge,
  wide: stylesWide
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
