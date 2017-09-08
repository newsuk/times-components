import { Platform } from "react-native";

const styles = {
  byline: {
    fontSize: 13,
    lineHeight: Platform.OS === "android" ? 17 : 14,
    fontFamily: "GillSansMTStd-Medium"
  },
  bylineColor: {
    color: "#696969"
  },
  container: {
    flexDirection: "row"
  }
};

export default styles;
