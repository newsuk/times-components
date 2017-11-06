import { Platform } from "react-native";
import globalStyle from "../article-global-style";
import sharedStyles from "./shared";
import nativeStyles from "./native";

const styles = {};

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, sharedStyles);
}

export default styles;
