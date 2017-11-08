import { Platform, StyleSheet } from "react-native";

const customStyle = Platform.select({
  ios: {
    lineHeight: 14
  },
  android: {
    lineHeight: 17
  },
  web: {
    whiteSpace: "normal",
    lineHeight: 13
  }
});

const styles = StyleSheet.create({
  byline: {
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium",
    ...customStyle
  },
  bylineColor: {
    color: "#696969"
  },
  container: {
    flexDirection: "row"
  }
});

export default styles;
