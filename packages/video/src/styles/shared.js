import { fontFactory, spacing, colours } from "@times-components/styleguide";

const styles = {
  noSubscriptionWrapper: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 65,
    marginTop: -32
  },
  noSubscriptionMessage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    maxWidth: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: colours.functional.contrast,
    ...fontFactory({
      font: "body"
    }),
    padding: spacing(2),
    textAlign: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  skySportsBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 40,
    paddingHorizontal: spacing(1),
    width: "100%",
    zIndex: 3,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  skySportsBannerText: {
    color: colours.functional.contrast,
    ...fontFactory({
      font: "supporting",
      fontSize: "imageOverlayTextSmall"
    }),
    marginTop: spacing(2)
  },
  skySportsBadge: {
    height: 17,
    marginTop: 7,
    width: 80
  }
};

export default styles;
