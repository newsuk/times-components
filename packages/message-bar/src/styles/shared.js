import { colours, fontFactory } from "@times-components/styleguide";

const height = 50;

const sharedStyle = scale => ({
  messageBarBody: {
    alignItems: "center",
    backgroundColor: colours.functional.articleFlagUpdated,
    flexDirection: "row",
    height,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowRadius: 5,
    flexGrow: 1,
    flexShrink: 0,
    zIndex: 10
  },
  messageBarCloseButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 28 / 2,
    height: 28,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: 20,
    width: 28
  },
  messageBarText: {
    color: colours.functional.white,
    ...fontFactory({
      font: "headline",
      fontSize: "secondary",
      scale
    }),
    marginLeft: 20
  },
  messageManager: {
    flex: 1,
    width: "100%",
    zIndex: 10
  }
});

export default sharedStyle;
