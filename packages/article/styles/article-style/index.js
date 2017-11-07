import { StyleSheet, Platform } from "react-native";
import globalStyle from "../article-global-style";
import webStyles from "./web";
import nativeStyles from "./native";

const styles = {};

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, StyleSheet.create(nativeStyles));
} else {
  Object.assign(styles, globalStyle, StyleSheet.create(webStyles));
}

export default styles;
