import { Platform } from "react-native";
import globalStyle from "../article-global-style";
import webStyles from "./web";
import nativeStyles from "./native";

const styles = {};

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
