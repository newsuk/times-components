import { colours, fontFactory } from "@times-components/ts-styleguide";

const height = 50;

const messageBarBody = {
  maxWidth: 1182,
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  height,
  flexGrow: 1,
  flexShrink: 0,
  marginHorizontal: "auto"
};

const messageBarCloseButton = {
  alignItems: "center",
  backgroundColor: colours.functional.transparentWhite,
  borderRadius: 14,
  height: 28,
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: 20,
  width: 28
};

const messageBarText = scale => ({
  color: colours.functional.white,
  ...fontFactory({
    font: "headline",
    fontSize: "secondary",
    scale
  }),
  marginLeft: 20
});

export const sharedStyle = scale => ({
  messageBarBodyContainer: {
    backgroundColor: colours.functional.articleFlagUpdated,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 5,
    zIndex: 10
  },
  messageBarBody,
  messageBarCloseButton,
  messageBarText: {
    ...messageBarText(scale)
  },
  messageManager: {
    flex: 1,
    width: "100%",
    zIndex: 10
  }
});

const smallBreakpointStyles = scale => ({
  ...sharedStyle(scale),
  messageBarCloseButton: {
    ...messageBarCloseButton,
    marginRight: 10
  },
  messageBarText: {
    ...messageBarText(scale),
    marginLeft: 10
  }
});

const mediumBreakpointStyles = scale => ({
  ...sharedStyle(scale),
  messageBarCloseButton: {
    ...messageBarCloseButton,
    marginRight: 10
  },
  messageBarText: {
    ...messageBarText(scale),
    marginLeft: 60
  }
});

const wideBreakpointStyles = scale => ({
  ...sharedStyle(scale),
  messageBarBody: {
    ...messageBarBody,
    maxWidth: 1024
  }
});

const hugeBreakpointStyles = scale => ({
  ...sharedStyle(scale)
});

const stylesResolver = {
  small: smallBreakpointStyles,
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: hugeBreakpointStyles
};

export default (scale, breakpoint = "huge") =>
  stylesResolver[breakpoint](scale);
