import { StyleSheet } from "react-native";
import { fonts, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  body: {
    fontFamily: fonts.body,
    fontSize: "14px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    width: 410,
    height: "auto",
    maxWidth: "80%"
  },
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  heading: {
    fontFamily: fonts.headline,
    fontSize: "20px",
    textAlign: "center",
    color: "white",
    width: "auto",
    height: "auto",
    marginBottom: spacing(2)
  },
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
});

export default styles;
