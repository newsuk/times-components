import { fonts, spacing } from "@times-components/styleguide";

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
    color: "#FFFFFF",
    fontFamily: fonts.body,
    padding: spacing(2),
    textAlign: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default styles;
