import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const getHeadline = breakpoint => {
  switch (breakpoint) {
    case editionBreakpoints.wide: {
      return {
        fontSize: 30,
        lineHeight: 30
      };
    }
    case editionBreakpoints.huge: {
      return {
        fontSize: 35,
        lineHeight: 35
      };
    }
    default: {
      return {
        fontSize: 22,
        lineHeight: 22
      };
    }
  }
};

const styles = breakpoint => ({
  header: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2),
    height: 80
  },
  headline: getHeadline(breakpoint),
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%",
    marginTop: spacing(-5)
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginHorizontal: spacing(1),
    height: 150,
    overflow: "hidden"
  }
});

export default styles;
