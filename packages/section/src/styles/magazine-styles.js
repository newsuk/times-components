import { colours, editionBreakpoints } from "@times-components/styleguide";

const mainStyle = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.black,
    position: "relative",
    width: "100%"
  },
  image: {
    width: "100%"
  },
  imageWrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.black,
    flex: 1,
    overflow: "hidden",
    width: "100%"
  },
  label: {
    color: colours.functional.white,
    letterSpacing: 0.3,
    paddingHorizontal: 13,
    paddingVertical: 8
  },
  labelWrapper: {
    backgroundColor: colours.functional.transparentBlack,
    borderRadius: 9999,
    bottom: 20,
    position: "absolute"
  }
};

const wideStyle = {
  ...mainStyle,
  container: {
    ...mainStyle.container,
    paddingHorizontal: "10%"
  }
};

const hugeStyle = {
  ...mainStyle,
  container: {
    ...mainStyle.container,
    paddingHorizontal: "20%"
  }
};

export default breakpoint => {
  if (breakpoint === editionBreakpoints.huge) {
    return hugeStyle;
  }
  if (breakpoint === editionBreakpoints.wide) {
    return wideStyle;
  }
  return mainStyle;
};
