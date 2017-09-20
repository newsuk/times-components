import { Platform } from "react-native";

const lineHeightStyle = Platform.select({
  ios: {
    lineHeight: 14
  },
  android: {
    lineHeight: 17
  },
  web: {
    lineHeight: 13
  }
});

const styles = {
  byline: {
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium",
    ...lineHeightStyle
  },
  bylineColor: {
    color: "#696969"
  },
  container: {
    flexDirection: "row"
  }
};

export default styles;
