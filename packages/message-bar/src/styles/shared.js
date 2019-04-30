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
    width: "100%",
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
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    height,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    zIndex: 10
  }
});

export default sharedStyle;
